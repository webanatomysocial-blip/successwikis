import React, { useState, useEffect, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { blogMetadata } from '../blogs/metadata.js';
import '../css/Blog.css';

// Dynamically import all JSX files from blogs folder
const blogModules = import.meta.glob('../blogs/*.jsx', { eager: false });
const blogKeys = Object.keys(blogModules).sort();

const Blogs = (props) => {
  const { backgroundColor, limit = 3 } = props; // New prop 'limit', default to 3; use 'all' for unlimited
  const totalBlogs = blogKeys.length;

  const initialVisible = limit === 'all' ? totalBlogs : Math.min(limit, totalBlogs);
  const [visibleCount, setVisibleCount] = useState(initialVisible);

  // Preload blog components and images
  useEffect(() => {
    blogKeys.slice(0, visibleCount).forEach(key => {
      // Preload blog module
      blogModules[key]().catch(error => {
        console.error(`Error preloading blog ${key}:`, error);
      });
      // Preload image
      const blogName = key.split('/').pop().replace('.jsx', '');
      const metadata = blogMetadata.find(blog => blog.id === blogName);
      if (metadata?.image) {
        const img = new Image();
        img.src = metadata.image;
        img.onerror = () => {
          console.error(`Failed to preload image: ${metadata.image}`);
        };
      }
    });
  }, [visibleCount]);

  const loadMore = () => {
    const newCount = totalBlogs;
    setVisibleCount(newCount);
    setTimeout(() => {
      window.lenis?.scrollTo(window.scrollY, { immediate: true });
    }, 0);
  };

  const showLoadMore = visibleCount < totalBlogs && limit === 'all'; // Only show on pages where limit='all'

  return (
    <div className="whole-blog-section" style={{ backgroundColor }}>
      <div className="blogs-container">
        <div className="blogs-grid">
          {blogKeys.slice(0, visibleCount).map((key, index) => {
            const blogName = key.split('/').pop().replace('.jsx', '');
            const metadata = blogMetadata.find(blog => blog.id === blogName) || {
              title: blogName,
              slug: blogName.toLowerCase(),
              excerpt: 'No excerpt available.',
              image: '/images/placeholder.jpg',
              date: 'No date',
            };
            // Debug the URL and metadata
            console.log(`Blog: ${blogName}, URL: /blogs/${blogName}, Metadata:`, metadata);
            return (
              <div key={index} className="inner-news-blogs-container">
                <Suspense fallback={<BlogCardSkeleton />}>
                  <div className="blog-text">
                    <p className="text-black">BLOG</p>
                    <Link to={`/blogs/${blogName}`} style={{ textDecoration: 'none' }}>
                      <p className="sub-big-heading-text-black">{metadata.title}</p>
                    </Link>
                  </div>
                  <div className="image-hover-text-come" style={{ backgroundImage: `url(${metadata.image})` }}>
                    <div className="inner-text-come">
                      <div>
                        <Link to={`/blogs/${blogName}`} style={{ textDecoration: 'none' }}>
                          <p className="small-text-black">{metadata.excerpt}</p>
                        </Link>
                      </div>
                      <Link
                        to={`/blogs/${blogName}`}
                        className="read-more-btn-blue"
                        aria-label={`Read more about ${metadata.title}`}
                      >
                        Read More <i className="bi bi-arrow-right arrow-icon"></i>
                      </Link>
                    </div>
                  </div>
                </Suspense>
              </div>
            );
          })}
        </div>
        {showLoadMore && (
          <button className="load-more" onClick={loadMore}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

// Skeleton loader for blog cards
const BlogCardSkeleton = () => (
  
  <div className="inner-news-blogs-container">
    <div className="blog-text">
      <div className="skeleton-title"></div>
      <div className="skeleton-title"></div>
    </div>
    <div className="image-hover-text-come">
      <div className="inner-text-come">
        <div>
          <div className="skeleton-title"></div>
          <div className="skeleton-excerpt"></div>
        </div>
        <div className="skeleton-link"></div>
      </div>
    </div>
  </div>
);

export default Blogs;