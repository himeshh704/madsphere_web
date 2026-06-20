import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Something is Cooking | MadSphere",
  description: "A storm is brewing. MadSphere is preparing something extraordinary.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TrailerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.variable} font-sans`}>
      {children}
    </div>
  );
}
