"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function isRouteActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({ href, className = "", children, onClick, active, activeClassName = "nav-link-current", ...rest }) {
  const pathname = usePathname();
  const isActive = typeof active === "boolean" ? active : isRouteActive(pathname, href);
  const classes = `${className} ${isActive ? `active ${activeClassName}` : ""}`.trim();

  return (
    <Link href={href} className={classes} aria-current={isActive ? "page" : undefined} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}

export default function NavBar() {
  const pathname = usePathname();
  const isGalleryRoute = pathname === "/gallery" || pathname === "/videos";
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [navHeight, setNavHeight] = useState(0);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    setIsCollapsed(true);
    setIsDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    const navElement = document.querySelector(".nav-shell");

    if (navElement) {
      setNavHeight(navElement.offsetHeight);
    }

    const handleScroll = () => {
      setIsFixed(window.scrollY > 110);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleNavClick = () => {
    handleDropdownClose();
    setIsCollapsed(true);
  };

  return (
    <>
      <div aria-hidden="true" style={{ height: isFixed ? navHeight : 0, transition: "height 0.25s ease" }} />
      <nav className={`nav-shell${isFixed ? " nav-shell--fixed" : ""}`} aria-label="Primary navigation">
        <div className="nav-shell__inner">
          <div className="nav-shell__brand" aria-label="Official site">
            <span className="nav-shell__brandMark">GP</span>
            <div className="nav-shell__brandCopy">
              <strong>Gram Panchayat</strong>
              <span>Official Public Portal</span>
            </div>
          </div>

          <button
            className="nav-toggle"
            type="button"
            aria-controls="navbarSupportedContent"
            aria-expanded={!isCollapsed}
            aria-label="Toggle navigation"
            onClick={handleToggle}
          >
            <span />
            <span />
            <span />
          </button>
          <div className={`nav-links ${!isCollapsed ? "show" : ""}`} id="navbarSupportedContent">
            <div className="nav-links__group">
              <NavLink className="nav-link-pill" href="/" onClick={handleNavClick}>
                Home
              </NavLink>
              <NavLink className="nav-link-pill" href="/About" onClick={handleNavClick}>
                About
              </NavLink>
              <NavLink className="nav-link-pill" href="/service" onClick={handleNavClick}>
                Services
              </NavLink>
              <NavLink className="nav-link-pill" href="/Team" onClick={handleNavClick}>
                Team
              </NavLink>
              <NavLink className="nav-link-pill" href="/contact" onClick={handleNavClick}>
                Contact
              </NavLink>

              <div className="nav-dropdownWrap">
                <button
                  className={`nav-link-pill nav-link-pill--toggle ${isGalleryRoute ? "is-active" : ""}`}
                  type="button"
                  id="dropdownGallery"
                  aria-expanded={isDropdownOpen}
                  onClick={handleDropdownToggle}
                >
                  Gallery
                </button>
                <div className={`nav-dropdown${isDropdownOpen ? " is-open" : ""}`} aria-labelledby="dropdownGallery">
                  <NavLink className="nav-dropdown__item" href="/gallery" onClick={handleNavClick}>
                    Photos
                  </NavLink>
                  <NavLink className="nav-dropdown__item" href="/videos" onClick={handleNavClick}>
                    Videos
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="nav-links__actions">
              <NavLink className="nav-emphasis" href="/grievance" onClick={handleNavClick} activeClassName="button-link-current">
                Grievance Cell
              </NavLink>
              <a className="nav-action" href="http://wbpms.in/citizen" target="_blank" rel="noopener noreferrer">
                Citizen Services
              </a>
            </div>
          </div>
        </div>

        <style jsx>{`
        .nav-shell {
          position: relative;
          z-index: 35;
          width: min(1240px, calc(100% - 32px));
          margin: -22px auto 14px;
          border-radius: 28px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.97) 0%, rgba(248, 252, 253, 0.95) 100%);
          border: 1px solid rgba(21, 50, 74, 0.08);
          box-shadow: 0 18px 42px rgba(16, 39, 59, 0.14);
          backdrop-filter: blur(14px);
          transition: transform 0.25s ease, box-shadow 0.25s ease, width 0.25s ease, top 0.25s ease;
        }

        .nav-shell--fixed {
          position: fixed;
          top: 14px;
          left: 50%;
          transform: translateX(-50%);
          width: min(1240px, calc(100% - 28px));
          margin: 0;
          box-shadow: 0 22px 48px rgba(16, 39, 59, 0.18);
          animation: nav-drop 0.22s ease-out;
        }

        .nav-shell__inner {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          flex-wrap: nowrap;
        }

        .nav-shell__brand {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          min-width: 210px;
          padding-right: 10px;
        }

        .nav-shell__brandMark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 16px;
          background: linear-gradient(135deg, #0e6b52 0%, #105c92 100%);
          color: #fff;
          font-size: 0.95rem;
          font-weight: 900;
          box-shadow: 0 12px 24px rgba(14, 107, 82, 0.18);
        }

        .nav-shell__brandCopy {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }

        .nav-shell__brandCopy strong {
          color: #15324a;
          font-size: 0.98rem;
          font-weight: 900;
          letter-spacing: -0.02em;
        }

        .nav-shell__brandCopy span {
          margin-top: 4px;
          color: #5d7485;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .nav-shell--fixed .nav-shell__inner {
          padding-top: 10px;
          padding-bottom: 10px;
        }

        .nav-toggle {
          display: none;
          width: 48px;
          height: 48px;
          border: 0;
          border-radius: 16px;
          background: linear-gradient(135deg, #0e6b52 0%, #105c92 100%);
          box-shadow: 0 12px 24px rgba(14, 107, 82, 0.18);
        }

        .nav-toggle span {
          display: block;
          width: 20px;
          height: 2px;
          margin: 4px auto;
          border-radius: 99px;
          background: #fff;
        }

        .nav-links {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          width: 100%;
          flex-wrap: wrap;
          min-width: 0;
        }

        .nav-links__group,
        .nav-links__actions {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          min-width: 0;
        }

        .nav-link-pill,
        .nav-emphasis,
        .nav-action,
        .nav-dropdown__item {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 42px;
          padding: 0 16px;
          border-radius: 999px;
          text-decoration: none;
          text-decoration-line: none;
          font-weight: 800;
          font-size: 0.94rem;
          letter-spacing: 0.01em;
          white-space: nowrap;
          transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
        }

       .nav-link-pill {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 22px;

  border-radius: 18px;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.01em;

  color: #355164;
  background: linear-gradient(
    180deg,
    rgba(255,255,255,0.96) 0%,
    rgba(244,248,251,0.96) 100%
  );

  border: 1px solid rgba(21, 50, 74, 0.08);

  box-shadow:
    0 2px 10px rgba(16, 39, 59, 0.04),
    inset 0 1px 0 rgba(255,255,255,0.8);

  transition: all 0.25s ease;
}

.nav-link-pill:hover,
.nav-dropdown__item:hover {
  transform: translateY(-2px);
  color: #0e6b52;
  background: rgba(14, 107, 82, 0.10);

  box-shadow:
    0 10px 22px rgba(14, 107, 82, 0.12);
}


.nav-link-pill:global(.active),
.nav-link-pill:global(.nav-link-current),
.nav-link-pill.is-active,
.nav-dropdown__item:global(.active) {
  color: #fff;
  background: linear-gradient(
    135deg,
    #0e6b52 0%,
    #105c92 100%
  );

  border-color: transparent;

  box-shadow:
    0 12px 28px rgba(14, 107, 82, 0.22);
}

        .nav-link-pill:global(.active)::after,
        .nav-link-pill:global(.nav-link-current)::after {
          content: "";
          position: absolute;
          left: 14px;
          right: 14px;
          bottom: 7px;
          height: 2px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.88);
        }

        .nav-dropdownWrap {
          position: relative;
        }

        .nav-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          left: 0;
          min-width: 190px;
          padding: 10px;
          border-radius: 18px;
          background: #fff;
          border: 1px solid rgba(21, 50, 74, 0.08);
          box-shadow: 0 18px 36px rgba(16, 39, 59, 0.12);
          display: none;
          z-index: 3;
        }

        .nav-dropdown.is-open {
          display: grid;
          gap: 8px;
        }

        .nav-dropdown__item {
          justify-content: flex-start;
          color: #355164;
          background: rgba(248, 251, 253, 0.96);
        }

        .nav-link-pill--toggle {
          min-width: 104px;
        }

        .nav-emphasis {
          color: #0e6b52;
          background: rgba(20, 115, 88, 0.1);
          border: 1px solid rgba(20, 115, 88, 0.14);
        }

        .nav-action {
          color: #fff;
          background: linear-gradient(135deg, #0e6b52 0%, #105c92 100%);
          box-shadow: 0 12px 24px rgba(14, 107, 82, 0.16);
        }

        @media (max-width: 900px) {
          .nav-shell {
            width: min(100%, calc(100% - 20px));
            margin-top: -18px;
          }

          .nav-shell--fixed {
            top: 10px;
            width: min(100%, calc(100% - 16px));
            margin-top: 0;
          }

          .nav-shell__inner {
            align-items: stretch;
            flex-wrap: wrap;
          }

          .nav-shell__brand {
            min-width: 0;
            flex: 1 1 auto;
          }

          .nav-toggle {
            display: inline-grid;
            place-items: center;
            flex: 0 0 auto;
          }

          .nav-links {
            display: none;
            align-items: stretch;
            flex-direction: column;
            justify-content: flex-start;
            padding-top: 8px;
          }

          .nav-links.show {
            display: flex;
          }

          .nav-links__group,
          .nav-links__actions {
            width: 100%;
          }

          .nav-links__actions {
            justify-content: flex-start;
          }

          .nav-link-pill,
          .nav-emphasis,
          .nav-action {
            width: 100%;
          }

          .nav-dropdownWrap {
            width: 100%;
          }

          .nav-dropdown {
            position: static;
            margin-top: 8px;
          }
        }

        @media (max-width: 640px) {
          .nav-shell {
            border-radius: 22px;
          }

          .nav-shell--fixed {
            border-radius: 22px;
          }

          .nav-shell__brandCopy span {
            letter-spacing: 0.06em;
          }

          .nav-shell__brand {
            min-width: 0;
          }
        }

        @keyframes nav-drop {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-8px);
          }

          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
      </nav>
    </>
  );
}
