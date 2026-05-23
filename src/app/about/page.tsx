"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal, Tilt3D, AnimatedCounter } from "@/components/Animations";
import FAQ from "@/components/FAQ";

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#070708] pt-32 pb-20 overflow-hidden" ref={containerRef}>
      
      <section className="px-6 md:px-16 max-w-[1500px] mx-auto mb-32 relative z-10 flex flex-col lg:flex-row gap-16 items-start">
        {/* Left Sticky Sidebar */}
        <div className="lg:w-[250px] shrink-0 lg:sticky top-32 flex flex-col gap-12">
          <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 border-l border-zinc-300 dark:border-zinc-700 pl-4">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-sm" /> Who we are
          </span>
          <div className="flex flex-col gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-4xl font-bold mb-1"><AnimatedCounter target={120} suffix="+" /></p>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Projects Delivered</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <p className="text-4xl font-bold mb-1"><AnimatedCounter target={40} suffix="+" /></p>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Happy Clients</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <p className="text-4xl font-bold mb-1"><AnimatedCounter target={8} suffix="yr" /></p>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">In Business</p>
            </motion.div>
          </div>
          <button className="self-start flex items-center gap-2 bg-[#0047FF] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest mt-4">
            See Our Work <span className="rotate-45">↗</span>
          </button>
        </div>

        {/* Right Hero Content */}
        <div className="flex-1 flex flex-col gap-8 w-full min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50">
              <TextReveal>Driven by bold ideas.</TextReveal>
            </h1>
          </div>
          <p className="text-sm md:text-base text-zinc-500 font-serif max-w-2xl leading-relaxed mb-6">
            We're a team of strategists, innovators, designers, and developers united by one obsession: solving your business challenges creatively. Since 2018, we've helped startups, scale-ups, and established brands cut through the noise.
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
            { title: "Wired in our Blood.", desc: "We thrive in environments where we are able to deliver speed, agility and excellence. It is integral to hold ourselves and our partners to a higher standard and we never settle for less." },
            { title: "Technology to Simplify.", desc: "We believe any technology's governing principle is to simplify the consumer's life and provide immersive user experiences. Therefore, technology is strictly our guiding light to answer business needs." },
            { title: "Creativity is Sacred, Aesthetics are God.", desc: "We create path-breaking work that challenges the status quo and positively impacts our clients' businesses. We make sure form accommodates function, and design helps our brand stand out." },
            { title: "Be Culturally Relevant.", desc: "We exist to make brands cultural. By producing culturally relevant work, we naturally stand out in a sea of sameness." }
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
                  src="https://images.unsplash.com/photo-1615397323945-8f6448ab3d29?q=80&w=600&fit=crop" 
                  alt={principle.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </Tilt3D>
              <div className="text-center">
                <h3 className="font-bold text-lg mb-2">{principle.title}</h3>
                <p className="text-xs text-zinc-500 font-serif leading-relaxed">{principle.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-[1500px] mx-auto px-6 md:px-12 mb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start border-t border-zinc-200 dark:border-zinc-800 pt-16">
          <div className="flex flex-col gap-6">
            <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500">
              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-sm" /> Our core value
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              <TextReveal>Creating the</TextReveal><br/>
              <TextReveal>Future Together</TextReveal><br/>
              <TextReveal>Forward</TextReveal>
            </h2>
          </div>
          
          <div className="flex flex-col gap-12 pt-8">
            <div className="flex gap-6">
              <div className="w-8 h-8 rounded-full bg-[#0047FF] text-white flex items-center justify-center shrink-0">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M13 1L1 13M13 1L13 13M13 1L1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Our Vision</h4>
                <p className="text-zinc-500 font-serif">To make digital experiences that have meaning and strategy, driving engagement and business value.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-8 h-8 rounded-full bg-[#0047FF] text-white flex items-center justify-center shrink-0">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M13 1L1 13M13 1L13 13M13 1L1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Our Mission</h4>
                <p className="text-zinc-500 font-serif">Design shouldn't just sit there. It's designed for moving digital experiences that engage real users.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQ />

    </main>
  );
}
