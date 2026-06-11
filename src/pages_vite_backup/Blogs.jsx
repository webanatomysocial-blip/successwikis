import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/blogs.css";
import { blogMetadata } from "../blogs/metadata";

const Blogs = () => {
  const [dynamicBlogs, setDynamicBlogs] = useState([]);

  useEffect(() => {
    const fetchDynamicBlogs = async () => {
      try {
        const apiBaseURL =
          import.meta.env.VITE_API_URL ?? '';
        const res = await fetch(`${apiBaseURL}/api/posts.php?type=blog`);
        const data = await res.json();
        if (data.status === "success") {
          // map db shape to match static metadata shape conceptually
          const mapped = data.data.map((dbPost) => ({
            id: `dynamic-${dbPost.id}`,
            title: dbPost.title,
            slug: dbPost.slug,
            image: dbPost.image_url,
            date: dbPost.published_date,
            isDynamic: true,
          }));
          setDynamicBlogs(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch dynamic blogs", err);
      }
    };
    fetchDynamicBlogs();
  }, []);

  // Merge and sort newest to oldest
  const sortedBlogs = [...blogMetadata, ...dynamicBlogs].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  return (
    <div className="blogs-page-container">
      <div className="blogs-grid">
        {sortedBlogs.map((post) => (
          <Link to={`/blogs/${post.slug}`} key={post.id} className="blog-card">
            <img
              src={
                post.image ||
                "https://via.placeholder.com/600x600?text=SuccessWikis+Blog"
              }
              alt={post.title}
              className="blog-card-image"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/600x600?text=SuccessWikis+Blog";
              }}
            />
            <h3 className="blog-card-title">{post.title}</h3>
            <p className="blog-card-date" style={{marginTop :"10px"}}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
