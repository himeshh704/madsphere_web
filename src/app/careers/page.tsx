import type { Metadata } from "next";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "Career Inquiries | Join the MadSphere Team",
  description: "Join the MadSphere team as a Creative Strategist, UI/UX Designer, Full stack Developer, or Webflow Developer. See our open positions and apply today.",
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Career Inquiries | Join the MadSphere Team | MadSphere",
    description: "Join the MadSphere team as a Creative Strategist, UI/UX Designer, Full stack Developer, or Webflow Developer. See our open positions and apply today.",
    url: "https://madsphere.in/careers",
    type: "website",
  },
};

export default function CareersPage() {
  return <CareersClient />;
}
