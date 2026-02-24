import React from "react";
import { Link } from "react-router-dom";
import "../css/success-lens.css";
import { successLensMetadata } from "../success-lens/metadata.js";

const SuccessWire = () => {
  const sortedMetadata = [...successLensMetadata].sort(
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
              <span className="read-more-btn">Read more</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuccessWire;
