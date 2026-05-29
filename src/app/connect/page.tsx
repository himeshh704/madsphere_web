import type { Metadata } from "next";
import ConnectClient from "./ConnectClient";

export const metadata: Metadata = {
  title: "Connect with MadSphere | Link Index",
  description: "Access all MadSphere official profiles: visit our main site, explore our 3D design portfolio, view career inquiries, or connect on Instagram and LinkedIn.",
  alternates: {
    canonical: "/connect",
  },
  openGraph: {
    title: "Connect with MadSphere | Link Index | MadSphere",
    description: "Access all MadSphere official profiles: visit our main site, explore our 3D design portfolio, view career inquiries, or connect on Instagram and LinkedIn.",
    url: "https://madsphere.in/connect",
    type: "website",
  },
};

export default function ConnectPage() {
  return <ConnectClient />;
}
