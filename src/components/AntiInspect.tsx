"use client";

import { useEffect, useState } from "react";

export default function AntiInspect() {
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    // Check for audit bypass in URL or sessionStorage
    const isAudit = typeof window !== "undefined" && (
      new URLSearchParams(window.location.search).get("audit") === "true" ||
      sessionStorage.getItem("audit_bypass") === "true"
    );

    if (isAudit) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("audit_bypass", "true");
      }
      return; // Bypass all inspection protections for official auditing
    }

    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Disable clipboard copy events
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    // Disable dragging of images/media
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    // Disable common developer tools keyboard shortcuts and page saving
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === "F12") {
        e.preventDefault();
      }
      
      // Ctrl+Shift+I or Cmd+Option+I (Inspect DevTools)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "I" || e.key === "i")) {
        e.preventDefault();
      }

      // Ctrl+Shift+J or Cmd+Option+J (Console window)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "J" || e.key === "j")) {
        e.preventDefault();
      }

      // Ctrl+U or Cmd+U (View Source code)
      if ((e.ctrlKey || e.metaKey) && (e.key === "U" || e.key === "u")) {
        e.preventDefault();
      }

      // Ctrl+S or Cmd+S (Save page locally)
      if ((e.ctrlKey || e.metaKey) && (e.key === "S" || e.key === "s")) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("keydown", handleKeyDown);

    // Production-only DevTools debugger trap to prevent inspection
    let devtoolsInterval: NodeJS.Timeout;
    if (process.env.NODE_ENV === "production") {
      devtoolsInterval = setInterval(() => {
        const start = performance.now();
        debugger;
        const end = performance.now();
        // If execution takes longer than 100ms, it indicates debugger paused due to open DevTools
        if (end - start > 100) {
          setBlocked(true);
        }
      }, 1000);
    }

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("keydown", handleKeyDown);
      if (devtoolsInterval) clearInterval(devtoolsInterval);
    };
  }, []);

  if (blocked) {
    return (
      <div className="fixed inset-0 z-[99999] bg-[#070708] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="flex flex-col items-center gap-6 max-w-md">
          <img src="/logo_white.png" alt="Madsphere Logo" className="h-10 md:h-12 w-auto opacity-90 mb-4" />
          <h1 className="text-3xl font-bold tracking-tighter uppercase font-serif text-blue-500">Notice</h1>
          <p className="text-sm text-zinc-400 font-serif leading-relaxed">
            Developer tools and source inspection are disabled on this site.
          </p>
          <div className="w-16 h-[1px] bg-zinc-800 my-2"></div>
          <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">
            Madsphere Marketing Agency &bull; All Rights Reserved
          </p>
        </div>
      </div>
    );
  }

  return null;
}
