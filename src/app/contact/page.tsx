"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Instagram, Linkedin, Facebook, Twitter, CheckCircle2 } from "lucide-react";
import { TextReveal, Tilt3D, MagneticWrap } from "@/components/Animations";
import FAQ from "@/components/FAQ";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "", phone: "", email: "", company: "", service: "Design", budget: "25k-50k", message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate real form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: "", phone: "", email: "", company: "", service: "Design", budget: "25k-50k", message: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
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
              {[
                { icon: Mail, label: "EMAIL", value: "hello@madsphere.in" },
                { icon: Phone, label: "PHONE", value: "+91 98765 43210" },
                { icon: MapPin, label: "STUDIO", value: "Lower Parel, Mumbai 400013" },
                { icon: Clock, label: "HOURS", value: "Mon-Fri, 10am - 7pm IST" }
              ].map((item, i) => (
                <Tilt3D key={i} className="flex items-center gap-6 p-6 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#0a0a0a]">
                  <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-zinc-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase mb-1">{item.label}</p>
                    <p className="font-bold text-zinc-900 dark:text-zinc-100">{item.value}</p>
                  </div>
                </Tilt3D>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-8 mt-2">
              <span className="font-bold">Follow us</span>
              <div className="flex items-center gap-3">
                {[Instagram, Linkedin, Facebook, Twitter].map((Icon, i) => (
                  <MagneticWrap key={i}>
                    <a href="#" className="w-10 h-10 border border-zinc-200 dark:border-zinc-800 rounded-lg flex items-center justify-center text-zinc-600 hover:text-[#0047FF] hover:border-[#0047FF] transition-colors bg-white dark:bg-[#0a0a0a]">
                      <Icon className="w-4 h-4" />
                    </a>
                  </MagneticWrap>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Send us a message</h3>
              <p className="text-zinc-500 text-sm font-serif">Fill out the form — we&apos;ll get back to you shortly.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-zinc-500">Full Name</label>
                  <input required name="name" value={formState.name} onChange={handleChange} type="text" placeholder="John Doe" className="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] outline-none focus:border-[#0047FF] transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-zinc-500">Phone Number</label>
                  <input required name="phone" value={formState.phone} onChange={handleChange} type="tel" placeholder="+91 90000 00000" className="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] outline-none focus:border-[#0047FF] transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-zinc-500">Email</label>
                  <input required name="email" value={formState.email} onChange={handleChange} type="email" placeholder="you@example.com" className="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] outline-none focus:border-[#0047FF] transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-zinc-500">Your Company Name</label>
                  <input required name="company" value={formState.company} onChange={handleChange} type="text" placeholder="Company Ltd" className="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] outline-none focus:border-[#0047FF] transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-zinc-500">Select a Service</label>
                  <select name="service" value={formState.service} onChange={handleChange} className="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] outline-none focus:border-[#0047FF] transition-colors appearance-none">
                    <option value="Design">UI/UX Design</option>
                    <option value="Development">Web Development</option>
                    <option value="Marketing">Digital Marketing</option>
                    <option value="Branding">Branding</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-zinc-500">Select your budget</label>
                  <select name="budget" value={formState.budget} onChange={handleChange} className="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] outline-none focus:border-[#0047FF] transition-colors appearance-none">
                    <option value="<10k">Less than $10k</option>
                    <option value="10k-25k">$10k - $25k</option>
                    <option value="25k-50k">$25k - $50k</option>
                    <option value="50k+">$50k+</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-zinc-500">Your Message</label>
                <textarea required name="message" value={formState.message} onChange={handleChange} placeholder="eg: Hi, I want to connect you for my brand..." rows={5} className="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] outline-none focus:border-[#0047FF] transition-colors resize-none" />
              </div>

              <motion.button 
                type="submit"
                disabled={isSubmitting || isSuccess}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 350, damping: 15 }}
                className={`w-full py-4 rounded-xl text-white font-bold transition-colors flex items-center justify-center gap-2 ${isSuccess ? 'bg-green-500' : 'bg-[#0047FF] hover:bg-blue-700'} disabled:opacity-70 cursor-pointer`}
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isSuccess ? (
                  <><CheckCircle2 className="w-5 h-5" /> Message Sent</>
                ) : (
                  "Submit"
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </section>

      <FAQ />

    </main>
  );
}
