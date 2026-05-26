"use client";

import { useRef, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
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
  const tabs = ["All", "Branding", "Design", "Development"] as const;
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("All");

  const filteredWorks = works.filter((work) => {
    if (activeTab === "All") return true;
    return (work.categories as readonly string[]).includes(activeTab);
  });

  const col1: (typeof works)[number][] = [];
  const col2: (typeof works)[number][] = [];
  const col3: (typeof works)[number][] = [];
  
  if (filteredWorks.length === works.length) {
    const itemMap = new Map(filteredWorks.map(w => [w.id, w]));
    const id1 = ["01", "04", "06"] as const;
    const id2 = ["02", "05", "07"] as const;
    const id3 = ["03", "08", "09"] as const;
    
    id1.forEach(id => { const item = itemMap.get(id); if (item) col1.push(item); });
    id2.forEach(id => { const item = itemMap.get(id); if (item) col2.push(item); });
    id3.forEach(id => { const item = itemMap.get(id); if (item) col3.push(item); });
  } else {
    filteredWorks.forEach((item, idx) => {
      if (idx % 3 === 0) col1.push(item);
      else if (idx % 3 === 1) col2.push(item);
      else col3.push(item);
    });
  }

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        {/* Column 1 */}
        <div className="flex flex-col gap-8">
          <AnimatePresence mode="popLayout">
            {col1.map((work) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <TiltCard className="group relative rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-square md:aspect-[3/4] cursor-pointer">
                  <img 
                    src={work.img} 
                    alt={work.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-x-4 bottom-4 translate-y-0 opacity-100 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300 z-10">
                    <div className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 p-4 md:p-6 rounded-2xl flex justify-between items-center w-full">
                      <div className="flex flex-col">
                        <span className="text-white text-xl font-bold leading-tight">{work.title}</span>
                        <div className="h-px bg-white/20 w-12 my-1.5" />
                        <span className="text-white/70 text-xs uppercase tracking-wider">{work.tags}</span>
                      </div>
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-black font-bold shrink-0 ml-3">
                        →
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-8 lg:mt-16">
          <AnimatePresence mode="popLayout">
            {col2.map((work) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <TiltCard className="group relative rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-square md:aspect-[3/4] cursor-pointer">
                  <img 
                    src={work.img} 
                    alt={work.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-x-4 bottom-4 translate-y-0 opacity-100 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300 z-10">
                    <div className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 p-4 md:p-6 rounded-2xl flex justify-between items-center w-full">
                      <div className="flex flex-col">
                        <span className="text-white text-xl font-bold leading-tight">{work.title}</span>
                        <div className="h-px bg-white/20 w-12 my-1.5" />
                        <span className="text-white/70 text-xs uppercase tracking-wider">{work.tags}</span>
                      </div>
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-black font-bold shrink-0 ml-3">
                        →
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-8 lg:mt-32">
          <AnimatePresence mode="popLayout">
            {col3.map((work) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <TiltCard className="group relative rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-square md:aspect-[3/4] cursor-pointer">
                  <img 
                    src={work.img} 
                    alt={work.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-x-4 bottom-4 translate-y-0 opacity-100 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300 z-10">
                    <div className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 p-4 md:p-6 rounded-2xl flex justify-between items-center w-full">
                      <div className="flex flex-col">
                        <span className="text-white text-xl font-bold leading-tight">{work.title}</span>
                        <div className="h-px bg-white/20 w-12 my-1.5" />
                        <span className="text-white/70 text-xs uppercase tracking-wider">{work.tags}</span>
                      </div>
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-black font-bold shrink-0 ml-3">
                        →
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
