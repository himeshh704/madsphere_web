"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { TextReveal } from "@/components/Animations";
import { Layers, Grid3X3, LayoutList } from "lucide-react";
import { cn } from "@/utils/cn";

interface ProcessStep {
  step?: string;
  title: string;
  desc?: string;
  img?: string;
  reverse?: boolean;
  stepNum?: string | number;
  description?: string;
  imageUrl?: string;
}

interface ParallaxScrollFeatureSectionProps {
  steps?: readonly ProcessStep[] | ProcessStep[];
  defaultLayout?: LayoutMode;
}

// Local SectionTag component matching the theme
function SectionTag({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 border-l border-zinc-300 dark:border-zinc-700 pl-4 ml-4">
      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-sm" /> {label}
    </span>
  );
}

// Card sub-components
type CardVariant = "default" | "secondary";

const variantClasses: Record<CardVariant, string> = {
  default:
    "border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/95 shadow-2xl",
  secondary:
    "border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-[#0c0c0e]/95 shadow-xl",
};

function CardRoot({
  children,
  className,
  variant = "default",
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn(
        "relative overflow-visible text-zinc-900 dark:text-zinc-50 rounded-[32px]",
        variantClasses[variant],
        className
      )}
      style={style}
      data-slot="card"
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col", className)}
      data-slot="card-header"
      {...props}
    />
  );
}

function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-lg font-bold leading-tight text-zinc-900 dark:text-zinc-50", className)}
      data-slot="card-title"
      {...props}
    />
  );
}

function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-xs leading-relaxed text-zinc-400 dark:text-zinc-5005", className)}
      data-slot="card-description"
      {...props}
    />
  );
}

function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-1 flex-col gap-1 text-sm", className)}
      data-slot="card-content"
      {...props}
    />
  );
}

function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-row items-center", className)}
      data-slot="card-footer"
      {...props}
    />
  );
}

const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
});

export type LayoutMode = "stack" | "grid" | "vertical";

const layoutIcons = {
  stack: Layers,
  grid: Grid3X3,
  vertical: LayoutList,
};

