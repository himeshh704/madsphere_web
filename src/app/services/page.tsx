"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { TextReveal, Tilt3D, AnimatedCounter } from "@/components/Animations";
import FAQ from "@/components/FAQ";

const services = [
  {
    id: "Brand Strategy",
    items: [
      { title: "Campaign Positioning", desc: "A brand is just a reflection of your business reality... a strong identity translates to..." },
      { title: "Complete Visual System", desc: "A brand is just a reflection of your business reality... a strong identity translates to..." },
      { title: "Consistent Brand Language", desc: "A brand is just a reflection of your business reality... a strong identity translates to..." },
      { title: "Guidelines and Rollout", desc: "A brand is just a reflection of your business reality... a strong identity translates to..." }
    ]
  },
  {
    id: "Creative Design",
    items: [
      { title: "Research and Design", desc: "A brand is just a reflection of your business reality... a strong identity translates to..." },
      { title: "Intuitive User Flows", desc: "A brand is just a reflection of your business reality... a strong identity translates to..." },
      { title: "Accessible Interfaces", desc: "A brand is just a reflection of your business reality... a strong identity translates to..." },
      { title: "Prototyping and Test", desc: "A brand is just a reflection of your business reality... a strong identity translates to..." }
    ]
  },
  {
    id: "Web Development",
    items: [
      { title: "Clean Code Architecture", desc: "A brand is just a reflection of your business reality... a strong identity translates to..." },
      { title: "Responsive Across Devices", desc: "A brand is just a reflection of your business reality... a strong identity translates to..." },
      { title: "Performance Optimized", desc: "A brand is just a reflection of your business reality... a strong identity translates to..." },
      { title: "Seamless CMS Integration", desc: "A brand is just a reflection of your business reality... a strong identity translates to..." }
    ]
  },
  {
    id: "Digital Marketing",
    items: [
      { title: "Full Site Audit", desc: "A brand is just a reflection of your business reality... a strong identity translates to..." },
      { title: "Conversion Optimization", desc: "A brand is just a reflection of your business reality... a strong identity translates to..." },
      { title: "Technical SEO Foundation", desc: "A brand is just a reflection of your business reality... a strong identity translates to..." },
      { title: "Ongoing Performance Tracking", desc: "A brand is just a reflection of your business reality... a strong identity translates to..." }
    ]
  },
  {
    id: "Video Production",
    items: [
      { title: "Story Design", desc: "A brand is just a reflection of your business reality... a strong identity translates to..." },
      { title: "Equipment Setup", desc: "A brand is just a reflection of your business reality... a strong identity translates to..." },
      { title: "Performance Optimized", desc: "A brand is just a reflection of your business reality... a strong identity translates to..." },
      { title: "Seamless CMS Integration", desc: "A brand is just a reflection of your business reality... a strong identity translates to..." }
    ]
  },
  {
    id: "Performance Ads",
    items: [
      { title: "Full Site Audit", desc: "A brand is just a reflection of your business reality... a strong identity translates to..." },
      { title: "Conversion Optimization", desc: "A brand is just a reflection of your business reality... a strong identity translates to..." },
      { title: "Technical SEO Foundation", desc: "A brand is just a reflection of your business reality... a strong identity translates to..." },
      { title: "Ongoing Performance Tracking", desc: "A brand is just a reflection of your business reality... a strong identity translates to..." }
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
          <TextReveal>Take Your Business to the Next Level</TextReveal>
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
                  className="flex justify-between items-center py-6 cursor-pointer group"
                  onClick={() => setOpenService(isOpen ? "" : service.id)}
                >
                  <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white transition-colors group-hover:text-[#0047FF]">
                    {service.id}
                  </h2>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-[#0047FF] text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500 group-hover:bg-[#0047FF] group-hover:text-white'}`}>
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
                              <p className="text-sm text-zinc-500 leading-relaxed font-serif">{item.desc}</p>
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
                <h4 className="text-xl font-bold mb-2">Impact Through</h4>
                <p className="text-zinc-500 font-serif">We create digital experiences that have meaning and strategy, driving engagement and business value.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-8 h-8 rounded-full bg-[#0047FF] text-white flex items-center justify-center shrink-0">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M13 1L1 13M13 1L13 13M13 1L1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Design That Moves</h4>
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
