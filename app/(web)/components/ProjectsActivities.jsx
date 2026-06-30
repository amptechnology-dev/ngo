"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const ProjectsActivities = ({ data = [], bgImgae = "" }) => {
  const projects = Array.isArray(data) ? data.filter((item) => item?.image) : [];

  const normalizeBackgroundSrc = (src) => {
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

  const backgroundSrc = normalizeBackgroundSrc(bgImgae);

  if (!projects.length) {
    return null;
  }

  const settings = {
    type: projects.length > 4 ? "loop" : "slide",
    rewind: projects.length > 4,
    autoplay: projects.length > 4,
    interval: 3200,
    speed: 900,
    pauseOnHover: true,
    pauseOnFocus: true,
    resetProgress: false,
    perPage: 4,
    perMove: 1,
    gap: "1.15rem",
    pagination: false,
    breakpoints: {
      1200: {
        perPage: 3,
      },
      768: {
        perPage: 2,
      },
      480: {
        perPage: 1,
      },
    },
  };

  return (
    <section
      className="projects-activities"
      style={{
        backgroundImage: backgroundSrc
          ? `linear-gradient(180deg, rgba(7, 22, 32, 0.14) 0%, rgba(7, 22, 32, 0.66) 100%), url(${backgroundSrc})`
          : "linear-gradient(180deg, rgba(7, 22, 32, 0.14) 0%, rgba(7, 22, 32, 0.66) 100%)",
      }}
      aria-label="Projects and activities"
    >
      <div className="projects-activities__inner">
        <div className="projects-activities__header">
          <div className="projects-activities__copy">
            <span className="projects-activities__kicker">Civic progress</span>
            <h2 className="projects-activities__title">Projects & Activities</h2>
            <p className="projects-activities__subtitle">
              A refined showcase of ongoing work, arranged in an editorial-style carousel with square cards and a clean visual hierarchy.
            </p>
          </div>

          <div className="projects-activities__stats">
            <div>
              <strong>{projects.length}</strong>
              <span>Active items</span>
            </div>
            <div>
              <strong>Auto</strong>
              <span>Sliding carousel</span>
            </div>
            <div>
              <strong>HD</strong>
              <span>Visual updates</span>
            </div>
          </div>
        </div>

        <Splide options={settings} className="projects-activities__carousel">
          {projects.map((project, index) => (
            <SplideSlide key={index}>
              <article className="project-card">
                <div className="project-card__media">
                  <img src={project.image} alt={project.title} className="project-image" />
                  <div className="project-card__overlay" aria-hidden="true" />
                  <span className="project-card__badge">Project {String(index + 1).padStart(2, "0")}</span>
                </div>

                <div className="project-card__body">
                  <h3>{project.title}</h3>
                  <p>View project progress and activity highlights.</p>
                </div>
              </article>
            </SplideSlide>
          ))}
        </Splide>
      </div>

      <style jsx>{`
        .projects-activities {
          position: relative;
          overflow: hidden;
          margin: 72px 0;
          padding: 44px 0;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          border-radius: 28px;
        }

        .projects-activities::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(7, 22, 32, 0.08) 0%, rgba(7, 22, 32, 0.62) 100%);
          pointer-events: none;
        }

        .projects-activities__inner {
          position: relative;
          z-index: 1;
          width: min(1240px, calc(100% - 32px));
          margin: 0 auto;
        }

        .projects-activities__header {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 18px;
          margin-bottom: 22px;
          flex-wrap: wrap;
        }

        .projects-activities__copy {
          max-width: 760px;
        }

        .projects-activities__kicker {
          display: inline-flex;
          align-items: center;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.14);
          color: #fff;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .projects-activities__title {
          margin: 12px 0 10px;
          color: #fff;
          font-size: clamp(1.9rem, 3vw, 2.8rem);
          font-weight: 900;
          letter-spacing: -0.03em;
        }

        .projects-activities__subtitle {
          margin: 0;
          max-width: 66ch;
          color: rgba(255, 255, 255, 0.84);
          line-height: 1.75;
          font-size: 1rem;
        }

        .projects-activities__stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
        }

        .projects-activities__stats > div {
          padding: 14px 16px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #fff;
          backdrop-filter: blur(10px);
        }

        .projects-activities__stats strong {
          display: block;
          font-size: 1.2rem;
          font-weight: 900;
          line-height: 1;
        }

        .projects-activities__stats span {
          display: block;
          margin-top: 6px;
          font-size: 0.82rem;
          color: rgba(255, 255, 255, 0.84);
        }

        .projects-activities__carousel {
          position: relative;
          z-index: 2;
        }

        .project-card {
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.96);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 18px 40px rgba(7, 22, 32, 0.18);
          backdrop-filter: blur(10px);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 28px 54px rgba(7, 22, 32, 0.24);
        }

        .project-card__media {
          position: relative;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background: #0f2230;
        }

        .project-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.45s ease;
        }

        .project-card:hover .project-image {
          transform: scale(1.06);
        }

        .project-card__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(7, 22, 32, 0.08) 0%, rgba(7, 22, 32, 0.46) 100%);
        }

        .project-card__badge {
          position: absolute;
          left: 14px;
          top: 14px;
          z-index: 1;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.9);
          color: #093529;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .project-card__body {
          padding: 16px 16px 18px;
          background: linear-gradient(180deg, #ffffff 0%, #f7fbf9 100%);
        }

        .project-card__body h3 {
          margin: 0;
          color: #093529;
          font-size: 1rem;
          font-weight: 850;
          line-height: 1.4;
        }

        .project-card__body p {
          margin: 6px 0 0;
          color: #587166;
          font-size: 0.84rem;
          line-height: 1.5;
        }

        :global(.projects-activities .splide__arrow) {
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.16);
          box-shadow: 0 12px 24px rgba(7, 22, 32, 0.16);
          opacity: 1;
          width: 42px;
          height: 42px;
        }

        :global(.projects-activities .splide__arrow svg) {
          fill: #0b6b58;
        }

        @media (max-width: 992px) {
          .projects-activities__stats {
            grid-template-columns: 1fr;
          }

          .projects-activities {
            border-radius: 24px;
          }
        }

        @media (max-width: 640px) {
          .projects-activities {
            margin: 56px 0;
            padding: 34px 0;
          }

          .projects-activities__inner {
            width: min(100%, calc(100% - 20px));
          }

          .projects-activities__title {
            font-size: clamp(1.7rem, 6vw, 2.3rem);
          }

          .project-card {
            border-radius: 18px;
          }

          .project-card__body {
            padding: 14px;
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectsActivities;
