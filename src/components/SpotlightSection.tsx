"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

export default function SpotlightSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mouse coordinates relative to the container
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth out the movement
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Create a performant template string for the mask image
  const maskImage = useMotionTemplate`radial-gradient(min(450px, 45vw) circle at ${smoothX}px ${smoothY}px, black 15%, transparent 80%)`;

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[60vh] min-h-[500px] md:h-[800px] overflow-hidden bg-[#070708] flex items-center justify-center cursor-crosshair border-y border-zinc-900"
    >
      {/* Background Dark Text (always visible but subtle) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-6 text-center">
        <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-zinc-800/40 uppercase tracking-tighter leading-[0.9] select-none font-sans">
          Discover The <br /> Unseen
        </h2>
        <p className="mt-8 text-zinc-600 font-medium tracking-[0.2em] uppercase text-[10px] md:text-xs max-w-xl select-none">
          Hover to reveal our philosophy
        </p>
      </div>

      {/* The Masked Reveal Layer */}
      {mounted && (
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none bg-[#0047FF] flex flex-col items-center justify-center px-6 text-center"
          style={{
            WebkitMaskImage: maskImage,
            maskImage: maskImage,
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.6s ease"
          }}
        >
          {/* Internal abstract pattern/image to make it super premium */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
          
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] select-none font-sans drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            Building Digital <br /> Realities
          </h2>
          <p className="mt-8 text-white/90 font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs max-w-xl select-none drop-shadow-lg">
            Where engineering intersects luxury aesthetic
          </p>
        </motion.div>
      )}
      
      {/* Small corner detail */}
      <div className="absolute bottom-6 right-6 text-zinc-700 text-[9px] font-bold tracking-[0.3em] uppercase z-30 pointer-events-none">
        03 // Interaction
      </div>
    </section>
  );
}
