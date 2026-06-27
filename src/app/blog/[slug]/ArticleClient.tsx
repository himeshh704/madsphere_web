"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SectionBlurIn } from "@/components/Animations";

export default function ArticleClient({ post }: { post: any }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <main className="pt-24 md:pt-32 pb-32 min-h-screen bg-white dark:bg-[#070708] overflow-x-clip relative">
      {/* Minimal Header */}
      <div className="absolute top-0 inset-x-0 z-40 py-6 md:py-8">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 flex items-center justify-between">
          <Link href="/" className="cursor-pointer group flex items-center gap-2">
            <img src="/logo.png" alt="Madsphere" className="h-5 md:h-6 w-auto" />
          </Link>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-zinc-700 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Insights</span>
          </Link>
        </div>
      </div>

      <article className="px-6 md:px-16 max-w-[800px] mx-auto relative z-10">
        <SectionBlurIn>
          <div className="flex flex-col gap-6 mb-12 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 text-xs font-bold tracking-widest text-[#0047FF] uppercase">
              {post.tags?.map((tag: string, i: number) => (
                <span key={i} className="flex items-center gap-3">
                  {tag}
                  {i < (post.tags?.length || 0) - 1 && <span className="w-1 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full" />}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-semibold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase mt-4">
              <span>{post.date}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
              <span>By {post.author}</span>
            </div>
          </div>
        </SectionBlurIn>

        <SectionBlurIn delay={0.1}>
          {post.coverImg && (
            <div className="w-full aspect-[16/9] md:aspect-[2/1] rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 mb-16 shadow-xl">
              <img 
                src={post.coverImg} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </SectionBlurIn>

        <SectionBlurIn delay={0.2}>
          <div 
            className="prose prose-zinc dark:prose-invert max-w-none 
                       prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-zinc-900 dark:prose-headings:text-zinc-50
                       prose-h2:text-3xl prose-h3:text-2xl prose-p:font-sans prose-p:leading-relaxed prose-p:text-zinc-600 dark:prose-p:text-zinc-400
                       prose-a:text-[#0047FF] hover:prose-a:text-blue-700 prose-img:rounded-2xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </SectionBlurIn>
        
        <SectionBlurIn delay={0.3}>
          <div className="mt-24 pt-12 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col gap-2 text-center md:text-left">
              <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Share this article</span>
              <div className="flex items-center justify-center md:justify-start gap-4">
                <button className="text-zinc-900 dark:text-white font-semibold hover:text-[#0047FF] transition-colors">X (Twitter)</button>
                <button className="text-zinc-900 dark:text-white font-semibold hover:text-[#0047FF] transition-colors">LinkedIn</button>
                <button className="text-zinc-900 dark:text-white font-semibold hover:text-[#0047FF] transition-colors">Facebook</button>
              </div>
            </div>
            
            <Link
              href="/blog"
              className="flex items-center gap-2 text-sm font-bold text-white bg-zinc-900 dark:bg-zinc-100 dark:text-black px-6 py-3 rounded-full hover:scale-105 active:scale-95 transition-transform cursor-pointer shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" /> Read More Insights
            </Link>
          </div>
        </SectionBlurIn>
      </article>
    </main>
  );
}
