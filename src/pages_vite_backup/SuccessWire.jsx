import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/success-lens.css";
import { successLensMetadata } from "../success-lens/metadata.js";

const SuccessWire = () => {
  const [dynamicWires, setDynamicWires] = useState([]);

  useEffect(() => {
    const fetchDynamicWires = async () => {
      try {
        const apiBaseURL =
          import.meta.env.VITE_API_URL ?? '';
        const res = await fetch(
          `${apiBaseURL}/api/posts.php?type=success_lens`,
        );
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
          setDynamicWires(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch dynamic success wires", err);
      }
    };
    fetchDynamicWires();
  }, []);

  const sortedMetadata = [...successLensMetadata, ...dynamicWires].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  return (
    <div className="success-lens-container">
      <div className="success-lens-grid">
        {sortedMetadata.map((lens) => (
          <Link
            to={`/success-wire/${lens.slug}`}
            key={lens.id}
            className="lens-card"
          >
            <img
              src={lens.image}
              alt={lens.title}
              className="lens-card-image"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/600x600?text=Success+Wire";
              }}
            />
            <div className="lens-card-content">
              <h3 className="lens-card-title">{lens.title.slice(0, 50)}...</h3>
              <p
                className="blog-card-date"
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                {new Date(lens.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <span className="read-more-btn">Read more</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuccessWire;
