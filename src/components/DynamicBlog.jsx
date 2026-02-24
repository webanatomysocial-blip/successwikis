// src/components/DynamicBlog.jsx

import React, { Suspense, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogMetadata } from '../blogs/metadata.js';
import { Helmet } from 'react-helmet-async';

// Import all blog modules from ../blogs/*.jsx
const blogModules = import.meta.glob('../blogs/*.jsx');

export default function DynamicBlog() {
  const { blogId } = useParams(); // slug or id

  // 1️⃣ Find metadata based on the URL param
  const metadata = useMemo(() => {
    if (!blogId) return null;
    return blogMetadata.find(
      (b) => b.slug === blogId || b.id === blogId
    ) || null;
  }, [blogId]);

  // 2️⃣ Determine the file path key for import.meta.glob
  const moduleKey = useMemo(() => {
    if (metadata) {
      return Object.keys(blogModules).find((k) =>
        k.includes(`/${metadata.id}.jsx`)
      );
    }
    return Object.keys(blogModules).find((k) => {
      const fname = k.split('/').pop().replace('.jsx', '');
      return fname === blogId;
    });
  }, [metadata, blogId]);

  // 3️⃣ Lazy Load the component
  const BlogComponent = useMemo(() => {
    if (!moduleKey) return null;
    return React.lazy(blogModules[moduleKey]);
  }, [moduleKey]);

  if (!BlogComponent) {
    return (
      <div style={{ padding: '100px', textAlign: 'center' }}>
        <h1>Blog Not Found</h1>
        <p>We couldn't find the post you're looking for.</p>
        <Link
          to="/blogs"
          style={{ textDecoration: 'underline', color: 'blue' }}
        >
          Back to Blogs
        </Link>
      </div>
    );
  }

  // 4️⃣ Compute recent posts for sidebar
  const recentPosts = useMemo(() => {
    return blogMetadata
      .filter((b) => b.slug !== blogId && b.id !== blogId)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 4)
      .map((b) => ({
        title: b.title,
        link: `/blogs/${b.slug}`,
      }));
  }, [blogId]);

  // 5️⃣ Render with Helmet for SEO
  return (
    <>
      <Helmet>
        <title>{metadata ? `${metadata.title} | Success Wikis` : 'Blog | Success Wikis'}</title>

        {/* Dynamic Description */}
        <meta
          key="description"
          name="description"
          content={metadata?.metaDescription || 'Read blogs on Success Wikis'}
        />

        {/* Open Graph Tags */}
        <meta property="og:title" content={metadata?.title || 'Blog | Success Wikis'} />
        <meta property="og:description" content={metadata?.metaDescription || 'Read blogs on Success Wikis'} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:site_name" content="Success Wikis" />
        <meta property="og:image" content={metadata?.image || '/assets/logo.png'} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata?.title || 'Blog | Success Wikis'} />
        <meta name="twitter:description" content={metadata?.metaDescription || 'Read blogs on Success Wikis'} />
        <meta name="twitter:image" content={metadata?.image || '/assets/logo.png'} />
      </Helmet>

      <Suspense fallback={<div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>}>
        <BlogComponent dynamicRecentPosts={recentPosts} />
      </Suspense>
    </>
  );
}