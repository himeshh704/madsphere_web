"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Constellation canvas — exact clone of Preloader constellation
   but runs forever and fills the whole page
───────────────────────────────────────────────────────────── */
function ConstellationBG() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const count = Math.floor((W * H) / 12000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.4 + 0.4,
      });
    }

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.75)";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100,140,255,${0.18 - (dist / 130) * 0.18})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 opacity-50 pointer-events-none"
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   Glitch text — resolves character-by-character
───────────────────────────────────────────────────────────── */
const GLITCH = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01";

function useGlitch(text: string, delay = 0) {
  const [resolved, setResolved] = useState<boolean[]>([]);
  const [display, setDisplay] = useState<string[]>([]);

  useEffect(() => {
    const init = text.split("").map((c) =>
      c === " " ? " " : GLITCH[Math.floor(Math.random() * GLITCH.length)]
    );
    setDisplay(init);
    setResolved(new Array(text.length).fill(false));

    let resolvedCount = 0;
    const t0 = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplay((prev) => {
          const next = [...prev];
          for (let i = resolvedCount; i < text.length; i++) {
            if (text[i] !== " ") {
              next[i] = GLITCH[Math.floor(Math.random() * GLITCH.length)];
            }
          }
          return next;
        });
        if (resolvedCount < text.length) {
          const idx = resolvedCount;
          setDisplay((prev) => {
            const next = [...prev];
            next[idx] = text[idx];
            return next;
          });
          setResolved((prev) => {
            const next = [...prev];
            next[idx] = true;
            return next;
          });
          resolvedCount++;
        } else {
          clearInterval(interval);
        }
      }, 70);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(t0);
  }, [text, delay]);

  return { display, resolved };
}

