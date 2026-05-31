"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { Tilt3D, MagneticWrap } from "./Animations";
import { useRouter, usePathname } from "next/navigation";

const faqs = [
  {
    id: "Q-01",
    question: "What does a creative branding studio actually do?",
    answer: "We help brands figure out who they're for, what they stand for, and what they should actually say. Sometimes that means building a whole identity from scratch. Sometimes it's just a website, a social media refresh, or someone to finally make their brand look as good as their product. It always starts with a conversation."
  },
  {
    id: "Q-02",
    question: "Are you a new agency? Should I be concerned about experience?",
    answer: "We're new, and we're not pretending otherwise. What we don't have in portfolio size, we make up for in attention — every client we take on gets our full focus, not a junior account manager or a templated deck. If you'd rather work with a small team that actually cares than a big agency that's done this a hundred times before, we'll probably get along."
  },
  {
    id: "Q-03",
    question: "How long does a typical brand project take?",
    answer: "It depends on scope. A brand identity project typically takes 3–4 weeks. A website can range from 4–8 weeks depending on complexity. We'll give you a clear timeline before we start — no vague promises."
  },
  {
    id: "Q-04",
    question: "Do you work with startups, or only established businesses?",
    answer: "Startups are actually our sweet spot. We understand the constraints, the urgency, and the need for branding that works from day one. But we also work with established businesses looking to rebrand or refresh their identity."
  },
  {
    id: "Q-05",
    question: "How do you approach a branding project?",
    answer: "First, we listen — really listen. To your market, your audience, your gut feeling about what you need. Then we strategise, design, and deliver. No templates. No shortcuts. And you're involved at every step, not just at the beginning and end."
  },
  {
    id: "Q-06",
    question: "Do you work with clients outside India?",
    answer: "Absolutely. We work with clients across India and internationally. Everything we do can be handled remotely — we're set up for collaboration no matter where you are."
  }
];

export default function FAQ() {
  const router = useRouter();
  const pathname = usePathname();
  const [openId, setOpenId] = useState<string | null>(null);

  const showContactButton = pathname !== "/contact";

  return (
    <section className="faq-section py-32 px-6 md:px-12 max-w-[1400px] mx-auto relative z-10 bg-[#f5f5f5] dark:bg-[#0a0a0a] rounded-[40px] mt-24 mb-24">
      <div className="flex flex-col items-center mb-16">
        <div className="flex items-center gap-3 flex-nowrap">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 whitespace-nowrap">
            Have Question
          </h2>
          <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 border-l border-zinc-300 dark:border-zinc-700 pl-4 whitespace-nowrap">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-sm" /> FAQ&apos;S
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 items-start">
        {/* Accordion list */}
        <div className="flex-1 w-full flex flex-col">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id} 
                className="border-b border-zinc-200 dark:border-zinc-800 last:border-0"
                onMouseEnter={() => setOpenId(faq.id)}
                onMouseLeave={() => setOpenId(null)}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full py-6 flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-6 md:gap-10">
                    <span className="text-sm font-bold text-zinc-400 dark:text-zinc-600 transition-colors group-hover:text-[#0047FF]">
                      {faq.id}
                    </span>
                    <span className="text-lg md:text-xl font-bold text-zinc-800 dark:text-zinc-200 transition-colors group-hover:text-[#0047FF]">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-[#0047FF] border-[#0047FF] text-white rotate-180' : 'border-zinc-300 dark:border-zinc-700 text-zinc-400 group-hover:border-[#0047FF] group-hover:text-[#0047FF]'}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, filter: "blur(10px)" }}
                      animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                      exit={{ height: 0, opacity: 0, filter: "blur(10px)" }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 pl-16 md:pl-20 text-zinc-800 dark:text-zinc-200 font-sans font-semibold text-base md:text-lg leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Right side VR image box */}
        <div className="w-full lg:w-[380px] flex flex-col shrink-0 gap-8">
          <Tilt3D className="w-full rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-200 dark:bg-zinc-800 relative">
            <img 
              src="https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=800&fit=crop" 
              alt="VR Developer" 
              className="w-full h-full object-cover"
            />
          </Tilt3D>
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white leading-tight whitespace-nowrap">
              Still have any Question?
            </h3>
            {showContactButton && (
              <motion.button
                onClick={() => router.push('/contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 350, damping: 15 }}
                className="self-start flex items-center gap-3 bg-[#0047FF] hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full transition-colors shadow-lg shadow-blue-500/20 cursor-pointer"
              >
                Contact Us <ArrowRight className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
