"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { TextReveal, Tilt3D, WordsSlideFromRight } from "@/components/Animations";
import FAQ from "@/components/FAQ";

export default function AboutClient() {
  const router = useRouter();
  const containerRef = useRef(null);
  const introRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const { scrollYProgress: introProgress } = useScroll({ target: introRef, offset: ["start start", "end start"] });

  const smoothScrollProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const smoothIntroProgress = useSpring(introProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const heroY = useTransform(smoothScrollProgress, [0, 1], ["0%", "40%"]);
  const circleScaleDesktop = useTransform(smoothIntroProgress, [0, 0.8], [1, 26]);
  const circleScaleMobile = useTransform(smoothIntroProgress, [0, 0.8], [1, 8]);
  const textOpacity = useTransform(smoothIntroProgress, [0, 0.45], [1, 0]);

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#070708] pb-20 overflow-x-hidden" ref={containerRef}>
      
      {/* Scroll-Triggered Circle Zoom Intro */}
      <div ref={introRef} className="relative h-[180vh] w-full z-20">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#070708] dark:bg-zinc-950 flex items-center justify-center">

          {isMobile ? (
            /* ── MOBILE: same unified zoom as desktop — everything scales together ── */
            <motion.div
              style={{ scale: circleScaleMobile, willChange: "transform" }}
              className="w-[280px] h-[280px] rounded-full bg-zinc-50 dark:bg-[#070708] border border-zinc-700/20 dark:border-zinc-800 shadow-2xl flex items-center justify-center relative"
            >
              <motion.div
                style={{ opacity: textOpacity }}
                className="flex flex-col items-center gap-4 text-center select-none px-6"
              >
                <span className="text-zinc-500 dark:text-zinc-500 font-bold tracking-[0.3em] text-[10px] uppercase">
                  MADSPHERE
                </span>
                <h2 className="text-zinc-900 dark:text-white text-2xl font-semibold leading-tight font-sans tracking-tight">
                  we discover.<br/>
                  we design.<br/>
                  we disrupt.
                </h2>
              </motion.div>
            </motion.div>
          ) : (
            /* ── DESKTOP: original — everything scales together ── */
            <motion.div
              style={{ scale: circleScaleDesktop }}
              className="w-[360px] h-[360px] rounded-full bg-zinc-50 dark:bg-[#070708] border border-zinc-700/20 dark:border-zinc-800 shadow-2xl flex items-center justify-center relative"
            >
              <motion.div
                style={{ opacity: textOpacity }}
                className="flex flex-col items-center gap-4 text-center select-none px-6"
              >
                <span className="text-zinc-500 dark:text-zinc-500 font-bold tracking-[0.3em] text-[10px] uppercase">
                  MADSPHERE
                </span>
                <h2 className="text-zinc-900 dark:text-white text-3xl font-semibold leading-tight font-sans tracking-tight">
                  we discover.<br/>
                  we design.<br/>
                  we disrupt.
                </h2>
              </motion.div>
            </motion.div>
          )}

        </div>
      </div>

      {/* Hero */}
      <section className="px-6 md:px-16 max-w-[1500px] mx-auto pt-32 mb-32 relative z-10 flex flex-col lg:flex-row gap-16 items-start">
        {/* Left Sticky Sidebar */}
        <div className="lg:w-[250px] shrink-0 lg:sticky top-32 flex flex-col gap-12">
          <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 border-l border-zinc-300 dark:border-zinc-700 pl-4">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-sm" /> Who we are
          </span>
          <motion.button 
            onClick={() => router.push('/works')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 350, damping: 15 }}
            className="self-start flex items-center gap-2 bg-[#0047FF] hover:bg-blue-700 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest mt-4 shadow-lg shadow-blue-500/20 cursor-pointer"
          >
            See Our Work <span className="rotate-45">↗</span>
          </motion.button>
        </div>

        {/* Right Hero Content */}
        <div className="flex-1 flex flex-col gap-8 w-full min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 max-w-3xl leading-tight">
              <TextReveal>We started this because we thought brands deserved more.</TextReveal>
            </h1>
          </div>
          <p className="text-sm md:text-base text-zinc-500 font-sans max-w-2xl leading-relaxed mb-6">
            MadSphere is a branding studio — for founders, startups, and anyone building something they actually believe in.
            <br /><br />
            Every project starts with one question: what does this brand need to say, and who needs to hear it? From there, we build.
            <br /><br />
            We&apos;re young, we&apos;re hungry, and we think the best work happens when ego stays out of the room.
          </p>
          
          <Tilt3D className="w-full h-[40vh] md:h-[50vh] rounded-2xl overflow-hidden relative">
            <motion.div style={{ y: heroY }} className="w-full h-[140%] absolute -top-[20%]">
              <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&fit=crop" 
                alt="About Hero" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </Tilt3D>
        </div>
      </section>

      {/* What drives us */}
      <section className="px-6 md:px-16 max-w-[1500px] mx-auto mb-32 relative z-10">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl font-bold">What drives us</h2>
          <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 border-l border-zinc-300 dark:border-zinc-700 pl-4">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-sm" /> Our Principles
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              title: "Strategy before everything.", 
              desc: "Design without a reason is just decoration. Every colour, font, and image we use has a job to do.",
              img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&fit=crop"
            },
            { 
              title: "Craft over template.", 
              desc: "We don't do templates. Every project — identity, website, campaign — starts from zero and gets the attention it deserves.",
              img: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=600&fit=crop"
            },
            { 
              title: "Culture drives creativity.", 
              desc: "The best brands understand the culture they live in. We help brands stay relevant without losing their identity.",
              img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&fit=crop"
            },
            { 
              title: "Honest partnership.", 
              desc: "We keep it real. Say what we'll do, do what we said, and never pretend to be bigger than we are.",
              img: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=600&fit=crop"
            }
          ].map((principle, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
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
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-[1500px] mx-auto px-6 md:px-12 mb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start border-t border-zinc-200 dark:border-zinc-800 pt-16">

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

            <h2 className="text-4xl md:text-5xl font-bold leading-tight relative">
              <WordsSlideFromRight>What we</WordsSlideFromRight>
              <br/>
              <span className="relative inline-block">
                <WordsSlideFromRight delay={0.16}>stand for</WordsSlideFromRight>
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-1 left-0 right-0 h-[3px] bg-[#0047FF] origin-left block rounded-full"
                />
              </span>
            </h2>

            {/* Animated dots decorative column */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
              className="hidden lg:flex flex-col gap-3 mt-4"
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.7 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="h-px bg-zinc-200 dark:bg-zinc-800 origin-left"
                  style={{ width: `${60 - i * 10}%` }}
                />
              ))}
            </motion.div>
          </div>

          {/* Right: animated value cards */}
          <div className="flex flex-col gap-8 pt-8">
            {[
              {
                label: "Our Vision",
                text: "A studio where every brand gets treated like the only one that matters. Because for the person building it, it is.",
              },
              {
                label: "Our Mission",
                text: "Help emerging brands discover who they are, build something beautiful, and reach the people who need to see it.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 40, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.18, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ x: 6 }}
                className="flex gap-5 p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow duration-300 group cursor-default"
              >
                {/* Animated icon */}
                <motion.div
                  whileHover={{ rotate: 45, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 12 }}
                  className="w-9 h-9 rounded-full bg-[#0047FF] text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/25"
                >
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path d="M13 1L1 13M13 1L13 13M13 1L1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>

                <div>
                  <h4 className="text-lg font-bold mb-2 text-zinc-900 dark:text-zinc-100 group-hover:text-[#0047FF] transition-colors duration-300">
                    {item.label}
                  </h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <FAQ />

    </main>
  );
}
