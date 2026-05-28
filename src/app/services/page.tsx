"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { TextReveal, Tilt3D } from "@/components/Animations";
import FAQ from "@/components/FAQ";

const services = [
  {
    id: "Brand Strategy",
    subtext: "The strategy that makes everything else work.",
    items: [
      {
        title: "Brand Positioning",
        desc: "Where do you fit in the market? Who are you actually for, and why should they care about you over everyone else? We build positioning that goes beyond a clever tagline — it becomes the reason every decision you make points in the same direction.\n\nOutcome: Clear positioning statement + competitive market map."
      },
      {
        title: "Brand Messaging & Voice",
        desc: "How you speak is as important as how you look. We craft messaging systems, tone of voice guidelines, and the key messages that make your brand feel like a real person with something worth saying.\n\nOutcome: Messaging framework + tone of voice guide."
      },
      {
        title: "Identity Systems",
        desc: "Logo, typography, colour palette, visual language — designed together as a system, not assembled as a pile of separate assets. Everything should feel like it belongs.\n\nOutcome: Complete visual identity system + brand guidelines."
      },
      {
        title: "Brand Rollout Strategy",
        desc: "A plan for how your brand actually comes to life — across your website, social, packaging, and every touchpoint your customer encounters. No orphaned assets. No inconsistency.\n\nOutcome: Brand application guide + rollout roadmap."
      }
    ]
  },
  {
    id: "Creative Design",
    subtext: "Visual systems, brand collateral, and design direction that turns strategy into something you can see and feel.",
    items: [
      {
        title: "Logo & Visual Identity",
        desc: "More than a mark — a complete visual language that works across digital, print, and everything in between.\n\nOutcome: Logo suite + visual identity system."
      },
      {
        title: "Brand Collateral",
        desc: "Business cards, stationery, pitch decks, brochures — every touchpoint designed with the same attention to detail.\n\nOutcome: Print-ready collateral templates."
      },
      {
        title: "Packaging Design",
        desc: "For D2C brands, product labels, and luxury goods. Packaging that looks as good on a shelf as it does on Instagram.\n\nOutcome: Packaging design system + print files."
      },
      {
        title: "Art Direction",
        desc: "We plan the look and feel of your photoshoots, campaigns, and content — so everything you put out feels intentional, not random.\n\nOutcome: Art direction deck + visual guidelines."
      }
    ]
  },
  {
    id: "Website Design",
    subtext: "Sites that feel premium, load fast, and actually convert. Built for brands that care about how they show up online.",
    items: [
      {
        title: "Brand Websites",
        desc: "Custom-built sites for brands that want to make a strong first impression and keep it.\n\nOutcome: Fully designed brand website."
      },
      {
        title: "E-Commerce Design",
        desc: "Online stores that don't just look good — they make it easy for people to buy.\n\nOutcome: E-commerce store design + development."
      },
      {
        title: "UI/UX Design",
        desc: "User interface and experience design for web apps, dashboards, and digital products. Functionality that doesn't sacrifice beauty.\n\nOutcome: UI/UX wireframes + high-fidelity prototypes."
      },
      {
        title: "Landing Pages & Campaign Sites",
        desc: "High-converting single pages for product launches, lead generation, and campaign microsites. Built to perform, not just look good.\n\nOutcome: Designed and developed landing page, optimised for conversion."
      }
    ]
  },
  {
    id: "Digital Marketing",
    subtext: "Marketing that actually moves the needle — paid, organic, or both.",
    items: [
      {
        title: "Performance Ads",
        desc: "Meta and Google ads that don't just spend your budget — they bring in leads, sales, and actual awareness.\n\nOutcome: Campaign setup + ongoing optimisation + reporting."
      },
      {
        title: "Search Engine Marketing (SEM)",
        desc: "Google Ads that show up when people are actually searching for what you do.\n\nOutcome: Campaign structure + ad copy + bid management."
      },
      {
        title: "Growth Strategy",
        desc: "We figure out which channels actually work for your brand, build a funnel that converts, and run experiments to keep growing.\n\nOutcome: Growth roadmap + channel mix recommendation."
      },
      {
        title: "Analytics & Reporting",
        desc: "Reports that actually tell you something useful. What worked, what didn't, and what to do next.\n\nOutcome: Monthly dashboards + strategic recommendations."
      }
    ]
  },
  {
    id: "Social Media Marketing",
    subtext: "Content that stops the scroll and starts a conversation.",
    items: [
      {
        title: "Content Creation",
        desc: "Visuals, videos, and copy designed for each platform. Not repurposed — tailored for where your audience lives.\n\nOutcome: Monthly content calendar + asset library."
      },
      {
        title: "Instagram & Meta Strategy",
        desc: "A proper Instagram strategy — Reels, Stories, feed, the whole thing. We plan it so your brand actually gets seen.\n\nOutcome: Platform strategy + content system."
      },
      {
        title: "Social Media Management",
        desc: "We handle the day-to-day posting, replying, keeping your brand alive on social without you having to think about it.\n\nOutcome: Managed social presence + monthly reports."
      },
      {
        title: "Influencer & Brand Collaborations",
        desc: "Finding the right people to partner with so your brand reaches new audiences without feeling forced.\n\nOutcome: Collaboration framework + outreach templates."
      }
    ]
  },
  {
    id: "Video Production",
    subtext: "From 15-second Reels to full brand films, we make video people actually watch.",
    items: [
      {
        title: "Short-Form Content",
        desc: "Reels, TikToks, and shorts designed for social platforms. Fast-paced, engaging, and optimised for algorithm reach.\n\nOutcome: Edited short-form video content."
      },
      {
        title: "Brand Films",
        desc: "The kind of films that make people say 'wait, who made this?' — about us videos, launches, campaign films that feel like cinema.\n\nOutcome: Edited brand film + direction."
      },
      {
        title: "Product & Explainer Videos",
        desc: "Clear, visual explanations of your product, service, or value proposition. Great for websites and ads.\n\nOutcome: Scripted and produced explainer video."
      },
      {
        title: "Video Strategy & Direction",
        desc: "End-to-end planning — concept, scripting, storyboarding, and direction for any video project.\n\nOutcome: Video strategy deck + production plan."
      }
    ]
  }
];

