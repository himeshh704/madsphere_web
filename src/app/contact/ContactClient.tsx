"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Instagram, Linkedin, Facebook, CheckCircle2, ArrowRight, ChevronDown } from "lucide-react";
import { TextReveal, Tilt3D } from "@/components/Animations";

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
import { contactInfo } from "@/data/site";
import FAQ from "@/components/FAQ";

export default function ContactClient() {
  const [formState, setFormState] = useState({
    name: "", phone: "", email: "", company: "", service: "Design", budget: "25k-50k", message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        setIsSuccess(true);
        setFormState({ name: "", phone: "", email: "", company: "", service: "Design", budget: "25k-50k", message: "" });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (err) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#070708] pt-32 pb-20 overflow-hidden">
      
      <section className="px-6 md:px-16 max-w-[1400px] mx-auto text-center mb-16 relative z-10">
        <div className="flex justify-center items-center gap-2 mb-6">
          <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 border-l border-zinc-300 dark:border-zinc-700 pl-4">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-sm" /> Contact Us
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50">
          <TextReveal>Let&apos;s make something great</TextReveal>
        </h1>
      </section>

      <section className="px-6 md:px-16 max-w-[1400px] mx-auto mb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 border-t border-zinc-200 dark:border-zinc-800 pt-16">
          
          {/* Left Column - Contact Info */}
          <div className="flex flex-col gap-10">
            <div>
              <h3 className="text-2xl font-bold mb-2">We typically respond within 24 hours.</h3>
              <p className="text-zinc-500 font-serif">Whether you&apos;re a growing startup or an established brand, we&apos;d love to hear about your goals and see how we can help.</p>
            </div>

            <div className="flex flex-col gap-4">
              {contactInfo.map((item, i) => {
                const Icon = item.label === "EMAIL" ? Mail : item.label === "PHONE" ? Phone : item.label === "STUDIO" ? MapPin : Clock;
                return (
                  <Tilt3D key={i} className="flex items-center gap-6 p-6 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#0a0a0a]">
                    <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-zinc-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase mb-1">{item.label}</p>
                    <p className="font-bold text-zinc-900 dark:text-zinc-100">{item.value}</p>
                  </div>
                </Tilt3D>
                );
              })}
            </div>

            <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-8 mt-2">
              <span className="font-bold">Follow us</span>
              <div className="flex items-center gap-3">
                {[
                  { Icon: Instagram, href: "https://www.instagram.com/madsphere.co?igsh=d2xldzdtb3VweW51" },
                  { Icon: Linkedin, href: "https://www.linkedin.com/company/madsphere/" },
                  { Icon: Facebook, href: "#" },
                  { Icon: XIcon, href: "#" }
                ].map(({ Icon, href }, i) => (
                  <a key={i} href={href} target="_blank" rel="noreferrer" className="w-10 h-10 border border-zinc-200 dark:border-zinc-800 rounded-lg flex items-center justify-center text-zinc-600 hover:text-[#0047FF] hover:border-[#0047FF] transition-colors bg-white dark:bg-[#0a0a0a]">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="flex flex-col gap-6">
            <div className="bg-white/80 dark:bg-white/90 backdrop-blur-2xl border border-white/60 rounded-2xl shadow-2xl overflow-hidden relative">
              
              {/* macOS Title Bar */}
              <div className="h-10 bg-gradient-to-b from-white/90 to-white/55 dark:from-white/10 dark:to-white/5 border-b border-zinc-200/50 flex items-center px-4 relative">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-[11px] font-bold text-zinc-700 tracking-wide">New Message</span>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold tracking-widest uppercase text-zinc-500">Full Name</label>
                      <input required name="name" value={formState.name} onChange={handleChange} type="text" placeholder="Steve Jobs" className="w-full p-3.5 rounded-xl border border-zinc-200/80 bg-white/45 text-zinc-805 placeholder:text-zinc-400 outline-none focus:border-[#0047FF] focus:bg-white transition-all shadow-sm text-sm font-semibold" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold tracking-widest uppercase text-zinc-500">Phone Number</label>
                      <input required name="phone" value={formState.phone} onChange={handleChange} type="tel" placeholder="+1 800 692 7753" className="w-full p-3.5 rounded-xl border border-zinc-200/80 bg-white/45 text-zinc-805 placeholder:text-zinc-400 outline-none focus:border-[#0047FF] focus:bg-white transition-all shadow-sm text-sm font-semibold" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold tracking-widest uppercase text-zinc-500">Email</label>
                      <input required name="email" value={formState.email} onChange={handleChange} type="email" placeholder="steve@apple.com" className="w-full p-3.5 rounded-xl border border-zinc-200/80 bg-white/45 text-zinc-805 placeholder:text-zinc-400 outline-none focus:border-[#0047FF] focus:bg-white transition-all shadow-sm text-sm font-semibold" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold tracking-widest uppercase text-zinc-500">Company</label>
                      <input required name="company" value={formState.company} onChange={handleChange} type="text" placeholder="Apple Inc." className="w-full p-3.5 rounded-xl border border-zinc-200/80 bg-white/45 text-zinc-805 placeholder:text-zinc-400 outline-none focus:border-[#0047FF] focus:bg-white transition-all shadow-sm text-sm font-semibold" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold tracking-widest uppercase text-zinc-500">Service</label>
                      <div className="relative">
                        <select name="service" value={formState.service} onChange={handleChange} className="w-full p-3.5 rounded-xl border border-zinc-200/80 bg-white/45 text-zinc-805 outline-none focus:border-[#0047FF] focus:bg-white transition-all shadow-sm text-sm font-semibold appearance-none pr-10 cursor-pointer">
                          <option value="Design" className="bg-white text-zinc-900 font-semibold">UI/UX Design</option>
                          <option value="Development" className="bg-white text-zinc-900 font-semibold">Web Development</option>
                          <option value="Marketing" className="bg-white text-zinc-900 font-semibold">Digital Marketing</option>
                          <option value="Branding" className="bg-white text-zinc-900 font-semibold">Branding</option>
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-450 pointer-events-none" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold tracking-widest uppercase text-zinc-500">Budget</label>
                      <div className="relative">
                        <select name="budget" value={formState.budget} onChange={handleChange} className="w-full p-3.5 rounded-xl border border-zinc-200/80 bg-white/45 text-zinc-805 outline-none focus:border-[#0047FF] focus:bg-white transition-all shadow-sm text-sm font-semibold appearance-none pr-10 cursor-pointer">
                          <option value="<10k" className="bg-white text-zinc-900 font-semibold">Less than $10k</option>
                          <option value="10k-25k" className="bg-white text-zinc-900 font-semibold">$10k - $25k</option>
                          <option value="25k-50k" className="bg-white text-zinc-900 font-semibold">$25k - $50k</option>
                          <option value="50k+" className="bg-white text-zinc-900 font-semibold">$50k+</option>
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-450 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold tracking-widest uppercase text-zinc-500">Message</label>
                    <textarea required name="message" value={formState.message} onChange={handleChange} placeholder="Tell us about the next big thing you're building..." rows={4} className="w-full p-4 rounded-xl border border-zinc-200/80 bg-white/45 text-zinc-805 placeholder:text-zinc-400 outline-none focus:border-[#0047FF] focus:bg-white transition-all shadow-sm resize-none text-sm font-semibold" />
                  </div>

              <motion.button 
                type="submit"
                disabled={isSubmitting || isSuccess}
                whileHover="hover"
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 350, damping: 15 }}
                className={`h-12 self-start flex items-center text-white font-bold text-xs uppercase tracking-widest transition-colors shadow-lg shadow-blue-500/20 rounded-full pl-6 pr-2 cursor-pointer ${isSuccess ? 'bg-green-500 hover:bg-green-600 shadow-green-500/20' : 'bg-[#0047FF] hover:bg-blue-700 shadow-blue-500/20'} disabled:opacity-70`}
              >
                <span>
                  {isSubmitting ? "Sending..." : isSuccess ? "Message Sent" : "Submit"}
                </span>
                <motion.span
                  variants={{ hover: { x: 2 } }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="ml-3 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0"
                >
                  {isSubmitting ? (
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  )}
                </motion.span>
              </motion.button>
            </form>
            </div>
          </div>
        </div>
        </div>
      </section>

      <FAQ />

    </main>
  );
}
