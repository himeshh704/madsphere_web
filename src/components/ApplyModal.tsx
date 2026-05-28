"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface ApplyModalProps {
  role: string;
  onClose: () => void;
}

type Status = "idle" | "loading" | "success" | "error";

export default function ApplyModal({ role, onClose }: ApplyModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
      />

      {/* Slide-up modal */}
      <motion.div
        key="modal"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 32 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#0c0c0e] rounded-t-3xl shadow-2xl max-h-[92vh] overflow-y-auto md:max-w-2xl md:mx-auto md:bottom-6 md:rounded-3xl md:left-1/2 md:-translate-x-1/2"
      >
        {/* Handle */}
        <div className="flex justify-center pt-4 pb-2">
          <div className="w-10 h-1 rounded-full bg-zinc-200 dark:bg-zinc-700" />
        </div>

        <div className="px-6 md:px-8 pb-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-8 pt-2">
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400">Applying for</span>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-0.5">{role}</h2>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Success state */}
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-5 py-12 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-950/30 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Application sent!</h3>
                <p className="text-sm text-zinc-500 font-sans max-w-xs">
                  We got it. You&apos;ll receive a confirmation at your email. We&apos;ll be in touch within a week.
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 bg-[#0047FF] text-white text-xs font-bold uppercase tracking-widest px-8 py-3 rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
              >
                Done
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Full Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="Rohan Mehta"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#0047FF] focus:ring-2 focus:ring-[#0047FF]/10 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Email *</label>
                  <input
                    required
                    type="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#0047FF] focus:ring-2 focus:ring-[#0047FF]/10 transition-all"
                  />
                </div>
              </div>

              {/* Portfolio */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Portfolio / LinkedIn URL</label>
                <input
                  type="url"
                  placeholder="https://yoursite.com"
                  value={form.portfolio}
                  onChange={e => setForm(f => ({ ...f, portfolio: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#0047FF] focus:ring-2 focus:ring-[#0047FF]/10 transition-all"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Why MadSphere? *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us a little about yourself, what you've worked on, and why you think we'd be a good fit..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-[#0047FF] focus:ring-2 focus:ring-[#0047FF]/10 transition-all resize-none"
                />
              </div>

              {/* CV Upload */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Attach CV / Resume</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full px-4 py-4 rounded-xl border-2 border-dashed transition-all cursor-pointer flex items-center gap-4 ${cvFile ? "border-[#0047FF] bg-blue-50/50 dark:bg-blue-950/10" : "border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-600"}`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${cvFile ? "bg-[#0047FF]" : "bg-zinc-100 dark:bg-zinc-800"}`}>
                    <Upload className={`w-4 h-4 ${cvFile ? "text-white" : "text-zinc-400"}`} />
                  </div>
                  <div className="min-w-0">
                    {cvFile ? (
                      <>
                        <p className="text-sm font-semibold text-[#0047FF] truncate">{cvFile.name}</p>
                        <p className="text-xs text-zinc-400">{(cvFile.size / 1024).toFixed(0)} KB</p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Click to upload your CV</p>
                        <p className="text-xs text-zinc-400">PDF or Word · max 5MB</p>
                      </>
                    )}
                  </div>
                </div>
                <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFile} />
              </div>

              {/* Error */}
              {(errorMsg || status === "error") && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 text-red-600 px-4 py-3 rounded-xl text-sm"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {errorMsg || "Something went wrong. Please try again."}
                </motion.div>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 350, damping: 15 }}
                className="w-full bg-[#0047FF] hover:bg-blue-700 disabled:opacity-60 text-white font-bold uppercase tracking-widest text-xs py-4 rounded-2xl transition-colors cursor-pointer flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 mt-2"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Submit Application"
                )}
              </motion.button>

              <p className="text-center text-[11px] text-zinc-400 font-sans">
                Sent to madsphere.info@gmail.com · We reply within a week
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
