"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { TextReveal, Tilt3D, MagneticWrap } from "@/components/Animations";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import Marquee from "@/components/Marquee";
import { works, process, clients } from "@/data/site";

function SectionTag({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 border-l border-zinc-300 dark:border-zinc-700 pl-4">
      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-sm" />
      {label}
    </span>
  );
}

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

export default function WorksPage() {
  const router = useRouter();
  const containerRef = useRef(null);
  const tabs = ["All", "Branding", "Design", "Development"] as const;
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("All");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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
    <main className="pt-32 md:pt-40 pb-32 min-h-screen px-4 sm:px-8 md:px-16 max-w-[1700px] mx-auto overflow-hidden" ref={containerRef}>
      
      {/* 1. Header Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24">
        <div className="lg:col-span-7">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[7rem] font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 leading-none">
            <TextReveal>Featured Work</TextReveal>
          </h1>
        </div>
        <div className="lg:col-span-5 flex flex-col gap-4 items-start lg:pt-6">
          <SectionTag label="Work Portfolio" />
          <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 max-w-md leading-relaxed">
            Add styling dynamically, drag, click, and customize to design portfolio layouts.
          </p>
        </div>
      </section>

      {/* 2. Philosophy & Marquee Section */}
      <section className="flex flex-col items-center text-center gap-6 max-w-4xl mx-auto mb-16">
        <SectionTag label="Our Clients" />
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 leading-tight">
          <TextReveal>We Play at the intersection of creativity & engineering</TextReveal>
        </h2>
        <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
          From emerging artists to globally established brands, we help bring wonder to every corner of the world. Here are some of the projects we&apos;ve executed for our clients.
        </p>
      </section>

      {/* Client List Marquee */}
      <div className="relative z-10 border-y border-zinc-200 dark:border-zinc-800 overflow-hidden mb-24">
        <Marquee items={clients} speed={30} />
      </div>

      {/* 3. Works Masonry Grid (White Rounded Box Wrapper) */}
      <section className="w-full bg-white dark:bg-[#070708] border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-6 sm:p-10 md:p-16 shadow-2xl mb-28">
        <div className="flex flex-col gap-4 mb-12">
          <div className="flex items-center flex-wrap gap-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 leading-none">
              The world is our Playground
            </h2>
            <SectionTag label="Our Works" />
          </div>
          <p className="text-xs sm:text-sm md:text-base text-zinc-500 dark:text-zinc-400 max-w-3xl leading-relaxed">
            Our agency is a dedicated outreach to brands that aim to create stop-and-stare wonder. We bring the best of imagination and engineering in the same room to create innovative experiences for global audiences through digital executions.
          </p>
        </div>

        {/* Tabs Filter Selector */}
        <div className="flex gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-16 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-bold tracking-wider uppercase transition-colors relative pb-4 -mb-4 focus-visible:outline-none cursor-pointer ${
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
      </section>

      {/* 4. How We Work Section */}
      <section className="relative z-10 py-20 px-4 md:px-0 max-w-[1400px] mx-auto mb-24">
        <div className="flex items-center gap-4 mb-20">
          <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            <TextReveal>How We Work</TextReveal>
          </h2>
          <SectionTag label="Working Process" />
        </div>

        <div className="relative w-full">
          {/* Dotted lines connecting process steps on desktop */}
          <svg className="absolute top-0 left-0 w-full h-[350px] pointer-events-none hidden lg:block z-0" viewBox="0 0 1200 350" preserveAspectRatio="none">
            <motion.path
              d="M 270,100 C 300,100 300,196 330,196"
              fill="none"
              stroke="currentColor"
              className="text-[#0047FF]/40 dark:text-[#0047FF]/50"
              strokeWidth="2"
              strokeDasharray="6,6"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                pathLength: { duration: 0.5, delay: isDesktop ? 0.45 : 0, ease: "easeInOut" },
                opacity: { duration: 0.2, delay: isDesktop ? 0.45 : 0 }
              }}
            />
            <motion.path
              d="M 570,196 C 600,196 600,100 630,100"
              fill="none"
              stroke="currentColor"
              className="text-[#0047FF]/40 dark:text-[#0047FF]/50"
              strokeWidth="2"
              strokeDasharray="6,6"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                pathLength: { duration: 0.5, delay: isDesktop ? 1.25 : 0, ease: "easeInOut" },
                opacity: { duration: 0.2, delay: isDesktop ? 1.25 : 0 }
              }}
            />
            <motion.path
              d="M 870,100 C 900,100 900,196 930,196"
              fill="none"
              stroke="currentColor"
              className="text-[#0047FF]/40 dark:text-[#0047FF]/50"
              strokeWidth="2"
              strokeDasharray="6,6"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                pathLength: { duration: 0.5, delay: isDesktop ? 2.05 : 0, ease: "easeInOut" },
                opacity: { duration: 0.2, delay: isDesktop ? 2.05 : 0 }
              }}
            />
          </svg>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start relative z-10" style={{ perspective: "1000px" }}>
            {process.map(({ step, title, desc, img }, i) => {
              const cardDelay = isDesktop ? i * 0.8 : i * 0.15;
              return (
                <motion.div
                  key={step}
                  initial={{ 
                    opacity: 0, 
                    x: isDesktop ? -40 : 0, 
                    y: isDesktop ? 0 : 30,
                    rotateY: isDesktop ? -15 : 0 
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0, 
                    y: 0,
                    rotateY: 0 
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 0.8, 
                    delay: cardDelay, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="flex flex-col gap-4"
                  style={{ marginTop: isDesktop && i % 2 === 1 ? "6rem" : 0 }}
                >
                  <Tilt3D className="p-7 border border-zinc-200 dark:border-zinc-800 rounded-xl flex flex-col gap-3 cursor-pointer bg-white/80 dark:bg-black/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-[10px] font-bold text-zinc-400">[STEP — {step}]</span>
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">{desc}</p>
                  </Tilt3D>
                  <Tilt3D className="aspect-square rounded-xl overflow-hidden shadow-sm">
                    <ParallaxImg src={img} alt={title} className="w-full h-full" />
                  </Tilt3D>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Client Stories (Testimonials) Section */}
      <section className="relative z-10 py-20 px-4 md:px-0 max-w-[1400px] mx-auto border-t border-zinc-100 dark:border-zinc-800 mb-20">
        <div className="flex items-center gap-4 mb-14">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            <TextReveal>Client Stories</TextReveal>
          </h2>
          <SectionTag label="Testimonial" />
        </div>
        <TestimonialCarousel />
      </section>

      {/* 6. Careers Banner Section */}
      <section className="relative w-full bg-[#050505] rounded-[2rem] p-12 md:p-20 overflow-hidden shadow-2xl flex flex-col items-center text-center">
        {/* Abstract design elements/glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full opacity-[0.08] pointer-events-none"
             style={{ background: "radial-gradient(circle, #0047FF 0%, transparent 70%)" }} />
        
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4 relative z-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <span>Send us</span>
          <span className="inline-flex w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-white/20 align-middle shadow-md rotate-[-6deg] shrink-0">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&fit=crop" className="w-full h-full object-cover" alt="" />
          </span>
          <span>your CV at</span>
          <span className="inline-flex w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-white/20 align-middle shadow-md rotate-[6deg] shrink-0">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&fit=crop" className="w-full h-full object-cover" alt="" />
          </span>
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-zinc-400 max-w-lg mb-10 relative z-10">
          Tell us your goals, and we&apos;ll help you design the perfect creative solution.
        </p>

        <MagneticWrap className="relative z-10">
          <motion.button
            onClick={() => window.location.href = "mailto:hello@madsphere.in?subject=Job Inquiry / CV Submission"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 350, damping: 15 }}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold uppercase tracking-wider px-8 py-3 rounded-full text-xs sm:text-sm transition-colors flex items-center gap-3 cursor-pointer shadow-lg shadow-yellow-500/20"
          >
            hello@madsphere.in
            <span className="w-6 h-6 sm:w-7 h-7 bg-white text-black rounded-full flex items-center justify-center shrink-0">
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </motion.button>
        </MagneticWrap>
      </section>

    </main>
  );
}
