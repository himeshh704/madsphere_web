"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Play, Volume2, VolumeX, ArrowLeft, X } from "lucide-react";
import ThreeWorksScene from "@/components/ThreeWorksScene";
import { worksHero, works } from "@/data/site";

export default function WorksClient() {
  const [revealed, setRevealed] = useState(false);
  const [muted, setMuted] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const selectedProject = works.find((w) => w.id === selectedProjectId);
  const titleText = selectedProject ? selectedProject.title : worksHero.title;
  const subtitleText = selectedProject ? selectedProject.tags : worksHero.subtitle;

  // Auto-play audio when revealed
  const handleReveal = () => {
    setRevealed(true);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5;
      audio.muted = false;
      audio.play().catch((err) => {
        console.warn("Audio autoplay blocked by browser policies:", err);
      });
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white select-none">
      {/* Background Audio */}
      <audio ref={audioRef} src="/audio/bg-audio.mp3" loop preload="auto" />

      {/* 3D WebGL Canvas Scene */}
      <ThreeWorksScene
        revealed={revealed}
        selectedProjectId={selectedProjectId}
        onSelectProject={setSelectedProjectId}
        onShowLightbox={setActiveLightboxImg}
      />

      {/* Ambient Sound Controller */}
      {revealed && (
        <button
          onClick={toggleMute}
          aria-label={muted ? "Unmute background music" : "Mute background music"}
          className="fixed bottom-6 right-6 md:right-auto md:left-6 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border border-zinc-200 shadow-lg cursor-pointer flex items-center justify-center text-zinc-900 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          {muted ? (
            <VolumeX className="w-5 h-5 md:w-6 md:h-6 text-zinc-900" />
          ) : (
            <Volume2 className="w-5 h-5 md:w-6 md:h-6 text-zinc-900 animate-pulse" />
          )}
        </button>
      )}

      {/* Minimal Header & Navigation Overlay */}
      <div
        className="fixed top-0 inset-x-0 z-40 transition-all duration-1000 ease-out py-6 md:py-8"
        style={{
          transform: revealed ? "translateY(0)" : "translateY(-50px)",
          opacity: revealed ? 1 : 0,
          pointerEvents: revealed ? "auto" : "none",
        }}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="cursor-pointer group flex items-center gap-2">
            <img src="/logo.png" alt="Madsphere" className="h-5 md:h-6 w-auto" />
          </Link>
          {selectedProjectId ? (
            <button
              onClick={() => setSelectedProjectId(null)}
              className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-zinc-700 hover:text-black transition-colors bg-transparent border-none cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Projects</span>
            </button>
          ) : (
            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-zinc-700 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back Home</span>
            </Link>
          )}
        </div>
      </div>

      {/* Floating Center/Left Title Section */}
      <div
        className="fixed left-6 md:left-12 bottom-20 md:bottom-24 max-w-[70vw] md:max-w-none z-30 transition-all duration-1000 ease-out select-none pointer-events-none"
        style={{
          transform: revealed ? "translateY(0)" : "translateY(50px)",
          opacity: revealed ? 1 : 0,
        }}
      >
        <h1 className="text-2xl md:text-6xl font-bold tracking-tighter text-zinc-900 leading-none mb-1 md:mb-2">
          {titleText}
        </h1>
        <p className="text-[10px] md:text-sm font-medium tracking-widest uppercase text-zinc-500">
          {subtitleText}
        </p>
      </div>

      {/* Full-Screen Enter Splash Preloader Screen */}
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-white transition-opacity duration-1000 ease-in-out select-none"
        style={{
          opacity: revealed ? 0 : 1,
          pointerEvents: revealed ? "none" : "auto",
        }}
      >
        <span className="text-zinc-900 font-semibold tracking-[0.15em] uppercase text-center text-xs md:text-sm px-6">
          {worksHero.splashText}
        </span>

        <div
          className="group relative w-24 h-24 flex items-center justify-center cursor-pointer"
          onClick={handleReveal}
        >
          {/* Animated outline stroke */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="#111111"
              strokeWidth="2"
              strokeDasharray="290"
              className="transition-all duration-1000 ease-in-out [stroke-dashoffset:290] group-hover:[stroke-dashoffset:0]"
            />
          </svg>

          {/* Button core */}
          <button
            className="w-16 h-16 rounded-full border-none bg-zinc-950 text-white flex items-center justify-center cursor-pointer shadow-lg shadow-zinc-950/20 transition-all duration-300 ease-out group-hover:scale-105 group-hover:bg-zinc-900"
            tabIndex={-1}
          >
            <Play className="w-5 h-5 text-white fill-white ml-1" />
          </button>
        </div>
      </div>

      {/* Showcase Lightbox Modal */}
      {activeLightboxImg && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl"
          onClick={() => setActiveLightboxImg(null)}
          style={{
            animation: "worksFadeIn 0.25s ease-out forwards",
          }}
        >
          <style>{`
            @keyframes worksFadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes worksScaleUp {
              from { transform: scale(0.96); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
          `}</style>

          {/* Close Button */}
          <button
            onClick={() => setActiveLightboxImg(null)}
            className="absolute top-6 right-6 z-50 p-3 bg-zinc-900/60 hover:bg-zinc-800/80 text-white rounded-full border border-zinc-800 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center"
            aria-label="Close image showcase"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Image Frame */}
          <div
            className="relative max-w-[90vw] max-h-[80vh] flex items-center justify-center rounded-lg overflow-hidden shadow-2xl border border-zinc-800"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: "worksScaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          >
            <img
              src={activeLightboxImg}
              alt="Client work detail showcase"
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </main>
  );
}