export const ParallaxScrollFeatureSection = ({
  steps = [],
  defaultLayout = "stack",
}: ParallaxScrollFeatureSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<LayoutMode>(defaultLayout);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [mounted, setMounted] = useState(false);
  const lastScrollTime = useRef(0);
  const scrollCooldown = 400;

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Process data mapping
  const sections = steps.length > 0 
    ? steps.map((item, index) => ({
        id: String(index + 1),
        title: item.title,
        description: item.desc || item.description || "",
        imageUrl: item.img || item.imageUrl || "",
        stepNum: item.step || item.stepNum || `0${index + 1}`
      }))
    : [
        {
          id: "1",
          title: "Discovery",
          description: "We figure out who you are, what's going on in your market, and what you're actually trying to achieve. No assumptions. Just listening.",
          imageUrl: '/process_step_01.png',
          stepNum: "01"
        },
        {
          id: "2",
          title: "Strategy",
          description: "Now we decide where you're headed. Positioning, messaging, the whole direction — mapped out so there's no guesswork later.",
          imageUrl: '/process_step_02.png',
          stepNum: "02"
        },
        {
          id: "3",
          title: "Create",
          description: "This is where it all becomes real. Designs get built, words get written, videos get shot — everything has a reason for being there.",
          imageUrl: '/process_step_03.png',
          stepNum: "03"
        },
        {
          id: "4",
          title: "Launch & Grow",
          description: "We put it live, see how it lands, and keep making it better. Good work isn't a one-time thing — it's a cycle.",
          imageUrl: '/process_step_04.png',
          stepNum: "04"
        }
      ];

  const navigate = useCallback(
    (newDirection: number) => {
      const now = Date.now();
      if (now - lastScrollTime.current < scrollCooldown) return;
      lastScrollTime.current = now;

      setCurrentIndex((prev) => {
        const nextIndex = prev + newDirection;
        if (nextIndex < 0 || nextIndex >= sections.length) return prev;
        return nextIndex;
      });
    },
    [sections.length]
  );

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 55;
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
    setIsDragging(false);
  };

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!isHovered) return;
      if (layout === "grid") return;

      const direction = e.deltaY > 0 ? 1 : -1;

      // Lock conditions: scroll down and not yet at the last card, or scroll up and not yet at the first card
      let shouldLock = false;
      if (direction > 0 && currentIndex < sections.length - 1) {
        shouldLock = true;
      } else if (direction < 0 && currentIndex > 0) {
        shouldLock = true;
      }

      if (shouldLock) {
        if (e.cancelable) {
          e.preventDefault();
        }
        const now = Date.now();
        if (now - lastScrollTime.current > scrollCooldown) {
          lastScrollTime.current = now;
          setCurrentIndex((prev) => {
            const nextIndex = prev + direction;
            if (nextIndex < 0 || nextIndex >= sections.length) return prev;
            return nextIndex;
          });
        }
      }
    },
    [currentIndex, sections.length, isHovered, layout]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.addEventListener("wheel", handleWheel, { passive: false });
      return () => el.removeEventListener("wheel", handleWheel);
    }
  }, [handleWheel]);

  // Vertical layout helper
  const getVerticalCardStyle = (index: number) => {
    const total = sections.length;
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const isDesktop = windowWidth >= 768;

    if (diff === 0) {
      return { y: 0, scale: 1, opacity: 1, zIndex: 5, rotateX: 0 };
    } else if (diff === -1) {
      return { y: isDesktop ? -160 : -95, scale: 0.85, opacity: 0.6, zIndex: 4, rotateX: 8 };
    } else if (diff === -2) {
      return { y: isDesktop ? -280 : -170, scale: 0.7, opacity: 0.3, zIndex: 3, rotateX: 15 };
    } else if (diff === 1) {
      return { y: isDesktop ? 160 : 95, scale: 0.85, opacity: 0.6, zIndex: 4, rotateX: -8 };
    } else if (diff === 2) {
      return { y: isDesktop ? 280 : 170, scale: 0.7, opacity: 0.3, zIndex: 3, rotateX: -15 };
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
    const total = sections.length;
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return Math.abs(diff) <= 2;
  };

  // 1. Render Spread Stack Layout
  const renderStackLayout = () => {
    const isDesktop = windowWidth >= 768;
    const spread = isDesktop ? 80 : 40;
    const rot = isDesktop ? 6 : 4;

    return (
      <div className="relative flex h-[480px] md:h-[600px] w-full max-w-[360px] md:max-w-[900px] items-center justify-center mx-auto mt-2">
        {sections.map((item, index) => {
          const isCurrent = index === currentIndex;
          
          let xOffset = 0;
          let rotation = 0;
          let zIndex = sections.length - 1;
          let opacity = 1;
          let scale = 1;

          if (isCurrent) {
            xOffset = 0;
            rotation = 0;
            zIndex = 10;
            scale = 1;
          } else {
            const relIndex = (index - currentIndex + sections.length) % sections.length;
            if (relIndex === 1) {
              xOffset = -spread;
              rotation = -rot;
              zIndex = 8;
              scale = 0.96;
            } else if (relIndex === 2) {
              xOffset = spread;
              rotation = rot;
              zIndex = 8;
              scale = 0.96;
            } else {
              xOffset = 0;
              rotation = 0;
              zIndex = 6;
              scale = 0.92;
              opacity = 0.7;
            }
          }

          return (
            <motion.div
              key={item.id}
              className="absolute cursor-grab active:cursor-grabbing w-[310px] sm:w-[340px] md:w-[860px]"
              initial={{ x: 0, rotate: 0, scale: 1 }}
              animate={{
                x: isHovered ? xOffset : 0,
                rotate: isHovered ? rotation : 0,
                scale: isHovered ? scale : (isCurrent ? 1 : 1 - (index - currentIndex + sections.length) % sections.length * 0.04),
                opacity: opacity,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              drag={isCurrent ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
              style={{
                zIndex: zIndex,
                willChange: "transform, opacity",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
            >
              <Card
                className="h-[430px] md:h-[500px] p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 justify-between"
                style={{
                  boxShadow: isCurrent
                    ? "0 25px 50px -12px rgba(0, 71, 255, 0.12), 0 0 0 1px rgba(0, 71, 255, 0.04)"
                    : "0 10px 30px -10px rgba(0, 0, 0, 0.08)",
                }}
              >
                {/* Left side: Image */}
                <div className="w-full md:w-[42%] h-36 md:h-full rounded-2xl overflow-hidden relative group bg-zinc-100 dark:bg-zinc-800 flex-shrink-0">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    draggable={false}
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 bg-black/60 backdrop-blur-md rounded-lg border border-white/10">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider font-sans">
                      Step {item.stepNum}
                    </span>
                  </div>
                </div>

                {/* Right side: Content */}
                <div className="flex flex-col justify-between flex-grow md:py-2">
                  <div className="flex flex-col gap-4">
                    {/* Header Title */}
                    <Card.Header className="p-0">
                      <Card.Title className="text-xl md:text-3xl font-extrabold font-sans tracking-tight text-zinc-900 dark:text-zinc-50">
                        {item.title}
                      </Card.Title>
                    </Card.Header>

                    {/* Body Content Description */}
                    <Card.Content className="p-0 text-xs sm:text-sm md:text-base lg:text-lg text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed">
                      {item.description}
                    </Card.Content>
                  </div>

                  {/* Card Footer info */}
                  <Card.Footer className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-[10px] md:text-xs text-zinc-400 mt-4 md:mt-0">
                    <span className="font-bold tracking-wider font-sans uppercase text-[#0047FF]">
                      MadSphere Process
                    </span>
                    <span className="font-medium font-sans">
                      {index + 1} / {sections.length}
                    </span>
                  </Card.Footer>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    );
  };

  // 2. Render Grid Layout
  const renderGridLayout = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-[1200px] mx-auto py-4 animate-in fade-in duration-300">
        {sections.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className="rounded-[32px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-lg overflow-hidden p-6 md:p-8 flex flex-col gap-6"
          >
            {/* Image */}
            <div className="relative h-48 md:h-64 w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="object-cover w-full h-full"
                draggable={false}
              />
              <div className="absolute top-3 left-3 px-2.5 py-0.5 bg-black/60 backdrop-blur-md rounded-lg border border-white/10">
                <span className="text-[10px] font-bold text-white uppercase tracking-wider font-sans">
                  Step {item.stepNum}
                </span>
              </div>
            </div>
            {/* Text Contents */}
            <div className="flex flex-col flex-grow justify-between gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="font-extrabold text-zinc-900 dark:text-zinc-50 text-xl md:text-2xl font-sans tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-[10px] md:text-xs text-zinc-400">
                <span className="font-bold tracking-wider font-sans uppercase text-[#0047FF]">
                  MadSphere Process
                </span>
                <span className="font-medium font-sans">
                  {index + 1} / {sections.length}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  // 3. Render Vertical 3D Layout
  const renderVerticalLayout = () => {
    return (
      <div
        className="relative flex h-[480px] md:h-[600px] w-full max-w-[360px] md:max-w-[900px] items-center justify-center mx-auto mt-2"
        style={{ perspective: "1200px" }}
      >
        <div className="relative flex w-full flex-col items-center justify-center">
          {sections.map((item, index) => {
            if (!isVisible(index)) return null;
            const style = getVerticalCardStyle(index);
            const isCurrent = index === currentIndex;

            return (
              <motion.div
                key={item.id}
                className="absolute cursor-grab active:cursor-grabbing w-[290px] sm:w-[320px] md:w-[380px]"
                animate={{
                  y: style.y,
                  scale: style.scale,
                  opacity: style.opacity,
                  rotateX: style.rotateX,
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
                  willChange: "transform, opacity",
                  backfaceVisibility: "hidden",
                }}
              >
                <div
                  className="relative h-[400px] sm:h-[420px] md:h-[460px] w-full overflow-hidden rounded-[28px] border border-zinc-200 dark:border-zinc-800/80 bg-zinc-900 shadow-2xl"
                  style={{
                    boxShadow: isCurrent
                      ? "0 25px 50px -12px rgba(0, 71, 255, 0.2)"
                      : "0 10px 30px -10px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="absolute inset-0 object-cover w-full h-full opacity-80"
                      draggable={false}
                    />
                  )}
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                  
                  {/* Step Tag */}
                  <div className="absolute top-4 left-4 px-2.5 py-0.5 bg-black/60 backdrop-blur-md rounded-lg border border-white/10">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider font-sans">
                      Step {item.stepNum}
                    </span>
                  </div>

                  {/* Content Overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-2 text-left">
                    <h3 className="font-extrabold text-white text-xl md:text-2xl font-sans tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                    
                    {/* Divider and Footer */}
                    <div className="pt-3 mt-1 border-t border-white/10 flex items-center justify-between text-[10px] text-white/60">
                      <span className="font-bold tracking-wider font-sans uppercase">
                        MadSphere Process
                      </span>
                      <span className="font-medium font-sans">
                        {index + 1} / {sections.length}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  if (!mounted) {
    return (
      <div className="relative w-full flex flex-col justify-center items-center overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/20 px-6 md:px-16 py-12 md:py-24 border border-zinc-200/60 dark:border-zinc-800/40 rounded-[32px] min-h-[620px] md:min-h-[860px]">
        <div className="max-w-[1200px] w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 md:mb-16">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 font-sans tracking-tight">
              How We Work
            </h2>
            <SectionTag label="Process" />
          </div>
        </div>
        <div className="relative flex h-[480px] md:h-[600px] w-full max-w-[360px] md:max-w-[900px] items-center justify-center mt-2" />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full flex flex-col justify-center items-center overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/20 px-6 md:px-16 py-12 md:py-24 border border-zinc-200/60 dark:border-zinc-800/40 rounded-[32px] min-h-[620px] md:min-h-[860px] transition-colors duration-300"
    >
      {/* Title header inside normal page flow */}
      <div className="max-w-[1200px] w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 md:mb-16">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 font-sans tracking-tight">
            <TextReveal>How We Work</TextReveal>
          </h2>
          <SectionTag label="Process" />
        </div>
        
        {/* Layout Switcher */}
        <div className="flex items-center gap-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900/80 p-1 border border-zinc-200 dark:border-zinc-800 shadow-md">
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
                <span className="text-[10px] pr-1 hidden md:inline">{mode}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Background Soft Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0047FF]/5 blur-3xl" />
      </div>

      {/* Layout Content */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={layout}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {layout === "stack" && renderStackLayout()}
            {layout === "grid" && renderGridLayout()}
            {layout === "vertical" && renderVerticalLayout()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Indicators & Indicators */}
      {layout !== "grid" && sections.length > 1 && (
        <>
          {/* Navigation Indicators on the Right */}
          <div className="absolute right-4 md:right-12 top-1/2 flex -translate-y-1/2 flex-col gap-2.5 z-20">
            {sections.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-all duration-300 cursor-pointer",
                  index === currentIndex ? "h-5 bg-[#0047FF]" : "bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400"
                )}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide Index Counter on the Left */}
          <div className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 hidden sm:flex flex-col items-center z-20 select-none">
            <span className="text-3xl font-extralight text-zinc-900 dark:text-zinc-50 tabular-nums">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <div className="my-1.5 h-px w-6 bg-zinc-200 dark:bg-zinc-800" />
            <span className="text-xs text-zinc-400 dark:text-zinc-500 tabular-nums">
              {String(sections.length).padStart(2, "0")}
            </span>
          </div>
        </>
      )}

      {/* Scroll/Drag Guide Tag at Bottom */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.85, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        {/* Desktop: Scroll to reveal */}
        <div className="hidden md:flex flex-col items-center gap-1 text-zinc-400 dark:text-zinc-500">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
          <span className="text-[9px] font-bold tracking-widest uppercase font-sans">
            {layout === "grid" ? "" : "Scroll to reveal"}
          </span>
        </div>

        {/* Mobile: Swipe to navigate */}
        {layout !== "grid" && (
          <div className="flex md:hidden flex-col items-center gap-1 text-zinc-400 dark:text-zinc-500">
            <motion.div
              animate={layout === "stack" ? { x: [-6, 6, -6] } : { y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                {layout === "stack" ? (
                  <path d="M19 12H5M12 5l-7 7 7 7" />
                ) : (
                  <path d="M12 19V5M5 12l7-7 7 7" />
                )}
              </svg>
            </motion.div>
            <span className="text-[9px] font-bold tracking-widest uppercase font-sans">
              {layout === "stack" ? "Swipe card left / right" : "Swipe card up / down"}
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
};
