"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/site";
import { ease } from "@/lib/motion";

const INTERVAL = 5000;

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "55%" : "-55%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-55%" : "55%", opacity: 0 }),
};

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback((next: number, direction: number) => {
    setDir(direction);
    setIndex((next + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const id = setInterval(() => go(index + 1, 1), INTERVAL);
    return () => clearInterval(id);
  }, [index, go]);

  const t = testimonials[index];

  return (
    <div className="flex flex-col gap-8">
      <div className="relative overflow-hidden min-h-[260px]">
        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={index}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.48, ease }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden">
              <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
            </div>
            <div className="md:col-span-2 flex flex-col gap-6">
              <span className="text-5xl text-[#0047FF] font-serif leading-none select-none">&ldquo;</span>
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-zinc-800 dark:text-zinc-200">{t.quote}</p>
              <div className="flex items-center gap-4">
                <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-[#0047FF]" />
                <div>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-zinc-400">{t.role}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={() => go(index - 1, -1)} aria-label="Previous"
          className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => go(index + 1, 1)} aria-label="Next"
          className="w-10 h-10 rounded-full bg-[#0047FF] text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 ml-1">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > index ? 1 : -1)}
              aria-label={`Slide ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{ width: i === index ? 24 : 8, height: 8, background: i === index ? "#0047FF" : "rgba(120,120,120,0.3)" }}
            />
          ))}
        </div>

        <span className="ml-auto text-xs text-zinc-400 tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
        </span>
      </div>

      <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
        {testimonials.map((person, i) => (
          <button
            key={i}
            onClick={() => go(i, i > index ? 1 : -1)}
            className="shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 text-left"
            style={{
              minWidth: 180,
              borderColor: i === index ? "#0047FF" : "transparent",
              background: i === index ? "rgba(0,71,255,0.06)" : "rgba(120,120,120,0.05)",
            }}
          >
            <img src={person.img} alt={person.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
            <div>
              <p className="text-xs font-bold leading-tight">{person.name}</p>
              <p className="text-[10px] text-zinc-400">{person.role}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
