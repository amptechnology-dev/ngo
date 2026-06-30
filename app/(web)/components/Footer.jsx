"use client";

import Link from "next/link";
import { FaTwitter, FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";

export default function Footer({ data = {}, links = {}, bg = "" }) {
  const backgroundSrc = typeof bg === "string" && bg ? `${process.env.NEXT_PUBLIC_BACKPUBLIC}/${bg.replace(/^\/+/, "")}` : "";

  return (
    <footer
      id="footer"
      style={{
        backgroundImage: backgroundSrc
          ? `linear-gradient(180deg, rgba(11, 22, 41, 0.88) 0%, rgba(7, 14, 28, 0.96) 100%), url(${backgroundSrc})`
          : "linear-gradient(180deg, #13233e 0%, #07111f 100%)",
      }}
    >
      <div className="footer-overlay" aria-hidden="true" />
      <div className="container position-relative">
        <div className="footer-shell">
          <div className="footer-top">
            <div className="footer-brand">
              <span className="footer-kicker">Official portal</span>
              <h3>{data?.name || "Official Website"}</h3>
              <p>
                Trusted public information, services, and official updates are presented here in a clean footer layout for easy navigation.
              </p>
              <div className="footer-badges">
                <span>Public information</span>
                <span>Service access</span>
                <span>Quick support</span>
              </div>
            </div>

            <div className="footer-links-card">
              <div className="footer-links-head">
                <h4>Quick Access</h4>
                <p>Essential pages available from every screen.</p>
              </div>

              <div className="footer-link-list">
                {data?.enabled_services?.includes("faq") && (
                  <Link href="/faq" className="footer-link-row">
                    <span>FAQ</span>
                    <strong>Common questions and answers</strong>
                  </Link>
                )}
                {data?.enabled_services?.includes("grievance") && (
                  <Link href="/grievance" className="footer-link-row">
                    <span>Grievance</span>
                    <strong>Submit and track complaints</strong>
                  </Link>
                )}
                {!data?.enabled_services?.includes("faq") && !data?.enabled_services?.includes("grievance") && (
                  <div className="footer-empty-state">No quick access pages are enabled right now.</div>
                )}
              </div>
            </div>
          </div>

          <div className="footer-middle">
            <div className="footer-social-block">
              <h4>Follow Us</h4>
              <p>Stay connected through our official social channels.</p>
              <div className="footer-social">
                {links?.facebook && (
                  <a href={links.facebook} target="_blank" rel="noreferrer noopener" aria-label="Facebook">
                    <FaFacebook />
                  </a>
                )}
                {links?.twitter && (
                  <a href={links.twitter} target="_blank" rel="noreferrer noopener" aria-label="Twitter">
                    <FaTwitter />
                  </a>
                )}
                {links?.instagram && (
                  <a href={links.instagram} target="_blank" rel="noreferrer noopener" aria-label="Instagram">
                    <FaInstagram />
                  </a>
                )}
                {links?.linkedin && (
                  <a href={links.linkedin} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn">
                    <FaLinkedin />
                  </a>
                )}
                {links?.youtube && (
                  <a href={links.youtube} target="_blank" rel="noreferrer noopener" aria-label="YouTube">
                    <FaYoutube />
                  </a>
                )}
              </div>
            </div>

            <div className="footer-note">
              <span className="footer-note__label">Navigation tip</span>
              <p>Use the header for primary browsing and the footer for quick access to important official pages.</p>
            </div>
          </div>

          <div className="footer-divider" />

          <div className="footer-bottom">
            <div className="copyright">
              &copy; Copyright <strong><span>{data?.name || "Official Website"}</span></strong>. All Rights Reserved
            </div>
            <div className="credits">
              Designed by <a href="https://amptechnology.in" target="_blank" rel="noreferrer noopener">AmpTechnology</a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        #footer {
          position: relative;
          overflow: hidden;
          padding: 54px 0 32px;
          color: #eaf2fb;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
        }

        .footer-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at top left, rgba(157, 240, 214, 0.14), transparent 26%),
            radial-gradient(circle at bottom right, rgba(62, 141, 226, 0.12), transparent 30%);
          pointer-events: none;
        }

        .footer-shell {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 22px;
          padding: 30px;
          border-radius: 30px;
          background: rgba(10, 19, 36, 0.88);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 28px 60px rgba(3, 8, 18, 0.24);
          backdrop-filter: blur(14px);
        }

        .footer-top {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
          gap: 18px;
          align-items: start;
        }

        .footer-brand {
          display: grid;
          gap: 12px;
          max-width: 760px;
        }

        .footer-kicker {
          display: inline-flex;
          width: fit-content;
          align-items: center;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          color: #9df0d6;
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .footer-brand h3 {
          margin: 0;
          color: #ffffff;
          font-size: clamp(1.8rem, 3vw, 2.8rem);
          font-weight: 900;
          letter-spacing: -0.03em;
        }

        .footer-brand p {
          margin: 0;
          max-width: 68ch;
          color: rgba(234, 242, 251, 0.78);
          line-height: 1.8;
        }

        .footer-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .footer-badges span {
          display: inline-flex;
          align-items: center;
          padding: 9px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #dff8f0;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .footer-links-card,
        .footer-social-block,
        .footer-note {
          padding: 20px;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .footer-links-head h4,
        .footer-social-block h4 {
          margin: 0;
          color: #ffffff;
          font-size: 1.02rem;
          font-weight: 850;
        }

        .footer-links-head p,
        .footer-social-block p,
        .footer-note p {
          margin: 6px 0 0;
          color: rgba(234, 242, 251, 0.68);
          font-size: 0.92rem;
          line-height: 1.6;
        }

        .footer-link-list {
          display: grid;
          gap: 12px;
          margin-top: 14px;
        }

        .footer-link-row {
          display: grid;
          gap: 4px;
          padding: 14px 16px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          text-decoration: none;
          transition: transform 0.22s ease, background 0.22s ease, border-color 0.22s ease;
        }

        .footer-link-row:hover {
          transform: translateY(-2px);
          background: rgba(157, 240, 214, 0.1);
          border-color: rgba(157, 240, 214, 0.18);
        }

        .footer-link-row span {
          color: #9df0d6;
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .footer-link-row strong {
          color: #ffffff;
          font-size: 0.96rem;
          line-height: 1.45;
          font-weight: 700;
        }

        .footer-empty-state {
          padding: 14px 16px;
          border-radius: 16px;
          color: rgba(234, 242, 251, 0.76);
          background: rgba(255, 255, 255, 0.04);
          border: 1px dashed rgba(255, 255, 255, 0.12);
        }

        .footer-middle {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: 18px;
        }

        .footer-social {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 12px;
        }

        .footer-social a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          color: #dff8f0;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: transform 0.22s ease, background 0.22s ease, color 0.22s ease;
        }

        .footer-social a:hover {
          transform: translateY(-2px);
          background: rgba(157, 240, 214, 0.14);
          color: #ffffff;
        }

        .footer-note {
          display: grid;
          align-content: start;
          gap: 8px;
        }

        .footer-note__label {
          display: inline-flex;
          width: fit-content;
          align-items: center;
          padding: 7px 11px;
          border-radius: 999px;
          background: rgba(157, 240, 214, 0.12);
          color: #9df0d6;
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .footer-note p {
          margin-top: 0;
        }

        .footer-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.18), transparent);
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          align-items: center;
          color: rgba(234, 242, 251, 0.72);
          font-size: 0.92rem;
        }

        .credits a {
          color: #9df0d6;
          text-decoration: none;
          font-weight: 700;
        }

        @media (max-width: 768px) {
          #footer {
            padding: 42px 0 24px;
          }

          .footer-shell {
            padding: 20px 16px;
            border-radius: 24px;
          }

          .footer-top,
          .footer-middle {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
