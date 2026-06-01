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
        initial={{ opacity: 0, filter: "blur(12px)", y: 40 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        exit={{ opacity: 0, filter: "blur(8px)", y: -20 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
