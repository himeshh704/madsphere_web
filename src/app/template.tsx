"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        filter: pathname === "/" ? "blur(16px)" : "blur(4px)", 
        y: pathname === "/" ? 50 : 10,
        scale: pathname === "/" ? 0.95 : 1
      }}
      animate={{ 
        opacity: 1, 
        filter: "blur(0px)", 
        y: 0,
        scale: 1
      }}
      exit={{ 
        opacity: 0, 
        filter: pathname === "/" ? "blur(8px)" : "blur(4px)", 
        y: pathname === "/" ? -20 : -10,
        scale: pathname === "/" ? 0.98 : 1
      }}
      transition={{ 
        duration: pathname === "/" ? 1.8 : 0.45, 
        ease: [0.16, 1, 0.3, 1] 
      }}
    >
      {children}
    </motion.div>
  );
}
