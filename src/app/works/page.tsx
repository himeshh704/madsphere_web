"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { TextReveal } from "@/components/Animations";
import { works } from "@/data/site";

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    const r = e.currentTarget.getBoundingClientRect();
    rx.set(((e.clientY - r.top - r.height / 2) / r.height) * -20); // Extrreme tilt
    ry.set(((e.clientX - r.left - r.width / 2) / r.width) * 20);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };
  
  return (
    <motion.div 
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }} 
      onMouseMove={onMove} 
      onMouseLeave={onLeave} 
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function WorksPage() {
  const containerRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <main className="pt-40 pb-32 min-h-screen px-6 md:px-12 max-w-[1800px] mx-auto overflow-hidden" ref={containerRef}>
      <section className="flex flex-col gap-6 max-w-4xl mb-16 md:mb-24">
        <h1 className="text-5xl sm:text-6xl md:text-[8rem] font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 leading-[0.85]">
          <TextReveal>The Archive.</TextReveal>
        </h1>
        <p className="text-xl md:text-2xl text-zinc-500 max-w-2xl font-serif italic mt-6">
          A curated selection of our finest engineering and design accomplishments.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
        
        <motion.div style={{ y: isDesktop ? y1 : undefined }} className="flex flex-col gap-12 md:gap-32 md:mt-24">
          {works.filter((_, i) => i % 2 === 0).map((work) => (
            <TiltCard key={work.id} className="group relative rounded-3xl overflow-hidden aspect-[4/5] md:aspect-[3/4] cursor-pointer">
              <img 
                src={work.img} 
                alt={work.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-x-4 bottom-4 translate-y-0 opacity-100 md:translate-y-8 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 ease-[0.16,1,0.3,1] z-10">
                <div className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 p-4 md:p-6 rounded-2xl flex justify-between items-end">
                  <div>
                    <h3 className="text-white text-2xl md:text-3xl font-bold">{work.title}</h3>
                    <p className="text-white/70 text-xs md:text-sm mt-1 md:mt-2">{work.tags}</p>
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-black font-bold">
                    →
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
            </TiltCard>
          ))}
        </motion.div>

        <motion.div style={{ y: isDesktop ? y2 : undefined }} className="flex flex-col gap-12 md:gap-32">
          {works.filter((_, i) => i % 2 === 1).map((work) => (
            <TiltCard key={work.id} className="group relative rounded-3xl overflow-hidden aspect-[4/5] md:aspect-[3/4] cursor-pointer">
              <img 
                src={work.img} 
                alt={work.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-x-4 bottom-4 translate-y-0 opacity-100 md:translate-y-8 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 ease-[0.16,1,0.3,1] z-10">
                <div className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 p-4 md:p-6 rounded-2xl flex justify-between items-end">
                  <div>
                    <h3 className="text-white text-2xl md:text-3xl font-bold">{work.title}</h3>
                    <p className="text-white/70 text-xs md:text-sm mt-1 md:mt-2">{work.tags}</p>
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-black font-bold">
                    →
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
            </TiltCard>
          ))}
        </motion.div>

      </section>
    </main>
  );
}
