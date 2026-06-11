"use client";

import { Suspense, useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { successLensMetadata } from "../../../success-lens/metadata.js";
import { successLensModuleMap } from "../../../lib/successLensModuleMap.js";
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

export default function SuccessWireSlugClient({ initialDbPost = null }) {
  const params = useParams();
  
  // In Next.js static exports, when index.php serves a template HTML file for a dynamic route,
  // useParams() will return the static file's route.
  // We check window.location.pathname to find the actual slug requested by the user.
  let lensId = params.lensId;
  if (typeof window !== "undefined") {
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    // Path looks like /success-wire/some-slug
    if (pathParts[0] === "success-wire" && pathParts[1]) {
      lensId = pathParts[1];
    }
  }

  const [dbPost, setDbPost] = useState(initialDbPost);
  const [allDynamicLens, setAllDynamicLens] = useState([]);
  const [loadingDb, setLoadingDb] = useState(initialDbPost === null);

  const metadata = useMemo(() => {
    if (!lensId) return null;
    return (
      successLensMetadata.find(
        (item) => item.slug === lensId || item.id === lensId,
      ) || null
    );
  }, [lensId]);

  useEffect(() => {
    if (initialDbPost !== null) return; // server already provided post data
    if (metadata) {
      setLoadingDb(false);
      return;
    }
    const fetchDbPost = async () => {
      try {
        const apiBaseURL = getApiBaseUrl();

        const res = await fetch(`${apiBaseURL}/api/posts.php?slug=${lensId}`);
        const data = await res.json();
        if (data.status === "success" && data.data.post_type === "success_lens") {
          setDbPost(data.data);
          const seoTitle = (data.data.title || "").trim();
          if (seoTitle) document.title = seoTitle + " | SuccessWikis";
        }

        const allRes = await fetch(`${apiBaseURL}/api/posts.php?type=success_lens`);
        const allData = await allRes.json();
        if (allData.status === "success") {
          setAllDynamicLens(allData.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingDb(false);
      }
    };
    fetchDbPost();
  }, [lensId, metadata, initialDbPost]);

  // 2. Look up pre-created next/dynamic component (SSR-compatible)
  const LensComponent = metadata ? (successLensModuleMap[metadata.id] || null) : null;

  // 3. Compute 4 recent posts for sidebar
  const recentPosts = useMemo(() => {
    const combined = [
      ...successLensMetadata,
      ...allDynamicLens.map(l => ({
        id: l.id,
        title: l.title,
        slug: l.slug,
        date: l.published_date
      }))
    ];

    return combined
      .filter((l) => l.slug !== lensId && l.id !== lensId && String(l.id) !== lensId)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 4)
      .map((l) => ({
        title: l.title,
        link: `/success-wire/${l.slug}`,
      }));
  }, [lensId, allDynamicLens]);

  if (loadingDb)
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>Loading...</div>
    );

  if (!LensComponent && !dbPost) {
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>
        <h1>Article Not Found</h1>
        <p>We couldn't find the Success Wire article you're looking for.</p>
        <Link
          href="/success-wire"
          style={{ textDecoration: "underline", color: "blue" }}
        >
          Back to Success Wire
        </Link>
      </div>
    );
  }

  return (
    <>
      {LensComponent ? (
        <Suspense
          fallback={
            <div style={{ padding: "100px", textAlign: "center" }}>
              Loading...
            </div>
          }
        >
          <LensComponent dynamicRecentPosts={recentPosts} date={metadata?.date} postId={metadata?.slug} />
        </Suspense>
      ) : (
        <PodLayout
          category={dbPost.category || "Success Wire"}
          title={dbPost.title}
          postId={dbPost.slug}
          image={dbPost.image_url}
          date={dbPost.published_date ? new Date(dbPost.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : undefined}
          content={
            <>
              {renderYouTube(dbPost.youtube_link)}
              <div 
                className="quill-content" 
                dangerouslySetInnerHTML={{ 
                  __html: (dbPost.content || "").replace(/&nbsp;|\u00a0/g, " ") 
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
