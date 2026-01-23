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

  // Aggregate all metadata for search
  const allPosts = [
    ...podMetadata,
    ...blogMetadata,
    ...successLensMetadata,
    ...eventMetadata,
  ];

  // Filter posts based on search query
  const filteredResults = searchQuery.trim()
    ? allPosts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Conditionally hide the global sidebar for pod and success lens pages
  const isExcludedPage =
    location.pathname.startsWith("/driven-by-purpose/") ||
    location.pathname.startsWith("/founders-unfiltered/") ||
    location.pathname.startsWith("/stage-behind-the-story/") ||
    location.pathname.startsWith("/success-wire/") ||
    location.pathname.startsWith("/events/") ||
    location.pathname === "/about" ||
    location.pathname.startsWith("/blogs/") ||
    searchQuery.trim() !== "";

  return (
    <div className="app-layout">
      <Header onSearch={setSearchQuery} />
      <div className="layout-body">
        {!isExcludedPage && (
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
      <MobileNav onSearch={setSearchQuery} searchQuery={searchQuery} />
      <SurpriseMeModal />
    </div>
  );
};

export default Layout;
