"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { TextReveal } from "@/components/Animations";
import { works } from "@/data/site";

function SectionTag({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 border-l border-zinc-300 dark:border-zinc-700 pl-4">
      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-sm" />
      {label}
    </span>
  );
}

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    const r = e.currentTarget.getBoundingClientRect();
    rx.set(((e.clientY - r.top - r.height / 2) / r.height) * -20); // Extreme tilt
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
  const tabs = ["All", "Branding", "Design", "Development"] as const;
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("All");

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const filteredWorks = works.filter((work) => {
    if (activeTab === "All") return true;
    return (work.categories as readonly string[]).includes(activeTab);
  });

  return (
    <main className="pt-40 pb-32 min-h-screen px-6 md:px-12 max-w-[1800px] mx-auto overflow-hidden" ref={containerRef}>
      <section className="flex flex-col gap-6 max-w-5xl mb-12">
        <div className="flex items-center gap-4 mb-2">
          <SectionTag label="Our Works" />
        </div>
        <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 leading-[0.95]">
          <TextReveal>The world is our Playground</TextReveal>
        </h1>
        <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 max-w-3xl leading-relaxed mt-4">
          Our agency is a dedicated outreach to brands that aim to create stop-and-stare wonder. We bring the best of imagination and engineering in the same room to create innovative experiences for global audiences through digital executions.
        </p>
      </section>

      {/* Tabs Filter Selector */}
      <div className="flex gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-16 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm font-bold tracking-wider uppercase transition-colors relative pb-4 -mb-4 focus-visible:outline-none ${
              activeTab === tab 
                ? "text-blue-600 dark:text-blue-500" 
                : "text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-300"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div 
                layoutId="activeTabBorder" 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-500" 
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
        
        <motion.div style={{ y: isDesktop ? y1 : undefined }} className="flex flex-col gap-12 md:gap-32 md:mt-24">
          <AnimatePresence mode="popLayout">
            {filteredWorks.filter((_, i) => i % 2 === 0).map((work) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <TiltCard className="group relative rounded-3xl overflow-hidden aspect-[4/5] md:aspect-[3/4] cursor-pointer">
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
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div style={{ y: isDesktop ? y2 : undefined }} className="flex flex-col gap-12 md:gap-32">
          <AnimatePresence mode="popLayout">
            {filteredWorks.filter((_, i) => i % 2 === 1).map((work) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <TiltCard className="group relative rounded-3xl overflow-hidden aspect-[4/5] md:aspect-[3/4] cursor-pointer">
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
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </section>
    </main>
  );
}
