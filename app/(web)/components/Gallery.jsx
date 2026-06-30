"use client";
import { useState, useEffect } from "react";
import styles from "../styles/gallery.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Gallery = ({ data = [], loadButton = false }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setActiveIndex((current) => (data.length ? (current + 1) % data.length : current));
      if (e.key === "ArrowLeft") setActiveIndex((current) => (data.length ? (current - 1 + data.length) % data.length : current));
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, data.length]);

  const openLightbox = (index) => {
    setActiveIndex(index);
    setOpen(true);
  };
  const closeLightbox = () => setOpen(false);
  const activeItem = activeIndex >= 0 ? data[activeIndex] : null;

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.16 });

  return (
    <section className={`${styles.gallery} py-5`} id="gallery">
      <div className="container-lg">
        <div className={styles.backgroundGlow} aria-hidden="true" />

        <div className={styles.sectionTitleWrap}>
          <span className={styles.sectionKicker}>Visual Highlights</span>
          <h2 className={styles.sectionTitle}>Gallery</h2>
          <p className={styles.sectionSubtitle}>
            A refined collection of photos arranged with stronger hierarchy, cleaner spacing, and a more premium browsing experience.
          </p>
          <div className={styles.sectionMeta}>
            <span>Curated moments</span>
            <span>Editorial layout</span>
            <span>Tap to enlarge</span>
          </div>
        </div>

        <motion.div
          className={styles.headerBand}
          ref={ref}
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.headerCopy}>
            <p className={styles.headerLabel}>Gallery overview</p>
            <h3 className={styles.headerTitle}>A more polished presentation for your visual stories.</h3>
            <p className={styles.headerText}>
              Images now get breathing room, stronger contrast, and a layout that feels tailored instead of template-driven.
            </p>
          </div>

          <div className={styles.headerStats}>
            <div className={styles.statCard}>
              <strong>{data.length || 0}</strong>
              <span>Photos available</span>
            </div>
            <div className={styles.statCard}>
              <strong>01</strong>
              <span>Featured mosaic</span>
            </div>
            <div className={styles.statCard}>
              <strong>HD</strong>
              <span>Lightbox preview</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={styles.galleryShell}
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.gridProfessional}>
            {data?.map((item, idx) => {
              const isFeatured = idx === 0;

              return (
                <motion.figure
                  key={idx}
                  className={`${styles.cardProfessional} ${isFeatured ? styles.featuredCard : ""}`}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.18 }}
                >
                  <button
                    aria-label={`Open image ${item.text || idx + 1}`}
                    className={styles.mediaBtn}
                    onClick={() => openLightbox(idx)}
                  >
                    <div className={styles.thumbWrap}>
                      <Image
                        src={item.image}
                        alt={item.text || `Image ${idx + 1}`}
                        fill
                        sizes="(max-width:600px) 100vw, (max-width:1200px) 50vw, 33vw"
                        className={styles.thumb}
                      />
                      <div className={styles.imageOverlay}>
                        <span className={styles.viewLabel}>Open</span>
                        <span className={styles.imageTitle}>{item.text || `Gallery image ${idx + 1}`}</span>
                      </div>
                    </div>
                    <figcaption className={styles.figCaption}>
                      <div className={styles.figTitle}>{item.text || `Gallery image ${idx + 1}`}</div>
                      <div className={styles.figAction}>View details</div>
                    </figcaption>
                  </button>
                </motion.figure>
              );
            })}
          </div>

          {loadButton && (
            <div className={styles.loadMoreWrap}>
              <a href="/gallery" className={styles.loadMoreBtn}>Browse full gallery</a>
            </div>
          )}
        </motion.div>

      </div>

      {open && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" onClick={closeLightbox}>
          <div className={styles.lightboxInner} onClick={(e) => e.stopPropagation()}>
            <button className={styles.lightboxClose} onClick={closeLightbox} aria-label="Close">✕</button>
            <div className={styles.lightboxMedia}>
              {activeItem && (
                <Image
                  src={activeItem.image}
                  alt={activeItem.text || "Large view"}
                  width={1600}
                  height={1000}
                  className={styles.lightboxImage}
                />
              )}
            </div>
            <div className={styles.lightboxFooter}>
              <div>
                <p className={styles.lightboxKicker}>Gallery preview</p>
                <h3 className={styles.lightboxTitle}>{activeItem?.text || "Image preview"}</h3>
              </div>
              <div className={styles.lightboxCounter}>
                {data.length ? `${activeIndex + 1} / ${data.length}` : "0 / 0"}
              </div>
            </div>
            <div className={styles.lightboxNav}>
              <button
                className={styles.navBtn}
                onClick={() => setActiveIndex((current) => (data.length ? (current - 1 + data.length) % data.length : current))}
                aria-label="Previous image"
              >
                Prev
              </button>
              <button
                className={styles.navBtn}
                onClick={() => setActiveIndex((current) => (data.length ? (current + 1) % data.length : current))}
                aria-label="Next image"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
