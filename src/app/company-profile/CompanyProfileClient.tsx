"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, ChevronLeft, ChevronRight, FileText, ArrowLeft, Mail, Phone, MapPin, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { aboutHero, aboutPrinciples, aboutValues, servicesList, contactInfo, works } from "@/data/site";

export default function CompanyProfileClient() {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: "Introduction",
      subtitle: "WHO WE ARE",
      content: (
        <div className="flex flex-col justify-center h-full gap-6">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {aboutHero.title}
          </h2>
          <div className="h-0.5 w-20 bg-[#0047FF]" />
          <p className="text-lg text-zinc-600 dark:text-zinc-300 font-serif leading-relaxed max-w-2xl">
            {aboutHero.desc1}
          </p>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl">
            {aboutHero.desc2}
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4 max-w-xl">
            {aboutValues.map((val: any, idx: number) => (
              <div key={idx} className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/50 dark:bg-[#0c0c0e]/50">
                <span className="text-[10px] font-bold tracking-wider text-[#0047FF] uppercase">{val.label}</span>
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mt-1">{val.title}</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{val.text}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Our Core Principles",
      subtitle: "HOW WE THINK",
      content: (
        <div className="flex flex-col justify-center h-full gap-6">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs font-bold text-[#0047FF] uppercase tracking-widest">Our Principles</span>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">Design with Purpose</h2>
            </div>
            <span className="text-xs text-zinc-400 font-mono">Principles 01–04</span>
          </div>
          <div className="h-0.5 w-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aboutPrinciples.map((principle: any, idx: number) => (
              <div key={idx} className="flex gap-4 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#0c0c0e]">
                <span className="text-xl font-bold text-zinc-300 dark:text-zinc-700 font-mono">0{idx + 1}</span>
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-zinc-100">{principle.title}</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">{principle.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Services: Strategy & Design",
      subtitle: "WHAT WE DELIVER",
      content: (
        <div className="flex flex-col justify-center h-full gap-6">
          <div>
            <span className="text-xs font-bold text-[#0047FF] uppercase tracking-widest">Capabilities</span>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">Brand Strategy & Creative Design</h2>
          </div>
          <div className="h-0.5 w-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicesList.slice(0, 2).map((service: any, idx: number) => (
              <div key={idx} className="p-5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#0c0c0e]">
                <h4 className="font-bold text-zinc-900 dark:text-zinc-50 border-b border-zinc-100 dark:border-zinc-800 pb-2 mb-3">{service.id}</h4>
                <div className="flex flex-col gap-3">
                  {service.items.slice(0, 3).map((item: any, i: number) => (
                    <div key={i}>
                      <h5 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{item.title}</h5>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug">{item.desc.split('\n\n')[0]}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Services: Digital Presence",
      subtitle: "WHAT WE DELIVER",
      content: (
        <div className="flex flex-col justify-center h-full gap-6">
          <div>
            <span className="text-xs font-bold text-[#0047FF] uppercase tracking-widest">Capabilities</span>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">Websites & Digital Marketing</h2>
          </div>
          <div className="h-0.5 w-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicesList.slice(2, 4).map((service: any, idx: number) => (
              <div key={idx} className="p-5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#0c0c0e]">
                <h4 className="font-bold text-zinc-900 dark:text-zinc-50 border-b border-zinc-100 dark:border-zinc-800 pb-2 mb-3">{service.id}</h4>
                <div className="flex flex-col gap-3">
                  {service.items.slice(0, 3).map((item: any, i: number) => (
                    <div key={i}>
                      <h5 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{item.title}</h5>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug">{item.desc.split('\n\n')[0]}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Services: Content & Growth",
      subtitle: "WHAT WE DELIVER",
      content: (
        <div className="flex flex-col justify-center h-full gap-6">
          <div>
            <span className="text-xs font-bold text-[#0047FF] uppercase tracking-widest">Capabilities</span>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">Social & Video Production</h2>
          </div>
          <div className="h-0.5 w-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicesList.slice(4, 6).map((service: any, idx: number) => (
              <div key={idx} className="p-5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#0c0c0e]">
                <h4 className="font-bold text-zinc-900 dark:text-zinc-50 border-b border-zinc-100 dark:border-zinc-800 pb-2 mb-3">{service.id}</h4>
                <div className="flex flex-col gap-3">
                  {service.items.slice(0, 3).map((item: any, i: number) => (
                    <div key={i}>
                      <h5 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{item.title}</h5>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug">{item.desc.split('\n\n')[0]}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Selected Case Studies",
      subtitle: "OUR PORTFOLIO",
      content: (
        <div className="flex flex-col justify-center h-full gap-5">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs font-bold text-[#0047FF] uppercase tracking-widest">Case Studies</span>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">Featured Creative Work</h2>
            </div>
            <span className="text-xs text-zinc-400 font-mono">Selected Projects</span>
          </div>
          <div className="h-0.5 w-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {works.slice(0, 4).map((work: any, idx: number) => (
              <div key={idx} className="group p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#0c0c0e]">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900 relative">
                  <img src={work.img} alt={work.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                </div>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-50 mt-3">{work.title}</h4>
                <p className="text-[10px] text-zinc-450 mt-0.5 tracking-wide">{work.tags}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Contact Details",
      subtitle: "LET'S WORK",
      content: (
        <div className="flex flex-col justify-center h-full gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-[#0047FF] uppercase tracking-widest">Get In Touch</span>
            <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">Let&apos;s build something that cannot be ignored.</h2>
          </div>
          <div className="h-0.5 w-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              {contactInfo.map((info: any, idx: number) => {
                const Icon = info.label === "EMAIL" ? Mail : info.label === "PHONE" ? Phone : MapPin;
                if (info.label === "HOURS") return null;
                return (
                  <div key={idx} className="flex items-center gap-4 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#0c0c0e]">
                    <div className="w-10 h-10 rounded-full bg-[#0047FF]/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#0047FF]" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-zinc-400 tracking-wider uppercase">{info.label}</p>
                      <p className="font-bold text-sm text-zinc-900 dark:text-zinc-100">{info.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-gradient-to-br from-[#0047FF]/5 to-transparent flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Ready to start?</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                  Fill out our online inquiry form or schedule a call to connect with our creative strategy team directly.
                </p>
              </div>
              <Link 
                href="/contact" 
                className="mt-6 inline-flex items-center justify-center h-10 px-5 bg-[#0047FF] hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-lg shadow-blue-500/20"
              >
                Start Project Inquiry
              </Link>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#070708] pt-24 md:pt-32 pb-20 overflow-hidden relative z-10">
      <style>{`
        @media print {
          /* Hide standard elements */
          header, footer, nav, button, .screen-controls, .mascot-component, [data-cursor], .anti-inspect-trigger {
            display: none !important;
            visibility: hidden !important;
          }
          body, html, main {
            background: #ffffff !important;
            color: #121214 !important;
            margin: 0 !important;
            padding: 0 !important;
            height: auto !important;
            overflow: visible !important;
            width: 100% !important;
          }
          .print-container {
            display: block !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            z-index: 99999 !important;
          }
          .print-page {
            page-break-after: always;
            break-after: page;
            height: 100vh;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            box-sizing: border-box !important;
            padding: 2.5rem !important;
            background: #ffffff !important;
            color: #121214 !important;
            border: none !important;
            box-shadow: none !important;
          }
          .print-page * {
            color: #121214 !important;
          }
          .print-page div, .print-page h2, .print-page h4, .print-page p {
            color: #121214 !important;
          }
          .print-page .border-zinc-800 {
            border-color: #e4e4e7 !important;
          }
          .print-page .bg-[#0c0c0e] {
            background-color: #f4f4f5 !important;
          }
        }
      `}</style>

      {/* Screen Presentation View */}
      <section className="px-6 md:px-16 max-w-[1200px] mx-auto relative z-10 print:hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-[#0047FF] uppercase tracking-widest mb-3 transition-colors">
              <ArrowLeft className="w-3 h-3" /> Back to Home
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50">
              Agency Credentials
            </h1>
            <p className="text-zinc-500 font-serif mt-1">Interactive Company Profile & Brochure</p>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2.5 h-12 bg-[#0047FF] hover:bg-blue-700 text-white rounded-full px-6 text-xs font-bold uppercase tracking-widest transition-colors shadow-lg shadow-blue-500/20 cursor-pointer self-start md:self-auto shrink-0"
          >
            <Download className="w-4 h-4" /> Download PDF Profile
          </button>
        </div>

        {/* Slide Deck Container */}
        <div className="relative border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-[#09090b]/80 backdrop-blur-md shadow-2xl p-6 md:p-12 min-h-[480px] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-8 border-b border-zinc-100 dark:border-zinc-900 pb-4">
            <span className="text-xs font-bold tracking-widest text-[#0047FF] uppercase">{slides[activeSlide].subtitle}</span>
            <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase font-mono">{activeSlide + 1} / {slides.length}</span>
          </div>

          <div className="flex-1 min-h-[300px]">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {slides[activeSlide].content}
            </motion.div>
          </div>

          <div className="flex items-center justify-between mt-8 border-t border-zinc-100 dark:border-zinc-900 pt-6 screen-controls">
            <div className="flex gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${activeSlide === idx ? 'bg-[#0047FF]' : 'bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-400'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                disabled={activeSlide === 0}
                onClick={() => setActiveSlide(p => Math.max(0, p - 1))}
                className="w-10 h-10 border border-zinc-200 dark:border-zinc-800 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-[#0047FF] hover:border-[#0047FF] transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={activeSlide === slides.length - 1}
                onClick={() => setActiveSlide(p => Math.min(slides.length - 1, p + 1))}
                className="w-10 h-10 border border-zinc-200 dark:border-zinc-800 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-[#0047FF] hover:border-[#0047FF] transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-zinc-400">
          Tip: Clicking <strong>Download PDF</strong> will open the browser save menu. Set the orientation to <strong>Landscape</strong> for the best formatting!
        </div>
      </section>

      {/* Hidden Print Container - Only visible in Print Mode */}
      <div className="hidden print-container">
        {/* Cover Page */}
        <div className="print-page relative">
          <div className="text-center flex flex-col items-center justify-center h-full gap-4">
            <img src="/logo.png" alt="Madsphere Logo" className="h-12 w-auto mb-6 object-contain" />
            <h1 className="text-5xl font-bold tracking-tight text-zinc-900">COMPANY PROFILE</h1>
            <p className="text-zinc-500 font-serif text-lg tracking-wide uppercase mt-1">Credentials & Creative Capabilities</p>
            <div className="h-1 w-32 bg-[#0047FF] mt-4" />
            <div className="absolute bottom-10 left-10 right-10 flex justify-between border-t border-zinc-200 pt-6 text-xs text-zinc-400">
              <span>hello@madsphere.in</span>
              <span>MADSPHERE STUDIO</span>
              <span>www.madsphere.in</span>
            </div>
          </div>
        </div>

        {/* Dynamic Pages */}
        {slides.map((slide, idx) => (
          <div key={idx} className="print-page relative">
            <div className="absolute top-8 left-8 right-8 flex justify-between border-b border-zinc-200 pb-3 text-xs text-zinc-400 uppercase tracking-widest">
              <span>{slide.subtitle}</span>
              <span>PAGE {idx + 2}</span>
            </div>
            <div className="my-auto">
              {slide.content}
            </div>
            <div className="absolute bottom-8 left-8 right-8 flex justify-between border-t border-zinc-200 pt-3 text-[10px] text-zinc-400">
              <span>MADSPHERE</span>
              <span>COMPANY PROFILE</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
