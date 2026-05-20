export const nav = [
  { label: "Home",             href: "#home" },
  { label: "About",            href: "#about" },
  { label: "Works",            href: "#works" },
  { label: "Career Inquiries", href: "#careers" },
] as const;

export const heroCards = [
  { id: "01", label: "UI UX Design",     img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=200&fit=crop" },
  { id: "02", label: "Web Development",  img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=200&fit=crop" },
  { id: "03", label: "Brand Identity",   img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=200&fit=crop" },
  { id: "04", label: "Growth Ops",       img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=200&fit=crop" },
  { id: "05", label: "Content Strategy", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=200&fit=crop" },
] as const;

export const socials = [
  { label: "Ig", href: "https://instagram.com" },
  { label: "in", href: "https://linkedin.com" },
  { label: "f",  href: "https://facebook.com" },
  { label: "𝕏",  href: "https://x.com" },
] as const;

export const stats = [
  { value: "120+", label: "Projects Delivered" },
  { value: "40+",  label: "Happy Clients" },
  { value: "8yr",  label: "In Business" },
] as const;

export const expertise = [
  {
    label: "BRAND STRATEGY",
    desc: "Positioning, identity, messaging frameworks — the foundation your brand needs to stand apart and stay strong.",
    tags: ["Positioning", "Identity", "Naming"],
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=900&fit=crop",
    accent: "#0047FF",
  },
  {
    label: "DIGITAL MARKETING",
    desc: "Paid, organic, and performance-driven strategies that reach your audience with precision and scale.",
    tags: ["SEO", "Paid Ads", "Analytics"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&fit=crop",
    accent: "#7C3AED",
  },
  {
    label: "CREATIVE DESIGN",
    desc: "Visual systems, UI/UX and print — every touchpoint crafted to feel cohesive, premium, and on-brand.",
    tags: ["UI/UX", "Print", "Motion"],
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=900&fit=crop",
    accent: "#DB2777",
  },
  {
    label: "VIDEO PRODUCTION",
    desc: "From concept to final cut — cinematic brand films, ads, and social content that moves people.",
    tags: ["Brand Films", "Ads", "Social"],
    img: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=900&fit=crop",
    accent: "#D97706",
  },
  {
    label: "CONTENT & SOCIAL",
    desc: "Content that earns attention organically and converts it into loyal brand communities.",
    tags: ["Content", "Community", "Social"],
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=900&fit=crop",
    accent: "#059669",
  },
  {
    label: "PERFORMANCE ADS",
    desc: "Data-driven creative and media buying that turns ad spend into scalable, measurable revenue.",
    tags: ["Meta Ads", "Google", "Creative"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=900&fit=crop",
    accent: "#DC2626",
  },
] as const;

export const works = [
  { id: "01", title: "XYZ 1", tags: "Corporate • Webflow • UX • Speed", img: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=1600&fit=crop" },
  { id: "02", title: "XYZ 1", tags: "Corporate • Webflow • UX • Speed", img: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1600&fit=crop" },
  { id: "03", title: "XYZ 1", tags: "Corporate • Webflow • UX • Speed", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&fit=crop" },
  { id: "04", title: "XYZ 1", tags: "Corporate • Webflow • UX • Speed", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1600&fit=crop" },
] as const;

export const process = [
  { step: "01", title: "Discovery",    desc: "Deep dive into your brand, market, competitors. No assumptions — only insight.",       img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=700&fit=crop" },
  { step: "02", title: "Strategy",     desc: "Positioning, channels, and creative direction defined to drive your specific goals.",   img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=700&fit=crop" },
  { step: "03", title: "Execution",    desc: "Ideas become assets — campaigns, visuals, content, code — crafted to a high standard.", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=700&fit=crop" },
  { step: "04", title: "Launch & Grow",desc: "We ship, monitor, optimise, and report. Every iteration gets sharper.",                img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=700&fit=crop" },
] as const;

export const testimonials = [
  { name: "Julian K.",  role: "CEO, Euphoria",       quote: "Madsphere rebuilt our brand from the ground up. Conversions up 3× in month one.",            img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&fit=crop" },
  { name: "Sarah M.",   role: "CMO, Aether Labs",    quote: "Unparalleled attention to detail. Our brand finally speaks for itself.",                      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&fit=crop" },
  { name: "Marcus T.",  role: "Founder, Lumen",      quote: "Launch week broke every record we had. World-class partners, not vendors.",                   img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&fit=crop" },
  { name: "Elena R.",   role: "Head of Brand, Polaris", quote: "Like watching an A24 film — but it's your website. Compliments every single week.",       img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&fit=crop" },
  { name: "David O.",   role: "CTO, Galileo",        quote: "Flawless engineering married with luxury aesthetics. Performance scores are perfect.",        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&fit=crop" },
  { name: "Chloe W.",   role: "Creative Dir., Europa",quote: "A true creative partner. They pushed back when we were wrong — and every time they were right.", img: "https://images.unsplash.com/photo-1598550874175-4d0ef43ee90d?q=80&w=400&fit=crop" },
] as const;

export const clients = ["Galileo", "Euphoria", "Europa", "GlobalBank", "Ikigai Labs", "Goodwell", "ImgCompress"];
