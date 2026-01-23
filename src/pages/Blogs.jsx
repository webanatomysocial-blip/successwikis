import React from "react";
import { Link } from "react-router-dom";
import "../css/blogs.css";
import { blogMetadata } from "../blogs/metadata";

const Blogs = () => {
  // Sort logic: newest to oldest
  const sortedBlogs = [...blogMetadata].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="blogs-page-container">
      <div className="blogs-grid">
        {sortedBlogs.map((post) => (
          <Link to={`/blogs/${post.slug}`} key={post.id} className="blog-card">
            <img
              src={post.image}
              alt={post.title}
              className="blog-card-image"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/600x600?text=SuccessWikis+Blog";
              }}
            />
            <h3 className="blog-card-title">{post.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