/* ─────────────────────────────────────────────────────────────
   Animated gradient ring
───────────────────────────────────────────────────────────── */
function Ring({
  size,
  delay,
  duration,
  color,
  reverse,
}: {
  size: number;
  delay: number;
  duration: number;
  color: string;
  reverse?: boolean;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        border: `1px solid ${color}`,
        top: "50%",
        left: "50%",
        x: "-50%",
        y: "-50%",
      }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {/* single bright node on the ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: 4,
          height: 4,
          background: color,
          top: -2,
          left: "50%",
          transform: "translateX(-50%)",
          boxShadow: `0 0 8px ${color}, 0 0 20px ${color}`,
        }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main page
───────────────────────────────────────────────────────────── */
export default function TrailerPage() {
  const [ready, setReady] = useState(false);

  const headline = useGlitch("SOMETHING IS COOKING", ready ? 400 : 99999);
  const sub = useGlitch("A NEW ERA FOR BRANDS", ready ? 2000 : 99999);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @keyframes blinkCaret {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .caret {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: #0A58FF;
          margin-left: 4px;
          vertical-align: text-bottom;
          animation: blinkCaret 1s steps(1) infinite;
        }
        @keyframes pulseRing {
          0%, 100% { opacity: 0.12; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.22; transform: translate(-50%, -50%) scale(1.05); }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .gradient-text {
          background: linear-gradient(135deg, #0A58FF 0%, #7C3AED 40%, #DB2777 70%, #0A58FF 100%);
          background-size: 300% 300%;
          animation: gradientShift 6s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <div
        className="relative min-h-screen w-full overflow-hidden select-none"
        style={{ background: "#070708" }}
      >
        {/* ── Constellation BG ───────────────────────────── */}
        <ConstellationBG />

        {/* ── Radial glow blobs (matches site orbs) ─────── */}
        <motion.div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 600,
            height: 600,
            top: "10%",
            left: "-10%",
            background: "radial-gradient(circle, rgba(0,71,255,0.10) 0%, transparent 70%)",
          }}
          animate={{ x: [0, 80, -40, 0], y: [0, -60, 50, 0], scale: [1, 1.15, 0.95, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 700,
            height: 700,
            top: "40%",
            right: "-15%",
            background: "radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 70%)",
          }}
          animate={{ x: [0, -60, 80, 0], y: [0, 80, -50, 0], scale: [1, 0.85, 1.1, 1] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 500,
            height: 500,
            bottom: "5%",
            left: "25%",
            background: "radial-gradient(circle, rgba(219,39,119,0.07) 0%, transparent 70%)",
          }}
          animate={{ x: [0, 50, -70, 0], y: [0, -50, 60, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ── Orbital rings ─────────────────────────────── */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Pulse ring */}
          <div
            className="absolute rounded-full"
            style={{
              width: "min(70vw, 600px)",
              height: "min(70vw, 600px)",
              top: "50%",
              left: "50%",
              border: "1px solid rgba(10,88,255,0.12)",
              animation: "pulseRing 5s ease-in-out infinite",
            }}
          />
          <Ring
            size={Math.min(typeof window !== "undefined" ? window.innerWidth * 0.55 : 500, 500)}
            delay={0}
            duration={28}
            color="rgba(10,88,255,0.25)"
          />
          <Ring
            size={Math.min(typeof window !== "undefined" ? window.innerWidth * 0.38 : 360, 360)}
            delay={0}
            duration={20}
            color="rgba(124,58,237,0.2)"
            reverse
          />
          <Ring
            size={Math.min(typeof window !== "undefined" ? window.innerWidth * 0.22 : 200, 200)}
            delay={0}
            duration={14}
            color="rgba(219,39,119,0.15)"
          />
        </div>

        {/* ── Core glow orb ─────────────────────────────── */}
        <div
          className="absolute pointer-events-none z-10"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 120,
            height: 120,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(10,88,255,0.35) 0%, rgba(124,58,237,0.2) 40%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />

        {/* ── Main content ───────────────────────────────── */}
        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 text-center">

          {/* Logo */}
          <AnimatePresence>
            {ready && (
              <motion.div
                key="logo"
                initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="mb-12"
                style={{ animation: "floatY 5s ease-in-out infinite" }}
              >
                <img
                  src="/logo_white.png"
                  alt="MadSphere"
                  className="h-10 md:h-14 w-auto object-contain opacity-90"
                  style={{
                    filter: "drop-shadow(0 0 16px rgba(10,88,255,0.55)) drop-shadow(0 0 40px rgba(124,58,237,0.3))",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Eyebrow label */}
          {ready && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mb-6 flex items-center gap-4"
            >
              <div
                className="h-px w-10"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(10,88,255,0.7))",
                }}
              />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.4em]"
                style={{ color: "rgba(10,88,255,0.8)" }}
              >
                Classified — MadSphere 2025
              </span>
              <div
                className="h-px w-10"
                style={{
                  background: "linear-gradient(90deg, rgba(10,88,255,0.7), transparent)",
                }}
              />
            </motion.div>
          )}

          {/* Headline — glitch resolve */}
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(16px)" }}
            animate={ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-black uppercase leading-none tracking-tighter mb-4"
            style={{
              fontSize: "clamp(2.6rem, 8.5vw, 8rem)",
              fontFamily: "var(--font-sans)",
            }}
          >
            {headline.display.map((ch, i) => (
              <span
                key={i}
                style={{
                  color: headline.resolved[i]
                    ? "transparent"
                    : "rgba(100,140,255,0.6)",
                  backgroundImage: headline.resolved[i]
                    ? "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)"
                    : "none",
                  WebkitBackgroundClip: headline.resolved[i] ? "text" : undefined,
                  WebkitTextFillColor: headline.resolved[i] ? "transparent" : undefined,
                  backgroundClip: headline.resolved[i] ? "text" : undefined,
                  textShadow: headline.resolved[i]
                    ? "0 0 80px rgba(10,88,255,0.3)"
                    : "none",
                  transition: "color 0.1s, text-shadow 0.3s",
                }}
              >
                {ch}
              </span>
            ))}
            <span className="caret" />
          </motion.h1>

          {/* Sub-line — glitch resolve */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mb-12 font-light tracking-[0.3em] uppercase"
            style={{
              fontSize: "clamp(0.8rem, 2.2vw, 1.25rem)",
            }}
          >
            {sub.display.map((ch, i) => (
              <span
                key={i}
                style={{
                  color: sub.resolved[i]
                    ? "rgba(255,255,255,0.5)"
                    : "rgba(10,88,255,0.45)",
                  transition: "color 0.1s",
                }}
              >
                {ch}
              </span>
            ))}
          </motion.p>

          {/* Gradient divider */}
          {ready && (
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-14 h-px w-64 origin-center"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #0A58FF 30%, #7C3AED 70%, transparent)",
              }}
            />
          )}

          {/* Glass terminal card */}
          {ready && (
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-sm w-full mx-auto rounded-2xl p-6 mb-14"
              style={{
                background: "rgba(10,88,255,0.04)",
                border: "1px solid rgba(10,88,255,0.18)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow:
                  "0 0 0 1px rgba(10,88,255,0.06), inset 0 1px 0 rgba(255,255,255,0.04), 0 30px 60px rgba(0,0,0,0.4)",
              }}
            >
              {/* Traffic lights */}
              <div className="flex gap-1.5 mb-5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
              </div>

              <div className="space-y-3 font-mono text-xs text-left">
                {[
                  { key: "STATUS", val: "IN PROGRESS", accent: true },
                  { key: "PHASE", val: "CLASSIFIED" },
                  { key: "ETA", val: "WHEN IT'S READY" },
                  { key: "CLEARANCE", val: "RESTRICTED" },
                ].map((row, i) => (
                  <motion.div
                    key={row.key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center justify-between"
                    style={{
                      borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none",
                      paddingBottom: i < 3 ? 12 : 0,
                    }}
                  >
                    <span style={{ color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>
                      {row.key}
                    </span>
                    <span
                      className={row.accent ? "gradient-text font-bold" : ""}
                      style={
                        row.accent
                          ? {}
                          : { color: "rgba(255,255,255,0.45)", letterSpacing: "0.05em" }
                      }
                    >
                      {row.val}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Quote */}
          {ready && (
            <motion.blockquote
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md mx-auto mb-14 text-center"
            >
              <p
                className="font-light italic leading-relaxed mb-2"
                style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem" }}
              >
                &ldquo;The most disruptive ideas don&apos;t announce themselves.
                <br />
                They simmer — until they can&apos;t be ignored.&rdquo;
              </p>
              <cite
                className="not-italic text-xs tracking-[0.25em] uppercase"
                style={{ color: "rgba(10,88,255,0.5)" }}
              >
                — MadSphere Core Team
              </cite>
            </motion.blockquote>
          )}

          {/* CTA */}
          {ready && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-3"
            >
              <Link
                href="/"
                className="group flex items-center gap-3 px-7 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:shadow-[0_0_30px_rgba(10,88,255,0.3)]"
                style={{
                  border: "1px solid rgba(10,88,255,0.3)",
                  color: "rgba(255,255,255,0.5)",
                  background: "rgba(10,88,255,0.06)",
                  backdropFilter: "blur(8px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(10,88,255,0.7)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.9)";
                  e.currentTarget.style.background = "rgba(10,88,255,0.14)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(10,88,255,0.3)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                  e.currentTarget.style.background = "rgba(10,88,255,0.06)";
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M11 7H3M3 7L6.5 3.5M3 7L6.5 10.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Return to Base
              </Link>
              <p
                className="text-[10px] tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.15)" }}
              >
                You weren&apos;t supposed to find this.
              </p>
            </motion.div>
          )}
        </div>

        {/* ── Corner brackets — cinematic ──────────────── */}
        {ready && (
          <>
            {(
              [
                { top: "20px", left: "20px", style: "border-t border-l" },
                { top: "20px", right: "20px", style: "border-t border-r" },
                { bottom: "20px", left: "20px", style: "border-b border-l" },
                { bottom: "20px", right: "20px", style: "border-b border-r" },
              ] as const
            ).map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`absolute w-6 h-6 pointer-events-none z-20 ${c.style}`}
                style={{
                  ...(c as Record<string, string>),
                  borderColor: "rgba(10,88,255,0.35)",
                }}
              />
            ))}
          </>
        )}

        {/* ── Vignette ──────────────────────────────────── */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(7,7,8,0.85) 100%)",
          }}
        />
      </div>
    </>
  );
}
