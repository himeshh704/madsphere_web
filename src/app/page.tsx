"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Play } from "lucide-react";
import Marquee from "@/components/Marquee";
import ExpertiseScroll from "@/components/ExpertiseScroll";
import { TextReveal, FloatingOrbs, MagneticWrap, Tilt3D } from "@/components/Animations";
import { stagger } from "@/lib/motion";
import { heroCards, socials, process, clients } from "@/data/site";
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

export default function Home() {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const processRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: processScrollY } = useScroll({
    target: processRef,
    offset: ["start end", "end start"]
  });

  // Card 0 (Step 1)
  const card0Opacity = useTransform(processScrollY, [0.05, 0.18], [0, 1]);
  const card0Y = useTransform(processScrollY, [0.05, 0.25], [200, 0]);
  const card0RotateY = useTransform(processScrollY, [0.05, 0.25], [-10, 0]);

  // Card 1 (Step 2)
  const card1Opacity = useTransform(processScrollY, [0.20, 0.33], [0, 1]);
  const card1Y = useTransform(processScrollY, [0.20, 0.45], [344, 0]);
  const card1RotateY = useTransform(processScrollY, [0.20, 0.45], [-10, 0]);

  // Card 2 (Step 3)
  const card2Opacity = useTransform(processScrollY, [0.40, 0.53], [0, 1]);
  const card2Y = useTransform(processScrollY, [0.40, 0.65], [536, 0]);
  const card2RotateY = useTransform(processScrollY, [0.40, 0.65], [-10, 0]);

  // Card 3 (Step 4)
  const card3Opacity = useTransform(processScrollY, [0.60, 0.73], [0, 1]);
  const card3Y = useTransform(processScrollY, [0.60, 0.85], [344, 0]);
  const card3RotateY = useTransform(processScrollY, [0.60, 0.85], [-10, 0]);

  // Paths
  const path1Length = useTransform(processScrollY, [0.20, 0.40], [0, 1]);
  const path1Opacity = useTransform(processScrollY, [0.20, 0.28], [0, 1]);

  const path2Length = useTransform(processScrollY, [0.40, 0.60], [0, 1]);
  const path2Opacity = useTransform(processScrollY, [0.40, 0.48], [0, 1]);

  const path3Length = useTransform(processScrollY, [0.60, 0.80], [0, 1]);
  const path3Opacity = useTransform(processScrollY, [0.60, 0.68], [0, 1]);

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
                    <motion.div 
                      variants={{
                        hover: { 
                          opacity: 0,
                          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                        }
                      }}
                      initial={{ opacity: 1 }}
                      className="absolute inset-y-0 left-0 w-[68%] flex pointer-events-none overflow-hidden"
                    >
                      <motion.div 
                        variants={{ hover: { x: "-110%" } }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="w-[30%] h-full bg-blue-500/15 backdrop-blur-[6px] border-r border-blue-400/20 shrink-0" 
                      />
                      <motion.div 
                        variants={{ hover: { x: "-120%" } }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="w-[20%] h-full bg-purple-500/12 backdrop-blur-[5px] border-r border-purple-400/15 shrink-0" 
                      />
                      <motion.div 
                        variants={{ hover: { x: "-130%" } }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="w-[25%] h-full bg-pink-500/10 backdrop-blur-[5px] border-r border-pink-400/15 shrink-0" 
                      />
                      <motion.div 
                        variants={{ hover: { x: "-140%" } }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="w-[25%] h-full bg-amber-500/15 backdrop-blur-[4px] shrink-0" 
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

            <MagneticWrap>
              <motion.button
                onClick={() => router.push('/about')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 350, damping: 15 }}
                className="self-start flex items-center gap-3 bg-[#0047FF] hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full transition-colors shadow-xl shadow-blue-500/20 cursor-pointer"
                data-cursor
              >
                Who we are
                <span className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <Play className="w-3 h-3 fill-[#0047FF] text-[#0047FF] ml-0.5" />
                </span>
              </motion.button>
            </MagneticWrap>
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

      {/* Expertise */}
      <section id="services" className="relative z-10 border-t border-zinc-100 dark:border-zinc-800">
        <ExpertiseScroll />
      </section>


      {/* Process */}
      <section ref={processRef} className="relative z-10 py-28 px-6 md:px-16 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 mb-20">
          <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            <TextReveal>How We Work</TextReveal>
          </h2>
          <SectionTag label="Process" />
        </div>

        <div className="relative w-full">
          {/* Dotted lines connecting process steps on desktop */}
          <svg className="absolute top-0 left-0 w-full h-[350px] pointer-events-none hidden lg:block z-0" viewBox="0 0 1200 350" preserveAspectRatio="none">
            {/* Step 1 -> Step 2 */}
            <motion.path
              d="M 270,100 C 300,100 300,196 330,196"
              fill="none"
              stroke="currentColor"
              className="text-[#0047FF]/40 dark:text-[#0047FF]/50"
              strokeWidth="2"
              strokeDasharray="6,6"
              style={{
                pathLength: (mounted && isDesktop) ? path1Length : undefined,
                opacity: (mounted && isDesktop) ? path1Opacity : undefined
              }}
              initial={mounted ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
              animate={(!isDesktop && mounted) ? { pathLength: 1, opacity: 1 } : undefined}
              transition={{
                pathLength: { duration: 0.6, ease: "easeInOut" },
                opacity: { duration: 0.2 }
              }}
            />
            {/* Step 2 -> Step 3 */}
            <motion.path
              d="M 570,196 C 600,196 600,100 630,100"
              fill="none"
              stroke="currentColor"
              className="text-[#0047FF]/40 dark:text-[#0047FF]/50"
              strokeWidth="2"
              strokeDasharray="6,6"
              style={{
                pathLength: (mounted && isDesktop) ? path2Length : undefined,
                opacity: (mounted && isDesktop) ? path2Opacity : undefined
              }}
              initial={mounted ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
              animate={(!isDesktop && mounted) ? { pathLength: 1, opacity: 1 } : undefined}
              transition={{
                pathLength: { duration: 0.6, ease: "easeInOut" },
                opacity: { duration: 0.2 }
              }}
            />
            {/* Step 3 -> Step 4 */}
            <motion.path
              d="M 870,100 C 900,100 900,196 930,196"
              fill="none"
              stroke="currentColor"
              className="text-[#0047FF]/40 dark:text-[#0047FF]/50"
              strokeWidth="2"
              strokeDasharray="6,6"
              style={{
                pathLength: (mounted && isDesktop) ? path3Length : undefined,
                opacity: (mounted && isDesktop) ? path3Opacity : undefined
              }}
              initial={mounted ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
              animate={(!isDesktop && mounted) ? { pathLength: 1, opacity: 1 } : undefined}
              transition={{
                pathLength: { duration: 0.6, ease: "easeInOut" },
                opacity: { duration: 0.2 }
              }}
            />
          </svg>

          <div 
            key={isDesktop ? "desktop" : "mobile"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start relative z-10" 
            style={{ perspective: "1000px" }}
          >
            {process.map(({ step, title, desc, img }, i) => {
              const opacity = [card0Opacity, card1Opacity, card2Opacity, card3Opacity][i];
              const y = [card0Y, card1Y, card2Y, card3Y][i];
              const rotateY = [card0RotateY, card1RotateY, card2RotateY, card3RotateY][i];

              return (
                <motion.div
                  key={step}
                  custom={isDesktop}
                  variants={cardVariants}
                  initial={mounted ? "hidden" : "visible"}
                  whileInView={(!isDesktop && mounted) ? "visible" : undefined}
                  viewport={{ once: true, margin: "-50px" }}
                  style={{
                    marginTop: isDesktop && i % 2 === 1 ? "6rem" : 0,
                    opacity: (mounted && isDesktop) ? opacity : undefined,
                    y: (mounted && isDesktop) ? y : undefined,
                    rotateY: (mounted && isDesktop) ? rotateY : undefined,
                  }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="flex flex-col gap-4"
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

      {/* Founder / Behind the Studio — trust section */}
      <section className="relative z-10 py-28 px-6 md:px-16 bg-zinc-50 dark:bg-[#0a0a0a] border-t border-zinc-100 dark:border-zinc-800">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left: text */}
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
              <p>
                MadSphere started with two people who were tired of seeing the same brand templates on every website. Same layouts. Same fonts. Same promise of &ldquo;we&rsquo;ll make you stand out&rdquo; — from agencies that all look the same.
              </p>
              <p>
                We wanted to build something different. A studio that treats every project like it matters, because to the person building that brand, it does.
              </p>
              <p>
                Are we young? Sure. But we&apos;re obsessive about the details. We&apos;re building this for founders who feel the same way about their work as we do about ours.
              </p>
            </div>

            <MagneticWrap>
              <motion.button
                onClick={() => router.push('/about')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 350, damping: 15 }}
                className="self-start flex items-center gap-3 bg-zinc-900 dark:bg-zinc-100 hover:bg-black dark:hover:bg-white text-white dark:text-zinc-900 text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full transition-colors cursor-pointer"
                data-cursor
              >
                Meet the team
                <span className="w-5 h-5 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 text-zinc-900 dark:text-white" />
                </span>
              </motion.button>
            </MagneticWrap>
          </div>

          {/* Right: two portrait photos */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4" style={{ perspective: "1000px" }}>
            <motion.div
              initial={{ opacity: 0, y: 40, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <Tilt3D className="w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&fit=crop"
                  alt="Founder"
                  className="w-full h-full object-cover"
                />
              </Tilt3D>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 60, rotateY: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10"
            >
              <Tilt3D className="w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&fit=crop"
                  alt="Co-Founder"
                  className="w-full h-full object-cover"
                />
              </Tilt3D>
            </motion.div>
          </div>

        </div>
      </section>

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

    </div>
  );
}
