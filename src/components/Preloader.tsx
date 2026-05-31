"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Prevent scrolling while preloader is active
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    if (isLoading) {
      document.body.style.overflow = "hidden";
      // Force scroll to top on reload so they don't start midway
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const duration = 2000; // 2 seconds minimum to ensure assets buffer

    const update = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const rawProgress = Math.min(elapsed / duration, 1);
      
      // Easing function (starts fast, slows down near 100%)
      const easedProgress = 1 - Math.pow(1 - rawProgress, 3);
      const currentVal = Math.floor(easedProgress * 100);
      
      setProgress(currentVal);

      if (rawProgress < 1) {
        frame = requestAnimationFrame(update);
      } else {
        // At 100%, check if window is actually loaded
        if (document.readyState === "complete") {
          setTimeout(() => setIsLoading(false), 300);
        } else {
          window.addEventListener('load', () => {
            setTimeout(() => setIsLoading(false), 300);
          });
        }
      }
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: "0%" }}
          exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#070708] text-white"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,71,255,0.08)_0%,transparent_50%)]" />

          <div className="flex flex-col items-center gap-8 z-10">
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.5 }}
            >
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase font-sans">
                Madsphere
              </h2>
            </motion.div>
            
            <div className="w-64 h-[3px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-[#0047FF]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="text-xs font-bold tracking-[0.3em] text-white/50 w-full flex justify-between px-1">
              <span>LOADING</span>
              <span>{progress.toString().padStart(3, '0')}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
