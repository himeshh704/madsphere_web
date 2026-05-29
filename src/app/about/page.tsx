import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "Who We Are | Branding & Creative Studio",
  description: "Learn about MadSphere, a premium branding and digital design studio based in Mumbai building identity systems, Next.js sites, and marketing content for founders.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Who We Are | Branding & Creative Studio | MadSphere",
    description: "Learn about MadSphere, a premium branding and digital design studio based in Mumbai building identity systems, Next.js sites, and marketing content for founders.",
    url: "https://madsphere.in/about",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
