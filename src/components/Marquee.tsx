"use client";

import { motion } from "framer-motion";

interface MarqueeProps {
  items: string[];
  speed?: number;
  direction?: "left" | "right";
}

export default function Marquee({ items, speed = 40, direction = "left" }: MarqueeProps) {
  const track = [...items, ...items, ...items, ...items];

  return (
    <div className="relative flex items-center py-8 overflow-hidden select-none">
      <div className="absolute left-0 inset-y-0 w-32 bg-gradient-to-r from-white dark:from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-32 bg-gradient-to-l from-white dark:from-[#050505] to-transparent z-10 pointer-events-none" />
      <motion.div
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ repeat: Infinity, repeatType: "loop", duration: speed, ease: "linear" }}
        className="flex gap-16 md:gap-24 whitespace-nowrap"
      >
        {track.map((item, i) => (
          <span key={i} className="flex items-center gap-3 text-2xl md:text-3xl font-bold tracking-[0.12em] uppercase text-zinc-300 dark:text-zinc-700 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors cursor-default">
            <span className="text-[#0047FF] opacity-40">■</span>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
