"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: pathname === "/" ? 30 : 10,
        scale: pathname === "/" ? 0.97 : 1
      }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: 1
      }}
      exit={{ 
        opacity: 0, 
        y: pathname === "/" ? -15 : -10,
        scale: pathname === "/" ? 0.99 : 1
      }}
      transition={{ 
        duration: pathname === "/" ? 0.8 : 0.35, 
        ease: [0.16, 1, 0.3, 1] 
      }}
    >
      {children}
    </motion.div>
  );
}
