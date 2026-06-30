"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowLeft, X } from "lucide-react";
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
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedPost]);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset modal scroll to top when post changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [selectedPost]);

  return (
    <main className="pt-24 md:pt-32 pb-32 min-h-screen bg-white dark:bg-[#070708] overflow-x-clip relative">
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
      <section className="px-6 md:px-16 max-w-[1400px] mx-auto text-center mb-12 md:mb-16 relative z-10">
        <div className="flex justify-center items-center mb-4">
          <SectionTag label={blogHero.title} />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 leading-none mb-4">
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
            <div 
              key={post.slug} 
              onClick={() => setSelectedPost(post)}
              className="group cursor-pointer flex flex-col gap-6"
            >
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 relative">
                <img 
                  src={post.coverImg || "/hero_gradient_bg.png"} 
                  alt={post.title} 
                  onError={(e) => { 
                    const target = e.currentTarget;
                    if (target.src.includes('hero_gradient_bg.png')) return;
                    target.src = "/hero_gradient_bg.png"; 
                  }}
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
            </div>
          ))}
        </div>
      </section>
      </SectionBlurIn>

      {/* iOS Glass Effect Article Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end">
            {/* Blurred Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
            />
            
            {/* Article Sheet sliding up */}
            <motion.div
              initial={{ y: "100%", scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: "100%", scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full h-[90vh] bg-white dark:bg-[#0c0c0e] rounded-t-[40px] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
            >
              {/* Top Drag Indicator / Header */}
              <div className="w-full flex items-center justify-between p-6 bg-white/80 dark:bg-[#0c0c0e]/80 backdrop-blur-md absolute top-0 z-20 border-b border-zinc-100 dark:border-zinc-800/50">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">MadSphere Journal</span>
                <div className="absolute left-1/2 -translate-x-1/2 w-12 h-1.5 bg-zinc-300 dark:bg-zinc-700 rounded-full cursor-grab active:cursor-grabbing" onClick={() => setSelectedPost(null)} />
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-black dark:hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div ref={scrollRef} data-lenis-prevent className="w-full h-full overflow-y-auto pt-24 pb-32 px-6 scroll-smooth">
                <div className="max-w-[800px] mx-auto">
                  <div className="flex flex-col gap-6 mb-12 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 text-xs font-bold tracking-widest text-[#0047FF] uppercase">
                      {selectedPost.tags?.map((tag: string, i: number) => (
                        <span key={i} className="flex items-center gap-3">
                          {tag}
                          {i < (selectedPost.tags?.length || 0) - 1 && <span className="w-1 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full" />}
                        </span>
                      ))}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 leading-tight">
                      {selectedPost.title}
                    </h1>
                    <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-semibold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase mt-4">
                      <span>{selectedPost.date}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      <span>By {selectedPost.author}</span>
                    </div>
                  </div>

                  {selectedPost.coverImg && (
                    <div className="w-full aspect-[16/9] md:aspect-[2/1] rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 mb-16 shadow-xl">
                      <img 
                        src={selectedPost.coverImg} 
                        alt={selectedPost.title} 
                        onError={(e) => { 
                          const target = e.currentTarget;
                          if (target.src.includes('hero_gradient_bg.png')) return;
                          target.src = "/hero_gradient_bg.png"; 
                        }}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  )}

                  <div 
                    className="prose prose-zinc dark:prose-invert max-w-none 
                               prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-zinc-900 dark:prose-headings:text-zinc-50
                               prose-h2:text-3xl prose-h3:text-2xl prose-p:font-sans prose-p:leading-relaxed prose-p:text-zinc-600 dark:prose-p:text-zinc-400
                               prose-a:text-[#0047FF] hover:prose-a:text-blue-700 prose-img:rounded-2xl"
                    dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
