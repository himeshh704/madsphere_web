import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Get a Creative Quote",
  description: "Get in touch with MadSphere in Lower Parel, Mumbai. Send us a message, submit your project requirements, request a quote, or drop a line at hello@madsphere.in.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Get a Creative Quote | MadSphere",
    description: "Get in touch with MadSphere in Lower Parel, Mumbai. Send us a message, submit your project requirements, request a quote, or drop a line at hello@madsphere.in.",
    url: "https://madsphere.in/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
