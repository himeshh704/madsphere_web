"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Globe, 
  FolderOpen, 
  Briefcase, 
  Instagram, 
  Linkedin, 
  MessageCircle, 
  FileText 
} from "lucide-react";

export default function ConnectPage() {
  const links = [
    {
      label: "Visit our Website",
      href: "/",
      icon: Globe,
      external: false
    },
    {
      label: "Our Portfolio",
      href: "/works",
      icon: FolderOpen,
      external: false
    },
    {
      label: "Career Opportunities",
      href: "/careers",
      icon: Briefcase,
      external: false
    },
    {
      label: "Follow on Instagram",
      href: "https://www.instagram.com/madsphere.co?igsh=d2xldzdtb3VweW51",
      icon: Instagram,
      external: true
    },
    {
      label: "Connect on LinkedIn",
      href: "https://www.linkedin.com/company/madsphere/",
      icon: Linkedin,
      external: true
    },
    {
      label: "Join Whatsapp Channel",
      href: "#",
      icon: MessageCircle,
      external: true
    },
    {
      label: "Submit Inquiry Form",
      href: "/contact",
      icon: FileText,
      external: false
    }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white font-sans flex flex-col items-center justify-center p-6 overflow-hidden select-none">
      
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px"
        }}
      />

      {/* Glow Container and Rotating Orbits */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="absolute w-[200vw] h-[200vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          {/* Blue Glow Spot */}
          <div 
            className="absolute top-10 right-20 w-[50%] h-[50%] rounded-full opacity-60 filter blur-[100px]"
            style={{
              background: "radial-gradient(circle, rgba(0, 80, 255, 0.3) 0%, transparent 70%)"
            }}
          />
          {/* White Flare Glow Spot */}
          <div 
            className="absolute bottom-10 left-20 w-[45%] h-[45%] rounded-full opacity-50 filter blur-[120px]"
            style={{
              background: "radial-gradient(circle, rgba(255, 255, 255, 0.35) 0%, rgba(40, 100, 255, 0.15) 50%, transparent 70%)"
            }}
          />
        </motion.div>
      </div>

      {/* Content Container */}
      <main className="relative z-10 w-full max-w-md py-12 flex flex-col items-center">
        
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 w-full flex flex-col items-center"
        >
          <div className="w-full max-w-[280px] sm:max-w-[340px] mb-6 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
            <img src="/logo_white.png" alt="MadSphere Logo" className="w-full h-auto object-contain" />
          </div>
          <p className="text-[10px] tracking-[0.4em] font-bold text-white/80 uppercase">
            CLOCKED THE DIGITAL ERA
          </p>
        </motion.header>

        {/* Links Grid */}
        <section className="w-full flex flex-col gap-4">
          <h2 className="text-[9px] tracking-[0.25em] font-bold text-zinc-500 uppercase text-center mb-2">
            CONNECT WITH US
          </h2>

          <div className="flex flex-col gap-3.5">
            {links.map((link, index) => {
              const Icon = link.icon;
              const LinkContent = (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.025, y: -1 }}
                  whileTap={{ scale: 0.985 }}
                  className="flex items-center w-full px-6 py-4.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 rounded-2xl backdrop-blur-xl transition-colors cursor-pointer select-none text-zinc-100 hover:text-white"
                >
                  <Icon className="w-5 h-5 mr-4 shrink-0 text-white/80" />
                  <span className="text-sm font-semibold tracking-wide">{link.label}</span>
                </motion.div>
              );

              return link.external ? (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="w-full outline-none">
                  {LinkContent}
                </a>
              ) : (
                <Link key={link.label} href={link.href} className="w-full outline-none">
                  {LinkContent}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-16 text-zinc-600 text-[10px] tracking-wide"
        >
          <p>© 2026 MadSphere. All rights reserved.</p>
        </motion.footer>

      </main>

    </div>
  );
}
