import React, { Suspense, useMemo, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { successLensMetadata } from "../success-lens/metadata.js";
import { Helmet } from "react-helmet-async";
import PodLayout from "../components/PodLayout";

// Import all success-lens modules from ../success-lens/*.jsx
const lensModules = import.meta.glob("../success-lens/*.jsx");

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

// Removed GenericLensLayout, natively using PodLayout

export default function DynamicSuccessWire() {
  const { lensId } = useParams(); // Expecting slug or id
  const [dbPost, setDbPost] = useState(null);
  const [allDynamicLens, setAllDynamicLens] = useState([]);
  const [loadingDb, setLoadingDb] = useState(true);

  const metadata = useMemo(() => {
    if (!lensId) return null;
    return (
      successLensMetadata.find(
        (item) => item.slug === lensId || item.id === lensId,
      ) || null
    );
  }, [lensId]);

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
        const res = await fetch(`${apiBaseURL}/api/posts.php?slug=${lensId}`);
        const data = await res.json();
        if (
          data.status === "success" &&
          data.data.post_type === "success_lens"
        ) {
          setDbPost(data.data);
        }

        // Fetch all dynamic lens for sidebar
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
  }, [lensId, metadata]);

  // 2. Determine the file path key for import.meta.glob
  const moduleKey = useMemo(() => {
    if (metadata) {
      // E.g. ../success-lens/GoogleAIHub.jsx
      const key = Object.keys(lensModules).find((k) =>
        k.includes(`/${metadata.id}.jsx`),
      );
      return key;
    }
    // Fallback: try to match the URL param directly to filename
    const directKey = Object.keys(lensModules).find((k) => {
      const fname = k.split("/").pop().replace(".jsx", "");
      return fname === lensId;
    });
    return directKey;
  }, [metadata, lensId]);

  // 3. Lazy Load the component
  const LensComponent = useMemo(() => {
    if (!moduleKey) return null;
    return React.lazy(lensModules[moduleKey]);
  }, [moduleKey]);

  // 4. Compute 4 recent posts for sidebar
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
          to="/success-wire"
          style={{ textDecoration: "underline", color: "blue" }}
        >
          Back to Success Wire
        </Link>
      </div>
    );
  }

  // 5. Render
  const pageTitle = metadata
    ? metadata.title
    : dbPost
      ? dbPost.title
      : "Success Wire";
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
