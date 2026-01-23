import React, { Suspense, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogMetadata } from '../blogs/metadata.js';
import { Helmet } from 'react-helmet-async';

// Import all blog modules from ../blogs/*.jsx
const blogModules = import.meta.glob('../blogs/*.jsx');

export default function DynamicBlog() {
  const { blogId } = useParams(); // Expecting slug or id

  // 1. Find metadata based on the URL param (slug or id)
  const metadata = useMemo(() => {
    if (!blogId) return null;
    return blogMetadata.find(b => 
        b.slug === blogId || b.id === blogId
    ) || null;
  }, [blogId]);

  // 2. Determine the file path key for import.meta.glob
  const moduleKey = useMemo(() => {
     // If metadata found, look for its ID in filenames
     if (metadata) {
         // E.g. ../blogs/AmbitionPost.jsx
         const key = Object.keys(blogModules).find(k => k.includes(`/${metadata.id}.jsx`));
         return key;
     }
     // Fallback: try to match the URL param directly to filename
     // E.g. /blogs/AmbitionPost -> matches ../blogs/AmbitionPost.jsx
     const directKey = Object.keys(blogModules).find(k => {
        const fname = k.split('/').pop().replace('.jsx', '');
        return fname === blogId;
     });
     return directKey;
  }, [metadata, blogId]);


  // 3. Lazy Load the component
  const BlogComponent = useMemo(() => {
    if (!moduleKey) return null;
    return React.lazy(blogModules[moduleKey]);
  }, [moduleKey]);

  if (!BlogComponent) {
    return (
        <div style={{ padding: '100px', textAlign: 'center' }}>
            <h1>Blog Not Found</h1>
            <p>We couldn't find the post you're looking for.</p>
            <Link to="/blogs" style={{ textDecoration: 'underline', color: 'blue' }}>Back to Blogs</Link>
        </div>
    );
  }

  // 4. Compute 4 recent posts for sidebar
  const recentPosts = useMemo(() => {
    return blogMetadata
      .filter(b => b.slug !== blogId && b.id !== blogId) // Exclude current
      .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date descending
      .slice(0, 4) // Take top 4
      .map(b => ({
        title: b.title,
        link: `/blogs/${b.slug}`
      }));
  }, [blogId]);

  // 5. Render
  // The styled BlogLayout is inside the imported component itself.
  // We just mount it.
  return (
    <>
      <Helmet>
        <title>{metadata ? `${metadata.title} | Success Wikis` : 'Blog | Success Wikis'}</title>
        <meta name="description" content={metadata?.metaDescription || ''} />
      </Helmet>
      
      <Suspense fallback={<div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>}>
        <BlogComponent dynamicRecentPosts={recentPosts} />
      </Suspense>
    </>
  );
}
