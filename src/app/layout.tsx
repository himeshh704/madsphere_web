import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const sansFont = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const serifFont = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Madsphere | High-End Cinematic Creative Agency",
  description: "Madsphere is a premium, high-fidelity creative agency delivering next-level digital design, interactive storytelling, and futuristic engineering.",
  keywords: ["creative agency", "next-level web design", "cinematic UI", "Framer Motion", "high-fidelity development"],
};

import { ThemeProvider } from "@/components/ThemeProvider";
import AntiInspect from "@/components/AntiInspect";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Mascot from "@/components/Mascot";
import Preloader from "@/components/Preloader";
import { FloatingOrbs } from "@/components/Animations";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${serifFont.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-[#070708] dark:text-zinc-100 transition-colors duration-300">
        <AntiInspect />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Preloader />
          <FloatingOrbs />
          <Navbar />
          <Mascot />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

