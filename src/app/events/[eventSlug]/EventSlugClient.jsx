"use client";

import { Suspense, useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { eventMetadata } from "../../../events/metadata.js";
import { eventModuleMap } from "../../../lib/eventModuleMap.js";
import EventLayout from "../../../components/EventLayout";
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

export default function EventSlugClient({ initialDbPost = null }) {
  const params = useParams();
  
  // In Next.js static exports, when index.php serves a template HTML file for a dynamic route,
  // useParams() will return the static file's route.
  // We check window.location.pathname to find the actual slug requested by the user.
  let eventSlug = params.eventSlug;
  if (typeof window !== "undefined") {
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    // Path looks like /events/some-slug
    if (pathParts[0] === "events" && pathParts[1]) {
      eventSlug = pathParts[1];
    }
  }

  const [dbPost, setDbPost] = useState(initialDbPost);
  const [loadingDb, setLoadingDb] = useState(initialDbPost === null);

  // 1. Find metadata
  const metadata = useMemo(() => {
    if (!eventSlug) return null;
    return (
      eventMetadata.find((e) => e.slug === eventSlug || e.id === eventSlug) ||
      null
    );
  }, [eventSlug]);

  useEffect(() => {
    if (initialDbPost !== null) return; // server already provided post data
    if (metadata) {
      setLoadingDb(false);
      return;
    }

    const fetchDbPost = async () => {
      try {
        const apiBaseURL = getApiBaseUrl();
        const res = await fetch(`${apiBaseURL}/api/posts.php?slug=${eventSlug}`);
        const data = await res.json();
        if (data.status === "success" && data.data.post_type === "event") {
          setDbPost(data.data);
          const seoTitle = (data.data.title || "").trim();
          if (seoTitle) document.title = seoTitle + " | SuccessWikis";
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingDb(false);
      }
    };
    fetchDbPost();
  }, [eventSlug, metadata, initialDbPost]);

  // 2. Look up pre-created next/dynamic component (SSR-compatible)
  const EventComponent = metadata ? (eventModuleMap[metadata.id] || null) : null;

  if (loadingDb)
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>Loading...</div>
    );

  if (!EventComponent && !dbPost) {
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>
        <h1>Event Not Found</h1>
        <p>We couldn't find the event you're looking for.</p>
        <Link
          href="/events"
          style={{ textDecoration: "underline", color: "blue" }}
        >
          Back to Events
        </Link>
      </div>
    );
  }

  return (
    <>
      {EventComponent ? (
        <Suspense
          fallback={
            <div style={{ padding: "100px", textAlign: "center" }}>
              Loading...
            </div>
          }
        >
          <EventComponent />
        </Suspense>
      ) : (
        <EventLayout
          category="Event"
          title={dbPost.title}
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
        />
      )}
    </>
  );
}
