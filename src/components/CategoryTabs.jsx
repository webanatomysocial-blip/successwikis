"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import "../css/category-tabs.css";
import "../css/skeleton.css";
import { BsInfoCircle } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { podMetadata } from "../pod/metadata.js";
import { FiGrid } from "react-icons/fi";
import { getApiBaseUrl } from "../lib/api.js";

const CategoryTabs = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [topLikedIds, setTopLikedIds] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const [dynamicPods, setDynamicPods] = useState([]);
  const searchParams = useSearchParams();

  // Dynamically generate tabs from metadata
  const categories = useMemo(
    () => ["All", ...new Set(podMetadata.map((post) => post.category))],
    [],
  );

  // Effect to handle URL query param for tab switching
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && categories.includes(tabParam)) {
      setActiveTab(tabParam);
      // Optional: scroll to tabs if needed
      const tabsElement = document.querySelector(".category-tabs-section");
      if (tabsElement) {
        tabsElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [searchParams, categories]);

  useEffect(() => {
    const fetchTopLiked = async () => {
      try {
        const response = await fetch("/api/top_liked.php");
        if (response.ok) {
          const data = await response.json();
          console.log("✅ Top liked data fetched:", data);
          setTopLikedIds(data);
        }
      } catch (error) {
        console.error("Error fetching top liked:", error);
      }
    };

    fetchTopLiked();

    // Auto-refresh every 15 seconds to keep counts in sync
    const interval = setInterval(fetchTopLiked, 15000);

    // Refresh when tab becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") fetchTopLiked();
    };
    window.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Fetch dynamic pods
  useEffect(() => {
    const fetchDynamicPods = async () => {
      try {
        const apiBaseURL = getApiBaseUrl();
        const res = await fetch(`${apiBaseURL}/api/posts.php`);
        const data = await res.json();
        if (data.status === "success") {
          const mapped = data.data
            .filter((dbPost) =>
              [
                "pod",
                "driven_by_purpose",
                "founders_unfiltered",
                "stage_behind_story",
              ].includes(dbPost.post_type),
            )
            .map((dbPost) => {
              // Map post_type to category for UI
              let category = dbPost.category || "Pod";
              let categorySlug = "pod";

              if (dbPost.post_type === "driven_by_purpose") {
                category = "Driven by Purpose";
                categorySlug = "driven-by-purpose";
              } else if (dbPost.post_type === "founders_unfiltered") {
                category = "Founder's Unfiltered";
                categorySlug = "founders-unfiltered";
              } else if (dbPost.post_type === "stage_behind_story") {
                category = "The Stage Behind the Story";
                categorySlug = "stage-behind-the-story";
              }

              return {
                id: `dynamic-${dbPost.id}`,
                title: dbPost.outer_heading || dbPost.title,
                slug: dbPost.slug,
                image: dbPost.image_url,
                category: category,
                categorySlug: categorySlug,
                date: dbPost.published_date,
                isDynamic: true,
              };
            });
          setDynamicPods(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch dynamic pods", err);
      }
    };
    fetchDynamicPods();
  }, []);

  // Combine static and dynamic pods
  const allPods = useMemo(() => {
    return [...podMetadata, ...dynamicPods];
  }, [dynamicPods]);

  // Convert topLikedIds array to a map for easy lookup
  const allPostLikes = useMemo(() => {
    const likesMap = {};
    topLikedIds.forEach((item) => {
      const safeKey = item.post_id.toLowerCase().trim();
      likesMap[safeKey] = (likesMap[safeKey] || 0) + (parseInt(item.like_count) || 0);
    });
    return likesMap;
  }, [topLikedIds]);

  // Categories are defined at the top

  const filteredPosts = useMemo(() => {
    const posts =
      activeTab === "All"
        ? allPods
        : allPods.filter((post) => post.category === activeTab);

    // Sort by date descending (Newest to Oldest)
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [activeTab, allPods]);

  const topThreePosts = useMemo(() => {
    // Match liked IDs with actual post metadata
    const postMap = new Map();

    topLikedIds.forEach((liked) => {
      const post = allPods.find(
        (p) =>
          p.slug.toLowerCase().trim() === liked.post_id.toLowerCase().trim() ||
          p.title.toLowerCase().trim() === liked.post_id.toLowerCase().trim()
      );
      if (post) {
        const existing = postMap.get(post.id);
        if (existing) {
          // Combine likes if they exist under both title and slug
          existing.likeCount += parseInt(liked.like_count) || 0;
        } else {
          postMap.set(post.id, { ...post, likeCount: parseInt(liked.like_count) || 0 });
        }
      }
    });

    const postsWithLikes = Array.from(postMap.values());

    // Sort by likeCount descending explicitly
    const sortedPosts = postsWithLikes.sort(
      (a, b) => b.likeCount - a.likeCount
    );

    // Filter by category if not 'All'
    const categoryPosts =
      activeTab === "All"
        ? sortedPosts
        : sortedPosts.filter((p) => p.category === activeTab);

    return categoryPosts.slice(0, 3);
  }, [topLikedIds, activeTab, allPods]);

  return (
    <section className="category-tabs-section">
      <div className="tabs-header">
        <div className="tabs-scroll-container">
          <div className="tabs-list">
            {categories.map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="tabs-extra-actions">
          <button
            className="surprise-me-btn only-windows"
            onClick={() => window.dispatchEvent(new Event("openSurpriseMe"))}
          >
            Surprise Me
          </button>
        </div>
      </div>

      {topThreePosts.length > 0 && (
        <div className="top-liked-section">
          <h2 className="top-liked-title">Most Liked Stories</h2>
          <div className="top-liked-grid">
            {topThreePosts.map((post) => (
              <Link
                key={post.id}
                href={`/${post.categorySlug}/${post.slug}`}
                className={`top-liked-card ${
                  !loadedImages[`top-${post.id}`] ? "loading" : ""
                }`}
              >
                <div
                  className={`top-liked-img ${
                    !loadedImages[`top-${post.id}`] ? "skeleton" : ""
                  }`}
                  style={{ position: "relative" }}
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="80px"
                    style={{
                      objectFit: "cover",
                      opacity: loadedImages[`top-${post.id}`] ? 1 : 0,
                      transition: "opacity 0.3s ease-in-out",
                    }}
                    priority
                    unoptimized={typeof post.image !== "object"}
                    onLoad={() =>
                      setLoadedImages((prev) => ({
                        ...prev,
                        [`top-${post.id}`]: true,
                      }))
                    }
                  />
                </div>
                <div className="top-liked-info">
                  <h4 className="top-liked-post-title">{post.title}</h4>
                  <div className="top-liked-badge">
                    <AiFillHeart color="#ff3b30" size={14} /> {post.likeCount}{" "}
                    Likes
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="content-layout">
        {/* Left Column: Pod Grid */}
        <div className="pods-grid">
          {filteredPosts.map((post, index) => {
            const safeSlug = post.slug.toLowerCase().trim();
            const safeTitle = post.title.toLowerCase().trim();
            const likeCount =
              (allPostLikes[safeSlug] || 0) +
              (safeSlug !== safeTitle ? (allPostLikes[safeTitle] || 0) : 0);

            // Debug logging for first post only
            if (index === 0 && Object.keys(allPostLikes).length > 0) {
              console.log("🎯 First post check:", {
                title: post.title,
                likeCount,
                hasLikes: likeCount > 0,
                allLikesKeys: Object.keys(allPostLikes),
              });
            }

            return (
              <Link
                key={post.id}
                href={`/${post.categorySlug}/${post.slug}`}
                className={`pod-card ${
                  !loadedImages[post.id] ? "loading" : ""
                }`}
              >
                <div
                  className={`pod-image-wrapper ${
                    !loadedImages[post.id] ? "skeleton" : ""
                  }`}
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    style={{
                      objectFit: "cover",
                      opacity: loadedImages[post.id] ? 1 : 0,
                      transition: "opacity 0.3s ease",
                    }}
                    loading={index < 2 ? "eager" : "lazy"}
                    priority={index < 2}
                    unoptimized={typeof post.image !== "object"}
                    onLoad={() =>
                      setLoadedImages((prev) => ({ ...prev, [post.id]: true }))
                    }
                  />
                  {likeCount && likeCount > 0 && (
                    <div className="pod-like-badge">
                      <AiFillHeart size={16} />
                      <span>{likeCount}</span>
                    </div>
                  )}
                </div>
                <h3 className="pod-title">
                  {post.title.length > 50
                    ? post.title.slice(0, 50) + "..."
                    : post.title}
                </h3>
              </Link>
            );
          })}
        </div>

        {/* Right Column: Sticky Sponsored */}
      </div>
    </section>
  );
};

export default CategoryTabs;
