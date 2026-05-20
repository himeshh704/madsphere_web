"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto gap-4">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="group rounded-2xl overflow-hidden glass hover:border-foreground/15 transition-all duration-300 shadow-sm"
          >
            {/* Accordion Trigger */}
            <button
              onClick={() => toggleItem(idx)}
              className="w-full flex items-center justify-between p-6 text-left font-sans font-medium text-base md:text-lg text-foreground hover:text-brand cursor-pointer focus:outline-none transition-colors duration-300"
            >
              <span>{item.question}</span>
              <span className="p-2 rounded-full glass group-hover:scale-105 transition-transform duration-300">
                {isOpen ? (
                  <Minus className="h-4 w-4 text-brand" />
                ) : (
                  <Plus className="h-4 w-4 text-foreground/50" />
                )}
              </span>
            </button>

            {/* Accordion Content Panels */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-sm md:text-base leading-relaxed text-foreground/70 font-light max-w-xl">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
