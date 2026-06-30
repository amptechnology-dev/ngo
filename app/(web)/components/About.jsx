"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactPlayer from "react-player";
import styles from "../styles/AboutSection.module.css";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function AboutSection({ aboutData = {}, showFullDescription = false, officeName }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setShowVideo(false);
    }
    if (showVideo) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showVideo]);

  const description = aboutData?.description || "";
  const truncated = description.slice(0, 500);

  return (
    <section ref={ref} id="about" className={styles.aboutSection}>
      <div className={styles.hero} style={{ backgroundImage: aboutData?.image ? `url(${aboutData.image})` : "none" }}>
        <div className={styles.heroOverlay} />
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>{aboutData?.title || `About ${officeName || "Our Office"}`}</h1>
            <p className={styles.heroSubtitle}>{aboutData?.subtitle || "Serving our citizens with transparency and care."}</p>
          </div>
        </div>
      </div>

      <div className={styles.sectionInner}>
        <div className="container">
          <motion.div
            className={styles.intro}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.introGrid}>
              <div className={styles.introText}>
                <h2 className={styles.title}>{aboutData?.heading || "Who we are"}</h2>
                <p className={styles.description}>
                  {showFullDescription ? description : `${truncated}${description.length > 500 ? "..." : ""}`}
                </p>
                <div className={styles.introActions}>
                  <Link href="/About" className={styles.primary}>Read Full Story</Link>
                  <Link href="/contact" className={styles.secondary}>Get In Touch</Link>
                </div>
              </div>

              <div className={styles.introMedia}>
                {aboutData?.video ? (
                  <div className={styles.videoCardSmall}>
                    <button className={styles.playBtn} onClick={() => setShowVideo(true)} aria-label="Play official video">▶️ Official Video</button>
                  </div>
                ) : (
                  <div className={styles.imageWrapSmall}>
                    {aboutData?.image ? (
                      <Image src={aboutData.image} alt={officeName || "About image"} width={640} height={420} className={styles.imageSmall} />
                    ) : (
                      <div className={styles.placeholderSmall}>No image</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <div className={styles.featuresRow}>
            {[{
              title: 'Mission',
              text: aboutData?.mission || 'To provide clear, accessible information to all citizens.'
            }, {
              title: 'Vision',
              text: aboutData?.vision || 'A connected, informed, and empowered community.'
            }, {
              title: 'Values',
              text: aboutData?.values || 'Integrity, Service, Accountability.'
            }].map((f, i) => (
              <motion.div key={i} className={styles.featureCard} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 200 }}>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </motion.div>
            ))}
          </div>

          <div className={styles.timeline}>
            <h3 className={styles.sectionHeading}>Milestones</h3>
            <div className={styles.timelineGrid}>
              {(aboutData?.milestones || [
                { year: "2020", text: "Foundation and first community program." },
                { year: "2021", text: "Launch of citizen portal." },
                { year: "2023", text: "Expanded services and outreach." },
              ]).map((m, idx) => (
                <motion.div key={idx} className={styles.timelineItem} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <div className={styles.timelineYear}>{m.year}</div>
                  <div className={styles.timelineText}>{m.text}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className={styles.ctaBand}>
            <div className="container">
              <div className={styles.ctaInner}>
                <div>
                  <h3>Need more information?</h3>
                  <p>Our office is here to help — reach out for any queries or assistance.</p>
                </div>
                <div>
                  <Link href="/contact" className={styles.primary}>Contact Us</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showVideo && (
        <div className={styles.videoModal} role="dialog" aria-modal="true">
          <div className={styles.videoInner}>
            <button className={styles.closeBtn} onClick={() => setShowVideo(false)} aria-label="Close video">✕</button>
            <ReactPlayer url={aboutData.video} controls width="100%" height="100%" />
          </div>
        </div>
      )}
    </section>
  );
}
