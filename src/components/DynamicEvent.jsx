import React, { Suspense, useMemo, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { eventMetadata } from "../events/metadata.js";
import { Helmet } from "react-helmet-async";
import EventLayout from "../components/EventLayout";

// Import all event modules recursively from ../events/
const eventModules = import.meta.glob("../events/**/*.jsx");

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

// Removed GenericEventLayout, natively using EventLayout

export default function DynamicEvent() {
  const { eventSlug } = useParams();
  const [dbPost, setDbPost] = useState(null);
  const [loadingDb, setLoadingDb] = useState(true);

  // 1. Find metadata
  const metadata = useMemo(() => {
    if (!eventSlug) return null;
    return (
      eventMetadata.find((e) => e.slug === eventSlug || e.id === eventSlug) ||
      null
    );
  }, [eventSlug]);

  useEffect(() => {
    if (metadata) {
      setLoadingDb(false);
      return;
    }

    const fetchDbPost = async () => {
      try {
        const apiBaseURL =
          import.meta.env.VITE_API_URL ?? '';
        const res = await fetch(
          `${apiBaseURL}/api/posts.php?slug=${eventSlug}`,
        );
        const data = await res.json();
        if (data.status === "success" && data.data.post_type === "event") {
          setDbPost(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingDb(false);
      }
    };
    fetchDbPost();
  }, [eventSlug, metadata]);

  // 2. Determine module key
  const moduleKey = useMemo(() => {
    if (metadata) {
      const key = Object.keys(eventModules).find((k) =>
        k.includes(`/${metadata.id}.jsx`),
      );
      return key;
    }
    return null;
  }, [metadata]);

  // 3. Lazy Load
  const EventComponent = useMemo(() => {
    if (!moduleKey) return null;
    return React.lazy(eventModules[moduleKey]);
  }, [moduleKey]);

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
          to="/events"
          style={{ textDecoration: "underline", color: "blue" }}
        >
          Back to Events
        </Link>
      </div>
    );
  }

  const pageTitle = metadata ? metadata.title : dbPost ? dbPost.title : "Event";

  return (
    <>
      <Helmet>
        <title>{`${pageTitle} | Success Wikis`}</title>
      </Helmet>

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
