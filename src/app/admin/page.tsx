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
        setContent({ ...defaultContent, ...fresh });
      } else {
        setContent(defaultContent);
      }
    } catch (e) {
      setContent(defaultContent);
    }
  };

  useEffect(() => {
    // Check if we have a saved session
    const savedPw = localStorage.getItem("madsphere_admin_pw");
    if (savedPw) {
      setPassword(savedPw);
      handleLogin(savedPw);
    }
  }, []);

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
    if (index === -1) {
      newContent[section][field] = value;
    } else {
      newContent[section][index][field] = value;
    }
    setContent(newContent);
  };

  const handleNestedArrayChange = (section: string, index1: number, nestedField: string, index2: number, field: string, value: string) => {
    const newContent = { ...content };
    newContent[section][index1][nestedField][index2][field] = value;
    setContent(newContent);
  };

  const handleAddItem = (section: string, defaultItem: any) => {
    const newContent = { ...content };
    if (!newContent[section]) newContent[section] = [];
    newContent[section].push(defaultItem);
    setContent(newContent);
  };

  const handleRemoveItem = (section: string, index: number) => {
    const newContent = { ...content };
    newContent[section].splice(index, 1);
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
      <div className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-zinc-800 px-4 md:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-lg md:text-xl font-bold tracking-tight truncate">MadSphere <span className="text-zinc-500 font-normal hidden sm:inline">Content Manager</span></h1>
        <div className="flex items-center gap-2 md:gap-4 ml-auto">
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
          <h2 className="text-2xl font-bold mb-6 border-b border-zinc-800 pb-2">Home Page: Hero Section</h2>
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

        {/* Editor Section: About Page Hero */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-zinc-800 pb-2">About Page: Hero Section</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
            <div>
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Headline</label>
              <input
                type="text"
                value={content.aboutHero.title}
                onChange={(e) => handleTextChange("aboutHero", -1, "title", e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-lg font-bold text-white focus:outline-none focus:border-[#0047FF]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Paragraph 1</label>
              <textarea
                value={content.aboutHero.desc1}
                onChange={(e) => handleTextChange("aboutHero", -1, "desc1", e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-[#0047FF]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Paragraph 2</label>
              <textarea
                value={content.aboutHero.desc2}
                onChange={(e) => handleTextChange("aboutHero", -1, "desc2", e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-[#0047FF]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Paragraph 3</label>
              <textarea
                value={content.aboutHero.desc3}
                onChange={(e) => handleTextChange("aboutHero", -1, "desc3", e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-[#0047FF]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Hero Image URL</label>
              <input
                type="text"
                value={content.aboutHero.img}
                onChange={(e) => handleTextChange("aboutHero", -1, "img", e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-400 focus:outline-none focus:border-[#0047FF]"
              />
            </div>
            {content.aboutHero.img && <img src={content.aboutHero.img} alt="" className="w-full h-40 object-cover rounded-lg border border-zinc-800" />}
          </div>
        </section>

        {/* Editor Section: About Principles */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-zinc-800 pb-2">About Page: Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.aboutPrinciples.map((item: any, i: number) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Title</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleTextChange("aboutPrinciples", i, "title", e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0047FF]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Description</label>
                  <textarea
                    value={item.desc}
                    onChange={(e) => handleTextChange("aboutPrinciples", i, "desc", e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-400 focus:outline-none focus:border-[#0047FF] min-h-[80px]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Image URL</label>
                  <input
                    type="text"
                    value={item.img}
                    onChange={(e) => handleTextChange("aboutPrinciples", i, "img", e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-400 focus:outline-none focus:border-[#0047FF]"
                  />
                </div>
                {item.img && <img src={item.img} alt="" className="w-full h-32 object-cover rounded-lg border border-zinc-800" />}
              </div>
            ))}
          </div>
        </section>

        {/* Editor Section: About Values */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-zinc-800 pb-2">About Page: Vision & Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.aboutValues.map((item: any, i: number) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Label</label>
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => handleTextChange("aboutValues", i, "label", e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0047FF]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Title</label>
                  <input
                    type="text"
                    value={item.title || ""}
                    onChange={(e) => handleTextChange("aboutValues", i, "title", e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0047FF]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Text</label>
                  <textarea
                    value={item.text}
                    onChange={(e) => handleTextChange("aboutValues", i, "text", e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-400 focus:outline-none focus:border-[#0047FF] min-h-[80px]"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Editor Section: Services Hero */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-zinc-800 pb-2">Services Page: Hero</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
            <div>
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Headline</label>
              <input
                type="text"
                value={content.servicesHero.title}
                onChange={(e) => handleTextChange("servicesHero", -1, "title", e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-lg font-bold text-white focus:outline-none focus:border-[#0047FF]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Hero Image URL</label>
              <input
                type="text"
                value={content.servicesHero.img}
                onChange={(e) => handleTextChange("servicesHero", -1, "img", e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-400 focus:outline-none focus:border-[#0047FF]"
              />
            </div>
            {content.servicesHero.img && <img src={content.servicesHero.img} alt="" className="w-full h-40 object-cover rounded-lg border border-zinc-800" />}
          </div>
        </section>

        {/* Editor Section: Expertise (Services List) */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-zinc-800 pb-2">Services Page: Expertise Categories</h2>
          <div className="space-y-8">
            {content.servicesList.map((cat: any, cIdx: number) => (
              <div key={cIdx} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Category Title</label>
                    <input
                      type="text"
                      value={cat.id}
                      onChange={(e) => handleTextChange("servicesList", cIdx, "id", e.target.value)}
                      className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-[#0047FF]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Category Subtext</label>
                    <textarea
                      value={cat.subtext}
                      onChange={(e) => handleTextChange("servicesList", cIdx, "subtext", e.target.value)}
                      className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-400 focus:outline-none focus:border-[#0047FF] min-h-[40px]"
                    />
                  </div>
                </div>

                <div className="pl-4 border-l-2 border-zinc-800 space-y-4 mt-4">
                  <h4 className="text-sm font-bold text-zinc-500 uppercase">Items</h4>
                  {cat.items.map((item: any, iIdx: number) => (
                    <div key={iIdx} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Item Title</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => handleNestedArrayChange("servicesList", cIdx, "items", iIdx, "title", e.target.value)}
                          className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-[#0047FF]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Item Description</label>
                        <textarea
                          value={item.desc}
                          onChange={(e) => handleNestedArrayChange("servicesList", cIdx, "items", iIdx, "desc", e.target.value)}
                          className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-400 focus:outline-none focus:border-[#0047FF] min-h-[80px]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Editor Section: FAQ */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-zinc-800 pb-2">Global: Frequently Asked Questions</h2>
          <div className="space-y-4 mb-6">
            {content.faqs.map((faq: any, i: number) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-zinc-500 uppercase text-xs">FAQ #{i + 1}</span>
                  <button onClick={() => handleRemoveItem("faqs", i)} className="text-red-500 text-sm hover:underline font-medium">Remove</button>
                </div>
                <div className="flex gap-4">
                  <div className="w-24 shrink-0">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">ID</label>
                    <input
                      type="text"
                      value={faq.id}
                      onChange={(e) => handleTextChange("faqs", i, "id", e.target.value)}
                      className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-400 focus:outline-none focus:border-[#0047FF]"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Question</label>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => handleTextChange("faqs", i, "question", e.target.value)}
                      className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white font-bold focus:outline-none focus:border-[#0047FF]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Answer</label>
                  <textarea
                    value={faq.answer}
                    onChange={(e) => handleTextChange("faqs", i, "answer", e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-[#0047FF] min-h-[80px]"
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => handleAddItem("faqs", { id: `Q-${String(content.faqs.length + 1).padStart(2, "0")}`, question: "New Question?", answer: "Answer details..." })}
            className="w-full py-4 border-2 border-dashed border-zinc-800 text-zinc-400 rounded-xl hover:border-zinc-600 hover:text-white transition-colors"
          >
            + Add New FAQ
          </button>
        </section>

        {/* Editor Section: Contact Info */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-zinc-800 pb-2">Global: Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.contactInfo.map((item: any, i: number) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">{item.label}</label>
                  <input
                    type="text"
                    value={item.value}
                    onChange={(e) => handleTextChange("contactInfo", i, "value", e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-[#0047FF]"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Editor Section: FAQ Contact Image */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-zinc-800 pb-2">FAQ Contact Image</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
            <div>
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Image URL</label>
              <input
                type="text"
                value={content.faqContactImg}
                onChange={(e) => {
                  const newContent = { ...content };
                  newContent.faqContactImg = e.target.value;
                  setContent(newContent);
                }}
                className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-400 focus:outline-none focus:border-[#0047FF]"
              />
            </div>
            {content.faqContactImg && <img src={content.faqContactImg} alt="" className="w-full h-40 object-cover rounded-lg border border-zinc-800" />}
          </div>
        </section>

        {/* Editor Section: Connect Links */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-zinc-800 pb-2">Connect Page: Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.connectLinks.map((item: any, i: number) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Label</label>
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => handleTextChange("connectLinks", i, "label", e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-[#0047FF]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">URL (href)</label>
                  <input
                    type="text"
                    value={item.href}
                    onChange={(e) => handleTextChange("connectLinks", i, "href", e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-400 focus:outline-none focus:border-[#0047FF]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Icon Name (Lucide)</label>
                  <input
                    type="text"
                    value={item.icon}
                    onChange={(e) => handleTextChange("connectLinks", i, "icon", e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-400 focus:outline-none focus:border-[#0047FF]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Open in New Tab (External)</label>
                  <input
                    type="checkbox"
                    checked={item.external}
                    onChange={(e) => {
                      const newContent = { ...content };
                      newContent.connectLinks[i].external = e.target.checked;
                      setContent(newContent);
                    }}
                    className="w-4 h-4 cursor-pointer"
                  />
                </div>
              </div>
            ))}
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

        {/* Editor Section: Works / Portfolio Intro */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-zinc-800 pb-2">Works Page: Splash & Intro</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
            <div>
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Title</label>
              <input
                type="text"
                value={content.worksHero.title}
                onChange={(e) => {
                  const newContent = { ...content };
                  newContent.worksHero.title = e.target.value;
                  setContent(newContent);
                }}
                className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-[#0047FF]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Subtitle</label>
              <input
                type="text"
                value={content.worksHero.subtitle}
                onChange={(e) => {
                  const newContent = { ...content };
                  newContent.worksHero.subtitle = e.target.value;
                  setContent(newContent);
                }}
                className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-400 focus:outline-none focus:border-[#0047FF]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Splash Text</label>
              <input
                type="text"
                value={content.worksHero.splashText}
                onChange={(e) => {
                  const newContent = { ...content };
                  newContent.worksHero.splashText = e.target.value;
                  setContent(newContent);
                }}
                className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-400 focus:outline-none focus:border-[#0047FF]"
              />
            </div>
          </div>
        </section>

        {/* Editor Section: Blog / Insights */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-zinc-800 pb-2">Blog / Insights: Intro</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4 mb-6">
            <div>
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Title</label>
              <input
                type="text"
                value={content.blogHero?.title || ""}
                onChange={(e) => {
                  const newContent = { ...content };
                  if (!newContent.blogHero) newContent.blogHero = { title: "", subtitle: "", splashText: "" };
                  newContent.blogHero.title = e.target.value;
                  setContent(newContent);
                }}
                className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-[#0047FF]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Subtitle</label>
              <input
                type="text"
                value={content.blogHero?.subtitle || ""}
                onChange={(e) => {
                  const newContent = { ...content };
                  if (!newContent.blogHero) newContent.blogHero = { title: "", subtitle: "", splashText: "" };
                  newContent.blogHero.subtitle = e.target.value;
                  setContent(newContent);
                }}
                className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-400 focus:outline-none focus:border-[#0047FF]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Splash Text</label>
              <input
                type="text"
                value={content.blogHero?.splashText || ""}
                onChange={(e) => {
                  const newContent = { ...content };
                  if (!newContent.blogHero) newContent.blogHero = { title: "", subtitle: "", splashText: "" };
                  newContent.blogHero.splashText = e.target.value;
                  setContent(newContent);
                }}
                className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-400 focus:outline-none focus:border-[#0047FF]"
              />
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6 border-b border-zinc-800 pb-2">Blog Posts</h2>
          <div className="space-y-6">
            {(content.blogPosts || []).map((post: any, i: number) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-white text-lg">Post {i + 1}</h3>
                  <button onClick={() => handleRemoveItem("blogPosts", i)} className="text-red-500 text-sm hover:underline">Remove</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Title</label>
                    <input type="text" value={post.title} onChange={(e) => handleTextChange("blogPosts", i, "title", e.target.value)} className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-300" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">URL Slug</label>
                    <input type="text" value={post.slug} onChange={(e) => handleTextChange("blogPosts", i, "slug", e.target.value)} className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-300" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Author</label>
                    <input type="text" value={post.author} onChange={(e) => handleTextChange("blogPosts", i, "author", e.target.value)} className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-300" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Date</label>
                    <input type="text" value={post.date} onChange={(e) => handleTextChange("blogPosts", i, "date", e.target.value)} className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-300" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Cover Image URL</label>
                  <input type="text" value={post.coverImg} onChange={(e) => handleTextChange("blogPosts", i, "coverImg", e.target.value)} className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-300 mb-2" />
                  {post.coverImg && <img src={post.coverImg} className="h-24 w-auto rounded border border-zinc-800" />}
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Excerpt</label>
                  <textarea value={post.excerpt} onChange={(e) => handleTextChange("blogPosts", i, "excerpt", e.target.value)} className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-300 h-20" />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Content (HTML)</label>
                  <textarea value={post.content} onChange={(e) => handleTextChange("blogPosts", i, "content", e.target.value)} className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-300 h-64 font-mono" />
                </div>
              </div>
            ))}
            <button
              onClick={() => handleAddItem("blogPosts", { slug: "new-post", title: "New Post", excerpt: "Excerpt...", author: "Author", date: "Jan 1, 2026", coverImg: "", tags: [], content: "<p>Content...</p>" })}
              className="w-full py-4 border-2 border-dashed border-zinc-800 text-zinc-400 rounded-xl hover:border-zinc-600 hover:text-white transition-colors"
            >
              + Add New Blog Post
            </button>
          </div>
        </section>

        {/* Editor Section: Works / Portfolio Projects */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-zinc-800 pb-2">Portfolio Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {content.works.map((item: any, i: number) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-zinc-500 uppercase text-xs">Project #{i + 1}</span>
                  <button onClick={() => handleRemoveItem("works", i)} className="text-red-500 text-sm hover:underline font-medium">Remove</button>
                </div>
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
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Tags (e.g. Design • Development)</label>
                  <input
                    type="text"
                    value={item.tags}
                    onChange={(e) => handleTextChange("works", i, "tags", e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-400 focus:outline-none focus:border-[#0047FF]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Categories (comma-separated, e.g. Design, Development)</label>
                  <input
                    type="text"
                    value={item.categories?.join(", ") || ""}
                    onChange={(e) => {
                      const newContent = { ...content };
                      newContent.works[i].categories = e.target.value.split(",").map((c: string) => c.trim());
                      setContent(newContent);
                    }}
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
          <button
            onClick={() => handleAddItem("works", { id: String(content.works.length + 1).padStart(2, "0"), title: "New Project", tags: "Branding • Design", img: "", categories: ["Design"] })}
            className="w-full py-4 border-2 border-dashed border-zinc-800 text-zinc-400 rounded-xl hover:border-zinc-600 hover:text-white transition-colors"
          >
            + Add New Project
          </button>
        </section>

        {/* Editor Section: Social Media Links */}
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

        {/* Editor Section: Career Enquiry */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-zinc-800 pb-2">Careers Page: Enquiry</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
            <div>
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Text content</label>
              <textarea
                value={content.careerEnquiry.text}
                onChange={(e) => {
                  const newContent = { ...content };
                  newContent.careerEnquiry.text = e.target.value;
                  setContent(newContent);
                }}
                className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-[#0047FF] min-h-[80px]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Image URL 1</label>
                <input
                  type="text"
                  value={content.careerEnquiry.img1}
                  onChange={(e) => {
                    const newContent = { ...content };
                    newContent.careerEnquiry.img1 = e.target.value;
                    setContent(newContent);
                  }}
                  className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-400 focus:outline-none focus:border-[#0047FF] mb-3"
                />
                {content.careerEnquiry.img1 && <img src={content.careerEnquiry.img1} alt="" className="w-20 h-20 rounded-full object-cover border border-zinc-800 mx-auto" />}
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Image URL 2</label>
                <input
                  type="text"
                  value={content.careerEnquiry.img2}
                  onChange={(e) => {
                    const newContent = { ...content };
                    newContent.careerEnquiry.img2 = e.target.value;
                    setContent(newContent);
                  }}
                  className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-400 focus:outline-none focus:border-[#0047FF] mb-3"
                />
                {content.careerEnquiry.img2 && <img src={content.careerEnquiry.img2} alt="" className="w-20 h-20 rounded-full object-cover border border-zinc-800 mx-auto" />}
              </div>
            </div>
          </div>
        </section>

        {/* Editor Section: Expertise (Landing Page) */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-zinc-800 pb-2">Landing Page: Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.expertise.map((item: any, i: number) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Label</label>
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => handleTextChange("expertise", i, "label", e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0047FF]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Description</label>
                  <textarea
                    value={item.desc}
                    onChange={(e) => handleTextChange("expertise", i, "desc", e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-[#0047FF] min-h-[80px]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Image URL</label>
                  <input
                    type="text"
                    value={item.img}
                    onChange={(e) => handleTextChange("expertise", i, "img", e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-400 focus:outline-none focus:border-[#0047FF]"
                  />
                </div>
                {item.img && <img src={item.img} alt="" className="w-full h-32 object-cover rounded-lg border border-zinc-800" />}
              </div>
            ))}
          </div>
        </section>

        {/* Editor Section: Testimonials */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-zinc-800 pb-2">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {content.testimonials.map((item: any, i: number) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-zinc-500 uppercase text-xs">Testimonial #{i + 1}</span>
                  <button onClick={() => handleRemoveItem("testimonials", i)} className="text-red-500 text-sm hover:underline font-medium">Remove</button>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Name</label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleTextChange("testimonials", i, "name", e.target.value)}
                      className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-[#0047FF]"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Role</label>
                    <input
                      type="text"
                      value={item.role}
                      onChange={(e) => handleTextChange("testimonials", i, "role", e.target.value)}
                      className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-400 focus:outline-none focus:border-[#0047FF]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Quote</label>
                  <textarea
                    value={item.quote}
                    onChange={(e) => handleTextChange("testimonials", i, "quote", e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-[#0047FF] min-h-[80px]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Profile Image URL</label>
                  <input
                    type="text"
                    value={item.img}
                    onChange={(e) => handleTextChange("testimonials", i, "img", e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-400 focus:outline-none focus:border-[#0047FF]"
                  />
                </div>
                {item.img && <img src={item.img} alt="" className="w-16 h-16 rounded-full object-cover border border-zinc-800" />}
              </div>
            ))}
          </div>
          <button
            onClick={() => handleAddItem("testimonials", { name: "Client Name", role: "CEO, Company", quote: "Praise message...", img: "" })}
            className="w-full py-4 border-2 border-dashed border-zinc-800 text-zinc-400 rounded-xl hover:border-zinc-600 hover:text-white transition-colors"
          >
            + Add New Testimonial
          </button>
        </section>

        {/* Editor Section: Clients (Marquee) */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-zinc-800 pb-2">Clients Marquee</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
            <div className="flex flex-wrap gap-2">
              {content.clients.map((client: string, i: number) => (
                <div key={i} className="flex items-center gap-2 bg-black border border-zinc-800 rounded-lg px-3 py-1 text-sm text-zinc-300">
                  <input
                    type="text"
                    value={client}
                    onChange={(e) => {
                      const newContent = { ...content };
                      newContent.clients[i] = e.target.value;
                      setContent(newContent);
                    }}
                    className="bg-transparent focus:outline-none focus:text-white"
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-zinc-500 mt-2">These are the words scrolling horizontally at the bottom of the Landing page.</p>
          </div>
        </section>

        {/* Editor Section: Navigation Links */}
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-zinc-800 pb-2">Navigation Links (Header Menu)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {(content.nav || []).map((item: any, i: number) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col gap-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-zinc-500 uppercase text-xs">Link #{i + 1}</span>
                  <button onClick={() => handleRemoveItem("nav", i)} className="text-red-500 text-sm hover:underline font-medium">Remove</button>
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">Label</label>
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => handleTextChange("nav", i, "label", e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-[#0047FF]"
                    placeholder="e.g. Home"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">URL (href)</label>
                  <input
                    type="text"
                    value={item.href}
                    onChange={(e) => handleTextChange("nav", i, "href", e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-[#0047FF]"
                    placeholder="e.g. /"
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => handleAddItem("nav", { label: "New Link", href: "#" })}
            className="w-full py-4 border-2 border-dashed border-zinc-800 text-zinc-400 rounded-xl hover:border-zinc-600 hover:text-white transition-colors"
          >
            + Add New Navigation Link
          </button>
        </section>

      </div>
    </div>
  );
}
