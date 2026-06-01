"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, LogOut, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import defaultContent from "@/data/content.json";

export default function AdminPortal() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    // Check if we have a saved session
    const savedPw = localStorage.getItem("madsphere_admin_pw");
    if (savedPw) {
      setPassword(savedPw);
      handleLogin(savedPw);
    }
  }, []);

  const handleLogin = async (pwToUse = password) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwToUse }),
      });
      if (res.ok) {
        setLoggedIn(true);
        localStorage.setItem("madsphere_admin_pw", pwToUse);
        fetchFreshContent();
      } else {
        setMessage({ type: "error", text: "Invalid password" });
        localStorage.removeItem("madsphere_admin_pw");
      }
    } catch (e) {
      setMessage({ type: "error", text: "Login failed" });
    }
    setLoading(false);
  };

  const fetchFreshContent = async () => {
    try {
      // Try to get the absolute freshest from Github to avoid build cache
      const res = await fetch(`https://raw.githubusercontent.com/himeshh704/madsphere_web/main/src/data/content.json?t=${Date.now()}`);
      if (res.ok) {
        const fresh = await res.json();
        setContent(fresh);
      } else {
        setContent(defaultContent);
      }
    } catch (e) {
      setContent(defaultContent);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, newContent: content }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: "Changes saved! The live website is updating (takes ~60 seconds)." });
      } else {
        setMessage({ type: "error", text: data.error || "Failed to save" });
      }
    } catch (e: any) {
      setMessage({ type: "error", text: "Network error saving changes" });
    }
    setSaving(false);
  };

  const logout = () => {
    localStorage.removeItem("madsphere_admin_pw");
    setLoggedIn(false);
    setPassword("");
    setContent(null);
  };

  const handleTextChange = (section: string, index: number, field: string, value: string) => {
    const newContent = { ...content };
    newContent[section][index][field] = value;
    setContent(newContent);
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-white mb-6">MadSphere Admin</h1>
          {message && (
            <div className={`p-3 rounded-lg mb-6 text-sm ${message.type === "error" ? "bg-red-500/10 text-red-500" : "bg-green-500/10 text-green-500"}`}>
              {message.text}
            </div>
          )}
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0047FF] mb-4"
          />
          <button
            onClick={() => handleLogin()}
            disabled={loading || !password}
            className="w-full bg-[#0047FF] hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Login"}
          </button>
        </motion.div>
      </div>
    );
  }

  if (!content) return <div className="min-h-screen bg-black flex items-center justify-center text-white"><RefreshCw className="animate-spin w-8 h-8" /></div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#0047FF] selection:text-white pb-24">
      {/* Topbar */}
      <div className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">MadSphere <span className="text-zinc-500 font-normal">Content Manager</span></h1>
        <div className="flex items-center gap-4">
          <button onClick={logout} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium">
            <LogOut className="w-4 h-4" /> Logout
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-[#0047FF] hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2 rounded-lg font-bold transition-colors"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving & Deploying..." : "Publish Changes"}
          </button>
        </div>
      </div>

      {message && (
        <div className={`mx-6 mt-6 p-4 rounded-xl flex items-center gap-3 border ${message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <p className="font-medium text-sm">{message.text}</p>
        </div>
      )}

      <div className="max-w-5xl mx-auto p-6 space-y-12 mt-8">
        
        {/* Editor Section: Hero Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-zinc-800 pb-2">Hero Section</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
            <div>
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Headline</label>
              <input
                type="text"
                value={content.hero.title}
                onChange={(e) => {
                  const newContent = { ...content };
                  newContent.hero.title = e.target.value;
                  setContent(newContent);
                }}
                className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-lg font-bold text-white focus:outline-none focus:border-[#0047FF]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Subheadline</label>
              <textarea
                value={content.hero.subtitle}
                onChange={(e) => {
                  const newContent = { ...content };
                  newContent.hero.subtitle = e.target.value;
                  setContent(newContent);
                }}
                className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-[#0047FF] min-h-[80px]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Background Image URL</label>
              <input
                type="text"
                value={content.hero.img}
                onChange={(e) => {
                  const newContent = { ...content };
                  newContent.hero.img = e.target.value;
                  setContent(newContent);
                }}
                className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-400 focus:outline-none focus:border-[#0047FF]"
              />
            </div>
            {content.hero.img && <img src={content.hero.img} alt="" className="w-full h-40 object-cover rounded-lg border border-zinc-800" />}
          </div>
        </section>

        {/* Editor Section: Hero Cards */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-zinc-800 pb-2">Hero Section Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.heroCards.map((item: any, i: number) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col gap-3">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{item.label}</label>
                <input
                  type="text"
                  value={item.img}
                  onChange={(e) => handleTextChange("heroCards", i, "img", e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-[#0047FF]"
                  placeholder="Paste image URL here"
                />
                {item.img && <img src={item.img} alt="" className="h-24 w-full object-cover rounded-lg border border-zinc-800" />}
              </div>
            ))}
          </div>
        </section>

        {/* Editor Section: Process */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-zinc-800 pb-2">Process Steps (Home Page)</h2>
          <div className="grid grid-cols-1 gap-6">
            {content.process.map((item: any, i: number) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleTextChange("process", i, "title", e.target.value)}
                      className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-[#0047FF]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Description</label>
                    <textarea
                      value={item.desc}
                      onChange={(e) => handleTextChange("process", i, "desc", e.target.value)}
                      className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-[#0047FF] min-h-[80px]"
                    />
                  </div>
                </div>
                <div className="w-full md:w-48 space-y-2 shrink-0">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Image URL</label>
                  <input
                    type="text"
                    value={item.img}
                    onChange={(e) => handleTextChange("process", i, "img", e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-400 focus:outline-none focus:border-[#0047FF]"
                  />
                  {item.img && <img src={item.img} alt="" className="w-full h-32 object-cover rounded-lg border border-zinc-800 bg-black" />}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Editor Section: Works / Portfolio */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-zinc-800 pb-2">Portfolio / Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.works.map((item: any, i: number) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Project Title</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleTextChange("works", i, "title", e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0047FF]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Tags</label>
                  <input
                    type="text"
                    value={item.tags}
                    onChange={(e) => handleTextChange("works", i, "tags", e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-400 focus:outline-none focus:border-[#0047FF]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Image URL</label>
                  <input
                    type="text"
                    value={item.img}
                    onChange={(e) => handleTextChange("works", i, "img", e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-400 focus:outline-none focus:border-[#0047FF]"
                  />
                </div>
                {item.img && <img src={item.img} alt="" className="w-full h-40 object-cover rounded-lg border border-zinc-800" />}
              </div>
            ))}
          </div>
        </section>

        {/* Editor Section: Social Links */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-zinc-800 pb-2">Social Media Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.socials.map((item: any, i: number) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col gap-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{item.label}</label>
                <input
                  type="text"
                  value={item.href}
                  onChange={(e) => handleTextChange("socials", i, "href", e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-[#0047FF]"
                />
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
