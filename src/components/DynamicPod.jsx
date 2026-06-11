import React, { Suspense, useMemo, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { podMetadata } from "../pod/metadata.js";
import { Helmet } from "react-helmet-async";
import PodLayout from "../components/PodLayout";

// Import all pod modules recursively from ../pod/
const podModules = import.meta.glob("../pod/**/*.jsx");

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
        }}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube Video"
      ></iframe>
    </div>
  );
}

// Removed GenericPodLayout, natively using PodLayout

export default function DynamicPod() {
  const { podSlug } = useParams();
  const [dbPost, setDbPost] = useState(null);
  const [allDynamicPosts, setAllDynamicPosts] = useState([]);
  const [loadingDb, setLoadingDb] = useState(true);

  // 1. Find metadata based on the URL param (slug or id)
  const metadata = useMemo(() => {
    if (!podSlug) return null;
    return (
      podMetadata.find((p) => p.slug === podSlug || p.id === podSlug) || null
    );
  }, [podSlug]);

  useEffect(() => {
    if (metadata) {
      setLoadingDb(false);
      return;
    }
    const fetchDbPost = async () => {
      try {
        const apiBaseURL =
          import.meta.env.VITE_API_URL ?? '';
        
        // Fetch current post
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
        }

        // Also fetch all dynamic posts for the sidebar
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
  }, [podSlug, metadata]);

  // 2. Determine the file path key for import.meta.glob
  const moduleKey = useMemo(() => {
    if (metadata) {
      // E.g. ../pod/Driven-by-Purpose/RaghavFoundationPost.jsx
      const key = Object.keys(podModules).find((k) =>
        k.includes(`/${metadata.id}.jsx`),
      );
      return key;
    }
    // Fallback: try to match the slug directly to filename
    const directKey = Object.keys(podModules).find((k) => {
      const fname = k.split("/").pop().replace(".jsx", "");
      return fname === podSlug;
    });
    return directKey;
  }, [metadata, podSlug]);

  // 3. Lazy Load the component
  const PodComponent = useMemo(() => {
    if (!moduleKey) return null;
    return React.lazy(podModules[moduleKey]);
  }, [moduleKey]);

  // 4. Compute 4 recent posts for sidebar
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
        <Link to="/" style={{ textDecoration: "underline", color: "blue" }}>
          Back to Home
        </Link>
      </div>
    );
  }

  // 5. Render
  const pageTitle = metadata
    ? metadata.title
    : dbPost
      ? dbPost.title
      : "Success Story";
  const pageDesc = metadata
    ? metadata.metaDescription
    : dbPost
      ? dbPost.meta_description
      : "";

  return (
    <>
      <Helmet>
        <title>{`${pageTitle} | Success Wikis`}</title>
        <meta name="description" content={pageDesc || ""} />
      </Helmet>

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
