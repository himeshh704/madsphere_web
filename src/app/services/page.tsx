import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Our Services | Branding, Web Design & Digital Marketing",
  description: "Explore our premium creative services: high-converting Next.js web design, brand positioning, creative visuals, short-form Reels production, paid ads performance marketing.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Our Services | Branding, Web Design & Digital Marketing | MadSphere",
    description: "Explore our premium creative services: high-converting Next.js web design, brand positioning, creative visuals, short-form Reels production, paid ads performance marketing.",
    url: "https://madsphere.in/services",
    type: "website",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
