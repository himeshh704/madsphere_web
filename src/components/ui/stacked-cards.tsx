"use client";

import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { cn } from "@/utils/cn";
import { Layers, Grid3X3, LayoutList, Moon, Sun } from "lucide-react";

// Card Interface
export interface CardData {
  id: string;
  title: string;
  description: string;
  image?: string;
  color?: string;
}

// Default card data
const defaultCards: CardData[] = [
  {
    id: "1",
    title: "Mountain Hiking",
    description: "Explore breathtaking mountain trails and scenic views",
    image: "https://images.unsplash.com/photo-1528741254566-d718e868201f?q=80&w=3087&auto=format&fit=crop",
    color: "#ff7e5f",
  },
  {
    id: "2",
    title: "Surfing Lesson",
    description: "Learn to ride the waves with professional instructors",
    image: "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?q=80&w=3087&auto=format&fit=crop",
    color: "#0396FF",
  },
  {
    id: "3",
    title: "Wine Tasting",
    description: "Discover exquisite wines in beautiful vineyard settings",
    image: "https://images.unsplash.com/photo-1526827826797-7b05204a22ef?w=800&auto=format&fit=crop",
    color: "#7367F0",
  },
  {
    id: "4",
    title: "City Tours",
    description: "Experience urban culture and hidden gems",
    image: "https://images.unsplash.com/photo-1559333086-b0a56225a93c?w=500&h=300&fit=crop",
    color: "#28a745",
  },
];

export type LayoutMode = "stack" | "grid" | "vertical";

const layoutIcons = {
  stack: Layers,
  grid: Grid3X3,
  vertical: LayoutList,
};

export interface StackedCardsProps {
  cards?: CardData[];
  defaultLayout?: LayoutMode;
  spreadDistance?: number;
  rotationAngle?: number;
}

