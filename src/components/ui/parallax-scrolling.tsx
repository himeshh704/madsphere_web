'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function ParallaxComponent() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');

    if (triggerElement) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      const layers = [
        { layer: "1", yPercent: 40 },
        { layer: "2", yPercent: 25 },
        { layer: "3", yPercent: 0 },
        { layer: "4", yPercent: -15 }
      ];

      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          {
            yPercent: layerObj.yPercent,
            ease: "none"
          },
          idx === 0 ? undefined : "<"
        );
      });
    }

    return () => {
      // Clean up GSAP and ScrollTrigger instances
      ScrollTrigger.getAll().forEach(st => st.kill());
      if (triggerElement) {
        gsap.killTweensOf(triggerElement.querySelectorAll('[data-parallax-layer]'));
      }
    };
  }, []);

  return (
    <div className="parallax w-full overflow-x-hidden" ref={parallaxRef}>
      <style>{`
        .parallax {
          background-color: #070708;
          color: #ffffff;
        }
        .parallax__header {
          position: relative;
          height: 180vh;
          width: 100%;
        }
        .parallax__visuals {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          background-color: #070708;
        }
        .parallax__layers {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .parallax__layer-img {
          position: absolute;
          top: -10%;
          left: 0;
          width: 100%;
          height: 120%;
          object-fit: cover;
          pointer-events: none;
        }
        .parallax__layer-title {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          pointer-events: none;
        }
        .parallax__title {
          font-size: clamp(3rem, 10vw, 9rem);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.03em;
          color: #ffffff;
          text-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          line-height: 1;
        }
        .parallax__fade {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 30vh;
          background: linear-gradient(to top, #070708 20%, transparent 100%);
          z-index: 5;
          pointer-events: none;
        }
        .parallax__content {
          position: relative;
          min-h: 100vh;
          background-color: #070708;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 10;
          padding: 4rem 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        .osmo-icon-svg {
          max-width: 180px;
          color: #0047FF;
          opacity: 0.85;
          animation: float-icon 6s ease-in-out infinite;
        }
        @keyframes float-icon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}</style>

      <section className="parallax__header">
        <div className="parallax__visuals">
          <div data-parallax-layers className="parallax__layers">
            {/* Layer 1: Background mountain or clouds */}
            <img 
              src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795be09b462b2e8ebf71_osmo-parallax-layer-3.webp" 
              loading="lazy" 
              width="800" 
              data-parallax-layer="1" 
              alt="" 
              className="parallax__layer-img" 
            />
            {/* Layer 2: Midground details */}
            <img 
              src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795b4d5ac529e7d3a562_osmo-parallax-layer-2.webp" 
              loading="lazy" 
              width="800" 
              data-parallax-layer="2" 
              alt="" 
              className="parallax__layer-img" 
            />
            {/* Layer 3: Title behind foreground */}
            <div data-parallax-layer="3" className="parallax__layer-title">
              <h2 className="parallax__title font-sans">Madsphere</h2>
            </div>
            {/* Layer 4: Foreground elements */}
            <img 
              src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795bb5aceca85011ad83_osmo-parallax-layer-1.webp" 
              loading="lazy" 
              width="800" 
              data-parallax-layer="4" 
              alt="" 
              className="parallax__layer-img" 
            />
          </div>
          <div className="parallax__fade"></div>
        </div>
      </section>
      
      <section className="parallax__content text-center">
        <div className="max-w-xl flex flex-col items-center gap-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 160 160" fill="none" className="osmo-icon-svg">
            <path d="M94.8284 53.8578C92.3086 56.3776 88 54.593 88 51.0294V0H72V59.9999C72 66.6273 66.6274 71.9999 60 71.9999H0V87.9999H51.0294C54.5931 87.9999 56.3777 92.3085 53.8579 94.8283L18.3431 130.343L29.6569 141.657L65.1717 106.142C67.684 103.63 71.9745 105.396 72 108.939V160L88.0001 160L88 99.9999C88 93.3725 93.3726 87.9999 100 87.9999H160V71.9999H108.939C105.407 71.9745 103.64 67.7091 106.12 65.1938L106.142 65.1716L141.657 29.6568L130.343 18.3432L94.8284 53.8578Z" fill="currentColor"></path>
          </svg>
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-6 font-sans">
            CREATIVE COLLABORATION
          </h3>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-sans font-medium">
            We build experiences that blur the boundary between engineering and luxury aesthetic design. Elevating digital reality since 2016.
          </p>
        </div>
      </section>
    </div>
  );
}
