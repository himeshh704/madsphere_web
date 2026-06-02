"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle, AlertCircle, Loader2, ArrowRight } from "lucide-react";

interface ApplyModalProps {
  role: string;
  onClose: () => void;
}

type Status = "idle" | "loading" | "success" | "error";

export default function ApplyModal({ role, onClose }: ApplyModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [form, setForm] = useState({ name: "", email: "", portfolio: "", message: "" });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) { setErrorMsg("CV must be under 5MB."); return; }
    if (!["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(f.type)) {
      setErrorMsg("Please upload a PDF or Word document."); return;
    }
    setErrorMsg("");
    setCvFile(f);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("loading");
    setErrorMsg("");

    const fd = new FormData();
    fd.append("name",      form.name);
    fd.append("email",     form.email);
    fd.append("role",      role);
    fd.append("portfolio", form.portfolio);
    fd.append("message",   form.message);
    if (cvFile) fd.append("cv", cvFile);

    try {
      const res  = await fetch("/api/apply", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const rowClass = "flex items-start gap-4 px-6 py-4 border-b border-zinc-200/50 group transition-colors hover:bg-zinc-500/5";
  const labelClass = "w-20 shrink-0 text-[11px] font-bold tracking-wider uppercase text-zinc-400 pt-0.5 select-none";
  const inputClass = "flex-1 bg-transparent text-zinc-805 text-sm font-semibold placeholder:text-zinc-400 outline-none transition-colors";

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 z-50"
        style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
      />

      {/* macOS-style compose window */}
      <motion.div
        key="modal"
        initial={{ scale: 0.88, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 40 }}
        transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.8 }}
        className="fixed z-50 inset-0 flex items-center justify-center px-4 pointer-events-none"
      >
        <div
          className="pointer-events-auto w-full max-w-[600px] rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.15)] border border-white/60"
          style={{
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          {/* ── Title bar ─────────────────────────────────────── */}
          <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-zinc-200/50">
            <span className="text-[12px] font-bold text-zinc-800 tracking-wide">
              {status === "success" ? "Application Sent" : `Apply — ${role}`}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-bold text-zinc-500 hover:text-zinc-950 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>

          {/* ── Success state ──────────────────────────────────── */}
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="flex flex-col items-center gap-5 py-16 text-center px-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
                className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center"
              >
                <CheckCircle className="w-7 h-7 text-green-550" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2">Application sent!</h3>
                <p className="text-sm text-zinc-500 font-sans max-w-xs leading-relaxed">
                  We got it. You&apos;ll hear from us within a week at your email address.
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 h-12 bg-[#0047FF] hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-widest px-8 rounded-full cursor-pointer transition-colors shadow-lg shadow-blue-500/25 flex items-center justify-center shrink-0"
              >
                Done
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>

              {/* ── To row ─── */}
              <div className={rowClass}>
                <span className={labelClass}>To</span>
                <div className="flex items-center gap-2.5 flex-1">
                  <div className="w-5 h-5 rounded-full bg-[#0047FF] flex items-center justify-center shrink-0">
                    <span className="text-[8px] font-black text-white">M</span>
                  </div>
                  <span className="text-zinc-800 text-sm font-semibold">MadSphere</span>
                  <span className="text-zinc-400 text-xs ml-1">(madsphere.info@gmail.com)</span>
                </div>
              </div>

              {/* ── From ─── */}
              <div className={rowClass}>
                <span className={labelClass}>From</span>
                <input
                  required
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className={inputClass}
                />
              </div>

              {/* ── Your Name ─── */}
              <div className={rowClass}>
                <span className={labelClass}>Name</span>
                <input
                  required
                  type="text"
                  placeholder="Write your full name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className={inputClass}
                />
              </div>

              {/* ── Portfolio / LinkedIn ─── */}
              <div className={rowClass}>
                <span className={labelClass}>Portfolio</span>
                <input
                  type="url"
                  placeholder="https://yoursite.com or LinkedIn URL"
                  value={form.portfolio}
                  onChange={e => setForm(f => ({ ...f, portfolio: e.target.value }))}
                  className={inputClass}
                />
              </div>

              {/* ── Subject / Role ─── */}
              <div className={rowClass}>
                <span className={labelClass}>Role</span>
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-zinc-600 text-sm font-semibold">{role}</span>
                  {/* CV upload trigger */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                      cvFile
                        ? "bg-[#0047FF]/15 text-[#0047FF] border border-[#0047FF]/25"
                        : "bg-zinc-100 text-zinc-500 border border-zinc-200 hover:bg-zinc-200 hover:text-zinc-800"
                    }`}
                  >
                    <Upload className="w-3 h-3" />
                    {cvFile ? cvFile.name.slice(0, 16) + (cvFile.name.length > 16 ? "…" : "") : "Attach CV"}
                  </button>
                  <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFile} />
                </div>
              </div>

              {/* ── Message textarea ─── */}
              <div className="px-6 pt-4 pb-2 border-b border-zinc-200/50">
                <textarea
                  required
                  rows={5}
                  placeholder="Say something about yourself and why you want to join MadSphere..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full bg-transparent text-zinc-850 text-sm font-semibold placeholder:text-zinc-400 outline-none resize-none leading-relaxed transition-colors"
                />
              </div>

              {/* ── Error ─── */}
              <AnimatePresence>
                {(errorMsg || status === "error") && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mx-6 mt-3 flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-xs overflow-hidden"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errorMsg || "Something went wrong. Please try again."}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Footer / Submit ─── */}
              <div className="flex items-center justify-between px-6 py-4 bg-zinc-50/50">
                <p className="text-[10px] text-zinc-400 font-bold font-sans">
                  PDF or Word · max 5MB · replies within a week
                </p>
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover="hover"
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 350, damping: 15 }}
                  className="h-12 flex items-center bg-[#0047FF] hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-widest pl-6 pr-2 rounded-full transition-colors shadow-lg shadow-blue-500/20 cursor-pointer shrink-0"
                >
                  {status === "loading" ? "Sending" : "Submit"}
                  <motion.span
                    variants={{ hover: { x: 2 } }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="ml-3 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0"
                  >
                    {status === "loading" ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    )}
                  </motion.span>
                </motion.button>
              </div>

            </form>
          )}
        </div>
      </motion.div>
    </>,
    document.body
  );
}
