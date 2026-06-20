"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const numParticles = Math.floor((width * height) / 15000); // Density

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5,
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.lineWidth = 0.5;

      // Update and draw particles
      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect particles
        for (let j = i + 1; j < numParticles; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 - dist / 120 * 0.2})`;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40 pointer-events-none" />;
}

import { usePathname } from "next/navigation";

export default function Preloader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  const isHome = pathname === "/";

  // Prevent scrolling while preloader is active
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    if (isLoading && isHome) {
      document.body.style.overflow = "hidden";
      // Force scroll to top on reload so they don't start midway
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading, isHome]);

  useEffect(() => {
    if (!isHome) {
      sessionStorage.setItem("madsphere_preloader_done", "true");
      setIsLoading(false);
      return;
    }

    if (sessionStorage.getItem("madsphere_preloader_done")) {
      setIsLoading(false);
      return;
    }

    let frame: number;
    let start: number | null = null;
    const duration = 2000; // 2 seconds minimum to ensure assets buffer

    const update = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const rawProgress = Math.min(elapsed / duration, 1);
      
      if (rawProgress < 1) {
        frame = requestAnimationFrame(update);
      } else {
        // At 100%, check if window is actually loaded
        const finishPreloader = () => {
          setTimeout(() => {
            sessionStorage.setItem("madsphere_preloader_done", "true");
            setIsLoading(false);
          }, 300);
        };
        
        if (document.readyState === "complete") {
          finishPreloader();
        } else {
          window.addEventListener('load', finishPreloader);
        }
      }
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [isHome]);

  return (
    <AnimatePresence>
      {isLoading && isHome && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#070708] text-white overflow-hidden"
        >
          {/* Constellation Background */}
          <Constellation />

          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,71,255,0.08)_0%,transparent_50%)] z-0" />

          <div className="flex flex-col items-center justify-center z-10 w-full">
            <motion.div
               initial={{ opacity: 0, scale: 0.85 }}
               animate={{ 
                 opacity: 1, 
                 scale: 1,
                 y: [0, -8, 0],
               }}
               exit={{ 
                 scale: 90, 
                 x: "30.5%", // Centers the stick-man 'A' (19.5% from left) to the middle of the screen
                 opacity: [1, 1, 1, 0],
                 transition: { duration: 2.2, ease: [0.76, 0, 0.24, 1] }
               }}
               transition={{
                 opacity: { duration: 0.8 },
                 scale: { duration: 0.8 },
                 y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
               }}
               style={{ transformOrigin: "19.5% 52%" }}
            >
              <img src="/logo_white.png" alt="Madsphere Logo" className="h-12 md:h-16 w-auto object-contain" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
