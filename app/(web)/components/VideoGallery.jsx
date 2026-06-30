"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";

const VideoGallery = ({ data = [] }) => {
  const getVideoId = (url) => {
    if (typeof url !== "string") return "";

    const trimmed = url.trim();
    if (!trimmed || trimmed.toLowerCase() === "null" || trimmed.toLowerCase() === "undefined") {
      return "";
    }

    try {
      const parsed = new URL(trimmed);

      if (parsed.hostname.includes("youtu.be")) {
        return parsed.pathname.replace(/^\//, "").split("/")[0] || "";
      }

      if (parsed.hostname.includes("youtube.com")) {
        if (parsed.searchParams.get("v")) return parsed.searchParams.get("v");
        const pathParts = parsed.pathname.split("/").filter(Boolean);
        if (pathParts[0] === "shorts" && pathParts[1]) return pathParts[1];
        if (pathParts[0] === "embed" && pathParts[1]) return pathParts[1];
      }
    } catch (error) {
      return "";
    }

    return "";
  };

  const validVideos = (Array.isArray(data) ? data : []).filter((video) => getVideoId(video?.link));

  if (!validVideos.length) {
    return null;
  }

  const shouldLoop = validVideos.length > 5;

  const settings = {
    type: shouldLoop ? "loop" : "slide",
    perMove: 1,
    rewind: shouldLoop,
    autoplay: shouldLoop,
    arrows: shouldLoop,
    pagination: false,
    interval: 3000,
    gap: "1.1rem",
    perPage: Math.min(4, validVideos.length),
    breakpoints: {
      1200: { perPage: Math.min(3, validVideos.length) },
      992: { perPage: Math.min(2, validVideos.length) },
      576: { perPage: 1 },
    },
  };

  const getEmbedUrl = (url) => {
    const videoId = getVideoId(url);
    if (!videoId) return "";

    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&controls=0&loop=1&playlist=${videoId}&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0`;
  };

  const getYouTubeThumbnail = (url) => `https://img.youtube.com/vi/${getVideoId(url)}/hqdefault.jpg`;

  return (
    <section className="video-gallery-section py-5">
      <div className="container">
        <div className="video-gallery-shell">
          <div className="video-gallery-header">
            <span className="video-gallery-kicker">Media Gallery</span>
            <h2 className="video-gallery-title">Video Highlights</h2>
            <p className="video-gallery-subtitle">
              Auto-playing video cards arranged in a clean, official-style carousel for quick viewing.
            </p>
            <div className="video-gallery-meta-row">
              <span>Muted autoplay</span>
              <span>Loop preview</span>
              <span>Responsive cards</span>
            </div>
          </div>

          <Splide options={settings}>
            {validVideos.map((video, index) => {
              const embedUrl = getEmbedUrl(video.link);
              const thumbnailUrl = getYouTubeThumbnail(video.link);

              return (
                <SplideSlide key={index}>
                  <div className="video-gallery-slide">
                    <article className="video-gallery-card">
                      <div className="video-gallery-thumb-wrap">
                        <iframe
                          src={embedUrl}
                          title={video?.title || `Video ${index + 1}`}
                          className="video-gallery-iframe"
                          allow="autoplay; encrypted-media; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="strict-origin-when-cross-origin"
                        />
                        <img
                          src={thumbnailUrl}
                          alt={video?.title || `Video thumbnail ${index + 1}`}
                          width={640}
                          height={360}
                          loading="lazy"
                          className="video-gallery-thumb video-gallery-thumb--fallback"
                        />
                        <span className="video-gallery-overlay" aria-hidden="true" />
                        <span className="video-gallery-play" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                      </div>

                      <div className="video-gallery-caption">
                        <div className="video-gallery-caption-top">
                          <span className="video-gallery-label">YouTube</span>
                          <span className="video-gallery-index">0{index + 1}</span>
                        </div>
                        <h3 className="video-gallery-video-title">{video?.title || `Video ${index + 1}`}</h3>
                        <a href={video.link} target="_blank" rel="noopener noreferrer" className="video-gallery-link">
                          Open full video
                        </a>
                      </div>
                    </article>
                  </div>
                </SplideSlide>
              );
            })}
          </Splide>
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;
