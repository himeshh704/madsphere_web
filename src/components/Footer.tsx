"use client";

import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Facebook, Twitter } from "lucide-react";
import { MagneticWrap, TextReveal } from "@/components/Animations";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/works") return null;
  const showSayHi = pathname !== "/contact"; // Hide CTA section on contact page to avoid redundant contact buttons

  return (
    <footer className="relative z-10 w-full overflow-hidden flex flex-col transition-colors duration-300">
      {/* Lower Footer: Solid Black Block (Always dark for high contrast) */}
      <div className="w-full bg-[#050505] text-white pt-24 pb-8 flex flex-col items-center relative z-10 border-t border-zinc-900">
        
        {/* Upper Footer inside the dark container */}
        {showSayHi && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-[1400px] w-full mx-auto px-6 md:px-16 flex flex-col items-center text-center mb-20"
          >
            <div className="relative inline-block w-full max-w-4xl mb-8">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] relative z-10 text-center">
                <TextReveal>Let&apos;s build</TextReveal><br />
                <TextReveal>something real.</TextReveal>
              </h2>
              
              {/* Decorative images behind text - Pop up slower and Float */}
              <motion.div 
                inherit={false}
                initial={{ opacity: 0, scale: 0.8, rotate: -15, y: 100 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -6, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ scale: 1.15, rotate: 0, zIndex: 30 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="absolute top-[12%] left-[0%] sm:left-[5%] md:left-[10%] lg:left-[15%] w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 z-0 rounded-lg overflow-hidden cursor-pointer shadow-lg border border-white/10 bg-zinc-800"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full relative"
                >
                  <div className="absolute inset-0 bg-red-600 mix-blend-overlay z-10 pointer-events-none"></div>
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&fit=crop" className="w-full h-full object-cover filter grayscale contrast-125" alt="Portrait" />
                </motion.div>
              </motion.div>
              
              <motion.div 
                inherit={false}
                initial={{ opacity: 0, scale: 0.8, rotate: 15, y: 100 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 6, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ scale: 1.15, rotate: 0, zIndex: 30 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
                className="absolute top-[22%] right-[0%] sm:right-[5%] md:right-[10%] lg:right-[15%] w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 z-0 rounded-lg overflow-hidden cursor-pointer shadow-lg border border-white/10 bg-zinc-800"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  className="w-full h-full relative"
                >
                  <div className="absolute inset-0 bg-red-600 mix-blend-overlay z-10 pointer-events-none"></div>
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&fit=crop" className="w-full h-full object-cover filter grayscale contrast-125" alt="Portrait" />
                </motion.div>
              </motion.div>
            </div>

            <p className="text-sm md:text-base text-zinc-400 font-serif mb-8 max-w-md mx-auto relative z-10">
              Tell us where you are, where you want to go, and we&apos;ll figure out the rest together.
            </p>
            
            <motion.button
              onClick={() => router.push('/contact')}
              whileHover="hover"
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 350, damping: 15 }}
              className="flex items-center gap-0 bg-[#0047FF] hover:bg-blue-700 text-white rounded-full pl-5 pr-1.5 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors shadow-lg shadow-blue-500/20 relative z-10 cursor-pointer"
            >
              CONTACT US
              <motion.span
                variants={{ hover: { x: 2 } }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="ml-3 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
              >
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.span>
            </motion.button>
          </motion.div>
        )}

        <div data-cursor-square="MADSPHERE" className="w-full relative px-6 md:px-16 mb-16 overflow-visible lg:cursor-none">
          <h1 
            className="text-center text-[13vw] font-bold leading-none select-none tracking-tight pr-4"
            style={{ 
              fontFamily: "Georgia, serif", 
              background: "linear-gradient(to bottom, #ffffff 0%, transparent 120%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              paddingRight: "0.05em"
            }}
          >
            MADSPHERE
          </h1>
        </div>

        <div className="w-full max-w-[1500px] px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-zinc-900">
          <div className="flex items-center gap-3">
            {[Instagram, Linkedin, Facebook, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 rounded-md bg-zinc-900 hover:bg-zinc-800 border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
          
          <div className="flex items-center flex-wrap justify-center gap-6 text-[10px] uppercase font-bold tracking-widest text-zinc-500">
            <a href="/about" className="hover:text-white transition-colors">About</a>
            {/* <a href="/works" className="hover:text-white transition-colors">Works</a> */}
            <a href="/careers" className="hover:text-white transition-colors">Career Inquiries</a>
            <a href="/contact" className="hover:text-white transition-colors">Contact Us</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>

          <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">
            © 2026 MadSphere Marketing Agency. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