export const StackedCards = ({
  cards = defaultCards,
  defaultLayout = "stack",
  spreadDistance = 40,
  rotationAngle = 5,
}: StackedCardsProps) => {
  const [layout, setLayout] = useState<LayoutMode>(defaultLayout);
  const [isHovering, setIsHovering] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const lastNavigationTime = useRef(0);
  const navigationCooldown = 400;

  const limitedCards = cards.slice(0, 4);

  const navigate = useCallback(
    (newDirection: number) => {
      const now = Date.now();
      if (now - lastNavigationTime.current < navigationCooldown) return;
      lastNavigationTime.current = now;

      setActiveIndex((prev) => {
        if (newDirection > 0) {
          return prev === limitedCards.length - 1 ? 0 : prev + 1;
        }
        return prev === 0 ? limitedCards.length - 1 : prev - 1;
      });
    },
    [limitedCards.length]
  );

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 50;
    if (layout === "vertical") {
      if (info.offset.y < -threshold) {
        navigate(1);
      } else if (info.offset.y > threshold) {
        navigate(-1);
      }
    } else if (layout === "stack") {
      if (info.offset.x < -threshold) {
        navigate(1);
      } else if (info.offset.x > threshold) {
        navigate(-1);
      }
    }
  };

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (layout === "vertical" && Math.abs(e.deltaY) > 30) {
        if (e.deltaY > 0) {
          navigate(1);
        } else {
          navigate(-1);
        }
      }
    },
    [navigate, layout]
  );

  useEffect(() => {
    if (layout === "vertical") {
      window.addEventListener("wheel", handleWheel, { passive: true });
      return () => window.removeEventListener("wheel", handleWheel);
    }
  }, [handleWheel, layout]);

  const getStackOrder = () => {
    const reordered = [];
    for (let i = 0; i < limitedCards.length; i++) {
      const index = (activeIndex + i) % limitedCards.length;
      reordered.push({ ...limitedCards[index], stackPosition: i });
    }
    return reordered.reverse();
  };

  const getVerticalCardStyle = (index: number) => {
    const total = limitedCards.length;
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    if (diff === 0) {
      return { y: 0, scale: 1, opacity: 1, zIndex: 5, rotateX: 0 };
    } else if (diff === -1) {
      return { y: -160, scale: 0.82, opacity: 0.6, zIndex: 4, rotateX: 8 };
    } else if (diff === -2) {
      return { y: -280, scale: 0.7, opacity: 0.3, zIndex: 3, rotateX: 15 };
    } else if (diff === 1) {
      return { y: 160, scale: 0.82, opacity: 0.6, zIndex: 4, rotateX: -8 };
    } else if (diff === 2) {
      return { y: 280, scale: 0.7, opacity: 0.3, zIndex: 3, rotateX: -15 };
    } else {
      return {
        y: diff > 0 ? 400 : -400,
        scale: 0.6,
        opacity: 0,
        zIndex: 0,
        rotateX: diff > 0 ? -20 : 20,
      };
    }
  };

  const isVisible = (index: number) => {
    const total = limitedCards.length;
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return Math.abs(diff) <= 2;
  };

  const renderStackLayout = () => {
    const displayCards = getStackOrder();

    return (
      <div
        className="relative w-full h-full flex flex-col items-center justify-center"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="relative w-[350px] h-[400px]">
          {displayCards.map((card, index) => {
            const isFirst = index === 0;
            let xOffset = 0;
            let rotation = 0;

            if (limitedCards.length > 1) {
              if (index === 1) {
                xOffset = -spreadDistance;
                rotation = -rotationAngle;
              } else if (index === 2) {
                xOffset = spreadDistance;
                rotation = rotationAngle;
              }
            }

            return (
              <motion.div
                key={card.id}
                className={cn("absolute", isFirst ? "z-10" : "z-0")}
                initial={{ x: 0, rotate: 0 }}
                animate={{
                  x: isHovering ? xOffset : 0,
                  rotate: isHovering ? rotation : 0,
                  zIndex: isFirst ? 10 : 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                  delay: index * 0.1,
                  type: "spring",
                }}
                drag={isFirst ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={handleDragEnd}
              >
                <div
                  className={cn(
                    "w-[350px] h-[400px] overflow-hidden bg-card rounded-2xl shadow-lg border border-border p-3",
                    isFirst ? "cursor-grab active:cursor-grabbing" : ""
                  )}
                >
                  {card.image && (
                    <div className="relative h-72 rounded-xl overflow-hidden w-full">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="object-cover w-full h-full"
                        draggable={false}
                      />
                    </div>
                  )}
                  <div className="px-2 pt-3 flex flex-col gap-y-1">
                    <h2 className="text-lg font-bold tracking-tight text-foreground">
                      {card.title}
                    </h2>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {card.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Swipe instruction helper on mobile */}
        <div className="mt-8 md:hidden text-center pointer-events-none select-none text-zinc-400 dark:text-zinc-500 flex flex-col items-center gap-1.5">
          <motion.div
            animate={{ x: [-6, 6, -6] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </motion.div>
          <span className="text-[10px] font-bold tracking-widest uppercase font-sans">Swipe card left / right to cycle</span>
        </div>
      </div>
    );
  };

  const renderGridLayout = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl mx-auto">
        {limitedCards.map((card) => (
          <motion.div
            key={card.id}
            layoutId={card.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className="cursor-pointer rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors p-3 flex flex-col gap-3"
          >
            {card.image && (
              <div className="relative h-48 w-full rounded-xl overflow-hidden bg-zinc-800">
                <img
                  src={card.image}
                  alt={card.title}
                  className="object-cover w-full h-full"
                  draggable={false}
                />
              </div>
            )}
            <div className="px-2 pb-1">
              <h3 className="font-bold text-card-foreground truncate">
                {card.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                {card.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderVerticalLayout = () => {
    return (
      <div
        className="relative flex h-[500px] w-full max-w-[320px] items-center justify-center mx-auto"
        style={{ perspective: "1200px" }}
      >
        <div className="relative flex w-full flex-col items-center justify-center">
          {limitedCards.map((card, index) => {
            if (!isVisible(index)) return null;
            const style = getVerticalCardStyle(index);
            const isCurrent = index === activeIndex;

            return (
              <motion.div
                key={card.id}
                className="absolute cursor-grab active:cursor-grabbing"
                animate={{
                  y: style.y,
                  scale: style.scale,
                  opacity: style.opacity,
                  rotateX: style.rotateX,
                  zIndex: style.zIndex,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 1,
                }}
                drag={isCurrent ? "y" : false}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                style={{
                  transformStyle: "preserve-3d",
                  zIndex: style.zIndex,
                }}
              >
                <div
                  className="relative h-[420px] w-[280px] overflow-hidden rounded-3xl bg-card ring-1 ring-border/20 p-3"
                  style={{
                    boxShadow: isCurrent
                      ? "0 25px 50px -12px hsl(var(--foreground) / 0.15)"
                      : "0 10px 30px -10px hsl(var(--foreground) / 0.1)",
                  }}
                >
                  {card.image && (
                    <img
                      src={card.image}
                      alt={card.title}
                      className="object-cover w-full h-full rounded-2xl"
                      draggable={false}
                    />
                  )}
                  <div className="absolute inset-x-3 bottom-3 h-32 bg-gradient-to-t from-background/95 via-background/70 to-transparent p-4 rounded-b-2xl flex flex-col justify-end">
                    <h3 className="font-bold text-foreground">
                      {card.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Swipe instruction helper on mobile */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 md:hidden text-center pointer-events-none select-none text-zinc-400 dark:text-zinc-500 flex flex-col items-center gap-1.5 z-20">
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </motion.div>
          <span className="text-[10px] font-bold tracking-widest uppercase font-sans">Swipe card up / down to cycle</span>
        </div>
      </div>
    );
  };

  return (
    <div
      className={cn(
        "w-full min-h-screen flex flex-col items-center justify-center p-8 transition-colors duration-300 relative",
        isDark ? "bg-[#070708] text-white" : "bg-gradient-to-br from-blue-50 via-white to-gray-50 text-zinc-900"
      )}
    >
      <svg
        className="absolute inset-0 w-full h-full opacity-5 pointer-events-none transition-opacity duration-300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke={isDark ? "#ffffff" : "#000000"}
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <motion.button
        onClick={() => setIsDark(!isDark)}
        className={cn(
          "absolute top-8 right-8 p-3 rounded-full border transition-colors duration-200 z-20",
          isDark
            ? "bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-yellow-400"
            : "bg-white hover:bg-zinc-100 border-zinc-200 text-zinc-700"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isDark ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </motion.button>

      <div className="space-y-8 w-full max-w-5xl relative z-10 py-12">
        <div className="flex items-center justify-center gap-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900/80 p-1 w-fit mx-auto border border-zinc-200 dark:border-zinc-800 shadow-md">
          {(Object.keys(layoutIcons) as LayoutMode[]).map((mode) => {
            const Icon = layoutIcons[mode];
            return (
              <button
                key={mode}
                onClick={() => setLayout(mode)}
                className={cn(
                  "rounded-full p-2.5 transition-all text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer",
                  layout === mode
                    ? "bg-[#0047FF] text-white shadow-lg"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                )}
                aria-label={`Switch to ${mode} layout`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-[10px] pr-1 hidden sm:inline">{mode}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={layout}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full flex items-center justify-center min-h-[460px]"
          >
            {layout === "stack" && renderStackLayout()}
            {layout === "grid" && renderGridLayout()}
            {layout === "vertical" && renderVerticalLayout()}
          </motion.div>
        </AnimatePresence>

        {(layout === "stack" || layout === "vertical") &&
          limitedCards.length > 1 && (
            <div className="flex justify-center gap-2 pt-6">
              {limitedCards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                    index === activeIndex
                      ? "w-6 bg-[#0047FF]"
                      : "w-1.5 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400"
                  )}
                  aria-label={`Go to card ${index + 1}`}
                />
              ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default StackedCards;
