import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import Footer from "./Footer";
import SurpriseMeModal from "./SurpriseMeModal";
import SearchResults from "./SearchResults";
import { podMetadata } from "../pod/metadata";
import { blogMetadata } from "../blogs/metadata";
import { successLensMetadata } from "../success-lens/metadata";
import { eventMetadata } from "../events/metadata";
import "../css/layout.css";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [dynamicPosts, setDynamicPosts] = React.useState([]);

  // Fetch dynamic posts from the database for global search
  React.useEffect(() => {
    const fetchDynamicPosts = async () => {
      try {
        const apiBaseURL =
          import.meta.env.VITE_API_URL ?? '';
        const res = await fetch(`${apiBaseURL}/api/posts.php`);
        const data = await res.json();
        if (data.status === "success") {
          const mapped = data.data.map((dbPost) => {
            let category = "Pod";
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
            } else if (dbPost.post_type === "blog") {
              category = "Blogs";
              categorySlug = "blogs";
            } else if (dbPost.post_type === "success_lens") {
              category = "Success Wire";
              categorySlug = "success-wire";
            } else if (dbPost.post_type === "event") {
              category = "Events";
              categorySlug = "events";
            }

            return {
              id: `dynamic-${dbPost.id}`,
              title: dbPost.outer_heading || dbPost.title,
              slug: dbPost.slug,
              image: dbPost.image_url,
              category: category,
              categorySlug: categorySlug,
              isDynamic: true,
            };
          });
          setDynamicPosts(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch dynamic posts in Layout search", err);
      }
    };
    fetchDynamicPosts();
  }, []);

  // Aggregate all metadata for search
  const allPosts = React.useMemo(() => {
    return [
      ...podMetadata,
      ...blogMetadata,
      ...successLensMetadata,
      ...eventMetadata,
      ...dynamicPosts,
    ];
  }, [dynamicPosts]);

  // Filter posts based on search query
  const filteredResults = searchQuery.trim()
    ? allPosts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Helper function to check if current path is a valid route
  const isValidRoute = () => {
    const path = location.pathname.toLowerCase();
    const cleanPath = path.split("/").filter(Boolean); // Remove empty strings

    // Check static routes
    const staticRoutes = ["/", "/about", "/contact", "/careers", "/works", "/ads", "/blogs", "/success-wire", "/events", "/terms-of-use", "/cookies-policy", "/privacy-policy", "/accessibility-statement", "/get-featured"];
    if (staticRoutes.includes(path)) return true;

    // Check blog routes: /blogs/:slug
    if (cleanPath[0] === "blogs" && cleanPath[1]) {
      return blogMetadata.some(b => b.slug === cleanPath[1]);
    }

    // Check success-wire routes: /success-wire/:slug
    if (cleanPath[0] === "success-wire" && cleanPath[1]) {
      return successLensMetadata.some(l => l.slug === cleanPath[1]);
    }

    // Check events routes: /events/:slug
    if (cleanPath[0] === "events" && cleanPath[1]) {
      return eventMetadata.some(e => e.slug === cleanPath[1]);
    }

    // Check pod routes: /:categorySlug/:slug (e.g., /stage-behind-the-story/nexgen-software)
    if (cleanPath[0] && cleanPath[1]) {
      return podMetadata.some(p => p.categorySlug === cleanPath[0] && p.slug === cleanPath[1]);
    }

    return false;
  };

  const isAdminRoute = location.pathname.startsWith("/admin");

  React.useEffect(() => {
    if (isAdminRoute) {
      document.body.classList.add("admin-body");
    } else {
      document.body.classList.remove("admin-body");
    }
    return () => {
      document.body.classList.remove("admin-body");
    };
  }, [isAdminRoute]);

  // Conditionally hide the global sidebar for pod and success lens pages
  const isExcludedPage =
    location.pathname.startsWith("/driven-by-purpose/") ||
    location.pathname.startsWith("/founders-unfiltered/") ||
    location.pathname.startsWith("/stage-behind-the-story/") ||
    location.pathname.startsWith("/success-wire/") ||
    location.pathname.startsWith("/events/") ||
    location.pathname === "/about" ||
    location.pathname === "/get-featured" ||
    location.pathname.startsWith("/blogs/") ||
    isAdminRoute ||
    !isValidRoute() ||
    searchQuery.trim() !== "";

  return (
    <div className="app-layout">

      {!isAdminRoute && <Header onSearch={setSearchQuery} />}
      <div className="layout-body">
        {!isExcludedPage && !isAdminRoute && (
          <div className="only-windows">
            <Sidebar />
          </div>
        )}
        <main className={`page-content ${isExcludedPage ? "full-width" : ""}`}>
          {searchQuery.trim() ? (
            <SearchResults
              results={filteredResults}
              query={searchQuery}
              onResultClick={() => setSearchQuery("")}
            />
          ) : (
            children
          )}
        </main>
      </div>
      {location.pathname === "/about" && <Footer />}
      {!isExcludedPage && (
        <div className="only-mobile">
          <Footer />
        </div>
      )}
      {!isAdminRoute && (
        <>
          <MobileNav onSearch={setSearchQuery} searchQuery={searchQuery} />
          <SurpriseMeModal />
        </>
      )}
    </div>
  );
};

export default Layout;
