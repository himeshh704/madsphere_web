"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence
} from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Play } from "lucide-react";
import Marquee from "@/components/Marquee";
import ExpertiseScroll from "@/components/ExpertiseScroll";
import { TextReveal, FloatingOrbs, Tilt3D, ScrollBlurReveal } from "@/components/Animations";
import { stagger } from "@/lib/motion";
import { heroCards, socials, process, clients } from "@/data/site";
import { cn } from "@/utils/cn";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ParallaxScrollFeatureSection } from "@/components/ui/parallax-scroll-feature-section";
// import TestimonialCarousel from "@/components/TestimonialCarousel";

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

  const { scrollYProgress } = useScroll({ target: mounted ? ref : undefined, offset: ["start end", "end start"] });
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



function SectionTag({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 border-l border-zinc-300 dark:border-zinc-700 pl-4">
      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-sm" />
      {label}
    </span>
  );
}


const cardVariants = {
  hidden: (isDesktop: boolean) => ({
    opacity: 0,
    x: 0,
    y: isDesktop ? 120 : 50,
    rotateY: isDesktop ? -10 : 0
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotateY: 0
  }
};

const whyChooseUsData = [
  {
    num: 1,
    label: "Valuing",
    highlight: "your time",
    explanation: "We respect your calendar. No bloated meetings or dragged timelines—just rapid prototyping, direct iteration, and swift launches.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    )
  },
  {
    num: 2,
    label: "Partnering in",
    highlight: "your success",
    explanation: "We view ourselves as strategic partners, not external vendors. Your product metrics and actual business growth are our core indicators of success.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    num: 3,
    label: "Delivering",
    highlight: "high-quality results",
    explanation: "Zero templates. Every line of code, animation transition, and visual element is custom crafted to elevate your brand to the highest premium tier.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
  },
  {
    num: 4,
    label: "Providing",
    highlight: "clear communication",
    explanation: "Direct Slack access, transparent milestone updates, and async video summaries. We cut through the standard agency fluff and keep it real.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    )
  },
  {
    num: 5,
    label: "Using the",
    highlight: "latest technology",
    explanation: "High-performance tech stacks (Next.js, Tailwind, Framer Motion) ensuring blazing fast page speeds, custom UI transitions, and perfect responsiveness.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    )
  },
  {
    num: 6,
    label: "Focusing on",
    highlight: "scalability",
    explanation: "Clean architectures built to scale from day one. Your digital platforms will remain robust as your user count and product features expand.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    )
  }
];

export default function Home() {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [activePill, setActivePill] = useState(1);
  const currentPillData = whyChooseUsData.find(p => p.num === activePill) || whyChooseUsData[0];
  const processRef = useRef<HTMLDivElement>(null);


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

  const { scrollYProgress: processScroll } = useScroll({
    target: mounted ? processRef : undefined,
    offset: ["start end", "end start"]
  });

  const path1Length = useTransform(processScroll, [0.25, 0.45], [0, 1]);
  const path2Length = useTransform(processScroll, [0.45, 0.65], [0, 1]);
  const path3Length = useTransform(processScroll, [0.65, 0.85], [0, 1]);

  const whyUsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: whyUsScroll } = useScroll({
    target: mounted ? whyUsRef : undefined,
    offset: ["start end", "end start"]
  });
  const arcLength = useTransform(whyUsScroll, [0.15, 0.45], [0, 1]);
  const { scrollYProgress } = useScroll({ target: mounted ? heroRef : undefined, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroRotate = useTransform(scrollYProgress, [0, 1], [0, 3]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <div className="relative overflow-x-clip">
      {/* Hero */}
      <section id="home" ref={heroRef} className="relative z-10 pt-28 px-4 sm:px-8 max-w-[1700px] mx-auto" style={{ perspective: "1200px" }}>

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
          <div style={{ height: "85vh", minHeight: 550 }} className="relative">
            <motion.div style={{ y: mounted ? bgY : undefined }} className="absolute inset-0 scale-110">
              <img src="/hero_gradient_bg.png" alt="" className="w-full h-full object-cover" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50" />
            {/* Bottom gradient — softly fades text before cards cover it */}
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-[5] pointer-events-none" />

            <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
              {socials.map(({ label, href }, i) => (
                <motion.a
                  key={label}
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
              ))}
            </div>

            <motion.div style={{ y: mounted ? textY : undefined }} className="absolute left-8 right-8 bottom-[150px] md:bottom-[160px] md:right-auto z-20 max-w-2xl">
              <h1 className="text-3xl md:text-5xl lg:text-6xl text-white font-semibold leading-[1.1] tracking-tight mb-3">
                <TextReveal>Brands That Can&apos;t Be Ignored.</TextReveal>
              </h1>
              <p className="text-sm md:text-base text-white/70 max-w-lg leading-relaxed font-sans hidden md:block">
                We help emerging brands build identity systems, digital experiences, and marketing that actually feels like them.
              </p>
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
                  variants={{
                    hidden: { opacity: 0, y: 28 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
                    hover: {}
                  }}
                  whileHover="hover"
                  transition={{ type: "spring", stiffness: 300 }}
                  className="shrink-0 flex items-center gap-3 bg-white/35 backdrop-blur-xl border border-white/25 rounded-xl px-3 py-2 cursor-pointer"
                  style={{ minWidth: 200 }}
                  data-cursor
                >
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-zinc-800">
                    <img 
                      src={card.img} 
                      alt={card.label} 
                      className="w-full h-full object-cover" 
                    />
                    {/* Blur strips — full width, strong blur, slide away on hover */}
                    <motion.div 
                      variants={{
                        hover: { 
                          opacity: 0,
                          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                        }
                      }}
                      initial={{ opacity: 1 }}
                      className="absolute inset-0 flex pointer-events-none overflow-hidden"
                    >
                      <motion.div 
                        variants={{ hover: { x: "-110%" } }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="w-[28%] h-full bg-blue-500/40 backdrop-blur-[10px] border-r border-blue-400/20 shrink-0" 
                      />
                      <motion.div 
                        variants={{ hover: { x: "-120%" } }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="w-[22%] h-full bg-indigo-500/35 backdrop-blur-[10px] border-r border-indigo-400/20 shrink-0" 
                      />
                      <motion.div 
                        variants={{ hover: { x: "-130%" } }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="w-[26%] h-full bg-violet-500/30 backdrop-blur-[10px] border-r border-violet-400/15 shrink-0" 
                      />
                      <motion.div 
                        variants={{ hover: { x: "-140%" } }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="w-[24%] h-full bg-purple-500/35 backdrop-blur-[10px] shrink-0" 
                      />
                    </motion.div>
                  </div>
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
                    <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-zinc-800">
                      <img 
                        src={card.img} 
                        alt={card.label} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
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
        <div className="flex items-center justify-center py-3 border-b border-zinc-100 dark:border-zinc-900">
          <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-zinc-400">Industries We Explore</span>
        </div>
        <Marquee items={clients} speed={50} />
      </div>

      {/* Intersection Section */}
      <section className="relative z-10 py-32 px-6 md:px-16 bg-white dark:bg-[#070708] border-b border-zinc-100 dark:border-zinc-900">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center gap-8">
          <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-sm" /> About Us
          </span>
          
          <ScrollBlurReveal className="max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.15] text-zinc-900 dark:text-zinc-50 font-sans">
              We Play at the intersection of creativity &amp; engineering
            </h2>
          </ScrollBlurReveal>

          <ScrollBlurReveal className="max-w-2xl flex flex-col gap-6">
            <p className="text-lg md:text-xl font-medium text-zinc-800 dark:text-zinc-200 font-sans leading-relaxed">
              Our agency is a dedicated outreach to brands that aim to create stop-and-stare wonder.
            </p>
            <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed">
              We bring the best of imagination and engineering in the same room to create innovative experiences for global audiences through digital and physical executions.
            </p>
          </ScrollBlurReveal>

          <motion.button
            onClick={() => router.push('/about')}
            whileHover="hover"
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 350, damping: 15 }}
            className="flex items-center gap-0 bg-[#0047FF] hover:bg-blue-700 text-white rounded-full pl-5 pr-1.5 py-1.5 text-xs font-bold uppercase tracking-widest mt-4 shadow-lg shadow-blue-500/20 cursor-pointer"
          >
            READ MORE
            <motion.span
              variants={{ hover: { x: 2 } }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="ml-3 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
            >
              <ArrowRight className="w-3 h-3 text-white" />
            </motion.span>
          </motion.button>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative z-10 py-28 px-6 md:px-16 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4 flex flex-col gap-8">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500"
            >
              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-sm" /> About Us
            </motion.span>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans"
            >
              A branding studio for founders and startups building something they actually believe in.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-3"
            >
              {["Brand Strategy", "Creative Design", "Social Media", "Website Design", "Digital Marketing"].map((s, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  <span className="w-1 h-1 rounded-full bg-[#0047FF] shrink-0" />
                  {s}
                </div>
              ))}
            </motion.div>

            <motion.button
              onClick={() => router.push('/about')}
              whileHover="hover"
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 350, damping: 15 }}
              className="self-start flex items-center gap-0 bg-[#0047FF] hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-widest pl-5 pr-1.5 py-1.5 rounded-full transition-colors shadow-xl shadow-blue-500/20 cursor-pointer"
              data-cursor
            >
              Who we are
              <motion.span
                variants={{ hover: { x: 2 } }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="ml-3 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0"
              >
                <Play className="w-2.5 h-2.5 fill-white text-white ml-0.5" />
              </motion.span>
            </motion.button>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-10">
            <h2 className="text-4xl md:text-5xl font-bold leading-[1.15] text-zinc-900 dark:text-zinc-50">
              <TextReveal>For brands that don&apos;t do ordinary.</TextReveal>
            </h2>

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

      {/* Why Choose Us Section */}
      <section ref={whyUsRef} className="relative z-10 py-32 px-6 md:px-16 bg-[#fcfcfc] dark:bg-[#070708] border-t border-zinc-100 dark:border-zinc-900">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center gap-12">
          
          <div className="flex flex-col items-center gap-4">
            <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500">
              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-sm" /> Why Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 max-w-2xl leading-tight font-sans">
              There are thousands of agencies, why choose us?
            </h2>
          </div>

          {/* SVG Arc and Icon */}
          <div className="relative w-full max-w-[600px] h-[160px] flex items-center justify-center overflow-visible mt-6">
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0" viewBox="0 0 600 200" preserveAspectRatio="none">
              {/* Background dotted arc */}
              <path
                d="M 50,200 A 250,200 0 0 1 550,200"
                fill="none"
                stroke="currentColor"
                className="text-zinc-200 dark:text-zinc-800"
                strokeWidth="2.5"
                strokeDasharray="6,6"
              />
              {/* Animated drawing arc */}
              <motion.path
                d="M 50,200 A 250,200 0 0 1 550,200"
                fill="none"
                stroke="#0047FF"
                strokeWidth="3"
                style={{ pathLength: arcLength }}
              />
            </svg>

            {/* Central Clock/Active Pill Icon Container */}
            <div className="absolute top-[30px] z-10 w-24 h-24 overflow-visible flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePill}
                  initial={{ x: 60, opacity: 0, scale: 0.9 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  exit={{ x: -60, opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="w-24 h-24 rounded-full bg-[#0047FF] shadow-2xl shadow-blue-500/30 flex items-center justify-center text-white cursor-pointer overflow-hidden"
                >
                  {/* Floating/bobbing hover-like animation for the active icon */}
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="flex items-center justify-center w-full h-full"
                  >
                    {currentPillData.icon}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Explanatory Narrative Content Wrapper */}
          <div className="min-h-[140px] md:min-h-[100px] flex items-center justify-center w-full max-w-3xl mt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePill}
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col gap-4 text-center"
              >
                <p className="text-base md:text-lg font-semibold text-zinc-950 dark:text-zinc-100 font-sans leading-relaxed">
                  {currentPillData.label} <span className="text-[#0047FF] font-bold">{currentPillData.highlight}</span>
                </p>
                <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed">
                  {currentPillData.explanation}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Staggered Interactive Numbered Pills */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.08
                }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-6"
          >
            {whyChooseUsData.map((pill) => {
              const isActive = activePill === pill.num;
              return (
                <motion.div
                  key={pill.num}
                  onClick={() => setActivePill(pill.num)}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 px-6 py-4 rounded-full border transition-all duration-300 font-sans text-xs font-semibold cursor-pointer shadow-sm ${
                    isActive 
                      ? "border-[#0047FF] bg-[#0047FF]/5 dark:bg-[#0047FF]/10 text-[#0047FF] shadow-md shadow-blue-500/5" 
                      : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#070708]/80 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 hover:shadow-md"
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors ${
                    isActive ? "bg-[#0047FF] text-white" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                  }`}>
                    {pill.num}
                  </span>
                  <span>
                    {pill.label} <strong className={`font-bold transition-colors ${isActive ? "text-[#0047FF]" : "text-zinc-950 dark:text-white"}`}>{pill.highlight}</strong>
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </section>

      {/* Expertise */}
      <section id="services" className="relative z-10 border-t border-zinc-100 dark:border-zinc-800">
        <ExpertiseScroll />
      </section>


      {/* Process Wrapper */}
      <div className="process-section-wrapper w-full relative z-10">
        <section 
          ref={processRef} 
          className="process-section relative w-full py-28 px-6 md:px-16 max-w-[1400px] mx-auto"
        >
        <div className="flex items-center gap-4 mb-20">
          <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            <TextReveal>How We Work</TextReveal>
          </h2>
          <SectionTag label="Process" />
        </div>

        <div className="w-full mt-10">
          <ParallaxScrollFeatureSection steps={process} />
        </div>
      </section>
      </div>

      {/* FOUNDER / BEHIND THE STUDIO \u2014 moved to About page, keep code here */}
      {/*
      <section className="relative z-10 py-28 px-6 md:px-16 bg-zinc-50 dark:bg-[#0a0a0a] border-t border-zinc-100 dark:border-zinc-800">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          <div className="lg:col-span-7 flex flex-col gap-8">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500"
            >
              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-sm" /> Behind the studio
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold leading-[1.15] text-zinc-900 dark:text-zinc-50">
              <TextReveal>We started this because we thought brands deserved more.</TextReveal>
            </h2>
            <div className="flex flex-col gap-5 text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans max-w-2xl">
              <p>MadSphere started with two people who were tired of seeing the same brand templates on every website. Same layouts. Same fonts. Same promise of &ldquo;we&rsquo;ll make you stand out&rdquo; &mdash; from agencies that all look the same.</p>
              <p>We wanted to build something different. A studio that treats every project like it matters, because to the person building that brand, it does.</p>
              <p>Are we young? Sure. But we&apos;re obsessive about the details. We&apos;re building this for founders who feel the same way about their work as we do about ours.</p>
            </div>
            <motion.button
              onClick={() => router.push('/about')}
              whileHover="hover"
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 350, damping: 15 }}
              className="self-start flex items-center gap-0 bg-zinc-900 dark:bg-zinc-100 hover:bg-black dark:hover:bg-white text-white dark:text-zinc-900 rounded-full pl-5 pr-1.5 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer shadow-lg"
              data-cursor
            >
              Meet the team
              <motion.span
                variants={{ hover: { x: 2 } }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="ml-3 w-6 h-6 rounded-full bg-white/20 dark:bg-black/10 flex items-center justify-center shrink-0"
              >
                <ArrowRight className="w-3 h-3 text-white dark:text-zinc-900" />
              </motion.span>
            </motion.button>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4" style={{ perspective: "1000px" }}>
            <motion.div initial={{ opacity: 0, y: 40, rotateY: -15 }} whileInView={{ opacity: 1, y: 0, rotateY: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
              <Tilt3D className="w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&fit=crop" alt="Founder" className="w-full h-full object-cover" />
              </Tilt3D>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 60, rotateY: 15 }} whileInView={{ opacity: 1, y: 0, rotateY: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }} className="mt-10">
              <Tilt3D className="w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&fit=crop" alt="Co-Founder" className="w-full h-full object-cover" />
              </Tilt3D>
            </motion.div>
          </div>

        </div>
      </section>
      */}

      {/* Testimonials (Hidden for launch)
      <section className="relative z-10 py-24 px-6 md:px-16 max-w-[1400px] mx-auto border-t border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-4 mb-14">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            <TextReveal>Client Stories</TextReveal>
          </h2>
          <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-sm" /> Testimonial
          </span>
        </div>
        <TestimonialCarousel />
      </section>
      */}

      {/* ──── Let’s Keep in Touch ─────────────────────────────────────── */}
      <section className="relative z-10 py-28 px-6 md:px-16 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-[#070708]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            <div className="flex flex-col gap-6 lg:sticky lg:top-32">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500"
              >
                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-sm" /> Get In Touch
              </motion.span>

              <h2 className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tighter text-zinc-900 dark:text-zinc-50">
                <TextReveal>Let&apos;s keep in touch.</TextReveal>
              </h2>

              <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed max-w-sm">
                Tell us what you&apos;re building and where you want to take it. We&apos;ll come back to you within 24 hours.
              </p>

              <div className="flex flex-col gap-3 mt-2">
                {["hello@madsphere.in", "Mumbai, India"].map((item, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="text-sm font-medium text-zinc-400 dark:text-zinc-500"
                  >
                    {item}
                  </motion.p>
                ))}
              </div>
            </div>

            <HomeContactForm />
          </div>
        </div>
      </section>

    </div>
  );
}

// ─── Inline Contact Form Component ────────────────────────────────────────────
function HomeContactForm() {
  const [hcf, setHcf] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [hcfSubmitting, setHcfSubmitting] = useState(false);
  const [hcfSuccess, setHcfSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setHcf(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHcfSubmitting(true);
    setTimeout(() => {
      setHcfSubmitting(false);
      setHcfSuccess(true);
      setHcf({ name: "", email: "", company: "", service: "", message: "" });
      setTimeout(() => setHcfSuccess(false), 5000);
    }, 1500);
  };

  const inp = "w-full px-5 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 outline-none focus:border-[#0047FF] focus:bg-white dark:focus:bg-zinc-900 transition-all duration-300 text-sm font-medium";

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input required name="name" value={hcf.name} onChange={handleChange} type="text" placeholder="Write your name" className={inp} />
        <input required name="email" value={hcf.email} onChange={handleChange} type="email" placeholder="Write your email" className={inp} />
      </div>

      <input name="company" value={hcf.company} onChange={handleChange} type="text" placeholder="Your company or brand name" className={inp} />

      <div className="relative">
        <select
          required name="service" value={hcf.service} onChange={handleChange}
          className={`${inp} appearance-none cursor-pointer pr-12 ${!hcf.service ? "text-zinc-400 dark:text-zinc-600" : ""}`}
        >
          <option value="" disabled>What can we help you with?</option>
          <option value="Brand Strategy">Brand Strategy</option>
          <option value="Creative Design">Creative Design</option>
          <option value="Website Design">Website Design</option>
          <option value="Social Media Marketing">Social Media Marketing</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="Video Production">Video Production</option>
          <option value="Something Else">Something Else</option>
        </select>
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 3.5L5 6.5L8 3.5" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>

      <textarea required name="message" value={hcf.message} onChange={handleChange} placeholder="Tell us a bit about your project..." rows={5} className={`${inp} resize-none`} />

      <motion.button
        type="submit"
        disabled={hcfSubmitting || hcfSuccess}
        whileHover="hover"
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 350, damping: 15 }}
        className={`self-start flex items-center gap-0 rounded-full pl-5 pr-1.5 py-1.5 text-white font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer shadow-xl ${hcfSuccess ? "bg-green-500 hover:bg-green-600 shadow-green-500/20" : "bg-[#0047FF] hover:bg-blue-700 shadow-blue-500/20"} disabled:opacity-70`}
      >
        {hcfSubmitting ? "Sending..." : hcfSuccess ? "Message sent" : "Send Message"}
        <motion.span
          variants={{ hover: { x: 2 } }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="ml-3 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0"
        >
          {hcfSubmitting ? (
            <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : hcfSuccess ? (
            <ArrowRight className="w-3 h-3 text-white" />
          ) : (
            <ArrowRight className="w-3 h-3 text-white" />
          )}
        </motion.span>
      </motion.button>
    </motion.form>
  );
}
