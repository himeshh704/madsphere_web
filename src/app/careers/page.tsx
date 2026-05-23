"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextReveal } from "@/components/Animations";
import { ArrowUpRight, Plus, Minus } from "lucide-react";

const jobs = [
  { 
    title: "Senior Frontend Engineer", 
    type: "Full-time", 
    location: "Remote",
    desc: "We are looking for a highly skilled frontend engineer obsessed with animations, performance, and WebGL. You will lead the development of our flagship client projects, pushing the boundaries of what is possible on the web.",
    color: "#0047FF"
  },
  { 
    title: "Lead Product Designer", 
    type: "Full-time", 
    location: "New York / Hybrid",
    desc: "Shape the visual and interactive language of the world's most ambitious brands. You must have a portfolio that demonstrates extreme attention to detail, typography, and motion design.",
    color: "#FF007A"
  },
  { 
    title: "Growth Marketing Manager", 
    type: "Full-time", 
    location: "Remote",
    desc: "Drive measurable, scalable growth for our top-tier clients. You need deep expertise in paid social, SEO, and conversion rate optimization. Data is your compass, creativity is your engine.",
    color: "#059669"
  },
];

export default function CareersPage() {
  const [activeJob, setActiveJob] = useState<number | null>(null);

  return (
    <main className="pt-40 pb-32 min-h-screen relative transition-colors duration-700 ease-in-out" 
          style={{ backgroundColor: activeJob !== null ? jobs[activeJob].color : 'var(--background)' }}>
      
      {/* Background Dimmer when a job is active */}
      <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${activeJob !== null ? 'opacity-90 bg-black' : 'opacity-0'}`} />

      <div className="px-6 md:px-12 max-w-[1400px] mx-auto relative z-10">
        <section className="flex flex-col gap-6 max-w-4xl mb-24 md:mb-32">
          <h1 className="text-5xl sm:text-6xl md:text-[8rem] font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 leading-[0.85] mix-blend-difference text-white">
            <TextReveal>Join the</TextReveal><br/>
            <TextReveal>madness.</TextReveal>
          </h1>
        </section>

        <section className="border-t-2 border-zinc-900 dark:border-white/20">
          {jobs.map((job, idx) => {
            const isActive = activeJob === idx;
            return (
              <div 
                key={idx} 
                className={`border-b-2 border-zinc-900 dark:border-white/20 group transition-all duration-500 ${isActive ? 'py-12' : 'py-8 hover:px-6'}`}
                onMouseEnter={() => setActiveJob(idx)}
                onMouseLeave={() => setActiveJob(null)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between cursor-pointer" onClick={() => setActiveJob(isActive ? null : idx)}>
                  <div className="flex flex-col gap-2">
                    <h3 className={`text-2xl sm:text-3xl md:text-5xl font-bold uppercase tracking-tight transition-colors duration-300 ${isActive ? 'text-white' : 'text-zinc-900 dark:text-zinc-50 group-hover:text-zinc-500'}`}>
                      {job.title}
                    </h3>
                    <div className={`flex items-center gap-3 md:gap-4 text-xs sm:text-sm md:text-base font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-white/60' : 'text-zinc-500'}`}>
                      <span>{job.type}</span>
                      <span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-current" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                  
                  <div className={`mt-6 md:mt-0 w-12 h-12 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isActive ? 'border-white bg-white text-black rotate-180' : 'border-zinc-900 dark:border-white text-zinc-900 dark:text-white group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black'}`}>
                    {isActive ? <Minus className="w-6 h-6 md:w-8 md:h-8" /> : <Plus className="w-6 h-6 md:w-8 md:h-8" />}
                  </div>
                </div>

                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-12 pb-4 grid grid-cols-1 md:grid-cols-2 gap-12">
                        <p className="text-lg md:text-2xl text-white/80 leading-relaxed font-serif">
                          {job.desc}
                        </p>
                        <div className="flex items-end justify-start md:justify-end">
                          <button className="flex items-center gap-3 md:gap-4 bg-[#0047FF] text-white px-6 py-4 md:px-10 md:py-5 rounded-full text-base md:text-lg font-bold uppercase tracking-widest hover:scale-105 transition-transform">
                            Apply Now <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}