export default function ServicesPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  const [openService, setOpenService] = useState<string>("Brand Strategy");

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#070708] pt-32 pb-20 overflow-hidden" ref={containerRef}>
      
      {/* Hero */}
      <section className="px-6 md:px-16 max-w-[1400px] mx-auto text-center mb-16 relative z-10">
        <div className="flex justify-center items-center gap-2 mb-6">
          <span className="text-xl md:text-2xl font-bold tracking-tight">Our Expertise</span>
          <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 border-l border-zinc-300 dark:border-zinc-700 pl-4 ml-4">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-sm" /> Services
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 mb-12">
          <TextReveal>Services for brands that give a damn.</TextReveal>
        </h1>
        
        <Tilt3D className="w-full h-[30vh] md:h-[60vh] rounded-3xl overflow-hidden relative">
          <motion.div style={{ y }} className="w-full h-[150%] absolute -top-1/4">
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&fit=crop" 
              alt="Services Hero" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </Tilt3D>
      </section>

      {/* Services List */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-32 relative z-10">
        <div className="flex flex-col gap-4">
          {services.map((service, idx) => {
            const isOpen = openService === service.id;
            return (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="border-b border-zinc-200 dark:border-zinc-800 pb-8"
              >
                <div 
                  className="flex justify-between items-start py-6 cursor-pointer group gap-6"
                  onClick={() => setOpenService(isOpen ? "" : service.id)}
                  onMouseEnter={() => setOpenService(service.id)}
                >
                  <div className="flex flex-col gap-1.5">
                    <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white transition-colors group-hover:text-[#0047FF]">
                      {service.id}
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed max-w-xl">
                      {service.subtext}
                    </p>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-1 transition-colors ${isOpen ? 'bg-[#0047FF] text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500 group-hover:bg-[#0047FF] group-hover:text-white'}`}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      <path d="M7 1L7 13M7 13L1 7M7 13L13 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, filter: "blur(8px)" }}
                      animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                      exit={{ height: 0, opacity: 0, filter: "blur(8px)" }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 pt-4 pb-4">
                        {service.items.map((item, i) => (
                          <div key={i} className="flex gap-4">
                            <div className="w-5 h-5 rounded-full bg-[#0047FF] flex items-center justify-center shrink-0 mt-1 text-[10px] text-white font-bold">
                              {i + 1}
                            </div>
                            <div>
                              <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">{item.title}</h4>
                              <p className="text-sm text-zinc-500 leading-relaxed font-sans whitespace-pre-line">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 mb-32 relative z-10">
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

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: 80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-5xl font-bold leading-tight relative"
              >
                What we<br/>
                <span className="relative inline-block">
                  stand for
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-1 left-0 right-0 h-[3px] bg-[#0047FF] origin-left block rounded-full"
                  />
                </span>
              </motion.h2>
            </div>

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
          <div className="flex flex-col gap-8 pt-8 w-full">
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
