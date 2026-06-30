"use client";
import Link from "next/link";

const UsefulLinks = ({ data = [] }) => {
  const links = Array.isArray(data)
    ? data
        .map((item) => ({
          ...item,
          link: typeof item?.link === "string" ? item.link.trim() : "",
          name: typeof item?.name === "string" ? item.name.trim() : "",
          description: typeof item?.description === "string" ? item.description.trim() : "",
        }))
        .filter((item) => item.name || item.link)
    : [];

  const normalizeLink = (href) => {
    if (!href) return "#";
    if (/^https?:\/\//i.test(href) || href.startsWith("/") || href.startsWith("#")) {
      return href;
    }
    return `/${href.replace(/^\/+/, "")}`;
  };

  if (!links.length) {
    return null;
  }

  return (
    <section className="useful-links-section py-5">
      <div className="container">
        <div className="useful-links-shell">
          <div className="useful-links-header">
            <span className="useful-links-kicker">Quick Access</span>
            <h3 className="useful-links-title">Useful Links</h3>
            <p className="useful-links-subtitle">
              Fast access to important destinations, presented in a refined, official layout for better clarity and trust.
            </p>
          </div>

          <div className="useful-links-grid">
            {links.map((item, index) => (
              <Link key={index} href={normalizeLink(item.link)} className="useful-links-card text-decoration-none">
                <div className="useful-links-card__top">
                  <span className="useful-links-card__index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="useful-links-card__arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h12" />
                      <path d="m13 6 6 6-6 6" />
                    </svg>
                  </span>
                </div>

                <div className="useful-links-card__body">
                  <span className="useful-links-card__name">{item.name || item.link}</span>
                  <span className="useful-links-card__meta">Open destination</span>
                  {item.description ? <p className="useful-links-card__description">{item.description}</p> : null}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .useful-links-section {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at top left, rgba(13, 110, 93, 0.12), transparent 30%),
            radial-gradient(circle at bottom right, rgba(12, 60, 86, 0.12), transparent 28%),
            linear-gradient(180deg, #f4f8f7 0%, #eef4f2 100%);
        }

        .useful-links-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255, 255, 255, 0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.22) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.45), transparent 90%);
          pointer-events: none;
        }

        .useful-links-shell {
          position: relative;
          z-index: 1;
          max-width: 1240px;
          margin: 0 auto;
          padding: 30px 24px 28px;
          border-radius: 30px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(250, 253, 252, 0.98) 100%);
          border: 1px solid rgba(14, 63, 89, 0.08);
          box-shadow: 0 30px 70px rgba(9, 25, 32, 0.08);
          backdrop-filter: blur(10px);
        }

        .useful-links-header {
          text-align: center;
          margin-bottom: 26px;
        }

        .useful-links-kicker {
          display: inline-flex;
          align-items: center;
          padding: 7px 12px;
          border-radius: 999px;
          background: rgba(13, 110, 93, 0.1);
          color: #0d6e5d;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .useful-links-title {
          margin: 12px 0 10px;
          color: #102738;
          font-size: clamp(1.85rem, 2.4vw, 2.6rem);
          font-weight: 900;
          letter-spacing: -0.03em;
        }

        .useful-links-subtitle {
          max-width: 720px;
          margin: 0 auto;
          color: #53656d;
          font-size: 1rem;
          line-height: 1.7;
        }

        .useful-links-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 16px;
        }

        .useful-links-card {
          display: flex;
          flex-direction: column;
          gap: 18px;
          padding: 18px;
          border-radius: 22px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(245, 250, 248, 1) 100%);
          border: 1px solid rgba(13, 110, 93, 0.1);
          box-shadow: 0 16px 32px rgba(9, 25, 32, 0.08);
          transition: transform 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease, background 0.24s ease;
          min-height: 148px;
          color: inherit;
        }

        .useful-links-card:hover {
          transform: translateY(-4px);
          border-color: rgba(13, 110, 93, 0.22);
          background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(237, 246, 243, 1) 100%);
          box-shadow: 0 22px 42px rgba(9, 25, 32, 0.12);
        }

        .useful-links-card__top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
        }

        .useful-links-card__index {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(13, 110, 93, 0.12) 0%, rgba(12, 60, 86, 0.1) 100%);
          color: #0b5c4b;
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.08em;
        }

        .useful-links-card__body {
          display: grid;
          gap: 8px;
        }

        .useful-links-card__name {
          display: block;
          font-size: 1rem;
          font-weight: 800;
          line-height: 1.45;
          color: #102738;
          text-decoration: none;
        }

        .useful-links-card__meta {
          display: inline-flex;
          align-items: center;
          width: fit-content;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(13, 110, 93, 0.08);
          color: #0d6e5d;
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .useful-links-card__description {
          margin: 0;
          color: #5a6a72;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .useful-links-card__arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(13, 110, 93, 0.08);
          color: #0d6e5d;
          transition: transform 0.22s ease, background 0.22s ease;
        }

        .useful-links-card:hover .useful-links-card__arrow {
          transform: translateX(2px);
          background: rgba(13, 110, 93, 0.12);
        }

        @media (max-width: 768px) {
          .useful-links-shell {
            padding: 20px 14px;
            border-radius: 22px;
          }

          .useful-links-grid {
            grid-template-columns: 1fr;
          }

          .useful-links-header {
            margin-bottom: 18px;
          }

          .useful-links-card {
            min-height: auto;
            padding: 16px;
            gap: 14px;
          }
        }
      `}</style>
    </section>
  );
};

export default UsefulLinks;
