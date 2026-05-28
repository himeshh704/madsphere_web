"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Mascot() {
  const pathname = usePathname();
  if (pathname === "/works" || pathname === "/careers") return null;
  return (
    <motion.div
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.5, type: "spring", stiffness: 100, damping: 12 }}
      className="fixed bottom-0 right-6 md:right-12 z-40 pointer-events-auto hidden md:block"
      data-cursor
    >
      <motion.img
        src="/mascot.png"
        alt="Madsphere mascot"
        className="w-20 lg:w-28 h-auto drop-shadow-2xl"
        style={{ marginBottom: -10 }}
        animate={{ y: [0, -6, 0], rotate: [0, 2, 0, -2, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.15, y: -16, rotate: -8 }}
        draggable={false}
      />
    </motion.div>
  );
}
