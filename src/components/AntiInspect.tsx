"use client";

import { useEffect } from "react";

export default function AntiInspect() {
  useEffect(() => {
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

    // Event listeners
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("keydown", handleKeyDown);

    // Production-only DevTools debugger trap to prevent inspection
    let devtoolsInterval: NodeJS.Timeout;
    if (process.env.NODE_ENV === "production") {
      devtoolsInterval = setInterval(() => {
        const start = performance.now();
        // The debugger statement pauses the browser execution ONLY when DevTools is open.
        debugger;
        const end = performance.now();
        // If execution paused, it means DevTools is open
        if (end - start > 100) {
          // Clear document body to hide code/assets and alert them
          document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#050505;color:#fff;font-family:sans-serif;font-weight:bold;text-transform:uppercase;letter-spacing:0.2em;">Developer tools are disabled.</div>';
          window.location.reload();
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

  return null;
}

