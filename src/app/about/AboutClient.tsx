"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { TextReveal, Tilt3D, WordsSlideFromRight, SectionBlurIn } from "@/components/Animations";
import { aboutHero, aboutPrinciples, aboutValues } from "@/data/site";
import FAQ from "@/components/FAQ";

export default function AboutClient() {
  const router = useRouter();
  const [hoveredPrinciple, setHoveredPrinciple] = useState<number | null>(null);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({ target: mounted ? containerRef : undefined, offset: ["start start", "end start"] });
  const { scrollYProgress: introProgress } = useScroll({ target: mounted ? introRef : undefined, offset: ["start start", "end start"] });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const smoothScrollProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 18, restDelta: 0.0005 });
  const smoothIntroProgress = useSpring(introProgress, { stiffness: 50, damping: 18, restDelta: 0.0005 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const circleScale = useTransform(smoothIntroProgress, [0, 0.85], [1, 26]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const textOpacity = useTransform(smoothIntroProgress, [0, 0.35], [1, 0]);

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#070708] pb-20 overflow-x-hidden" ref={containerRef}>
      

      {/* SPHERE ZOOM INTRO — hidden, keep code */
      /*
      <div ref={introRef} className="relative h-[250vh] w-full z-20">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#070708] dark:bg-zinc-950 flex items-center justify-center">

          <motion.div
            style={{ scale: circleScale, willChange: "transform" }}
            className="w-[200px] h-[200px] md:w-[360px] md:h-[360px] rounded-full bg-zinc-50 dark:bg-[#070708] border border-zinc-700/20 dark:border-zinc-800 shadow-2xl flex items-center justify-center relative"
          >
            <motion.div
              style={{ opacity: textOpacity }}
              className="flex flex-col items-center gap-4 text-center select-none px-4 md:px-6"
            >
              <span className="text-zinc-500 dark:text-zinc-500 font-bold tracking-[0.3em] text-[10px] uppercase">
                MADSPHERE
              </span>
              <h2 className="text-zinc-900 dark:text-white text-xl md:text-3xl font-semibold leading-tight font-sans tracking-tight">
                we discover.<br/>
                we design.<br/>
                we disrupt.
              </h2>
            </motion.div>
          </motion.div>

        </div>
      </div>
      */}

      {/* Hero */}
      <SectionBlurIn>
      <section className="px-6 md:px-16 max-w-[1200px] mx-auto pt-32 mb-20 text-center relative z-10">
        <div className="flex justify-center items-center gap-2 mb-6">
          <span className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Who We Are</span>
          <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 border-l border-zinc-300 dark:border-zinc-700 pl-4 ml-4">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-sm" /> About Us
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 max-w-4xl mx-auto leading-tight mb-12">
          <TextReveal>{aboutHero.title}</TextReveal>
        </h1>

        <div className="max-w-2xl mx-auto text-sm md:text-base text-zinc-500 font-sans leading-relaxed text-center">
          <p>{aboutHero.desc1}</p>
          <p className="mt-4">{aboutHero.desc2}</p>
          <p className="mt-4">{aboutHero.desc3}</p>
        </div>

        <div className="flex justify-center mt-10">
          <motion.button 
            onClick={() => router.push('/works')}
            whileHover="hover"
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 350, damping: 15 }}
            className="h-12 flex items-center bg-[#0047FF] hover:bg-blue-700 text-white rounded-full pl-6 pr-2 text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-500/20 cursor-pointer"
          >
            See Our Work
            <motion.span
              variants={{ hover: { x: 2, y: -2 } }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="ml-3 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0"
            >
              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </motion.span>
          </motion.button>
        </div>
      </section>
      </SectionBlurIn>

      {/* What drives us */}
      <SectionBlurIn delay={0.05}>
      <section className="px-6 md:px-16 max-w-[1500px] mx-auto mb-32 relative z-10">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl font-bold">What drives us</h2>
          <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 border-l border-zinc-300 dark:border-zinc-700 pl-4">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-sm" /> Our Principles
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" onMouseLeave={() => setHoveredPrinciple(null)}>
          {aboutPrinciples.map((principle, idx) => {
            const isDimmed = hoveredPrinciple !== null && hoveredPrinciple !== idx;
            return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  animate={{
                    opacity: isDimmed ? 0.35 : 1,
                    filter: isDimmed ? "blur(4px)" : "blur(0px)",
                  }}
                  onMouseEnter={() => setHoveredPrinciple(idx)}
                  className="flex flex-col gap-6"
                >
                  <Tilt3D className="w-full aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group">
                    <img 
                      src={principle.img} 
                      alt={principle.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </Tilt3D>
                  <div className="text-center">
                    <h3 className="font-bold text-lg mb-2">{principle.title}</h3>
                    <p className="text-xs text-zinc-500 font-sans leading-relaxed">{principle.desc}</p>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </section>
      </SectionBlurIn>

      {/* Values Section */}
      <SectionBlurIn delay={0.05}>
      <section className="max-w-[1500px] mx-auto px-6 md:px-12 mb-32 relative z-10">
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
      </SectionBlurIn>

      <SectionBlurIn delay={0.05}>
        <FAQ />
      </SectionBlurIn>

    </main>
  );
}
