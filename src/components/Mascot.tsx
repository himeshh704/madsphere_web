"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Mascot() {
  const pathname = usePathname();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  if (
    pathname === "/works" ||
    pathname === "/careers" ||
    pathname === "/contact" ||
    pathname === "/connect" ||
    pathname === "/company-profile"
  ) {
    return null;
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
        .minecraft-tooltip {
          font-family: 'VT323', monospace;
          image-rendering: pixelated;
          background: rgba(7, 7, 8, 0.96);
          border: 2px solid #FF007A; /* Sunset magenta middle border */
          box-shadow: 
            0 0 0 2px #070708, /* Dark outer pixel outline */
            inset 0 0 0 2px #0A58FF; /* Brand blue inner border */
        }
      `}</style>

      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.5, type: "spring", stiffness: 100, damping: 12 }}
        className="fixed bottom-0 right-6 md:right-12 z-40 pointer-events-auto hidden md:block cursor-pointer select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => router.push("/contact")}
      >
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-full right-0 mb-4 p-3 min-w-[210px] text-left z-50 pointer-events-none select-none minecraft-tooltip"
            >
              <div className="text-white text-xl leading-none font-bold tracking-wide">Let's get mad together!</div>
              <div className="text-[#00E5FF] text-sm mt-1.5 leading-none font-medium">Click to get mad together</div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.img
          src="/mascot.png"
          alt="Madsphere mascot"
          className="w-20 lg:w-28 h-auto drop-shadow-2xl"
          style={{ marginBottom: -10 }}
          animate={{ y: [0, -6, 0], rotate: [0, 2, 0, -2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.15, y: -16, rotate: -8 }}
          draggable={false}
        />
      </motion.div>
    </>
  );
}
