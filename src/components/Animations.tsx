"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const x = useSpring(useMotionValue(0), { stiffness: 600, damping: 30 });
  const y = useSpring(useMotionValue(0), { stiffness: 600, damping: 30 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovered(!!t.closest("a, button, [data-cursor]"));
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
        animate={{
          width: hovered ? 56 : 32,
          height: hovered ? 56 : 32,
          borderRadius: "50%",
          rotate: hovered ? 45 : 0,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
        className="relative flex items-center justify-center"
      >
        {/* Crosshair lines */}
        <motion.span
          animate={{ scaleY: hovered ? 0 : 1, opacity: hovered ? 0 : 0.6 }}
          className="absolute w-px h-full bg-zinc-800 dark:bg-zinc-200"
        />
        <motion.span
          animate={{ scaleX: hovered ? 0 : 1, opacity: hovered ? 0 : 0.6 }}
          className="absolute h-px w-full bg-zinc-800 dark:bg-zinc-200"
        />
        {/* Center dot */}
        <motion.span
          animate={{
            width: hovered ? 56 : 4,
            height: hovered ? 56 : 4,
            opacity: hovered ? 0.12 : 1,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 22 }}
          className="rounded-full bg-[#0047FF]"
        />
        {/* Hover ring */}
        <motion.span
          animate={{
            scale: hovered ? 1 : 0,
            opacity: hovered ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="absolute inset-0 rounded-full border-2 border-[#0047FF]"
        />
      </motion.div>
    </motion.div>
  );
}

export function TextReveal({ children, className }: { children: string; className?: string }) {
  const words = children.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden" style={{ marginRight: "0.3em" }}>
          <motion.span
            initial={{ y: "110%", rotateX: 40 }}
            whileInView={{ y: "0%", rotateX: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
            style={{ transformPerspective: 500 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
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
    <motion.div style={{ x, y }} onMouseMove={onMove} onMouseLeave={onLeave} className={className}>
      {children}
    </motion.div>
  );
}
