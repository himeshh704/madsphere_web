"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Preloader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isInitial, setIsInitial] = useState(true);

  // Initial load simulation (running stickman & grand opening)
  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 1;
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
          // Set isInitial to false after animation completes to switch to transition mode
          setTimeout(() => setIsInitial(false), 1200);
        }, 500);
        setProgress(100);
        return;
      }
      setProgress(currentProgress);
    }, 25); // ~2.5 seconds total

    return () => clearInterval(interval);
  }, []);

  // Page transition simulation on route change
  useEffect(() => {
    if (isInitial) return;

    let interval: NodeJS.Timeout;
    const timeout = setTimeout(() => {
      setLoading(true);
      setProgress(0);

      let currentProgress = 0;
      interval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 20) + 15;
        if (currentProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 200);
          setProgress(100);
          return;
        }
        setProgress(currentProgress);
      }, 50); // ~400ms quick wiper loader
    }, 0);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [pathname, isInitial]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-col">
          {/* Shutter panels (Grand Opening) */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="w-full h-1/2 bg-[#050505] pointer-events-auto"
          />
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="w-full h-1/2 bg-[#050505] pointer-events-auto"
          />
          
          {/* Loader Elements Overlay */}
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-auto"
          >
            {isInitial ? (
              // Initial load preloader (Stickman + Grand Opening)
              <div className="flex flex-col items-center gap-8 overflow-hidden">
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex flex-col items-center gap-2"
                >
                  <img src="/logo_white.png" alt="Madsphere" className="h-12 md:h-16 w-auto opacity-90" />
                  <span className="text-[10px] tracking-[0.3em] font-bold text-zinc-500 uppercase mt-2">
                    Loading Experience
                  </span>
                </motion.div>
                               {/* Running Stickman & Progress Bar */}
                <div className="relative w-[320px] h-28 flex flex-col justify-end">
                  <style>{`
                    .head { transform-origin: 47px 20px; }
                    .torso { transform-origin: 47px 33px; }
                    .left-thigh { transform-origin: 40px 58px; animation: run-thigh-l 0.6s infinite alternate ease-in-out; }
                    .left-calf { transform-origin: 28px 72px; animation: run-calf-l 0.6s infinite alternate ease-in-out; }
                    .right-thigh { transform-origin: 40px 58px; animation: run-thigh-r 0.6s infinite alternate ease-in-out; }
                    .right-calf { transform-origin: 52px 70px; animation: run-calf-r 0.6s infinite alternate ease-in-out; }
                    .left-arm-upper { transform-origin: 47px 33px; animation: run-arm-l 0.6s infinite alternate ease-in-out; }
                    .left-arm-fore { transform-origin: 32px 42px; animation: run-fore-l 0.6s infinite alternate ease-in-out; }
                    .right-arm-upper { transform-origin: 47px 33px; animation: run-arm-r 0.6s infinite alternate ease-in-out; }
                    .right-arm-fore { transform-origin: 62px 38px; animation: run-fore-r 0.6s infinite alternate ease-in-out; }
                    .stickman-body { animation: run-body-bob 0.3s infinite alternate ease-in-out; }

                    @keyframes run-body-bob {
                      0% { transform: translateY(0px); }
                      100% { transform: translateY(3px); }
                    }
                    @keyframes run-thigh-l {
                      0% { transform: rotate(-35deg); }
                      100% { transform: rotate(35deg); }
                    }
                    @keyframes run-calf-l {
                      0% { transform: rotate(85deg); }
                      100% { transform: rotate(15deg); }
                    }
                    @keyframes run-thigh-r {
                      0% { transform: rotate(35deg); }
                      100% { transform: rotate(-35deg); }
                    }
                    @keyframes run-calf-r {
                      0% { transform: rotate(15deg); }
                      100% { transform: rotate(85deg); }
                    }
                    @keyframes run-arm-l {
                      0% { transform: rotate(-40deg); }
                      100% { transform: rotate(40deg); }
                    }
                    @keyframes run-fore-l {
                      0% { transform: rotate(20deg); }
                      100% { transform: rotate(80deg); }
                    }
                    @keyframes run-arm-r {
                      0% { transform: rotate(40deg); }
                      100% { transform: rotate(-40deg); }
                    }
                    @keyframes run-fore-r {
                      0% { transform: rotate(80deg); }
                      100% { transform: rotate(20deg); }
                    }
                  `}</style>

                  <div 
                    className="absolute bottom-2 transition-all duration-100 ease-out" 
                    style={{ left: `calc(${progress}% - 25px)` }}
                  >
                    <svg width="50" height="80" viewBox="0 0 100 100" className="stickman-body">
                      {/* Head */}
                      <circle cx="50" cy="20" r="8" fill="white" />
                      {/* Torso */}
                      <line x1="47" y1="33" x2="40" y2="58" stroke="white" strokeWidth="4" strokeLinecap="round" />
                      
                      {/* Left Arm Group */}
                      <g className="left-arm-upper">
                        <line x1="47" y1="33" x2="32" y2="42" stroke="white" strokeWidth="4" strokeLinecap="round" />
                        <line x1="32" y1="42" x2="25" y2="55" stroke="white" strokeWidth="4" strokeLinecap="round" className="left-arm-fore" />
                      </g>

                      {/* Right Arm Group */}
                      <g className="right-arm-upper">
                        <line x1="47" y1="33" x2="62" y2="38" stroke="white" strokeWidth="4" strokeLinecap="round" />
                        <line x1="62" y1="38" x2="72" y2="50" stroke="white" strokeWidth="4" strokeLinecap="round" className="right-arm-fore" />
                      </g>

                      {/* Left Leg Group */}
                      <g className="left-thigh">
                        <line x1="40" y1="58" x2="28" y2="72" stroke="white" strokeWidth="4" strokeLinecap="round" />
                        <line x1="28" y1="72" x2="22" y2="90" stroke="white" strokeWidth="4" strokeLinecap="round" className="left-calf" />
                      </g>

                      {/* Right Leg Group */}
                      <g className="right-thigh">
                        <line x1="40" y1="58" x2="52" y2="70" stroke="white" strokeWidth="4" strokeLinecap="round" />
                        <line x1="52" y1="70" x2="60" y2="88" stroke="white" strokeWidth="4" strokeLinecap="round" className="right-calf" />
                      </g>
                    </svg>
                  </div>

                  {/* Progress Line */}
                  <div className="w-full h-[3px] bg-white/20 relative rounded-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 bottom-0 bg-white rounded-full transition-all duration-100 ease-out" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                
                <span className="text-sm font-mono tracking-widest text-white/50">
                  {progress.toString().padStart(3, '0')}%
                </span>
              </div>
            ) : (
              // Fast transition preloader for page changes
              <div className="flex flex-col items-center gap-6 overflow-hidden">
                <img src="/logo_white.png" alt="Madsphere" className="h-8 md:h-10 w-auto opacity-90" />
                <div className="w-36 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
                  <motion.div
                    className="absolute top-0 left-0 bottom-0 bg-white"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
