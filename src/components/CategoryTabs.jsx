import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/category-tabs.css";
import "../css/skeleton.css";
import { BsInfoCircle } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { podMetadata } from "../pod/metadata.js";
import { FiGrid } from "react-icons/fi";

const CategoryTabs = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [topLikedIds, setTopLikedIds] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const location = useLocation();

  // Dynamically generate tabs from metadata
  const categories = useMemo(
    () => ["All", ...new Set(podMetadata.map((post) => post.category))],
    []
  );

  // Effect to handle URL query param for tab switching
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get("tab");
    if (tabParam && categories.includes(tabParam)) {
      setActiveTab(tabParam);
      // Optional: scroll to tabs if needed
      const tabsElement = document.querySelector(".category-tabs-section");
      if (tabsElement) {
        tabsElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.search, categories]);

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

  // Convert topLikedIds array to a map for easy lookup
  const allPostLikes = useMemo(() => {
    const likesMap = {};
    topLikedIds.forEach((item) => {
      likesMap[item.post_id] = parseInt(item.like_count) || 0;
    });
    console.log("📊 Likes map created:", likesMap);
    return likesMap;
  }, [topLikedIds]);

  // Categories are defined at the top

  const filteredPosts = useMemo(() => {
    const posts =
      activeTab === "All"
        ? podMetadata
        : podMetadata.filter((post) => post.category === activeTab);

    // Sort by date descending (Newest to Oldest)
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [activeTab]);

  const topThreePosts = useMemo(() => {
    // Match liked IDs with actual post metadata
    const postsWithLikes = topLikedIds
      .map((liked) => {
        const post = podMetadata.find(
          (p) =>
            p.title.toLowerCase().trim() === liked.post_id.toLowerCase().trim()
        );
        return post ? { ...post, likeCount: parseInt(liked.like_count) } : null;
      })
      .filter((p) => p !== null);

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
  }, [topLikedIds, activeTab]);

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
                to={`/${post.categorySlug}/${post.slug}`}
                className={`top-liked-card ${
                  !loadedImages[`top-${post.id}`] ? "loading" : ""
                }`}
              >
                <div
                  className={`top-liked-img ${
                    !loadedImages[`top-${post.id}`] ? "skeleton" : ""
                  }`}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    fetchPriority="high"
                    width="300"
                    height="300"
                    onLoad={() =>
                      setLoadedImages((prev) => ({
                        ...prev,
                        [`top-${post.id}`]: true,
                      }))
                    }
                    style={{
                      opacity: loadedImages[`top-${post.id}`] ? 1 : 0,
                      transition: "opacity 0.3s ease-in-out",
                    }}
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
            const likeCount = allPostLikes[post.title];

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
                to={`/${post.categorySlug}/${post.slug}`}
                className={`pod-card ${
                  !loadedImages[post.id] ? "loading" : ""
                }`}
              >
                <div
                  className={`pod-image-wrapper ${
                    !loadedImages[post.id] ? "skeleton" : ""
                  }`}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    loading={index < 2 ? "eager" : "lazy"}
                    fetchpriority={index < 2 ? "high" : "auto"}
                    decoding={index < 2 ? "sync" : "async"}
                    onLoad={() =>
                      setLoadedImages((prev) => ({ ...prev, [post.id]: true }))
                    }
                    style={{
                      opacity: loadedImages[post.id] ? 1 : 0,
                      transition: "opacity 0.3s ease",
                    }}
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
