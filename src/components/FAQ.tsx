"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { MagneticWrap, Tilt3D } from "./Animations";

const faqs = [
  {
    id: "Q-01",
    question: "What services does your agency provide for modern digital brands?",
    answer: "We offer comprehensive digital solutions including brand strategy, UX/UI design, full-stack web development, and digital marketing to scale your brand effectively."
  },
  {
    id: "Q-02",
    question: "How does your pricing model work for ongoing design services?",
    answer: "We work on a value-based or retainer model depending on the scope. For ongoing services, we offer flexible monthly retainers tailored to your specific needs."
  },
  {
    id: "Q-03",
    question: "How quickly will we receive our first design delivery timeline?",
    answer: "Typically, initial concepts are delivered within 1-2 weeks after the kickoff meeting and onboarding process are complete."
  },
  {
    id: "Q-04",
    question: "How many revisions are included within each selected pricing plan?",
    answer: "Most of our packages include 2-3 rounds of revisions, but we operate on a partnership model—we don't stop until you are completely satisfied."
  },
  {
    id: "Q-05",
    question: "Do you offer both design and Webflow development services together?",
    answer: "Yes! We specialize in end-to-end delivery, meaning we design in Figma and develop in Webflow, Next.js, or whatever stack best suits the project."
  },
  {
    id: "Q-06",
    question: "Can clients pause or cancel subscriptions anytime without penalty fees?",
    answer: "Absolutely. Our retainer models are flexible, allowing you to pause or cancel with a standard 30-day notice without any hidden penalty fees."
  }
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);
  const router = useRouter();

  return (
    <section className="faq-section py-32 px-6 md:px-12 max-w-[1400px] mx-auto relative z-10 bg-[#f5f5f5] dark:bg-[#0a0a0a] rounded-[40px] mt-24 mb-24">
      <div className="flex flex-col items-center mb-16">
        <div className="flex items-center gap-3">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Have Question
          </h2>
          <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 border-l border-zinc-300 dark:border-zinc-700 pl-4">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-sm" /> FAQ'S
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
                      <p className="pb-8 pl-16 md:pl-20 text-zinc-500 dark:text-zinc-400 font-serif text-lg">
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
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white leading-tight">
              Still have any<br/>Question?
            </h3>
            <MagneticWrap>
              <motion.button
                onClick={() => router.push('/contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 350, damping: 15 }}
                className="self-start flex items-center gap-3 bg-[#0047FF] hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full transition-colors shadow-lg shadow-blue-500/20 cursor-pointer"
              >
                Contact Us <ArrowRight className="w-4 h-4" />
              </motion.button>
            </MagneticWrap>
          </div>
        </div>
      </div>
    </section>
  );
}
