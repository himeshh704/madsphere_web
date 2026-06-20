import type { Metadata } from "next";
import CompanyProfileClient from "./CompanyProfileClient";

export const metadata: Metadata = {
  title: "Company Profile & Credentials | MadSphere",
  description: "Explore and download the MadSphere Agency Credentials Deck and Company Profile summarizing our branding strategy, digital design, and marketing services.",
};

export default function CompanyProfilePage() {
  return <CompanyProfileClient />;
}
