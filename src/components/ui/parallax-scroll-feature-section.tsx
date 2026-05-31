'use client'

import { useRef } from "react"
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from "lucide-react"
import { cn } from "@/utils/cn"

interface ProcessStep {
  step: string;
  title: string;
  desc: string;
  img: string;
}

interface ParallaxScrollFeatureSectionProps {
  steps?: readonly ProcessStep[] | ProcessStep[];
}

export const ParallaxScrollFeatureSection = ({ steps = [] }: ParallaxScrollFeatureSectionProps) => {
    // Map process steps data if provided, or default to standard feature details
    const sections = steps.length > 0 
      ? steps.map((item, index) => ({
          id: index + 1,
          title: item.title,
          description: item.desc,
          imageUrl: item.img,
          stepNum: item.step,
          reverse: index % 2 === 1
        }))
      : [
          {
              id: 1,
              title: "Discovery",
              description: "We figure out who you are, what's going on in your market, and what you're actually trying to achieve. No assumptions. Just listening.",
              imageUrl: '/process_step_01.png',
              stepNum: "01",
              reverse: false
          },
          {
              id: 2,
              title: "Strategy",
              description: "Now we decide where you're headed. Positioning, messaging, the whole direction — mapped out so there's no guesswork later.",
              imageUrl: '/process_step_02.png',
              stepNum: "02",
              reverse: true
          },
          {
              id: 3,
              title: "Create",
              description: "This is where it all becomes real. Designs get built, words get written, videos get shot — everything has a reason for being there.",
              imageUrl: '/process_step_03.png',
              stepNum: "03",
              reverse: false
          },
          {
              id: 4,
              title: "Launch & Grow",
              description: "We put it live, see how it lands, and keep making it better. Good work isn't a one-time thing — it's a cycle.",
              imageUrl: '/process_step_04.png',
              stepNum: "04",
              reverse: true
          }
      ];

    // Create refs and animations for each section
    const sectionRefs = sections.map(() => useRef<HTMLDivElement>(null));
    
    const scrollYProgresss = sections.map((_, index) => {
        return useScroll({
            target: sectionRefs[index],
            offset: ["start end", "center start"]
        }).scrollYProgress;
    });

    // Create animations for each section using Framer Motion hooks directly
    const opacityContents = scrollYProgresss.map(progress => 
        useTransform(progress, [0, 0.7], [0, 1])
    );
    
    const clipProgresses = scrollYProgresss.map(progress => 
        useTransform(progress, [0, 0.7], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"])
    );
    
    const translateContents = scrollYProgresss.map(progress => 
        useTransform(progress, [0, 1], [-50, 0])
    );

  return (
    <div className="w-full flex flex-col items-center">
       <div className="flex flex-col w-full max-w-[1200px] mx-auto px-6 md:px-16 gap-16 py-12">
            {sections.map((section, index) => (
                <div 
                    key={section.id}
                    ref={sectionRefs[index]} 
                    className={`min-h-[60vh] py-12 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24 ${section.reverse ? 'md:flex-row-reverse' : ''}`}
                >
                    <motion.div 
                      style={{ y: translateContents[index] }}
                      className="flex-1 flex flex-col gap-4 text-left"
                    >
                        <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-sans">
                          [Step — {section.stepNum}]
                        </span>
                        <h3 className="text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 font-sans tracking-tight leading-tight">
                          {section.title}
                        </h3>
                        <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed max-w-md mt-2">
                          {section.description}
                        </p>
                    </motion.div>
                    
                    <motion.div 
                        style={{ 
                            opacity: opacityContents[index],
                            clipPath: clipProgresses[index],
                        }}
                        className="flex-1 w-full max-w-md md:max-w-none aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-black"
                    >
                        <img 
                            src={section.imageUrl} 
                            className="w-full h-full object-cover" 
                            alt={`Step ${section.title}`}
                        />
                    </motion.div>
                </div>
            ))}
        </div>
    </div>
  );
};
