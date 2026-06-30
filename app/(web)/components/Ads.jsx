"use client";

import React from "react";
import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const StaticImageSlider = ({ data = [] }) => {
  const normalizeImageSrc = (src) => {
    if (typeof src !== "string") return "";
    const cleaned = src.trim();
    if (!cleaned || cleaned.toLowerCase() === "null" || cleaned.toLowerCase() === "undefined") {
      return "";
    }
    if (/^https?:\/\//i.test(cleaned) || cleaned.startsWith("/")) {
      return cleaned;
    }
    return `/${cleaned.replace(/^\/+/, "")}`;
  };

  const validImages = (data || []).filter((item) => normalizeImageSrc(item?.image));

  if (!validImages.length) {
    return null;
  }

  return (
    <section className="ads-slider-container">
      <div className="ads-background" aria-hidden="true" />
      <div className="ads-header">
        <div className="ads-header-copy">
          <span className="ads-kicker">Announcements</span>
          <h2 className="ads-title">Featured Ads & Notices</h2>
          <p className="ads-subtitle">
            Important notices and promotional banners arranged in a polished, government-website style presentation with smooth autoplay.
          </p>
          <div className="ads-note-row">
            <span className="ads-note-pill">Auto slide</span>
            <span className="ads-note-pill">Hover pause</span>
            <span className="ads-note-pill">Responsive animation</span>
          </div>
        </div>
        <div className="ads-header-meta">
          <div className="ads-meta-card">
            <strong>{validImages.length}</strong>
            <span>Active banners</span>
          </div>
          <div className="ads-meta-card">
            <strong>01</strong>
            <span>Carousel section</span>
          </div>
          <div className="ads-meta-card">
            <strong>HD</strong>
            <span>Responsive view</span>
          </div>
        </div>
      </div>
      <Splide
        options={{
          type: "loop",
          perMove: 1,
          rewind: true,
          pagination: false,
          arrows: true,
          autoplay: true,
          interval: 3200,
          speed: 900,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pauseOnHover: true,
          pauseOnFocus: true,
          resetProgress: false,
          perPage: 3,
          gap: "1.15rem",
          focus: "center",
          trimSpace: false,
          breakpoints: {
            1200: { perPage: 2, gap: "1rem" },
            992: { perPage: 1, gap: "1rem", focus: 0 },
          },
        }}
      >
        {validImages.map((image, index) => (
          <SplideSlide key={index}>
            <div className="slider-card">
              <span className="slider-card-badge">Banner {String(index + 1).padStart(2, "0")}</span>
              <div className="slider-card-image">
                <div className="image-wrapper">
                  <Image
                    className="slider-image"
                    src={normalizeImageSrc(image?.image)}
                    alt={image?.text || `Advertisement ${index + 1}`}
                    fill
                    sizes="(max-width: 992px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="slider-card-overlay">
                    <span className="slider-card-label">Official announcement</span>
                    <div className="slider-card-copy">
                      <strong>{image?.text || `Banner ${index + 1}`}</strong>
                      <span>Tap to view key updates and promotions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </section>
  );
};

export default StaticImageSlider;
