"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

const GalileoIcon = () => (
  <svg className="w-5 h-5 mr-2 text-zinc-400 dark:text-zinc-600 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="12" cy="12" r="4" fill="currentColor" />
  </svg>
);

const EuphoriaIcon = () => (
  <svg className="w-5 h-5 mr-2 text-zinc-400 dark:text-zinc-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="4" fill="currentColor" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1l2.1-2.1M17 7l2.1-2.1" />
  </svg>
);

const EuropaIcon = () => (
  <svg className="w-5 h-5 mr-2 text-zinc-400 dark:text-zinc-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const GlobalBankIcon = () => (
  <svg className="w-5 h-5 mr-2 text-zinc-400 dark:text-zinc-600 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 12l10 10 10-10L12 2zm0 4.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11z" />
  </svg>
);

const IkigaiIcon = () => (
  <svg className="w-6 h-5 mr-2 text-zinc-400 dark:text-zinc-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="10" rx="5" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

const GoodwellIcon = () => (
  <svg className="w-5 h-5 mr-2 text-zinc-400 dark:text-zinc-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M18 10h-4a4 4 0 1 0 0 8h4v-8z" />
    <path d="M6 14h4a4 4 0 1 0 0-8H6v8z" />
  </svg>
);
import { useRouter } from "next/navigation";
import { Play } from "lucide-react";
import Marquee from "@/components/Marquee";
import ExpertiseScroll from "@/components/ExpertiseScroll";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { TextReveal, AnimatedCounter, MagneticWrap, Tilt3D } from "@/components/Animations";
import { fadeUp, stagger, slideIn } from "@/lib/motion";
import { heroCards, socials, stats, works, process, clients } from "@/data/site";

function ParallaxImg({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  
  useEffect(() => {
    let active = true;
    setTimeout(() => {
      if (active) {
        setMounted(true);
        setIsDesktop(window.innerWidth >= 1024);
      }
    }, 0);
    const check = () => {
      if (active) setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", check);
    return () => {
      active = false;
      window.removeEventListener("resize", check);
    };
  }, []);
  
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1.05, 1.2]);
  
  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.img src={src} alt={alt} style={{ y: (mounted && isDesktop) ? y : undefined, scale: (mounted && isDesktop) ? scale : undefined }} className="w-full h-full object-cover" />
    </div>
  );
}



function SectionTag({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 border-l border-zinc-300 dark:border-zinc-700 pl-4">
      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-sm" />
      {label}
    </span>
  );
}

function parseStatNumber(val: string): { num: number; suffix: string } {
  const match = val.match(/^(\d+)(.*)$/);
  return match ? { num: parseInt(match[1]), suffix: match[2] } : { num: 0, suffix: val };
}

