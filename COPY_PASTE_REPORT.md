# MadSphere Reusable UI Component & Copy-Paste Report

This report serves as a quick-reference guide containing ready-to-copy code snippets for core brand modules, layouts, and animations used throughout the MadSphere platform. Developers can copy-paste these blocks to duplicate sections, extend grids, or spin up new pages.

---

## 1. Core Visual Accents & Tags

### A. Pill Section Tag
A standardized, high-contrast section divider/tag with a yellow square bullet.
```tsx
function SectionTag({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 border-l border-zinc-300 dark:border-zinc-700 pl-4">
      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-sm" />
      {label}
    </span>
  );
}
```

### B. Standard CTA Spring Button
A standard high-performance blue button configured with Framer Motion spring physics.
```tsx
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

<MagneticWrap>
  <motion.button
    onClick={() => router.push('/works')}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.96 }}
    transition={{ type: "spring", stiffness: 350, damping: 15 }}
    className="flex items-center gap-3 bg-[#0047FF] hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-widest px-8 py-3 rounded-full transition-colors shadow-xl shadow-blue-500/20 cursor-pointer"
  >
    View All Work <ArrowRight className="w-4 h-4" />
  </motion.button>
</MagneticWrap>
```

---

## 2. Animation & Interaction Wrappers

### A. Letter-by-Letter Text Reveal (`TextReveal`)
Splits text into words and reveals them sequentially on scroll with a 3D perspective rotation.
```tsx
import { TextReveal } from "@/components/Animations";

<h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
  <TextReveal>Featured Work</TextReveal>
</h2>
```

### B. Touch-Optimized 3D Card Tilt (`TiltCard`)
A high-fidelity hover-tilt wrapper that automatically disables transform style properties on touch-pointer viewports to guarantee scroll smoothness.
```tsx
import { motion, useSpring, useMotionValue } from "framer-motion";

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    const r = e.currentTarget.getBoundingClientRect();
    rx.set(((e.clientY - r.top - r.height / 2) / r.height) * -20);
    ry.set(((e.clientX - r.left - r.width / 2) / r.width) * 20);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };
  
  return (
    <motion.div 
      style={{ 
        rotateX: isTouch ? undefined : rx, 
        rotateY: isTouch ? undefined : ry, 
        transformPerspective: isTouch ? undefined : 1000 
      }} 
      onMouseMove={onMove} 
      onMouseLeave={onLeave} 
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

### C. Touch-Optimized Scroll Parallax Image (`ParallaxImg`)
Bypasses scroll transforms and coordinate updates on mobile breakpoints (`< 768px`) to ensure lag-free scrolling.
```tsx
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function ParallaxImg({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    let active = true;
    setIsMobile(window.innerWidth < 768);
    setTimeout(() => { if (active) setMounted(true); }, 0);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      active = false;
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1.05, 1.2]);

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.img 
        src={src} 
        alt={alt} 
        style={{ 
          y: (mounted && !isMobile) ? y : undefined, 
          scale: (mounted && !isMobile) ? scale : undefined 
        }} 
        className="w-full h-full object-cover" 
      />
    </div>
  );
}
```

---

## 3. Structural Page Sections

### A. Brand Logo Marquee
```tsx
import Marquee from "@/components/Marquee";

const clients = ["Galileo", "Euphoria", "Europa", "GlobalBank", "Goodwell"];

<div className="relative z-10 border-y border-zinc-200 dark:border-zinc-800 overflow-hidden py-4">
  <Marquee items={clients} speed={30} />
</div>
```

### B. White-Boxed Masonry Grid Wrapper
A template wrapper for nesting grid elements inside a floating, drop-shadowed box container.
```tsx
<section className="w-full bg-white dark:bg-[#070708] border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-6 sm:p-10 md:p-16 shadow-2xl">
  {/* Header */}
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
    <div className="flex flex-col gap-3">
      <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Grid Block Title</h2>
      <p className="text-sm text-zinc-500">Subtitle and descriptive text goes here.</p>
    </div>
    <SectionTag label="Tag Label" />
  </div>

  {/* Grid Content */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {/* Columns stack dynamically */}
  </div>
</section>
```

### C. Careers Inquiry Banner
A clean dark banner containing team member avatars and a call-to-action button.
```tsx
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MagneticWrap } from "@/components/Animations";

<section className="relative w-full bg-[#050505] rounded-[2rem] p-12 md:p-20 overflow-hidden shadow-2xl flex flex-col items-center text-center">
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full opacity-[0.08]"
       style={{ background: "radial-gradient(circle, #0047FF 0%, transparent 70%)" }} />
  
  <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 relative z-10">
    Send us your CV at
  </h2>

  {/* Overlapping Avatars */}
  <div className="flex items-center -space-x-4 mb-10 relative z-10">
    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&fit=crop" className="w-12 h-12 rounded-full border-2 border-black object-cover" alt="" />
    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&fit=crop" className="w-12 h-12 rounded-full border-2 border-black object-cover" alt="" />
    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&fit=crop" className="w-12 h-12 rounded-full border-2 border-black object-cover" alt="" />
    <div className="w-12 h-12 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center text-xs font-bold text-white">
      +12
    </div>
  </div>

  <MagneticWrap className="relative z-10">
    <motion.button
      onClick={() => router.push("/careers")}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 350, damping: 15 }}
      className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold uppercase tracking-widest px-8 py-3.5 rounded-full text-xs transition-colors flex items-center gap-3 cursor-pointer shadow-lg shadow-yellow-500/20"
    >
      Inquire Now <ArrowRight className="w-4 h-4" />
    </motion.button>
  </MagneticWrap>
</section>
```
