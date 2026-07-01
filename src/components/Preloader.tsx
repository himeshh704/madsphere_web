"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const words = ["DESIGN", "CREATIVE", "ENGINEERING", "MADSPHERE"];

export default function Preloader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);

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
    if (!isHome || !isLoading) {
      setIsLoading(false);
      return;
    }

    let current = 0;
    let exitTimeout: NodeJS.Timeout;
    const interval = setInterval(() => {
      if (current < words.length - 1) {
        current += 1;
        setWordIndex(current);
      } else {
        clearInterval(interval);
        exitTimeout = setTimeout(() => {
          setIsLoading(false);
        }, 800);
      }
    }, 380);

    return () => {
      clearInterval(interval);
      clearTimeout(exitTimeout);
    };
  }, [isHome, isLoading]);

  return (
    <AnimatePresence>
      {isLoading && isHome && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%", // Curtain slide up transition
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#070708] text-white overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,71,255,0.06)_0%,transparent_60%)] z-0" />

          {/* Word Sequence Container */}
          <div className="relative z-10 w-full overflow-hidden h-24 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {words[wordIndex] === "MADSPHERE" ? (
                <motion.div
                  key="logo"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
                  className="flex items-center justify-center"
                >
                  <img src="/logo_white.png" alt="Madsphere Logo" className="h-12 md:h-16 w-auto object-contain" />
                </motion.div>
              ) : (
                <motion.span
                  key={wordIndex}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
                  className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-[0.2em] uppercase font-sans text-white text-center block"
                >
                  {words[wordIndex]}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