export default function Home() {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  
  const tabs = ["All", "Branding", "Design", "Development"] as const;
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("All");
  useEffect(() => {
    let active = true;
    setTimeout(() => { if (active) setMounted(true); }, 0);
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => {
      active = false;
      window.removeEventListener("resize", check);
    };
  }, []);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroRotate = useTransform(scrollYProgress, [0, 1], [0, 3]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <div className="relative overflow-x-hidden">
      {/* Hero */}
      <section id="home" ref={heroRef} className="relative z-10 pt-28 px-4 sm:px-8 max-w-[1700px] mx-auto" style={{ perspective: "1200px" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: mounted ? textY : undefined }}
          className="mb-5 px-1"
        >
          <img src="/logo.png" alt="Madsphere" className="h-16 md:h-24 w-auto dark:hidden" />
          <img src="/logo_white.png" alt="Madsphere" className="h-16 md:h-24 w-auto hidden dark:block" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, rotateX: 12, scale: 0.88, y: 80 }}
          animate={{ opacity: 1, rotateX: 0, scale: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ 
            rotateX: mounted ? heroRotate : undefined, 
            scale: mounted ? heroScale : undefined, 
            transformOrigin: "center top" 
          }}
          className="relative w-full rounded-[24px] overflow-hidden shadow-2xl"
        >
          <div style={{ height: "78vh", minHeight: 500 }} className="relative">
            <motion.div style={{ y: mounted ? bgY : undefined }} className="absolute inset-0 scale-110">
              <img src="/hero_gradient_bg.png" alt="" className="w-full h-full object-cover" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50" />

            <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
              {socials.map(({ label, href }, i) => (
                <MagneticWrap key={label}>
                  <motion.a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, x: isDesktop ? 40 : 0, y: isDesktop ? 0 : 20, rotateY: isDesktop ? 45 : 0 }}
                    animate={{ opacity: 1, x: 0, y: 0, rotateY: 0 }}
                    transition={{ delay: 1.2 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.12, rotateZ: 6 }}
                    className="w-10 h-10 bg-white/30 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center text-white text-sm font-semibold"
                    data-cursor
                  >
                    {label}
                  </motion.a>
                </MagneticWrap>
              ))}
            </div>

            <motion.div style={{ y: mounted ? textY : undefined }} className="absolute left-8 right-8 bottom-[120px] md:bottom-[130px] md:right-auto z-10 max-w-2xl">
              <h1 className="text-3xl md:text-5xl lg:text-6xl text-white font-semibold leading-[1.1] tracking-tight">
                <TextReveal>We make brands impossible to ignore.</TextReveal>
              </h1>
            </motion.div>

            {/* Desktop Hero Cards */}
            <motion.div
              variants={stagger(0.06)}
              initial="hidden"
              animate="show"
              className="absolute bottom-5 left-5 right-16 hidden md:flex gap-3 overflow-x-auto scrollbar-none z-10"
            >
              {heroCards.map((card) => (
                <motion.div
                  key={card.id}
                  variants={fadeUp}
                  whileHover={{ y: -8, rotateZ: -2, scale: 1.06 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="shrink-0 flex items-center gap-3 bg-white/35 backdrop-blur-xl border border-white/25 rounded-xl px-3 py-2 cursor-pointer"
                  style={{ minWidth: 200 }}
                  data-cursor
                >
                  <img src={card.img} alt={card.label} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-white/60">({card.id})</p>
                    <p className="text-sm font-bold text-white leading-tight">{card.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile Hero Cards Auto-scrolling Marquee */}
            <div 
              className="absolute bottom-5 left-5 right-5 flex md:hidden overflow-hidden z-10"
              style={{
                maskImage: "linear-gradient(to right, transparent, white 8%, white 92%, transparent)",
                WebkitMaskImage: "linear-gradient(to right, transparent, white 8%, white 92%, transparent)"
              }}
            >
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, repeatType: "loop", duration: 15, ease: "linear" }}
                className="flex gap-3 shrink-0"
                style={{ width: "fit-content" }}
              >
                {[...heroCards, ...heroCards].map((card, idx) => (
                  <div
                    key={`${card.id}-${idx}`}
                    className="shrink-0 flex items-center gap-3 bg-white/35 backdrop-blur-xl border border-white/25 rounded-xl px-3 py-2"
                    style={{ width: 180 }}
                  >
                    <img src={card.img} alt={card.label} className="w-11 h-11 rounded-lg object-cover shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[9px] font-bold text-white/60">({card.id})</p>
                      <p className="text-xs font-bold text-white leading-tight truncate">{card.label}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Marquee */}
      <div className="relative z-10 mt-16 border-y border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <Marquee items={clients} speed={40} />
      </div>

      {/* About */}
      <section id="about" className="relative z-10 py-28 px-6 md:px-16 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4 flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500"
              >
                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-sm" /> About Us
              </motion.span>
              <MagneticWrap>
                <motion.button
                  onClick={() => router.push('/about')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 350, damping: 15 }}
                  className="self-start flex items-center gap-3 bg-[#0047FF] hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full transition-colors shadow-xl shadow-blue-500/20 cursor-pointer"
                  data-cursor
                >
                  Read More
                  <span className="w-5 h-5 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-3 h-3 fill-[#0047FF] text-[#0047FF] ml-0.5" />
                  </span>
                </motion.button>
              </MagneticWrap>
            </div>

            <motion.div
              variants={stagger(0.15)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col gap-8"
            >
              {stats.map(({ value, label }) => {
                const { num, suffix } = parseStatNumber(value);
                return (
                  <motion.div key={value} variants={slideIn("left")}>
                    <p className="text-5xl font-bold tracking-tighter">
                      <AnimatedCounter target={num} suffix={suffix} />
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">{label}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-10">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold leading-[1.15]"
            >
              <TextReveal>We&apos;ve helped startups, scale-ups, and established brands cut through the noise</TextReveal>
            </motion.h2>

            <div className="flex flex-col sm:flex-row gap-4 h-[280px] sm:h-[380px]" style={{ perspective: "1000px" }}>
              <motion.div
                initial={{ opacity: 0, rotateY: isDesktop ? -25 : 0, x: isDesktop ? -50 : 0, y: isDesktop ? 0 : 40 }}
                whileInView={{ opacity: 1, rotateY: 0, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 min-h-0"
              >
                <Tilt3D className="w-full h-full rounded-xl overflow-hidden">
                  <ParallaxImg src="https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=900&fit=crop" alt="" className="w-full h-full" />
                </Tilt3D>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, rotateY: isDesktop ? 25 : 0, x: isDesktop ? 50 : 0, y: isDesktop ? 0 : 40 }}
                whileInView={{ opacity: 1, rotateY: 0, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="sm:w-[44%] min-h-0"
              >
                <Tilt3D className="w-full h-full rounded-xl overflow-hidden">
                  <ParallaxImg src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&fit=crop" alt="" className="w-full h-full" />
                </Tilt3D>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section id="services" className="relative z-10 border-t border-zinc-100 dark:border-zinc-800">
        <ExpertiseScroll />
      </section>

      {/* Work & Clients Section */}
      <section id="works" className="relative z-10 py-24 bg-[#f4f4f5]/60 dark:bg-[#0a0a0b] border-t border-zinc-100 dark:border-zinc-900">
        {/* Header Line for Featured Work */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 mb-16">
          <div className="flex items-center gap-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 shrink-0">
              Featured Work
            </h2>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>

        {/* Our Clients Block */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-16 mb-24 text-center">
          <div className="flex justify-center mb-6">
            <SectionTag label="Our Clients" />
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 max-w-4xl mx-auto leading-[1.1] mb-6">
            We Play at the intersection of creativity & engineering
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
            From emerging artists to globally established brands, we help bring wonder to every corner of the world. Here are some of the projects we&apos;ve executed for our clients.
          </p>
          
          {/* Client Logos Row */}
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-zinc-400 dark:text-zinc-500 font-medium text-lg mt-12 px-6">
            <div className="flex items-center hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              <GalileoIcon /> Galileo
            </div>
            <div className="flex items-center hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              <EuphoriaIcon /> Euphoria
            </div>
            <div className="flex items-center hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              <EuropaIcon /> Europa
            </div>
            <div className="flex items-center hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              <GlobalBankIcon /> GlobalBank
            </div>
            <div className="flex items-center hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              <IkigaiIcon /> Ikigai Labs
            </div>
            <div className="flex items-center hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              <GoodwellIcon /> Goodwell
            </div>
          </div>
        </div>

        {/* The world is our Playground Works Card Container */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 mb-12">
          <div className="bg-white dark:bg-[#111112] border border-zinc-200/60 dark:border-zinc-800/80 rounded-[32px] p-6 md:p-12 shadow-xl shadow-zinc-100/50 dark:shadow-none">
            {/* Header: Title on Left, Tag on Right */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
              <div className="max-w-2xl">
                <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.05]">
                  The world is our Playground
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base mt-4 leading-relaxed">
                  Our agency is a dedicated outreach to brands that aim to create stop-and-stare wonder. We bring the best of imagination and engineering in the same room to create innovative experiences for global audiences through digital executions.
                </p>
              </div>
              <div className="shrink-0 self-start md:self-auto">
                <SectionTag label="Our Works" />
              </div>
            </div>

            {/* Tabs Filter Selector */}
            <div className="flex gap-6 border-b border-zinc-100 dark:border-zinc-800/80 pb-4 mb-12 overflow-x-auto scrollbar-none">
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
                      layoutId="activeTabBorderHome" 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-500" 
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {(() => {
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                  <div className="flex flex-col gap-6">
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
                          <Tilt3D className="group relative rounded-2xl overflow-hidden cursor-pointer w-full aspect-[4/5] sm:aspect-square md:aspect-[3/4]" data-cursor>
                            <motion.img
                              src={work.img}
                              alt={work.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute inset-x-3 bottom-3 translate-y-0 opacity-100 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300 z-10">
                              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 p-4 rounded-xl flex justify-between items-center w-full">
                                <div className="flex flex-col">
                                  <span className="text-white text-base font-bold leading-tight">{work.title}</span>
                                  <div className="h-px bg-white/20 w-12 my-1.5" />
                                  <span className="text-white/60 text-[9px] uppercase tracking-wider">{work.tags}</span>
                                </div>
                                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black text-sm font-bold shrink-0 ml-3">
                                  →
                                </div>
                              </div>
                            </div>
                          </Tilt3D>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <div className="flex flex-col gap-6 lg:mt-12">
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
                          <Tilt3D className="group relative rounded-2xl overflow-hidden cursor-pointer w-full aspect-[4/5] sm:aspect-square md:aspect-[3/4]" data-cursor>
                            <motion.img
                              src={work.img}
                              alt={work.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute inset-x-3 bottom-3 translate-y-0 opacity-100 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300 z-10">
                              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 p-4 rounded-xl flex justify-between items-center w-full">
                                <div className="flex flex-col">
                                  <span className="text-white text-base font-bold leading-tight">{work.title}</span>
                                  <div className="h-px bg-white/20 w-12 my-1.5" />
                                  <span className="text-white/60 text-[9px] uppercase tracking-wider">{work.tags}</span>
                                </div>
                                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black text-sm font-bold shrink-0 ml-3">
                                  →
                                </div>
                              </div>
                            </div>
                          </Tilt3D>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <div className="flex flex-col gap-6 lg:mt-24">
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
                          <Tilt3D className="group relative rounded-2xl overflow-hidden cursor-pointer w-full aspect-[4/5] sm:aspect-square md:aspect-[3/4]" data-cursor>
                            <motion.img
                              src={work.img}
                              alt={work.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute inset-x-3 bottom-3 translate-y-0 opacity-100 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300 z-10">
                              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 p-4 rounded-xl flex justify-between items-center w-full">
                                <div className="flex flex-col">
                                  <span className="text-white text-base font-bold leading-tight">{work.title}</span>
                                  <div className="h-px bg-white/20 w-12 my-1.5" />
                                  <span className="text-white/60 text-[9px] uppercase tracking-wider">{work.tags}</span>
                                </div>
                                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black text-sm font-bold shrink-0 ml-3">
                                  →
                                </div>
                              </div>
                            </div>
                          </Tilt3D>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-28 px-6 md:px-16 max-w-[1400px] mx-auto border-t border-zinc-100 dark:border-zinc-900">
        <div className="flex items-center gap-4 mb-20">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-4xl font-bold">
            <TextReveal>How We Work</TextReveal>
          </motion.h2>
          <SectionTag label="Working Process" />
        </div>

        <div className="relative w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start relative z-10 lg:grid-rows-5" style={{ perspective: "1000px" }}>
            {process.map(({ step, title, desc, img }, i) => {
              const cardDelay = isDesktop ? i * 0.3 : i * 0.15;
              return (
                <div key={step} className="contents">
                  {i % 2 === 0 ? (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: cardDelay, ease: [0.16, 1, 0.3, 1] }}
                        className={`w-full ${
                          i === 0 ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-3 lg:row-start-3"
                        }`}
                      >
                        <Tilt3D className="p-6 md:p-8 border border-zinc-200/60 dark:border-zinc-800/80 rounded-2xl flex flex-col justify-between cursor-pointer bg-white dark:bg-[#111112] shadow-sm hover:shadow-md transition-shadow w-full aspect-square">
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none">
                            (STEP - {step})
                          </span>
                          <div className="flex flex-col gap-2 mt-auto">
                            <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-50">{title}</h3>
                            <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{desc}</p>
                          </div>
                        </Tilt3D>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: cardDelay + 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className={`w-full ${
                          i === 0 ? "lg:col-start-1 lg:row-start-2" : "lg:col-start-3 lg:row-start-4"
                        }`}
                      >
                        <Tilt3D className="rounded-2xl overflow-hidden shadow-sm aspect-square w-full">
                          <ParallaxImg src={img} alt={title} className="w-full h-full" />
                        </Tilt3D>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: cardDelay, ease: [0.16, 1, 0.3, 1] }}
                        className={`w-full ${
                          i === 1 ? "lg:col-start-2 lg:row-start-2" : "lg:col-start-4 lg:row-start-4"
                        }`}
                      >
                        <Tilt3D className="rounded-2xl overflow-hidden shadow-sm aspect-square w-full">
                          <ParallaxImg src={img} alt={title} className="w-full h-full" />
                        </Tilt3D>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: cardDelay + 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className={`w-full ${
                          i === 1 ? "lg:col-start-2 lg:row-start-3" : "lg:col-start-4 lg:row-start-5"
                        }`}
                      >
                        <Tilt3D className="p-6 md:p-8 border border-zinc-200/60 dark:border-zinc-800/80 rounded-2xl flex flex-col justify-between cursor-pointer bg-white dark:bg-[#111112] shadow-sm hover:shadow-md transition-shadow w-full aspect-square">
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none">
                            (STEP - {step})
                          </span>
                          <div className="flex flex-col gap-2 mt-auto">
                            <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-50">{title}</h3>
                            <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{desc}</p>
                          </div>
                        </Tilt3D>
                      </motion.div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-24 px-6 md:px-16 max-w-[1400px] mx-auto border-t border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-4 mb-14">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl font-bold">
            <TextReveal>Client Stories</TextReveal>
          </motion.h2>
          <SectionTag label="Testimonial" />
        </div>
        <TestimonialCarousel />
      </section>


    </div>
  );
}
