"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MagneticWrap } from "@/components/Animations";

export default function Footer() {
  const router = useRouter();
  return (
    <footer className="relative z-10 bg-[#050505] text-white pt-20 pb-0 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1400px] mx-auto px-6 md:px-16 flex flex-col items-center text-center"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-8">
          Ready to make<br />something great?
        </h2>
        <MagneticWrap>
          <motion.button
            onClick={() => router.push('/careers')}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-white text-black hover:bg-zinc-100 text-xs font-bold uppercase tracking-widest px-8 py-3 rounded-full transition-colors shadow-xl shadow-white/10"
            data-cursor
          >
            Work With Us
          </motion.button>
        </MagneticWrap>
      </motion.div>
      <p
        className="mt-16 text-center text-[11vw] font-bold leading-none select-none"
        style={{ fontFamily: "Georgia, serif", color: "#111" }}
      >
        MADSPHERE
      </p>
    </footer>
  );
}
