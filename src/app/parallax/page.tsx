import { ParallaxComponent } from "@/components/ui/parallax-scrolling";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Parallax Showcase | MadSphere",
  description: "A premium 3D parallax scroll experience created by MadSphere.",
};

export default function ParallaxShowcasePage() {
  return (
    <main className="relative min-h-screen bg-[#070708] overflow-x-hidden">
      {/* Back Button */}
      <Link 
        href="/" 
        className="fixed top-8 left-8 z-50 flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-800 bg-[#070708]/80 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md transition-all duration-300 hover:bg-zinc-800 hover:border-zinc-700 active:scale-95 shadow-xl shadow-black/30"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>
      
      {/* Parallax Component */}
      <ParallaxComponent />
    </main>
  );
}
