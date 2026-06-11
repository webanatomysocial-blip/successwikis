"use client";

import { Suspense, useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { blogMetadata } from '../../../blogs/metadata.js';
import { blogModuleMap } from '../../../lib/blogModuleMap.js';
import BlogLayout from '../../../components/BlogLayout';
import { getApiBaseUrl } from '../../../lib/api';

function renderYouTube(url) {
  if (!url) return null;
  let videoId = '';
  const watchMatch = url.match(/v=([^&]+)/);
  if (watchMatch) videoId = watchMatch[1];
  else {
      const shortMatch = url.match(/youtu\.be\/([^?]+)/);
      if (shortMatch) videoId = shortMatch[1];
      else if (url.includes('youtube.com/embed/')) videoId = url.split('embed/')[1].split('?')[0];
  }
  if (!videoId) return null;

  return (
    <div style={{ marginBottom: "30px", position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
      <iframe 
        src={`https://www.youtube.com/embed/${videoId}`} 
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", borderRadius: "10px", border: "none" }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
        title="YouTube Video"
      ></iframe>
    </div>
  );
}

export default function BlogSlugClient({ initialDbPost = null }) {
  const params = useParams();
  
  // In Next.js static exports, when index.php serves a template HTML file for a dynamic route,
  // useParams() will return the static file's route (e.g. 'dont-need-figured-out').
  // We check window.location.pathname to find the actual slug requested by the user.
  let blogId = params.blogId;
  if (typeof window !== "undefined") {
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    // Path looks like /blogs/some-slug
    if (pathParts[0] === "blogs" && pathParts[1]) {
      blogId = pathParts[1];
    }
  }

  const [dbPost, setDbPost] = useState(initialDbPost);
  const [allDynamicBlogs, setAllDynamicBlogs] = useState([]);
  const [loadingDb, setLoadingDb] = useState(initialDbPost === null);

  // 1. Find metadata based on the URL param (slug or id)
  const metadata = useMemo(() => {
    if (!blogId) return null;
    return blogMetadata.find(b =>
        b.slug === blogId || b.id === blogId
    ) || null;
  }, [blogId]);

  // Fetch db post if not pre-rendered by the server and not a static post
  useEffect(() => {
    if (initialDbPost !== null) return; // server already provided post data
    if (metadata) {
       setLoadingDb(false);
       return;
    }
    const fetchDbPost = async () => {
      try {
        const apiBaseURL = getApiBaseUrl();

        // Fetch current post
        const res = await fetch(`${apiBaseURL}/api/posts.php?slug=${blogId}`);
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          if (data.status === 'success' && data.data.post_type === 'blog') {
            setDbPost(data.data);
            const seoTitle = (data.data.title || "").trim();
            if (seoTitle) document.title = seoTitle + " | SuccessWikis";
          }
        }

        // Fetch all dynamic blogs for sidebar
        const allRes = await fetch(`${apiBaseURL}/api/posts.php?type=blog`);
        const allContentType = allRes.headers.get("content-type");
        if (allContentType && allContentType.includes("application/json")) {
          const allData = await allRes.json();
          if (allData.status === 'success') {
            setAllDynamicBlogs(allData.data);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingDb(false);
      }
    };
    fetchDbPost();
  }, [blogId, metadata, initialDbPost]);

  // 2. Look up pre-created next/dynamic component (SSR-compatible)
  const BlogComponent = metadata ? (blogModuleMap[metadata.id] || null) : null;

  // 3. Compute recent posts for sidebar
  const recentPosts = useMemo(() => {
    const combined = [
      ...blogMetadata,
      ...allDynamicBlogs.map(b => ({
        id: b.id,
        title: b.title,
        slug: b.slug,
        date: b.published_date
      }))
    ];

    return combined
      .filter(b => b.slug !== blogId && b.id !== blogId && String(b.id) !== blogId)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 4)
      .map(b => ({
        title: b.title,
        link: `/blogs/${b.slug}`
      }));
  }, [blogId, allDynamicBlogs]);

  if (loadingDb) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>;

  if (!BlogComponent && !dbPost) {
    return (
        <div style={{ padding: '100px', textAlign: 'center' }}>
            <h1>Blog Not Found</h1>
            <p>We couldn't find the post you're looking for.</p>
            <Link href="/blogs" style={{ textDecoration: 'underline', color: 'blue' }}>Back to Blogs</Link>
        </div>
    );
  }

  return (
    <>
      {BlogComponent ? (
        <Suspense fallback={<div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>}>
          <BlogComponent dynamicRecentPosts={recentPosts} date={metadata?.date} postId={metadata?.slug} />
        </Suspense>
      ) : (
        <BlogLayout 
           category={dbPost.category || 'Blog'}
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
