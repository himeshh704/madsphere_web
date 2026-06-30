import type { Metadata } from "next";
import { redirect } from "next/navigation";
import WorksClient from "./WorksClient";

export const metadata: Metadata = {
  title: "Our Works | Interactive 3D Portfolio",
  description: "Explore the MadSphere interactive WebGL 3D design portfolio. Browse our case studies, custom Next.js web applications, e-commerce stores, and high-fidelity branding works.",
  alternates: {
    canonical: "/works",
  },
  openGraph: {
    title: "Our Works | Interactive 3D Portfolio | MadSphere",
    description: "Explore the MadSphere interactive WebGL 3D design portfolio. Browse our case studies, custom Next.js web applications, e-commerce stores, and high-fidelity branding works.",
    url: "https://madsphere.in/works",
    type: "website",
  },
};

export default function WorksPage() {
  redirect("/");
  return <WorksClient />;
}

