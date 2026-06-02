"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight, Plus, Minus } from "lucide-react";
import { TextReveal, Tilt3D, SectionBlurIn } from "@/components/Animations";
import ApplyModal from "@/components/ApplyModal";
import { careerEnquiry } from "@/data/site";

// Section Tag component — yellow dot like every other page
function SectionTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-400">
      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-sm shrink-0" />
      {label}
    </span>
  );
}

// Perks Data
const perks = [
  {
    emoji: "💰",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
    title: "Competitive Pay",
    desc: "Market-rate salaries with performance bonuses. We believe in paying people what they're worth.",
  },
  {
    emoji: "🏡",
    bgColor: "bg-rose-50 dark:bg-rose-950/20",
    title: "Flexible Work",
    desc: "Hybrid and remote options available for most roles. Work where you do your best work.",
  },
  {
    emoji: "📚",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    title: "Learning Budget",
    desc: "₹20,000/year per person for courses, books, conferences, and anything that makes you sharper.",
  },
  {
    emoji: "📋",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    title: "Health Coverage",
    desc: "Comprehensive health insurance for you and your immediate family. Your wellbeing matters.",
  },
  {
    emoji: "🚀",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    title: "Fast Growth",
    desc: "Small team, big impact. You'll take on real responsibility from day one and grow quickly.",
  },
  {
    emoji: "🎉",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
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
    desc: "Translate business goals into innovative brand strategy, content concepts, and campaign directions. Collaborate with design and engineering teams to craft compelling brand narratives.",
  },
  {
    title: "UI/UX Designer",
    type: "Full-Time",
    experience: "1-2 years experience",
    location: "Mumbai, Maharashtra",
    desc: "Design modern, beautiful, and intuitive user experiences for web and mobile interfaces. Shape visual identities, user flows, and interactive layouts using industry-leading tools.",
  },
  {
    title: "Full stack Developer",
    type: "Full-Time",
    experience: "1-2 years experience",
    location: "Mumbai, Maharashtra",
    desc: "Build fast, scalable web applications with React, Next.js, and Node.js. Obsess over micro-animations, clean code structures, and responsive layouts.",
  },
  {
    title: "Webflow Developer",
    type: "Full-Time",
    experience: "1-2 years experience",
    location: "Mumbai, Maharashtra",
    desc: "Develop high-end marketing websites and landing pages in Webflow. Convert complex Figma designs into responsive, pixel-perfect, and interactive Webflow builds.",
  },
];

