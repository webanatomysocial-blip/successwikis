import React from "react";
import { Link } from "react-router-dom";
import "../css/search-results.css";

const SearchResults = ({ results, query, onResultClick }) => {
  if (results.length === 0) {
    return (
      <div className="search-no-results">
        <h2 className="head-text">No results found for "{query}"</h2>
        <p className="para-text">Try searching for something else.</p>
      </div>
    );
  }

  return (
    <div className="search-results-container">
      <h2 className="head-text search-heading">Search Results for "{query}"</h2>
      <div className="search-results-grid">
        {results.map((item, index) => {
          // Determine the correct link path based on metadata type
          let linkPath = "";
          if (item.categorySlug) {
            // Pod
            linkPath = `/${item.categorySlug}/${item.slug}`;
          } else if (item.lensId) {
            // Success Wire
            linkPath = `/success-wire/${item.slug}`;
          } else if (item.id.includes("Episode")) {
            // Event
            linkPath = `/events/${item.slug}`;
          } else {
            // Blog
            linkPath = `/blogs/${item.slug}`;
          }

          return (
            <Link
              to={linkPath}
              key={`${item.id}-${index}`}
              className="search-result-card"
              onClick={onResultClick}
            >
              <div className="search-card-image">
                <img src={item.image || item.poster} alt={item.title} />
              </div>
              <h3 className="search-card-title">{item.title}</h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResults;
