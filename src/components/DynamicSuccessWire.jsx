import React, { Suspense, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { successLensMetadata } from "../success-lens/metadata.js";
import { Helmet } from "react-helmet-async";

// Import all success-lens modules from ../success-lens/*.jsx
const lensModules = import.meta.glob("../success-lens/*.jsx");

export default function DynamicSuccessWire() {
  const { lensId } = useParams(); // Expecting slug or id

  // 1. Find metadata based on the URL param (slug or id)
  const metadata = useMemo(() => {
    if (!lensId) return null;
    return (
      successLensMetadata.find(
        (item) => item.slug === lensId || item.id === lensId
      ) || null
    );
  }, [lensId]);

  // 2. Determine the file path key for import.meta.glob
  const moduleKey = useMemo(() => {
    if (metadata) {
      // E.g. ../success-lens/GoogleAIHub.jsx
      const key = Object.keys(lensModules).find((k) =>
        k.includes(`/${metadata.id}.jsx`)
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

  if (!LensComponent) {
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

  // 4. Compute 4 recent posts for sidebar
  const recentPosts = useMemo(() => {
    return successLensMetadata
      .filter((l) => l.slug !== lensId && l.id !== lensId) // Exclude current
      .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date descending
      .slice(0, 4) // Take top 4
      .map((l) => ({
        title: l.title,
        link: `/success-wire/${l.slug}`,
      }));
  }, [lensId]);

  // 5. Render
  return (
    <>
      <Helmet>
        <title>
          {metadata
            ? `${metadata.title} | Success Wikis`
            : "Success Wire | Success Wikis"}
        </title>
        <meta name="description" content={metadata?.metaDescription || ""} />
      </Helmet>

      <Suspense
        fallback={
          <div style={{ padding: "100px", textAlign: "center" }}>
            Loading...
          </div>
        }
      >
        <LensComponent dynamicRecentPosts={recentPosts} />
      </Suspense>
    </>
  );
}
