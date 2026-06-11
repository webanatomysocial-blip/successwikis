import React, { Suspense, useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogMetadata } from '../blogs/metadata.js';
import { Helmet } from 'react-helmet-async';
import BlogLayout from '../components/BlogLayout';

// Import all blog modules from ../blogs/*.jsx
const blogModules = import.meta.glob('../blogs/*.jsx');

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
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", borderRadius: "10px" }}
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
        title="YouTube Video"
      ></iframe>
    </div>
  );
}

// GenericPostLayout removed, natively using BlogPostLayout

export default function DynamicBlog() {
  const { blogId } = useParams(); // Expecting slug or id
  const [dbPost, setDbPost] = useState(null);
  const [allDynamicBlogs, setAllDynamicBlogs] = useState([]);
  const [loadingDb, setLoadingDb] = useState(true);

  // 1. Find metadata based on the URL param (slug or id)
  const metadata = useMemo(() => {
    if (!blogId) return null;
    return blogMetadata.find(b => 
        b.slug === blogId || b.id === blogId
    ) || null;
  }, [blogId]);

  // Fetch db post if not found in metadata
  useEffect(() => {
    if (metadata) {
       setLoadingDb(false);
       return;
    }
    const fetchDbPost = async () => {
      try {
        const apiBaseURL = import.meta.env.VITE_API_URL ?? '';
        
        // Fetch current post
        const res = await fetch(`${apiBaseURL}/api/posts.php?slug=${blogId}`);
        const data = await res.json();
        if (data.status === 'success' && data.data.post_type === 'blog') {
             setDbPost(data.data);
        }

        // Fetch all dynamic blogs for sidebar
        const allRes = await fetch(`${apiBaseURL}/api/posts.php?type=blog`);
        const allData = await allRes.json();
        if (allData.status === 'success') {
          setAllDynamicBlogs(allData.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingDb(false);
      }
    };
    fetchDbPost();
  }, [blogId, metadata]);

  // 2. Determine the file path key for import.meta.glob (for static only)
  const moduleKey = useMemo(() => {
     if (!metadata) return null;
     const key = Object.keys(blogModules).find(k => k.includes(`/${metadata.id}.jsx`));
     if (key) return key;

     const directKey = Object.keys(blogModules).find(k => {
        const fname = k.split('/').pop().replace('.jsx', '');
        return fname === blogId;
     });
     return directKey;
  }, [metadata, blogId]);

  // 3. Lazy Load the static component
  const BlogComponent = useMemo(() => {
    if (!moduleKey) return null;
    return React.lazy(blogModules[moduleKey]);
  }, [moduleKey]);

  // 4. Compute recent posts for sidebar
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
            <Link to="/blogs" style={{ textDecoration: 'underline', color: 'blue' }}>Back to Blogs</Link>
        </div>
    );
  }

  // 5. Render
  const pageTitle = metadata ? metadata.title : (dbPost ? dbPost.title : 'Blog');
  const pageDesc = metadata ? metadata.metaDescription : (dbPost ? dbPost.meta_description : '');

  return (
    <>
      <Helmet>
        <title>{`${pageTitle} | Success Wikis`}</title>
        <meta name="description" content={pageDesc || ''} />
      </Helmet>
      
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
