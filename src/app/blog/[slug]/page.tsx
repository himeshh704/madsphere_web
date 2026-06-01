import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/site";
import ArticleClient from "./ArticleClient";

// Pre-render all blog posts at build time
export function generateStaticParams() {
  return blogPosts.map((post: any) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogPosts.find((p: any) => p.slug === params.slug);
  
  if (!post) {
    return {
      title: "Article Not Found | MadSphere",
    };
  }

  return {
    title: `${post.title} | MadSphere Journal`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | MadSphere Journal`,
      description: post.excerpt,
      images: [post.coverImg],
      url: `https://madsphere.in/blog/${post.slug}`,
      type: "article",
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p: any) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return <ArticleClient post={post} />;
}
