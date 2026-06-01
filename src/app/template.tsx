"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Preloader from "@/components/Preloader";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      {pathname === "/" && <Preloader />}
      <motion.div
        initial={{ opacity: 0, filter: pathname === "/" ? "blur(12px)" : "blur(4px)", y: pathname === "/" ? 40 : 10 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        exit={{ opacity: 0, filter: pathname === "/" ? "blur(8px)" : "blur(4px)", y: pathname === "/" ? -20 : -10 }}
        transition={{ duration: pathname === "/" ? 1.2 : 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
