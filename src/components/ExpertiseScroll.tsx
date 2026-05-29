"use client";

import { useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { expertise } from "@/data/site";
import { ease } from "@/lib/motion";

function useTilt() {
  const rx = useSpring(useMotionValue(0), { stiffness: 280, damping: 28 });
  const ry = useSpring(useMotionValue(0), { stiffness: 280, damping: 28 });
  const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    const r = e.currentTarget.getBoundingClientRect();
    rx.set(((e.clientY - r.top - r.height / 2) / r.height) * -16);
    ry.set(((e.clientX - r.left - r.width / 2) / r.width) * 16);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };
  return { rx, ry, onMove, onLeave, isTouch };
}

export default function ExpertiseScroll() {
  const [active, setActive] = useState(0);
  const { rx, ry, onMove, onLeave, isTouch } = useTilt();
  const item = expertise[active];


  return (
    <div className="py-24 px-6 md:px-16 max-w-[1400px] mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-bold">Our Expertise</h2>
        <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 border-l border-zinc-300 dark:border-zinc-700 pl-4">
          <span className="w-1.5 h-1.5 bg-yellow-400 rounded-sm" /> Service
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="flex flex-col">
          {expertise.map((ex, i) => (
            <motion.button
              key={ex.label}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="w-full text-left py-3 focus-visible:outline-none"
            >
              <span className={`text-3xl md:text-[2.8rem] font-bold uppercase leading-tight transition-colors duration-300 ${
                i === active
                  ? "text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-300 dark:text-zinc-700 hover:text-zinc-500 dark:hover:text-zinc-500"
              }`}>
                {ex.label}
              </span>
            </motion.button>
          ))}
        </div>

        <div style={{ perspective: "1200px" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, rotateY: -40, scale: 0.88 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: 40, scale: 0.88 }}
              transition={{ duration: 0.55, ease }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                style={{ 
                  rotateX: isTouch ? undefined : rx, 
                  rotateY: isTouch ? undefined : ry, 
                  transformPerspective: isTouch ? undefined : 900 
                }}
                onMouseMove={onMove}
                onMouseLeave={onLeave}
                className="rounded-xl overflow-hidden shadow-2xl cursor-pointer"
              >
                <img src={item.img} alt={item.label} className="w-full aspect-[4/3] object-cover" draggable={false} />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mt-5 max-w-md"
              >
                {item.desc}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.35 }}
                className="flex gap-2 mt-4"
              >
                {item.tags.map((tag) => (
                  <span key={tag} className="text-[11px] font-medium border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 rounded text-zinc-500 dark:text-zinc-400">
                    {tag}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
