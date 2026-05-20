"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";
import ExpertiseScroll from "@/components/ExpertiseScroll";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { CustomCursor, TextReveal, AnimatedCounter, FloatingOrbs, MagneticWrap } from "@/components/Animations";
import { fadeUp, scaleIn, stagger, slideIn } from "@/lib/motion";
import { heroCards, socials, stats, works, process, clients } from "@/data/site";

function ParallaxImg({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1.05, 1.2]);
  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.img src={src} alt={alt} style={{ y, scale }} className="w-full h-full object-cover" />
    </div>
  );
}

function Tilt3D({ children, className }: { children: React.ReactNode; className?: string }) {
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    rx.set(((e.clientY - r.top - r.height / 2) / r.height) * -12);
    ry.set(((e.clientX - r.left - r.width / 2) / r.width) * 12);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };
  return (
    <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 800 }} onMouseMove={onMove} onMouseLeave={onLeave} className={className}>
      {children}
    </motion.div>
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
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroRotate = useTransform(scrollYProgress, [0, 1], [0, 3]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <div className="relative bg-white text-zinc-900 dark:bg-[#050505] dark:text-zinc-100 overflow-x-hidden">
      <FloatingOrbs />
      <CustomCursor />
      <Navbar />

      {/* Mascot — fixed bottom-right peek */}
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.5, type: "spring", stiffness: 100, damping: 12 }}
        className="fixed bottom-0 right-6 md:right-12 z-40 pointer-events-auto hidden md:block"
        data-cursor
      >
        <motion.img
          src="/mascot.png"
          alt="Madsphere mascot"
          className="w-20 lg:w-28 h-auto drop-shadow-2xl"
          style={{ marginBottom: -10 }}
          animate={{ y: [0, -6, 0], rotate: [0, 2, 0, -2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.15, y: -16, rotate: -8 }}
          draggable={false}
        />
      </motion.div>

      {/* Hero */}
      <section id="home" ref={heroRef} className="relative z-10 pt-28 px-4 sm:px-8 max-w-[1700px] mx-auto" style={{ perspective: "1200px" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: textY }}
          className="mb-5 px-1"
        >
          <img src="/logo.png" alt="Madsphere" className="h-16 md:h-24 w-auto dark:invert" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, rotateX: 12, scale: 0.88, y: 80 }}
          animate={{ opacity: 1, rotateX: 0, scale: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ rotateX: heroRotate, scale: heroScale, transformOrigin: "center top" }}
          className="relative w-full rounded-[24px] overflow-hidden shadow-2xl"
        >
          <div style={{ height: "78vh", minHeight: 500 }} className="relative">
            <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
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
                    initial={{ opacity: 0, x: 40, rotateY: 45 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ delay: 1.2 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.2, rotateZ: 8 }}
                    className="w-10 h-10 bg-white/30 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center text-white text-sm font-semibold"
                    data-cursor
                  >
                    {label}
                  </motion.a>
                </MagneticWrap>
              ))}
            </div>

            <motion.div style={{ y: textY }} className="absolute left-8 bottom-[120px] md:bottom-[130px] z-10 max-w-2xl">
              <h1 className="text-3xl md:text-5xl lg:text-6xl text-white font-semibold leading-[1.1] tracking-tight">
                <TextReveal>We make brands impossible to ignore.</TextReveal>
              </h1>
            </motion.div>

            <motion.div
              variants={stagger(0.06)}
              initial="hidden"
              animate="show"
              className="absolute bottom-5 left-5 right-16 flex gap-3 overflow-x-auto scrollbar-none z-10"
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
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="self-start flex items-center gap-3 bg-[#0047FF] hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full transition-colors"
                  data-cursor
                >
                  Read More
                  <span className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <Play className="w-3 h-3 fill-[#0047FF] text-[#0047FF]" />
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
              <TextReveal>We've helped startups, scale-ups, and established brands cut through the noise</TextReveal>
            </motion.h2>

            <div className="flex gap-4" style={{ height: 380, perspective: "1000px" }}>
              <motion.div
                initial={{ opacity: 0, rotateY: -25, x: -50 }}
                whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1"
              >
                <Tilt3D className="w-full h-full rounded-xl overflow-hidden">
                  <ParallaxImg src="https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=900&fit=crop" alt="" className="w-full h-full" />
                </Tilt3D>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, rotateY: 25, x: 50 }}
                whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="w-[44%]"
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

      {/* Work */}
      <section id="works" className="relative z-10 py-24 bg-zinc-50 dark:bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="flex items-center justify-center gap-4 mb-14">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold"
            >
              <TextReveal>Featured Work</TextReveal>
            </motion.h2>
            <SectionTag label="Portfolio" />
          </div>

          <div className="flex flex-col gap-6" style={{ perspective: "1200px" }}>
            {works.map((work, i) => (
              <Tilt3D key={work.id} className="w-full">
                <motion.div
                  initial={{ opacity: 0, rotateX: 14, y: 80, scale: 0.92 }}
                  whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full rounded-2xl overflow-hidden cursor-pointer group"
                  style={{ height: "55vh", minHeight: 300 }}
                  data-cursor
                >
                  <motion.img
                    src={work.img}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10" />
                  <motion.div
                    initial={{ y: 25, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 + i * 0.08, duration: 0.5 }}
                    className="absolute bottom-5 left-5 right-5 h-14 bg-black/55 backdrop-blur-md rounded-xl flex items-center justify-between px-5 border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-white/50 border border-white/20 px-2 py-0.5 rounded">[{work.id}]</span>
                      <span className="text-white font-bold text-lg">{work.title}</span>
                    </div>
                    <span className="hidden sm:block text-[10px] font-bold uppercase tracking-widest text-white/50">{work.tags}</span>
                  </motion.div>
                </motion.div>
              </Tilt3D>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <MagneticWrap>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 bg-[#0047FF] hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-widest px-8 py-3 rounded-full transition-colors"
                data-cursor
              >
                View All Work <ArrowRight className="w-4 h-4" />
              </motion.button>
            </MagneticWrap>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="relative z-10 py-28 px-6 md:px-16 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 mb-20">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-4xl font-bold">
            <TextReveal>How We Work</TextReveal>
          </motion.h2>
          <SectionTag label="Process" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start" style={{ perspective: "1000px" }}>
          {process.map(({ step, title, desc, img }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, rotateY: i % 2 === 0 ? -25 : 25, y: 50 }}
              whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4"
              style={{ marginTop: i % 2 === 1 ? "6rem" : 0 }}
            >
              <Tilt3D className="p-7 border border-zinc-200 dark:border-zinc-800 rounded-xl flex flex-col gap-3 cursor-pointer">
                <span className="text-[10px] font-bold text-zinc-400">[STEP — {step}]</span>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{desc}</p>
              </Tilt3D>
              <Tilt3D className="aspect-square rounded-xl overflow-hidden">
                <ParallaxImg src={img} alt={title} className="w-full h-full" />
              </Tilt3D>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-24 px-6 md:px-16 max-w-[1400px] mx-auto border-t border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-4 mb-14">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl font-bold">
            <TextReveal>Client Stories</TextReveal>
          </motion.h2>
          <SectionTag label="Testimonials" />
        </div>
        <TestimonialCarousel />
      </section>

      <footer className="relative z-10 bg-[#050505] text-white pt-20 pb-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[1400px] mx-auto px-6 md:px-16 flex flex-col items-center text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Ready to make<br />something great?
          </h2>
          <MagneticWrap>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black hover:bg-zinc-100 text-xs font-bold uppercase tracking-widest px-8 py-3 rounded-full transition-colors"
              data-cursor
            >
              Work With Us
            </motion.button>
          </MagneticWrap>
        </motion.div>
        <p
          className="mt-16 text-center text-[11vw] font-bold leading-none select-none"
          style={{ fontFamily: "Georgia, serif", color: "#111" }}
        >
          MADSPHERE
        </p>
      </footer>
    </div>
  );
}
