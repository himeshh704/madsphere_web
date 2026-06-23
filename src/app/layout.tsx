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
  metadataBase: new URL("https://madsphere.in"),
  title: {
    default: "Madsphere | Premium Creative Branding & Digital Agency",
    template: "%s | Madsphere Studio",
  },
  description: "MadSphere is a premium digital design and branding agency delivering high-fidelity interactive websites, brand strategy, creative content, and performance marketing in Mumbai.",
  keywords: [
    "creative branding agency",
    "branding studio mumbai",
    "premium digital design studio",
    "interactive 3D web design",
    "UI UX design studio mumbai",
    "Next.js web agency india",
    "social media marketing agency",
    "luxury web design",
    "performance marketing agency mumbai",
    "creative strategist",
    "custom webflow development"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Madsphere | Premium Creative Branding & Digital Agency",
    description: "High-end visual branding, interactive Next.js web experiences, and results-driven digital marketing for ambitious founders.",
    url: "https://madsphere.in",
    siteName: "MadSphere Studio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/mascot.png",
        width: 800,
        height: 600,
        alt: "MadSphere Mascot and Visual Branding",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Madsphere | Premium Creative Branding & Digital Agency",
    description: "High-end visual branding, interactive Next.js web experiences, and results-driven digital marketing for ambitious founders.",
    images: ["/mascot.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Mascot from "@/components/Mascot";
import Preloader from "@/components/Preloader";
import { FloatingOrbs, CustomCursor } from "@/components/Animations";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Preloader />
          <CustomCursor />
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

