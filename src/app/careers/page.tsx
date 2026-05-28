"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coins, Laptop, BookOpen, Heart, Rocket, Sparkles, ArrowRight, ArrowUpRight, Plus, Minus } from "lucide-react";
import { TextReveal, Tilt3D, MagneticWrap } from "@/components/Animations";

// Section Tag component
function SectionTag({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 border-l border-zinc-300 dark:border-zinc-700 pl-4">
      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-sm" />
      {label}
    </span>
  );
}

// Perks Data
const perks = [
  {
    icon: Coins,
    title: "Competitive Pay",
    desc: "Market-rate salaries with performance bonuses. We believe in paying people what they're worth.",
  },
  {
    icon: Laptop,
    title: "Flexible Work",
    desc: "Hybrid and remote options available for most roles. Work where you do your best work.",
  },
  {
    icon: BookOpen,
    title: "Learning Budget",
    desc: "₹30,000/year per person for courses, books, conferences, and anything that makes you sharper.",
  },
  {
    icon: Heart,
    title: "Health Coverage",
    desc: "Comprehensive health insurance for you and your immediate family. Your wellbeing matters.",
  },
  {
    icon: Rocket,
    title: "Fast Growth",
    desc: "Small team, big impact. You'll take on real responsibility from day one and grow quickly.",
  },
  {
    icon: Sparkles,
    title: "Great Culture",
    desc: "Team retreats, celebrations, and a culture that balances high performance with genuine fun.",
  },
];

// Open Positions Data
const positions = [
  {
    title: "Creative Strategist",
    type: "Full-Time",
    experience: "1-2 years experience",
    location: "Mumbai, Maharashtra",
    desc: "Help shape the narrative, strategy, and messaging frameworks of futuristic brands. You will collaborate with design and engineering teams to pitch and execute creative solutions.",
  },
  {
    title: "UI/UX Designer",
    type: "Full-Time",
    experience: "1-2 years experience",
    location: "Mumbai, Maharashtra",
    desc: "Design accessible, premium interfaces and visual systems. You must have a portfolio showcasing a strong command over typography, spacing, and micro-interactions.",
  },
  {
    title: "Full stack Developer",
    type: "Full-Time",
    experience: "1-2 years experience",
    location: "Mumbai, Maharashtra",
    desc: "Build scalable client platforms with clean React and Next.js code architectures. Experience in web animations (Framer Motion, GSAP) is highly desired.",
  },
  {
    title: "Webflow Developer",
    type: "Full-Time",
    experience: "1-2 years experience",
    location: "Mumbai, Maharashtra",
    desc: "Translate high-fidelity figma models into fully responsive Webflow layouts. Strong eye for design, interactions, and clean structure is required.",
  },
];

