"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface OrbitingCarouselProps {
  items: {
    icon: React.ReactNode;
    label: string;
  }[];
  radius?: number;
  duration?: number;
  className?: string;
}

export default function OrbitingCarousel({
  items,
  radius = 150,
  duration = 20,
  className,
}: OrbitingCarouselProps) {
  return (
    <div className={cn("relative flex items-center justify-center w-full h-full", className)}>
      {/* Central Hub */}
      <div className="absolute w-24 h-24 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl flex items-center justify-center shadow-2xl z-10">
        <span className="font-serif text-3xl text-white font-bold tracking-tighter">M</span>
      </div>

      {/* Orbiting Track */}
      <div 
        className="absolute rounded-full border border-white/10 border-dashed"
        style={{ width: radius * 2, height: radius * 2 }}
      />

      {/* Orbiting Items Container */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration, ease: "linear" }}
        className="absolute flex items-center justify-center"
        style={{ width: radius * 2, height: radius * 2 }}
      >
        {items.map((item, i) => {
          const angle = (360 / items.length) * i;
          return (
            <motion.div
              key={i}
              className="absolute flex items-center justify-center"
              style={{
                rotate: angle,
                transformOrigin: `0 ${radius}px`,
                top: 0,
                marginTop: -radius,
              }}
            >
              {/* Counter-rotate the child so the text/icon stays upright */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration, ease: "linear" }}
                className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex flex-col items-center justify-center text-white shadow-xl hover:bg-white/20 transition-colors cursor-pointer"
                style={{ 
                  // Initial counter-rotation to offset parent's initial angle
                  transform: `rotate(-${angle}deg)` 
                }}
              >
                <div className="mb-1 text-white/80">{item.icon}</div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-center px-1 leading-tight">{item.label}</span>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
