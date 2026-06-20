"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export function CustomCursor() {
  const x = useSpring(useMotionValue(0), { stiffness: 600, damping: 30 });
  const y = useSpring(useMotionValue(0), { stiffness: 600, damping: 30 });
  const [hoverType, setHoverType] = useState<"square" | "button" | null>(null);
  const [hoveredText, setHoveredText] = useState("");

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const squareEl = t.closest("[data-cursor-square]") as HTMLElement;
      const buttonEl = t.closest("button, a, [role='button'], .cursor-pointer") as HTMLElement;

      if (squareEl) {
        setHoverType("square");
        setHoveredText(squareEl.getAttribute("data-cursor-square") || "Contact Us");
      } else if (buttonEl) {
        setHoverType("button");
        setHoveredText("");
      } else {
        setHoverType(null);
        setHoveredText("");
      }
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, [x, y]);

  return (
    <motion.div
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      className="fixed top-0 left-0 z-[9999] pointer-events-none hidden lg:block"
    >
      <motion.div
        animate={
          hoverType === "square"
            ? {
                width: 96,
                height: 96,
                borderRadius: "12px",
                backgroundColor: "#0047FF",
              }
            : hoverType === "button"
            ? {
                width: 40,
                height: 40,
                borderRadius: "9999px",
                backgroundColor: "rgba(0, 71, 255, 0.15)",
                border: "1px solid rgba(0, 71, 255, 0.6)",
              }
            : {
                width: 8,
                height: 8,
                borderRadius: "9999px",
                backgroundColor: "#0047FF",
                border: "none",
              }
        }
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        className="relative flex items-center justify-center overflow-hidden shadow-2xl"
      >
        <AnimatePresence>
          {hoverType === "square" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col justify-between w-full h-full p-3.5 text-white font-sans"
            >
              <span className="text-[10px] font-black uppercase tracking-widest leading-normal text-left">
                {hoveredText}
              </span>
              <span className="text-xl font-bold text-right leading-none self-end">
                ↗
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export function TextReveal({ children, className }: { children: string; className?: string }) {
  const words = children.split(" ");
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04
      }
    }
  };

  const childVariants = {
    hidden: { y: "110%", rotateX: 40 },
    visible: { 
      y: "0%", 
      rotateX: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <motion.span 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className={`inline-block ${className ?? ""}`}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden" style={{ marginRight: "0.25em" }}>
          <motion.span
            variants={childVariants}
            className="inline-block"
            style={{ transformPerspective: 500 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function WordsSlideFromRight({ 
  children, 
  className,
  delay = 0,
  stagger = 0.08,
  duration = 0.6
}: { 
  children: string; 
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
}) {
  const words = children.split(" ");
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: stagger
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, x: "1.2em" },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: duration, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <motion.span 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className={`inline-block ${className ?? ""}`}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={childVariants}
          className="inline-block"
          style={{ marginRight: "0.25em" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}


export function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) { setStarted(true); }
    }, { threshold: 0.5 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let frame: number;
    const duration = 1500;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [started, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        animate={{ x: [0, 100, -50, 0], y: [0, -80, 60, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] left-[10%] w-[200px] md:w-[400px] h-[200px] md:h-[400px] rounded-full opacity-[0.04] dark:opacity-[0.06]"
        style={{ background: "radial-gradient(circle, #0047FF 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{ x: [0, -70, 90, 0], y: [0, 100, -40, 0], scale: [1, 0.8, 1.1, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[55%] right-[5%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] rounded-full opacity-[0.03] dark:opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{ x: [0, 60, -80, 0], y: [0, -60, 80, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] left-[30%] w-[180px] md:w-[350px] h-[180px] md:h-[350px] rounded-full opacity-[0.03] dark:opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #DB2777 0%, transparent 70%)" }}
      />
    </div>
  );
}

export function MagneticWrap({ children, className }: { children: React.ReactNode; className?: string }) {
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });
  const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div style={{ x: isTouch ? undefined : x, y: isTouch ? undefined : y }} onMouseMove={onMove} onMouseLeave={onLeave} className={className}>
      {children}
    </motion.div>
  );
}

export function Tilt3D({ children, className }: { children: React.ReactNode; className?: string }) {
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    const r = e.currentTarget.getBoundingClientRect();
    rx.set(((e.clientY - r.top - r.height / 2) / r.height) * -12);
    ry.set(((e.clientX - r.left - r.width / 2) / r.width) * 12);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };
  return (
    <motion.div style={{ rotateX: isTouch ? undefined : rx, rotateY: isTouch ? undefined : ry, transformPerspective: isTouch ? undefined : 800 }} onMouseMove={onMove} onMouseLeave={onLeave} className={className}>
      {children}
    </motion.div>
  );
}

// Wraps any section with a blur-in animation as it enters the viewport
export function SectionBlurIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: "blur(14px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollBlurReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ filter: "blur(14px)", opacity: 0, y: 40 }}
      whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
