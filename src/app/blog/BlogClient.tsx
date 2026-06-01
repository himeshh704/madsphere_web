"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { blogPosts, blogHero } from "@/data/site";
import { SectionBlurIn, TextReveal } from "@/components/Animations";

function SectionTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-400">
      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-sm shrink-0" />
      {label}
    </span>
  );
}

export default function BlogClient() {
  return (
    <main className="pt-32 md:pt-40 pb-32 min-h-screen bg-white dark:bg-[#070708] overflow-hidden">
      {/* Minimal Header & Navigation Overlay */}
      <div className="absolute top-0 inset-x-0 z-40 py-6 md:py-8">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 flex items-center justify-between">
          <Link href="/" className="cursor-pointer group flex items-center gap-2">
            <img src="/logo.png" alt="Madsphere" className="h-5 md:h-6 w-auto" />
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-zinc-700 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back Home</span>
          </Link>
        </div>
      </div>

      <SectionBlurIn>
      <section className="px-6 md:px-16 max-w-[1400px] mx-auto text-center mb-24 relative z-10">
        <div className="flex justify-center items-center mb-6">
          <SectionTag label={blogHero.title} />
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[7.5rem] font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 leading-none mb-8">
          <TextReveal>{blogHero.splashText}</TextReveal>
        </h1>

        <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-sans">
          {blogHero.subtitle}
        </p>
      </section>
      </SectionBlurIn>

      <SectionBlurIn delay={0.1}>
      <section className="px-6 md:px-16 max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {blogPosts.map((post: any) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group cursor-pointer flex flex-col gap-6">
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 relative">
                <img 
                  src={post.coverImg || "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&fit=crop"} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <span>{post.author}</span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 group-hover:text-[#0047FF] transition-colors leading-tight">
                  {post.title}
                </h2>
                
                <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-white mt-2 group-hover:text-[#0047FF] transition-colors">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      </SectionBlurIn>
    </main>
  );
}
