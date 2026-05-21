"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { TextReveal } from "@/components/Animations";

function ScrollText({ children }: { children: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 40%"]
  });

  const words = children.split(" ");
  return (
    <p ref={ref} className="text-3xl sm:text-4xl md:text-6xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight flex flex-wrap gap-x-2 sm:gap-x-3 gap-y-1 sm:gap-y-2">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
        const y = useTransform(scrollYProgress, [start, end], [10, 0]);
        const filter = useTransform(scrollYProgress, [start, end], ["blur(8px)", "blur(0px)"]);
        return (
          <motion.span key={i} style={{ opacity, y, filter }} className="inline-block">
            {word}
          </motion.span>
        );
      })}
    </p>
  );
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#070708]" ref={containerRef}>
      <section className="h-[60vh] md:h-[70vh] flex flex-col justify-end px-6 md:px-16 pb-16 md:pb-24 max-w-[1800px] mx-auto relative z-10">
        <h1 className="text-5xl sm:text-6xl md:text-[8rem] font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 leading-[0.85] mix-blend-difference">
          <TextReveal>We are the</TextReveal><br/>
          <TextReveal>Madsphere.</TextReveal>
        </h1>
      </section>

      <section className="relative h-[150vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <motion.div style={{ scale, y }} className="w-full h-full">
            <div className="absolute inset-0 bg-black/30 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2400&fit=crop" 
              alt="Madsphere Culture" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-40 px-6 md:px-16 max-w-[1400px] mx-auto relative z-20 bg-zinc-50 dark:bg-[#070708]">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-[#0047FF] mb-12">Our Philosophy</h3>
          <ScrollText>
            We don't build generic websites. We forge digital experiences that demand attention, engineered with absolute precision and unmatched aesthetic ambition.
          </ScrollText>
        </div>
      </section>

      <section className="py-24 px-6 md:px-16 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 relative z-20">
        <div className="space-y-8">
          <h2 className="text-4xl font-medium">No Compromises.</h2>
          <p className="text-xl text-zinc-500">
            From the initial wireframe to the final deployment, every pixel is obsessed over. We believe that good design is obvious, but great design is invisible.
          </p>
        </div>
        <div className="aspect-[3/4] rounded-2xl overflow-hidden">
          <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&fit=crop" className="w-full h-full object-cover" alt="" />
        </div>
      </section>
    </main>
  );
}
