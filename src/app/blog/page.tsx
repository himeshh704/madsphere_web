import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Journal | MadSphere",
  description: "Read our thoughts, strategies, and trends on branding and digital design.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Journal | MadSphere",
    description: "Read our thoughts, strategies, and trends on branding and digital design.",
    url: "https://madsphere.in/blog",
    type: "website",
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
