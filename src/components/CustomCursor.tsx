"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Outer circle coords (uses spring layout)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Inner dot coords (moves instantly for reactive feedback)
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable custom cursor on touch devices to avoid breaking tap interfaces
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      dotX.set(e.clientX - 3);
      dotY.set(e.clientY - 3);
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    const addHoverListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, [role="button"], input, select, textarea, .cursor-pointer'
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", () => setHovered(true));
        el.addEventListener("mouseleave", () => setHovered(false));
      });
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // Attach hover listeners to current elements
    addHoverListeners();

    // Re-attach hover listeners when Next.js dynamically updates DOM
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      observer.disconnect();
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* Outer Spring Circle (Lagging trail effect) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#0047FF] pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
        }}
        animate={{
          scale: hovered ? 1.8 : clicked ? 0.8 : 1,
          backgroundColor: hovered ? "rgba(0, 71, 255, 0.1)" : "rgba(0, 0, 0, 0)",
          borderColor: hovered ? "#0047FF" : "#0047FF",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
      {/* Inner Dot (Instant responsive center point) */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#0047FF] rounded-full pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
        }}
        animate={{
          scale: hovered ? 0 : 1,
        }}
      />
    </>
  );
}
