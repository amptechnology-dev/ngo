"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import NavBar from "./NavBar";
import GoogleTranslate from "./GoogleTranslate";

const Header = ({ data, links = {}, bg = "" }) => {
  const resolveAssetSrc = (value) => {
    if (typeof value !== "string") return "";
    const cleaned = value.trim();
    if (!cleaned) return "";
    if (/^https?:\/\//i.test(cleaned)) return cleaned;
    return `${process.env.NEXT_PUBLIC_BACKPUBLIC}/${cleaned.replace(/^public\//, "").replace(/^\/+/, "")}`;
  };

  return (
    <header className="header-root">
      <div className="header-root__backdrop" aria-hidden="true" />
      <div className="header-inner">
        <div className="header-inner__top">
          <div className="header-top-left">
            <span className="header-kicker">Gram Panchayat Public Portal</span>
            <a className="header-contact" href={data?.email ? `mailto:${data.email}` : "#"}>
              <i className="far fa-envelope"></i>
              <span>{data?.email || "office email"}</span>
            </a>
            <a className="header-contact" href={data?.mobile ? `tel:${data.mobile}` : "#"}>
              <i className="fa fa-phone"></i>
              <span>{data?.mobile ? `+91 ${data.mobile}` : "contact desk"}</span>
            </a>
          </div>

          <div className="header-top-right">
            <div className="header-translate">
              <GoogleTranslate />
            </div>
            <div className="header-socials">
              {links?.facebook && (
                <a href={links.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
              )}
              {links?.twitter && (
                <a href={links.twitter} target="_blank" rel="noreferrer" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
              )}
              {links?.instagram && (
                <a href={links.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
              )}
              {links?.linkedin && (
                <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="header-brand-strip">
          <div className="header-brand">
            <div className="header-brand__mark">
              {bg ? <img src={resolveAssetSrc(bg)} alt="" aria-hidden="true" /> : <span>GP</span>}
            </div>
            <div className="header-brand__copy">
              <span>Official Information Center</span>
              <h1>{data?.name || "Public Portal"}</h1>
              <p>
                A clean, modern interface for village notices, services, public communication, and citizen support.
              </p>
            </div>
          </div>

          <div className="header-metrics">
            <div className="header-metric">
              <span>Support</span>
              <strong>{data?.mobile ? `+91 ${data.mobile}` : "Available on record"}</strong>
            </div>
            <div className="header-metric">
              <span>Access</span>
              <strong>Services, notices, media</strong>
            </div>
          </div>
        </div>
      </div>

      <NavBar />
      <style jsx>{`
        .header-root {
          position: relative;
          z-index: 40;
          overflow: hidden;
          background: linear-gradient(180deg, #f7fbfe 0%, #edf4f8 100%);
          border-bottom: 1px solid rgba(21, 50, 74, 0.08);
        }

        .header-root__backdrop {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at top left, rgba(14, 107, 82, 0.14), transparent 28%),
            radial-gradient(circle at top right, rgba(16, 92, 146, 0.14), transparent 26%),
            linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(247, 251, 253, 0.92) 100%);
          pointer-events: none;
        }

        .header-inner {
          position: relative;
          z-index: 1;
          width: min(1240px, calc(100% - 32px));
          margin: 0 auto;
          padding: 14px 0 16px;
        }

        .header-inner__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(21, 50, 74, 0.08);
        }

        .header-top-left,
        .header-top-right {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .header-kicker {
          display: inline-flex;
          align-items: center;
          padding: 7px 12px;
          border-radius: 999px;
          background: rgba(20, 115, 88, 0.1);
          color: #0e6b52;
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .header-contact {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #355164;
          text-decoration: none;
          font-size: 0.94rem;
          font-weight: 700;
        }

        .header-contact i {
          color: #0e6b52;
        }

        .header-translate {
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(21, 50, 74, 0.08);
          box-shadow: 0 10px 20px rgba(16, 39, 59, 0.06);
        }

        .header-socials {
          display: flex;
          gap: 8px;
        }

        .header-socials a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(21, 50, 74, 0.08);
          color: #15324a;
          text-decoration: none;
          transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
        }

        .header-socials a:hover {
          transform: translateY(-2px);
          background: linear-gradient(135deg, #0e6b52 0%, #105c92 100%);
          color: #fff;
        }

        .header-brand-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
          padding-top: 16px;
        }

        .header-brand {
          display: flex;
          align-items: center;
          gap: 16px;
          min-width: min(640px, 100%);
        }

        .header-brand__mark {
          flex: 0 0 auto;
          width: 74px;
          height: 74px;
          border-radius: 20px;
          overflow: hidden;
          background: linear-gradient(135deg, #0e6b52 0%, #105c92 100%);
          display: grid;
          place-items: center;
          box-shadow: 0 14px 28px rgba(14, 107, 82, 0.2);
        }

        .header-brand__mark img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .header-brand__mark span {
          color: #fff;
          font-size: 1.1rem;
          font-weight: 900;
          letter-spacing: 0.08em;
        }

        .header-brand__copy span {
          display: block;
          color: #0e6b52;
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .header-brand__copy h1 {
          margin: 3px 0 6px;
          color: #15324a;
          font-size: clamp(1.7rem, 2.6vw, 2.6rem);
          line-height: 1.05;
          font-weight: 900;
        }

        .header-brand__copy p {
          margin: 0;
          max-width: 62ch;
          color: #4c6475;
          line-height: 1.7;
          font-size: 0.98rem;
        }

        .header-metrics {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .header-metric {
          min-width: 180px;
          padding: 14px 16px;
          border-radius: 18px;
          background: linear-gradient(180deg, #ffffff 0%, #f6fbfd 100%);
          border: 1px solid rgba(21, 50, 74, 0.08);
          box-shadow: 0 14px 28px rgba(16, 39, 59, 0.08);
        }

        .header-metric span {
          display: block;
          color: #0e6b52;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .header-metric strong {
          display: block;
          margin-top: 6px;
          color: #15324a;
          font-size: 0.98rem;
          line-height: 1.5;
        }

        @media (max-width: 920px) {
          .header-inner {
            width: min(100%, calc(100% - 20px));
          }

          .header-brand {
            min-width: 100%;
          }

          .header-metrics {
            width: 100%;
            justify-content: flex-start;
          }

          .header-metric {
            flex: 1 1 220px;
          }
        }

        @media (max-width: 640px) {
          .header-brand-strip {
            padding-top: 14px;
          }

          .header-brand {
            align-items: flex-start;
          }

          .header-brand__mark {
            width: 62px;
            height: 62px;
            border-radius: 18px;
          }

          .header-brand__copy p {
            font-size: 0.94rem;
          }

          .header-contact span {
            font-size: 0.88rem;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
