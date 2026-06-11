"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "../../css/success-lens.css";
import { getApiBaseUrl } from "../../lib/api.js";
import { successLensMetadata } from "../../success-lens/metadata.js";

const SuccessWirePageContent = () => {
  const [dynamicWires, setDynamicWires] = useState([]);

  useEffect(() => {
    const fetchDynamicWires = async () => {
      try {
        const apiBaseURL = getApiBaseUrl();
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
            href={`/success-wire/${lens.slug}`}
            key={lens.id}
            className="lens-card"
          >
            <div className="lens-card-image-wrapper">
              <Image
                src={lens.image}
                alt={lens.title}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                style={{ objectFit: "cover" }}
                className="lens-card-image"
                unoptimized
              />
            </div>
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

export default SuccessWirePageContent;
