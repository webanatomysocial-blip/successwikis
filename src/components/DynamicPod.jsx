import React, { Suspense, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { podMetadata } from '../pod/metadata.js';
import { Helmet } from 'react-helmet-async';

// Import all pod modules recursively from ../pod/
const podModules = import.meta.glob('../pod/**/*.jsx');

export default function DynamicPod() {
  const { podSlug } = useParams(); 

  // 1. Find metadata based on the URL param (slug or id)
  const metadata = useMemo(() => {
    if (!podSlug) return null;
    return podMetadata.find(p => 
        p.slug === podSlug || p.id === podSlug
    ) || null;
  }, [podSlug]);

  // 2. Determine the file path key for import.meta.glob
  const moduleKey = useMemo(() => {
     if (metadata) {
         // E.g. ../pod/Driven-by-Purpose/RaghavFoundationPost.jsx
         const key = Object.keys(podModules).find(k => k.includes(`/${metadata.id}.jsx`));
         return key;
     }
     // Fallback: try to match the slug directly to filename
     const directKey = Object.keys(podModules).find(k => {
        const fname = k.split('/').pop().replace('.jsx', '');
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
    return podMetadata
      .filter(p => p.slug !== podSlug && p.id !== podSlug) // Exclude current
      .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date descending
      .slice(0, 4) // Take top 4
      .map(p => ({
        title: p.title,
        link: `/${p.categorySlug}/${p.slug}`
      }));
  }, [podSlug]);

  if (!PodComponent) {
    return (
        <div style={{ padding: '100px', textAlign: 'center' }}>
            <h1>Story Not Found</h1>
            <p>We couldn't find the success story you're looking for.</p>
            <Link to="/" style={{ textDecoration: 'underline', color: 'blue' }}>Back to Home</Link>
        </div>
    );
  }

  // 5. Render
  return (
    <>
      <Helmet>
        <title>{metadata ? `${metadata.title} | Success Wikis` : 'Success Story | Success Wikis'}</title>
        <meta name="description" content={metadata?.metaDescription || ''} />
      </Helmet>
      
      <Suspense fallback={<div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>}>
        <PodComponent dynamicRecentPosts={recentPosts} />
      </Suspense>
    </>
  );
}
