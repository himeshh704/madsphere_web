"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/utils/cn"; // We can implement a quick cn helper using clsx and tailwind-merge

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "glass" | "outline";
  size?: "sm" | "md" | "lg";
  showArrow?: boolean;
}

export default function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  showArrow = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center font-sans font-medium tracking-wide rounded-full overflow-hidden transition-all duration-300 active:scale-[0.98] group cursor-pointer focus:outline-none",
        {
          // Primary Variant: Custom Royal Blue button with dark mode support
          "bg-brand text-white shadow-lg shadow-brand/20 hover:shadow-brand/35 hover:bg-brand/90":
            variant === "primary",
          // Secondary Variant: Elegant white/dark contrast button
          "bg-foreground text-background hover:bg-foreground/90":
            variant === "secondary",
          // Glass Variant: Glassmorphism button with neon hover border
          "glass text-foreground hover:bg-white/10 dark:hover:bg-white/15":
            variant === "glass",
          // Outline Variant: Subtle border and glow
          "border border-foreground/15 text-foreground hover:bg-foreground/5":
            variant === "outline",
        },
        {
          "px-4 py-2 text-xs": size === "sm",
          "px-6 py-3.5 text-sm": size === "md",
          "px-8 py-5 text-base": size === "lg",
        },
        className
      )}
      {...props}
    >
      {/* Background slide animation for primary button */}
      {variant === "primary" && (
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out -z-10" />
      )}
      
      <span className="flex items-center gap-2">
        {children}
        {showArrow && (
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>
    </button>
  );
}
