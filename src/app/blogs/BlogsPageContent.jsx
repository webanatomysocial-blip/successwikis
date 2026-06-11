"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "../../css/blogs.css";
import { blogMetadata } from "../../blogs/metadata";
import { getApiBaseUrl } from "../../lib/api";

const BlogsPageContent = () => {
  const [dynamicBlogs, setDynamicBlogs] = useState([]);

  useEffect(() => {
    const fetchDynamicBlogs = async () => {
      try {
        const apiBaseURL = getApiBaseUrl();
        const res = await fetch(`${apiBaseURL}/api/posts.php?type=blog`);
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const data = await res.json();
        if (data.status === "success") {
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

  const sortedBlogs = [...blogMetadata, ...dynamicBlogs].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  return (
    <div className="blogs-page-container">
      <div className="blogs-grid">
        {sortedBlogs.map((post) => {
          const isValidDate = !isNaN(new Date(post.date).getTime());
          const displayDate = isValidDate
            ? new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Date unavailable";

          // Handle both StaticImageData objects (imported images) and string URLs
          const imageUrl = post.image
            ? (typeof post.image === "object" ? post.image : (String(post.image).trim() || "/assets/logo.png"))
            : "/assets/logo.png";

          return (
            <Link href={`/blogs/${post.slug}`} key={post.id} className="blog-card">
              <div className="blog-card-image-wrapper">
                <Image
                  src={imageUrl}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{ objectFit: "cover" }}
                  className="blog-card-image"
                  unoptimized={typeof post.image !== "object"}
                  onError={(e) => {
                    e.currentTarget.src = "/assets/logo.png";
                  }}
                />
              </div>
              <h3 className="blog-card-title">{post.title}</h3>
              <p className="blog-card-date" style={{marginTop :"10px"}}>
                {displayDate}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BlogsPageContent;