export default function CareersPage() {
  const [openJob, setOpenJob] = useState<number | null>(null);

  return (
    <main className="pt-32 md:pt-40 pb-20 min-h-screen bg-white dark:bg-[#070708] overflow-hidden">
      
      {/* 1. Header Hero Section */}
      <section className="px-6 md:px-16 max-w-[1400px] mx-auto text-center mb-24 md:mb-32 relative z-10">
        <div className="flex justify-center items-center gap-2 mb-6">
          <SectionTag label="Career Inquiries" />
        </div>
        
        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[7.5rem] font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 leading-none mb-8">
          <TextReveal>Join the MadSphere</TextReveal>
        </h1>
        
        <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          We&apos;re building something bold. Come be a part of a team that obsesses over great work, moves fast, and celebrates growth yours and ours.
        </p>
      </section>

      {/* 2. Work Vibe Banner Section */}
      <section className="px-6 md:px-16 max-w-[1400px] mx-auto mb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading and Tag */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <SectionTag label="Join The Team" />
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
              Work with full of creative heads
            </h2>
          </div>

          {/* Center Column: Portrait Image in 3D frame */}
          <div className="lg:col-span-3 flex justify-center">
            <Tilt3D className="w-full max-w-[320px] aspect-square rounded-[2rem] overflow-hidden shadow-2xl relative border border-zinc-200 dark:border-zinc-800">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&fit=crop" 
                alt="Creative portrait" 
                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </Tilt3D>
          </div>

          {/* Right Column: Paragraph columns */}
          <div className="lg:col-span-4 flex flex-col gap-8 text-zinc-500 dark:text-zinc-400 font-serif leading-relaxed text-sm md:text-base">
            <p>
              Enjoy that new-project feeling more often. Our teams own a wide array of projects, taking startups from 0-1 and Fortune 500s in bold new directions. We think a constant refresh beats being shackled too long to any single task.
            </p>
            <p>
              You&apos;re too ambitious to settle for the status quo. MadSphere encourages every teammate to grow in ways that fascinate them. We provide guidance, mentorship and even a yearly &quot;curiosity allowance.&quot; You ship innovations that matter.
            </p>
          </div>

        </div>
      </section>

      {/* 3. Perks & Benefits Section */}
      <section className="px-6 md:px-16 py-24 bg-zinc-50 dark:bg-zinc-900/30 border-y border-zinc-100 dark:border-zinc-900 mb-32 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="flex flex-col gap-4">
              <SectionTag label="Why MadSphere" />
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Perks & Benefits
              </h2>
            </div>
          </div>

          {/* Grid list of perks */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {perks.map((perk, idx) => {
              const Icon = perk.icon;
              return (
                <motion.div
                  key={perk.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1, type: "spring", stiffness: 100 }}
                  className="bg-white dark:bg-[#0c0c0e] border border-zinc-200/60 dark:border-zinc-800/80 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col gap-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0047FF]/10 text-[#0047FF] flex items-center justify-center shrink-0 border border-[#0047FF]/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                      {perk.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-serif">
                      {perk.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Positions Section */}
      <section className="px-6 md:px-16 max-w-[1400px] mx-auto mb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Heading and Tag */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <SectionTag label="Positions" />
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
              Contribute to a better culture
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-md font-serif">
              We&apos;ve been around. Worked everywhere from bootstraps to Google. And we&apos;ve built MadSphere by ditching the toxic stuff and nurturing a healthy environment and community.
            </p>
          </div>

          {/* Right Column: Open Positions List */}
          <div className="lg:col-span-7 flex flex-col w-full border-t border-zinc-200 dark:border-zinc-800">
            {positions.map((pos, idx) => {
              const isOpen = openJob === idx;
              return (
                <div 
                  key={idx}
                  className="border-b border-zinc-200 dark:border-zinc-800 w-full"
                >
                  <div 
                    className="flex justify-between items-center py-8 cursor-pointer group"
                    onClick={() => setOpenJob(isOpen ? null : idx)}
                  >
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white transition-colors group-hover:text-[#0047FF]">
                        {pos.title}
                      </h3>
                      <div className="flex items-center flex-wrap gap-2 text-xs text-zinc-400 tracking-wider font-semibold uppercase">
                        <span>{pos.type}</span>
                        <span>•</span>
                        <span>{pos.experience}</span>
                        <span>•</span>
                        <span>{pos.location}</span>
                      </div>
                    </div>
                    
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-zinc-200 dark:border-zinc-800 transition-colors ${isOpen ? 'bg-[#0047FF] border-[#0047FF] text-white' : 'bg-transparent text-zinc-400 group-hover:bg-[#0047FF] group-hover:border-[#0047FF] group-hover:text-white'}`}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, filter: "blur(6px)" }}
                        animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                        exit={{ height: 0, opacity: 0, filter: "blur(6px)" }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden w-full"
                      >
                        <div className="pb-8 flex flex-col gap-6 items-start w-full">
                          <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-serif text-sm md:text-base">
                            {pos.desc}
                          </p>
                          <MagneticWrap>
                            <motion.button
                              onClick={() => window.location.href = "mailto:hello@madsphere.in?subject=Application for " + pos.title}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.96 }}
                              transition={{ type: "spring", stiffness: 350, damping: 15 }}
                              className="bg-[#0047FF] hover:bg-blue-700 text-white rounded-full pl-5 pr-1.5 py-1.5 text-[10px] font-bold uppercase tracking-widest cursor-pointer flex items-center gap-3 shadow-lg shadow-blue-500/20"
                            >
                              Apply for Role
                              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </span>
                            </motion.button>
                          </MagneticWrap>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. Send us your CV banner Section */}
      <section className="px-4 md:px-16 w-full max-w-[1400px] mx-auto mb-12">
        <div className="relative w-full bg-[#050505] rounded-[2rem] p-12 md:p-20 overflow-hidden shadow-2xl flex flex-col items-center text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full opacity-[0.08] pointer-events-none"
               style={{ background: "radial-gradient(circle, #0047FF 0%, transparent 70%)" }} />
          
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4 relative z-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 leading-tight">
            <span>Send us</span>
            <motion.span 
              initial={{ opacity: 0, scale: 0, rotate: -25, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -6, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.25, rotate: 0, zIndex: 30 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
              className="inline-flex w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-white/20 align-middle shadow-md shrink-0 cursor-pointer"
            >
              <motion.span
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full block"
              >
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&fit=crop" className="w-full h-full object-cover" alt="" />
              </motion.span>
            </motion.span>
            <span>your CV at</span>
            <motion.span 
              initial={{ opacity: 0, scale: 0, rotate: 25, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 6, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.25, rotate: 0, zIndex: 30 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.25 }}
              className="inline-flex w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-white/20 align-middle shadow-md shrink-0 cursor-pointer"
            >
              <motion.span
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
                className="w-full h-full block"
              >
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&fit=crop" className="w-full h-full object-cover" alt="" />
              </motion.span>
            </motion.span>
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
        </div>
      </section>

    </main>
  );
}
