"use client";

import { Suspense, useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { podMetadata } from "../../../pod/metadata.js";
import { podModuleMap } from "../../../lib/podModuleMap.js";
import PodLayout from "../../../components/PodLayout";
import { getApiBaseUrl } from "../../../lib/api";

function renderYouTube(url) {
  if (!url) return null;
  let videoId = "";
  const watchMatch = url.match(/v=([^&]+)/);
  if (watchMatch) videoId = watchMatch[1];
  else {
    const shortMatch = url.match(/youtu\.be\/([^?]+)/);
    if (shortMatch) videoId = shortMatch[1];
    else if (url.includes("youtube.com/embed/"))
      videoId = url.split("embed/")[1].split("?")[0];
  }
  if (!videoId) return null;

  return (
    <div
      style={{
        marginBottom: "30px",
        position: "relative",
        paddingBottom: "56.25%",
        height: 0,
        overflow: "hidden",
      }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "10px",
          border: "none",
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube Video"
      ></iframe>
    </div>
  );
}

export default function PodSlugClient({ initialDbPost = null }) {
  const params = useParams();
  
  // In Next.js static exports, when index.php serves a template HTML file for a dynamic route,
  // useParams() will return the static file's route (e.g. 'raghav-foundation').
  // We check window.location.pathname to find the actual slug requested by the user.
  let podSlug = params.podSlug;
  if (typeof window !== "undefined") {
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    // Path looks like /:category/:slug (e.g., /driven-by-purpose/some-slug)
    if (pathParts.length >= 2) {
      podSlug = pathParts[pathParts.length - 1];
    }
  }

  const [dbPost, setDbPost] = useState(initialDbPost);
  const [allDynamicPosts, setAllDynamicPosts] = useState([]);
  const [loadingDb, setLoadingDb] = useState(initialDbPost === null);

  // 1. Find metadata based on the URL param (slug or id)
  const metadata = useMemo(() => {
    if (!podSlug) return null;
    return (
      podMetadata.find((p) => p.slug === podSlug || p.id === podSlug) || null
    );
  }, [podSlug]);

  useEffect(() => {
    if (initialDbPost !== null) return; // server already provided post data
    if (metadata) {
      setLoadingDb(false);
      return;
    }
    const fetchDbPost = async () => {
      try {
        const apiBaseURL = getApiBaseUrl();

        const res = await fetch(`${apiBaseURL}/api/posts.php?slug=${podSlug}`);
        const data = await res.json();

        if (
          data.status === "success" &&
          (data.data.post_type === "pod" ||
            data.data.post_type === "driven_by_purpose" ||
            data.data.post_type === "founders_unfiltered" ||
            data.data.post_type === "stage_behind_story")
        ) {
          setDbPost(data.data);
          const seoTitle = (data.data.title || "").trim();
          if (seoTitle) document.title = seoTitle + " | SuccessWikis";
        }

        const allRes = await fetch(`${apiBaseURL}/api/posts.php`);
        const allData = await allRes.json();
        if (allData.status === "success") {
          setAllDynamicPosts(allData.data.filter(p =>
            ["pod", "driven_by_purpose", "founders_unfiltered", "stage_behind_story"].includes(p.post_type)
          ));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingDb(false);
      }
    };
    fetchDbPost();
  }, [podSlug, metadata, initialDbPost]);

  // 2. Look up pre-created next/dynamic component (SSR-compatible)
  const PodComponent = metadata ? (podModuleMap[metadata.id] || null) : null;

  // 3. Compute 4 recent posts for sidebar
  const recentPosts = useMemo(() => {
    const combined = [
      ...podMetadata,
      ...allDynamicPosts.map(p => {
        let catSlug = "pod";
        if (p.post_type === "driven_by_purpose") catSlug = "driven-by-purpose";
        else if (p.post_type === "founders_unfiltered") catSlug = "founders-unfiltered";
        else if (p.post_type === "stage_behind_story") catSlug = "stage-behind-the-story";
        
        return {
          id: p.id,
          title: p.outer_heading || p.title,
          slug: p.slug,
          date: p.published_date,
          categorySlug: catSlug
        };
      })
    ];

    return combined
      .filter((p) => p.slug !== podSlug && p.id !== podSlug && String(p.id) !== podSlug)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 4)
      .map((p) => ({
        title: p.title,
        link: `/${p.categorySlug}/${p.slug}`,
      }));
  }, [podSlug, allDynamicPosts]);

  if (loadingDb)
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>Loading...</div>
    );

  if (!PodComponent && !dbPost) {
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>
        <h1>Story Not Found</h1>
        <p>We couldn't find the success story you're looking for.</p>
        <Link href="/" style={{ textDecoration: "underline", color: "blue" }}>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      {PodComponent ? (
        <Suspense
          fallback={
            <div style={{ padding: "100px", textAlign: "center" }}>
              Loading...
            </div>
          }
        >
          <PodComponent
            dynamicRecentPosts={recentPosts}
            date={metadata?.date}
            postId={metadata?.slug}
          />
        </Suspense>
      ) : (
        <PodLayout
          category={
            dbPost.post_type === "driven_by_purpose"
              ? "Driven by Purpose"
              : dbPost.post_type === "founders_unfiltered"
                ? "Founder's Unfiltered"
                : dbPost.post_type === "stage_behind_story"
                  ? "The Stage Behind the Story"
                  : dbPost.category || "Pod"
          }
          title={dbPost.inner_heading || dbPost.title}
          postId={dbPost.slug}
          image={dbPost.image_url}
          date={dbPost.published_date ? new Date(dbPost.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : undefined}
          content={
            <>
              {renderYouTube(dbPost.youtube_link)}
              <div
                className="quill-content"
                dangerouslySetInnerHTML={{
                  __html: (dbPost.content || "").replace(/&nbsp;|\u00a0/g, " "),
                }}
              />
            </>
          }
          recentPosts={recentPosts}
        />
      )}
    </>
  );
}
