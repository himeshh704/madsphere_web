export const nav = [
  { label: "Home",             href: "/" },
  { label: "Services",         href: "/services" },
  { label: "About",            href: "/about" },
  // { label: "Works",            href: "/works" }, // Hidden — uncomment to re-enable
  { label: "Career Inquiries", href: "/careers" },
] as const;

export const heroCards = [
  { id: "01", label: "Brand Strategy",        img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=200&fit=crop" },
  { id: "02", label: "Creative Design",       img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=200&fit=crop" },
  { id: "03", label: "Social Media Marketing",img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=200&fit=crop" },
  { id: "04", label: "Website Design",        img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=200&fit=crop" },
  { id: "05", label: "Digital Marketing",     img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=200&fit=crop" },
] as const;

export const socials = [
  { label: "Ig", href: "https://instagram.com" },
  { label: "in", href: "https://linkedin.com" },
  { label: "f",  href: "https://facebook.com" },
  { label: "𝕏",  href: "https://x.com" },
] as const;

// Stats removed — no fabricated numbers
export const stats: { value: string; label: string }[] = [];

export const expertise = [
  {
    label: "BRAND STRATEGY",
    desc: "The part that comes before the logo. We figure out who you're for, what you stand for, and why anyone should care — so your brand lands the way you intended.",
    tags: ["Positioning", "Messaging", "Identity"],
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=900&fit=crop",
    accent: "#0047FF",
  },
  {
    label: "CREATIVE DESIGN",
    desc: "Visuals that feel as good as they look. From logos and typography to full brand systems, we design with intention. Nothing here came from a template.",
    tags: ["Logo", "Brand Systems", "Art Direction"],
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=900&fit=crop",
    accent: "#DB2777",
  },
  {
    label: "SOCIAL MEDIA MARKETING",
    desc: "Content that actually starts conversations, not just likes. We make visuals and captions that fit your brand, not what the algorithm tells you to post.",
    tags: ["Content", "Instagram", "Strategy"],
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=900&fit=crop",
    accent: "#059669",
  },
  {
    label: "DIGITAL MARKETING",
    desc: "Ads and campaigns that actually make your phone ring or your cart fill up. We manage Meta, Google, and everything in between so you don't burn money on stuff that looks good but does nothing.",
    tags: ["Meta Ads", "Google", "Performance"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&fit=crop",
    accent: "#7C3AED",
  },
  {
    label: "WEBSITE DESIGN",
    desc: "Websites that don't just sit there and look pretty — they actually do something. Whether it's a brand site, a store, or a landing page, we build it to perform.",
    tags: ["Webflow", "Next.js", "E-Commerce"],
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=900&fit=crop",
    accent: "#D97706",
  },
  {
    label: "VIDEO PRODUCTION",
    desc: "Reels, brand films, product videos — anything that moves. We make video content that stops the thumb from scrolling and actually makes people watch.",
    tags: ["Reels", "Brand Films", "Short-Form"],
    img: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=900&fit=crop",
    accent: "#DC2626",
  },
] as const;

export const works = [
  {
    id: "01",
    title: "Astra Co",
    tags: "E-Commerce • Next.js • Design System",
    img: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1600&fit=crop",
    categories: ["Design", "Development"]
  },
  {
    id: "02",
    title: "Hyper",
    tags: "Product Launch • Creative • 3D Design",
    img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&fit=crop",
    categories: ["Design", "Branding"]
  },
  {
    id: "03",
    title: "Yooma Billing",
    tags: "Campaign • Advertising • Print",
    img: "https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=1600&fit=crop",
    categories: ["Branding", "Design"]
  },
  {
    id: "04",
    title: "N Logo",
    tags: "Identity • Logo Design • Guidelines",
    img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1600&fit=crop",
    categories: ["Branding"]
  },
  {
    id: "05",
    title: "style moment",
    tags: "UI/UX • Fashion Editorial • Webflow",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&fit=crop",
    categories: ["Design"]
  },
  {
    id: "06",
    title: "Habitly App",
    tags: "Mobile App • React Native • UI/UX",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1600&fit=crop",
    categories: ["Development", "Design"]
  },
  {
    id: "07",
    title: "Skincare Packaging",
    tags: "Packaging • Art Direction • Identity",
    img: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=1600&fit=crop",
    categories: ["Branding"]
  },
  {
    id: "08",
    title: "Finance Dashboard",
    tags: "Fintech • Web App • Dashboard",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&fit=crop",
    categories: ["Development", "Design"]
  },
  {
    id: "09",
    title: "Social Campaign",
    tags: "Social Media • Marketing • Web",
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1600&fit=crop",
    categories: ["Branding", "Development"]
  }
] as const;

export const process = [
  {
    step: "01",
    title: "Discovery",
    desc: "We figure out who you are, what's going on in your market, and what you're actually trying to achieve. No assumptions. Just listening.",
    img: "/process_step_01.png"
  },
  {
    step: "02",
    title: "Strategy",
    desc: "Now we decide where you're headed. Positioning, messaging, the whole direction — mapped out so there's no guesswork later.",
    img: "/process_step_02.png"
  },
  {
    step: "03",
    title: "Create",
    desc: "This is where it all becomes real. Designs get built, words get written, videos get shot — everything has a reason for being there.",
    img: "/process_step_03.png"
  },
  {
    step: "04",
    title: "Launch & Grow",
    desc: "We put it live, see how it lands, and keep making it better. Good work isn't a one-time thing — it's a cycle.",
    img: "/process_step_04.png"
  },
] as const;

export const testimonials = [
  { name: "Julian K.",  role: "CEO, Euphoria",       quote: "Madsphere rebuilt our brand from the ground up. Conversions up 3× in month one.",            img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&fit=crop" },
  { name: "Sarah M.",   role: "CMO, Aether Labs",    quote: "Unparalleled attention to detail. Our brand finally speaks for itself.",                      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&fit=crop" },
  { name: "Marcus T.",  role: "Founder, Lumen",      quote: "Launch week broke every record we had. World-class partners, not vendors.",                   img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&fit=crop" },
  { name: "Elena R.",   role: "Head of Brand, Polaris", quote: "Like watching an A24 film — but it's your website. Compliments every single week.",       img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&fit=crop" },
  { name: "David O.",   role: "CTO, Galileo",        quote: "Flawless engineering married with luxury aesthetics. Performance scores are perfect.",        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&fit=crop" },
  { name: "Chloe W.",   role: "Creative Dir., Europa",quote: "A true creative partner. They pushed back when we were wrong — and every time they were right.", img: "https://images.unsplash.com/photo-1598550874175-4d0ef43ee90d?q=80&w=400&fit=crop" },
] as const;

// Marquee: industries, not client names
export const clients = ["Fashion", "D2C", "Tech", "Lifestyle", "Startups", "Personal Brands", "Creators"];
