"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/utils/cn";
import { nav } from "@/data/site";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = () => {
    setOpen(false);
  };

  if (pathname === "/works") return null;

  return (
    <header className={cn(
      "fixed top-0 inset-x-0 z-50 transition-all duration-300 py-4",
      scrolled && "bg-white/90 dark:bg-[#050505]/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800"
    )}>
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center justify-between">

        <Link href="/" onClick={navigate}>
          <img src="/logo.png" alt="Madsphere" className="h-6 md:h-7 w-auto dark:hidden" />
          <img src="/logo_white.png" alt="Madsphere" className="h-6 md:h-7 w-auto hidden dark:block" />
        </Link>

        <nav className="hidden md:flex items-center bg-zinc-100/80 dark:bg-zinc-900/80 backdrop-blur rounded-full px-1.5 py-1 border border-zinc-200 dark:border-zinc-800">
          {nav.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={cn(
                "px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-colors",
                (pathname === href || (href !== "/" && pathname.startsWith(href)))
                  ? "bg-[#0047FF] text-white"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <motion.button
            onClick={() => router.push('/contact')}
            initial={{ opacity: 1 }}
            whileHover="hover"
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 350, damping: 15 }}
            className="flex items-center gap-0 bg-[#0047FF] hover:bg-blue-700 text-white rounded-full pl-5 pr-1.5 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors shadow-lg shadow-blue-500/20 cursor-pointer"
          >
            Let's talk
            <motion.span
              variants={{ hover: { x: 2 } }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="ml-3 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
            >
              <ArrowRight className="w-3 h-3" />
            </motion.span>
          </motion.button>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300"
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden absolute top-full inset-x-0 bg-white dark:bg-[#050505] border-b border-zinc-200 dark:border-zinc-800 shadow-xl">
          <div className="px-6 py-8 flex flex-col gap-3">
            {nav.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={navigate}
                className={cn(
                  "py-2.5 border-b border-zinc-100 dark:border-zinc-800 text-sm font-medium",
                  (pathname === href || (href !== "/" && pathname.startsWith(href))) ? "text-[#0047FF]" : "text-zinc-600 dark:text-zinc-400"
                )}
              >
                {label}
              </Link>
            ))}
            <motion.button
              onClick={() => { 
                setOpen(false);
                router.push('/contact'); 
              }}
              whileHover="hover"
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 350, damping: 15 }}
              className="mt-3 flex items-center justify-between bg-[#0047FF] hover:bg-blue-700 text-white rounded-full pl-5 pr-1.5 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors shadow-lg shadow-blue-500/20 cursor-pointer w-full"
            >
              Let's talk
              <motion.span
                variants={{ hover: { x: 2 } }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
              >
                <ArrowRight className="w-3 h-3" />
              </motion.span>
            </motion.button>
          </div>
        </div>
      )}
    </header>
  );
}