export default function CareersClient() {
  const [openJob, setOpenJob] = useState<number | null>(null);
  const [applyRole, setApplyRole] = useState<string | null>(null);

  return (
    <main className="pt-32 md:pt-40 pb-0 min-h-screen bg-white dark:bg-[#070708] overflow-hidden">

      {/* 1. Header Hero Section */}
      <SectionBlurIn>
      <section className="px-6 md:px-16 max-w-[1400px] mx-auto text-center mb-24 md:mb-32 relative z-10">
        <div className="flex justify-center items-center mb-6">
          <SectionTag label="Career Inquiries" />
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[7.5rem] font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 leading-none mb-8">
          <TextReveal>Join the MadSphere</TextReveal>
        </h1>

        <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-sans">
          We&apos;re building something bold. Come be a part of a team that obsesses over great work, moves fast, and celebrates growth yours and ours.
        </p>
      </section>
      </SectionBlurIn>

      {/* 2. Work Vibe Banner Section */}
      <SectionBlurIn delay={0.05}>
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
                src="/images/careers_portrait.png"
                alt="Creative portrait"
                className="w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </Tilt3D>
          </div>

          {/* Right Column: Paragraph columns */}
          <div className="lg:col-span-4 flex flex-col gap-8 text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed text-sm md:text-base">
            <p>
              Enjoy that new-project feeling more often. Our teams own a wide array of projects, taking startups from 0-1 and Fortune 500s in bold new directions. We think a constant refresh beats being shackled too long to any single task.
            </p>
            <p>
              You&apos;re too ambitious to settle for the status quo. MadSphere encourages every teammate to grow in ways that fascinate them. We provide guidance, mentorship and even a yearly &quot;curiosity allowance.&quot; You ship innovations that matter.
            </p>
          </div>

        </div>
      </section>
      </SectionBlurIn>

      {/* 3. Perks & Benefits Section */}
      <SectionBlurIn delay={0.05}>
      <section className="px-6 md:px-16 py-24 bg-zinc-50/80 dark:bg-zinc-900/10 border-y border-zinc-100 dark:border-zinc-900/80 mb-32 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          {/* Centered header row with Perks & Benefits title and Tag */}
          <div className="flex items-center justify-center gap-6 mb-20 flex-wrap text-center">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Perks &amp; Benefits
            </h2>
            <SectionTag label="Why MadSphere" />
          </div>

          {/* Center-aligned Grid list of perks */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {perks.map((perk, idx) => {
              return (
                <motion.div
                  key={perk.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1, type: "spring", stiffness: 100 }}
                  className="bg-white dark:bg-[#0c0c0e] border border-zinc-200/50 dark:border-zinc-800/60 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center gap-6"
                >
                  <div className={`w-12 h-12 rounded-2xl ${perk.bgColor} flex items-center justify-center shrink-0 text-2xl`}>
                    {perk.emoji}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                      {perk.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
                      {perk.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      </SectionBlurIn>

      {/* 4. Positions Section — with blur effect on inactive items */}
      <SectionBlurIn delay={0.05}>
      <section className="px-6 md:px-16 max-w-[1400px] mx-auto mb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left Column: Heading and Tag */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <SectionTag label="Positions" />
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
              Contribute to a better culture
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-md font-sans">
              We&apos;ve been around. Worked everywhere from bootstraps to Google. And we&apos;ve built MadSphere by ditching the toxic stuff and nurturing a healthy environment and community.
            </p>
          </div>

          {/* Right Column: Open Positions List — blur inactive when one is open */}
          <div className="lg:col-span-7 flex flex-col w-full pt-8 lg:pt-0">
            {positions.map((pos, idx) => {
              const isOpen = openJob === idx;
              const isOtherOpen = openJob !== null && !isOpen;
              return (
                <motion.div
                  key={idx}
                  onMouseEnter={() => setOpenJob(idx)}
                  onMouseLeave={() => setOpenJob(null)}
                  animate={{
                    opacity: isOtherOpen ? 0.3 : 1,
                    filter: isOtherOpen ? "blur(4px)" : "blur(0px)",
                  }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
                      <div className="flex items-center flex-wrap gap-2 text-xs text-zinc-400 dark:text-zinc-500 font-semibold tracking-wider uppercase">
                        <span>{pos.type}</span>
                        <span>|</span>
                        <span>{pos.experience}</span>
                        <span>|</span>
                        <span>{pos.location}</span>
                      </div>
                    </div>

                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-zinc-200 dark:border-zinc-800 transition-all duration-300 ${isOpen ? 'bg-[#0047FF] border-[#0047FF] text-white rotate-45' : 'bg-transparent text-zinc-400 group-hover:bg-[#0047FF] group-hover:border-[#0047FF] group-hover:text-white'}`}>
                      <Plus className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, filter: "blur(4px)" }}
                        animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                        exit={{ height: 0, opacity: 0, filter: "blur(4px)" }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden w-full"
                      >
                        <div className="pb-8 flex flex-col gap-6 items-start w-full">
                          <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
                            {pos.desc}
                          </p>
                          <motion.button
                            onClick={() => setApplyRole(pos.title)}
                            whileHover="hover"
                            whileTap={{ scale: 0.96 }}
                            transition={{ type: "spring", stiffness: 350, damping: 15 }}
                            className="h-12 bg-[#0047FF] hover:bg-blue-700 text-white rounded-full pl-6 pr-2 text-xs font-bold uppercase tracking-widest cursor-pointer flex items-center gap-0 shadow-lg shadow-blue-500/20 shrink-0"
                          >
                            Apply for Role
                            <motion.span
                              variants={{ hover: { x: 2, y: -2 } }}
                              transition={{ type: "spring", stiffness: 400, damping: 20 }}
                              className="ml-3 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0"
                            >
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </motion.span>
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      </SectionBlurIn>

      {/* 5. Send us your CV banner Section */}
      <section data-cursor-square="Say Hi !" className="w-full bg-[#050505] text-white pt-24 pb-20 relative overflow-hidden lg:cursor-none">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 flex flex-col items-center text-center relative z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full opacity-[0.06] pointer-events-none"
            style={{ background: "radial-gradient(circle, #0047FF 0%, transparent 70%)" }} />

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 relative z-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 leading-tight">
            <span>Send us</span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8, rotate: -15, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -6, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.25, rotate: 0, zIndex: 30 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
              className="inline-flex w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white/20 align-middle shadow-md shrink-0 cursor-pointer"
            >
              <img src={careerEnquiry.img1} className="w-full h-full object-cover" alt="" />
            </motion.span>
            <span>your CV at</span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8, rotate: 15, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 6, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.25, rotate: 0, zIndex: 30 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.25 }}
              className="inline-flex w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white/20 align-middle shadow-md shrink-0 cursor-pointer"
            >
              <img src={careerEnquiry.img2} className="w-full h-full object-cover" alt="" />
            </motion.span>
          </h2>

          <p 
            className="text-sm md:text-base text-zinc-400 max-w-xl mb-12 relative z-10 font-sans"
            dangerouslySetInnerHTML={{ __html: careerEnquiry.text }}
          />

          <motion.button
            onClick={() => setApplyRole("General Inquiry / CV Submission")}
            whileHover="hover"
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 350, damping: 15 }}
            className="h-12 bg-yellow-400 hover:bg-yellow-500 text-black font-bold uppercase tracking-wider pl-6 pr-2 rounded-full text-xs transition-colors flex items-center gap-0 cursor-pointer shadow-lg shadow-yellow-500/20 relative z-10 shrink-0"
          >
            Send us your CV
            <motion.span
              variants={{ hover: { x: 2 } }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="ml-3 w-8 h-8 rounded-full bg-black/10 text-black flex items-center justify-center shrink-0"
            >
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </motion.span>
          </motion.button>
        </div>
      </section>

      {/* Application Modal */}
      <AnimatePresence>
        {applyRole && (
          <ApplyModal role={applyRole} onClose={() => setApplyRole(null)} />
        )}
      </AnimatePresence>

    </main>
  );
}
