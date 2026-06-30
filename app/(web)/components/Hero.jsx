// "use client";
// import { Splide, SplideSlide } from "@splidejs/react-splide";
// import "@splidejs/react-splide/css";

// const HeroSection = ({ images = [] }) => {
//   return (
//     <section id="home">
//       <Splide
//         options={{
//           type: "loop",
//           rewind: true,
//           perPage: 1,
//           autoplay: true,
//           interval: 3000,
//           pagination: true,
//           arrows: false,
//         }}
//       >
//         {images?.map((image, index) => (
//           <SplideSlide key={index}>
//             <div className="carousel-item active">
//               <a href={image?.link}>
//                 <img
//                   className="heroimage"
//                   src={`${process.env.NEXT_PUBLIC_BACKPUBLIC}/${image?.slice(7)}`}
//                   alt={"Banner " + index}
//                   style={{ width: "100%", height: "65vh", objectFit: "cover" }}
//                 />
//               </a>
//             </div>
//           </SplideSlide>
//         ))}
//       </Splide>
//     </section>
//   );
// };

// export default HeroSection;

"use client";
import React from "react";
import ReactPlayer from "react-player";
import "bootstrap/dist/css/bootstrap.min.css";

const HeroSection = ({ data = "" }) => {
  return (
    <section className="hero-shell" aria-label="Official video banner">
      <div className="hero-shell__inner">
        <div className="hero-shell__videoWrap">
          {data ? (
            <ReactPlayer
              className="hero-react-player"
              url={data}
              playing
              controls
              muted
              loop
              width="100%"
              height="100%"
              config={{
                file: {
                  attributes: {
                    style: {
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    },
                  },
                },
              }}
            />
          ) : (
            <div className="hero-shell__empty">
              <span>Official banner feed</span>
              <h2>Video content will appear here when the office feed is available</h2>
            </div>
          )}

          <div className="hero-shell__overlay">
            <div className="hero-shell__copy">
              <span className="hero-shell__kicker">Gram Panchayat Bulletin</span>
              <h1>Clear public updates, official announcements, and local service access.</h1>
              <p>
                The opening banner is designed to feel like a new civic portal, with the video as the main focus and supporting information kept subtle.
              </p>
            </div>

            <div className="hero-shell__info">
              <div>
                <span>Live media</span>
                <strong>Video-first banner</strong>
              </div>
              <div>
                <span>Public access</span>
                <strong>Notices, services, contact</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-shell {
          width: 100%;
          padding: 16px 0 8px;
        }

        .hero-shell__inner {
          width: min(1240px, calc(100% - 32px));
          margin: 0 auto;
        }

        .hero-shell__videoWrap {
          position: relative;
          width: 100%;
          min-height: clamp(420px, 72vh, 760px);
          border-radius: 32px;
          overflow: hidden;
          background:
            linear-gradient(180deg, rgba(8, 22, 34, 0.2) 0%, rgba(8, 22, 34, 0.54) 100%),
            #071620;
          box-shadow: 0 26px 64px rgba(16, 39, 59, 0.2);
          isolation: isolate;
        }

        .hero-react-player {
          position: absolute !important;
          inset: 0;
        }

        .hero-shell__empty {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          gap: 14px;
          padding: 40px;
          color: #fff;
          background: linear-gradient(135deg, rgba(14, 107, 82, 0.94) 0%, rgba(16, 92, 146, 0.94) 100%);
        }

        .hero-shell__empty span,
        .hero-shell__kicker,
        .hero-shell__info span {
          display: inline-flex;
          align-items: center;
          width: fit-content;
          padding: 7px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.14);
          color: #fff;
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .hero-shell__empty h2,
        .hero-shell__copy h1 {
          margin: 0;
          color: #fff;
          font-weight: 900;
          letter-spacing: -0.04em;
          text-wrap: balance;
        }

        .hero-shell__empty h2 {
          max-width: 14ch;
          font-size: clamp(2rem, 4vw, 4rem);
          line-height: 1.05;
        }

        .hero-shell__overlay {
          position: absolute;
          inset: auto 0 0;
          z-index: 1;
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 16px;
          align-items: end;
          padding: 28px;
          background: linear-gradient(180deg, rgba(7, 22, 32, 0) 0%, rgba(7, 22, 32, 0.86) 100%);
        }

        .hero-shell__copy {
          max-width: 760px;
        }

        .hero-shell__copy h1 {
          margin-top: 14px;
          font-size: clamp(2.2rem, 4.8vw, 5rem);
          line-height: 0.98;
        }

        .hero-shell__copy p {
          margin: 14px 0 0;
          max-width: 66ch;
          color: rgba(255, 255, 255, 0.86);
          font-size: 1rem;
          line-height: 1.8;
        }

        .hero-shell__info {
          display: grid;
          gap: 10px;
          min-width: 250px;
        }

        .hero-shell__info > div {
          padding: 14px 16px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.14);
          backdrop-filter: blur(10px);
        }

        .hero-shell__info strong {
          display: block;
          margin-top: 6px;
          color: #fff;
          font-size: 0.98rem;
          line-height: 1.45;
        }

        @media (max-width: 920px) {
          .hero-shell__inner {
            width: min(100%, calc(100% - 20px));
          }

          .hero-shell__videoWrap {
            min-height: 560px;
            border-radius: 26px;
          }

          .hero-shell__overlay {
            grid-template-columns: 1fr;
          }

          .hero-shell__info {
            min-width: 100%;
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .hero-shell {
            padding-top: 12px;
          }

          .hero-shell__videoWrap {
            min-height: 480px;
            border-radius: 22px;
          }

          .hero-shell__overlay {
            padding: 18px;
          }

          .hero-shell__copy h1 {
            font-size: clamp(1.9rem, 7vw, 3rem);
          }

          .hero-shell__copy p {
            font-size: 0.94rem;
          }

          .hero-shell__info {
            grid-template-columns: 1fr;
          }

          .hero-shell__empty {
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
