"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { TextReveal, Tilt3D, WordsSlideFromRight } from "@/components/Animations";
import { servicesHero, servicesList, aboutValues } from "@/data/site";
import FAQ from "@/components/FAQ";

// Replaced by data/site

export default function ServicesClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { scrollYProgress } = useScroll({ target: mounted ? containerRef : undefined, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  const [openService, setOpenService] = useState<string>("Brand Strategy");
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const handleMouseEnter = (id: string) => {
    if (typeof window !== "undefined" && window.matchMedia("(any-hover: hover)").matches) {
      setOpenService(id);
    }
  };

  const handleMouseLeave = () => {
    if (typeof window !== "undefined" && window.matchMedia("(any-hover: hover)").matches) {
      setOpenService("");
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#070708] pt-32 pb-8 md:pb-20 overflow-hidden" ref={containerRef}>
      
      {/* Hero */}
      <section className="px-6 md:px-16 max-w-[1400px] mx-auto text-center mb-16 relative z-10">
        <div className="flex justify-center items-center gap-2 mb-6">
          <span className="text-xl md:text-2xl font-bold tracking-tight">Our Expertise</span>
          <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 border-l border-zinc-300 dark:border-zinc-700 pl-4 ml-4">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-sm" /> Services
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 mb-12">
          <TextReveal>{servicesHero.title}</TextReveal>
        </h1>
        
        <Tilt3D className="w-full h-[30vh] md:h-[60vh] rounded-3xl overflow-hidden relative">
          <motion.div style={{ y }} className="w-full h-[150%] absolute -top-1/4">
            <img 
              src={servicesHero.img} 
              alt="Services Hero" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </Tilt3D>
      </section>

      {/* Services List */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-32 relative z-10">
        <div className="flex flex-col gap-4" onMouseLeave={handleMouseLeave}>
          {servicesList.map((service, idx) => {
            const isOpen = openService === service.id;
            const isOtherOpen = openService !== "" && !isOpen;
            return (
              <motion.div 
                key={service.id}
                onMouseEnter={() => handleMouseEnter(service.id)}
                onMouseLeave={handleMouseLeave}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                animate={{
                  opacity: isOtherOpen ? 0.35 : 1,
                  filter: isOtherOpen ? "blur(4px)" : "blur(0px)",
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="border-b border-zinc-200 dark:border-zinc-800 pb-8"
              >
                <div 
                  className="flex justify-between items-start py-6 cursor-pointer group gap-6"
                  onClick={() => setOpenService(isOpen ? "" : service.id)}
                >
                  <div className="flex flex-col gap-1.5">
                    <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white transition-colors group-hover:text-[#0047FF]">
                      {service.id}
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed max-w-xl">
                      {service.subtext}
                    </p>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-1 transition-colors ${isOpen ? 'bg-[#0047FF] text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500 group-hover:bg-[#0047FF] group-hover:text-white'}`}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      <path d="M7 1L7 13M7 13L1 7M7 13L13 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, filter: "blur(8px)" }}
                      animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                      exit={{ height: 0, opacity: 0, filter: "blur(8px)" }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 pt-4 pb-4">
                        {service.items.map((item, i) => (
                          <div key={i} className="flex gap-4">
                            <div className="w-5 h-5 rounded-full bg-[#0047FF] flex items-center justify-center shrink-0 mt-1 text-[10px] text-white font-bold">
                              {i + 1}
                            </div>
                            <div>
                              <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">{item.title}</h4>
                              <p className="text-sm text-zinc-500 leading-relaxed font-sans whitespace-pre-line">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 mb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start pt-8">

          {/* Left: animated heading */}
          <div className="flex flex-col gap-6">
            <motion.span
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500"
            >
              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-sm" /> Our core value
            </motion.span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50 max-w-md">
              <WordsSlideFromRight>Creating the</WordsSlideFromRight>
              <br />
              <WordsSlideFromRight delay={0.1}>Future Together</WordsSlideFromRight>
              <br />
              <WordsSlideFromRight delay={0.2}>Forward</WordsSlideFromRight>
            </h2>
          </div>

          {/* Right: animated value rows */}
          <div className="flex flex-col w-full divide-y divide-zinc-200/60 dark:divide-zinc-800/60 pt-8 lg:pt-0" onMouseLeave={() => setHoveredValue(null)}>
            {aboutValues.map((item, i) => {
              const isDimmed = hoveredValue !== null && hoveredValue !== i;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: i * 0.18, ease: [0.16, 1, 0.3, 1] }}
                  animate={{
                    opacity: isDimmed ? 0.35 : 1,
                    filter: isDimmed ? "blur(4px)" : "blur(0px)",
                  }}
                  onMouseEnter={() => setHoveredValue(i)}
                  className="flex flex-col md:flex-row gap-6 md:gap-12 items-start py-8 first:pt-0 last:pb-0 group cursor-default transition-all duration-300"
                >
                  {/* Left Column: Icon + label (Mission / Vision) */}
                  <div className="flex items-center gap-4 w-full md:w-56 shrink-0">
                    <motion.div
                      whileHover={{ rotate: 180, scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="w-10 h-10 rounded-full bg-[#0047FF] text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/25"
                    >
                      {/* White 4-pointed sparkle icon */}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0C12 6.62742 17.3726 12 24 12C17.3726 12 12 17.3726 12 24C12 17.3726 6.62742 12 0 12C6.62742 12 12 6.62742 12 0Z" fill="currentColor"/>
                      </svg>
                    </motion.div>
                    
                    <span className="text-base md:text-lg font-bold tracking-wide text-zinc-900 dark:text-zinc-100 group-hover:text-[#0047FF] transition-colors duration-300">
                      {item.label}
                    </span>
                  </div>

                  {/* Right Column: Title + Text description */}
                  <div className="flex-1 flex flex-col gap-2">
                    <h3 className="text-xl md:text-2xl font-extrabold text-zinc-950 dark:text-zinc-50 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      <FAQ />

    </main>
  );
}
