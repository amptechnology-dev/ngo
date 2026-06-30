"use client";

import Image from "next/image";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const TeamSection = ({ data = [] }) => {
  const members = Array.isArray(data) ? data : [];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.18,
  });

  const normalizeAvatarSrc = (src) => {
    if (typeof src !== "string") return "";

    const cleaned = src.trim();

    if (
      !cleaned ||
      cleaned.toLowerCase() === "null" ||
      cleaned.toLowerCase() === "undefined"
    ) {
      return "";
    }

    if (/^https?:\/\//i.test(cleaned) || cleaned.startsWith("/")) {
      return cleaned;
    }

    return `/${cleaned.replace(/^\/+/, "")}`;
  };

  if (!members.length) return null;

  const shouldLoop = members.length > 4;

  const settings = {
    type: shouldLoop ? "loop" : "slide",
    rewind: shouldLoop,
    pagination: false,
    arrows: shouldLoop,
    autoplay: shouldLoop,
    interval: 3200,
    speed: 850,
    gap: "1rem",
    perPage: Math.min(4, members.length),
    pauseOnHover: true,
    pauseOnFocus: true,
    resetProgress: false,
    breakpoints: {
      1400: { perPage: Math.min(3, members.length) },
      1200: { perPage: Math.min(2, members.length) },
      768: { perPage: 1 },
    },
  };

  return (
    <section className="team-section py-5">
      <div className="team-section__bg" aria-hidden="true" />

      <div className="container team-section__container">
        <motion.div
          ref={ref}
          className="team-heading"
          initial={{ opacity: 0, y: 18 }}
          animate={
            inView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 18 }
          }
          transition={{ duration: 0.6 }}
        >
          <span className="team-kicker">
            Our People
          </span>

          <h2 className="team-title">
            Meet the Team
          </h2>

          <p className="team-subtitle">
            A professional people section styled
            for an official website.
          </p>
        </motion.div>

        <Splide
          options={settings}
          className="team-carousel"
        >
          {members.map((member, index) => (
            <SplideSlide key={index}>
              <motion.div
                className="team-card-wrap"
                initial={{
                  opacity: 0,
                  y: 24,
                }}
                animate={
                  inView
                    ? { opacity: 1, y: 0 }
                    : {
                        opacity: 0,
                        y: 24,
                      }
                }
                transition={{
                  duration: 0.55,
                  delay: Math.min(
                    index * 0.08,
                    0.34
                  ),
                }}
              >
                <div className="teamwrap">
                  {/* Image */}
                  <div className="team-avatar">
                    <Image
                      alt={member.name}
                      src={normalizeAvatarSrc(
                        member?.avatar
                      )}
                      width={250}
                      height={250}
                      className="team-photo"
                    />
                  </div>

                  {/* Content */}
                  <div className="team-body">
                    <h5 className="team-name">
                      {member.name}
                    </h5>

                    <p className="team-role">
                      {member.category?.name}
                    </p>

                    <p className="team-mobile">
                      📞 {member.mobile}
                    </p>

                    <div className="iconwrper">
                      {member.socialLinks
                        ?.facebook && (
                        <a
                          href={
                            member.socialLinks
                              .facebook
                          }
                          target="_blank"
                        >
                          FB
                        </a>
                      )}

                      {member.socialLinks
                        ?.twitter && (
                        <a
                          href={
                            member.socialLinks
                              .twitter
                          }
                          target="_blank"
                        >
                          TW
                        </a>
                      )}

                      {member.socialLinks
                        ?.linkedin && (
                        <a
                          href={
                            member.socialLinks
                              .linkedin
                          }
                          target="_blank"
                        >
                          IN
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default TeamSection;