import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ArrowUpRight, Globe, ShoppingCart, Palette, FileText, Wrench, Search, ShieldCheck } from "lucide-react";

const TECH = ["React", "Next.js", "TypeScript", "Figma", "Supabase", "Vercel", "Cloudflare", "Tailwind"];
const ease = [0.22, 1, 0.36, 1] as const;

const VALUES = [
  {
    num: "01",
    title: "Craft over templates",
    desc: "Every project starts from a blank canvas. No themes, no drag-and-drop shortcuts — just purpose-built design and code written specifically for your product.",
    detail: "Figma → production-ready code",
  },
  {
    num: "02",
    title: "Performance as a default",
    desc: "We optimize at every layer: edge delivery, sub-40ms TTFB, lazy loading, and Core Web Vitals that stay green long after launch.",
    detail: "Lighthouse 100 across the board",
  },
  {
    num: "03",
    title: "End-to-end ownership",
    desc: "Design, engineering, and deployment handled by one team. No handoffs, no translation loss, no \"that's not my department.\"",
    detail: "One team, full accountability",
  },
  {
    num: "04",
    title: "Transparent by default",
    desc: "Weekly demos, shared roadmaps, and honest timelines. You always know exactly where things stand — no surprises, no radio silence.",
    detail: "Async + live updates every week",
  },
];

function useCounter(target: number, duration = 1800, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    const steps = 40;
    const inc = target / steps;
    let current = 0;
    const id = setInterval(() => {
      current = Math.min(current + inc, target);
      setVal(Math.round(current));
      if (current >= target) clearInterval(id);
    }, duration / steps);
    return () => clearInterval(id);
  }, [start, target, duration]);
  return val;
}

const PROJECTS = [
  {
    id: "hasa",
    label: "Gaming · Top-up Platform",
    title: "Hasa Gold Store",
    desc: "A premium game top-up platform supporting multiple titles — Mobile Legends, PUBG, Free Fire, Genshin Impact, and more. Instant delivery, auto-reconciliation, and a seamless mobile-first checkout experience.",
    tech: ["Next.js", "Xendit", "Firebase", "Midtrans"],
    url: "https://hasagoldstore.com",
    img: "/hasa-gold-store.png",
    featured: true,
    year: "2025",
  },
];

const SERVICES = [
  {
    num: "01",
    icon: Globe,
    title: "Website Development",
    desc: "Custom-built, performant websites engineered for speed, SEO, and conversion — no templates, no compromises.",
    tags: ["Next.js", "React", "Edge CDN"],
    featured: false,
  },
  {
    num: "02",
    icon: ShoppingCart,
    title: "E-commerce Development",
    desc: "Headless storefronts and full-stack shops that load fast, convert well, and scale without friction.",
    tags: ["Shopify", "Stripe", "Headless"],
    featured: false,
  },
  {
    num: "03",
    icon: Palette,
    title: "UI/UX Design",
    desc: "Interfaces designed with intent and validated with data — from wireframes to polished, production-ready Figma.",
    tags: ["Figma", "Design Systems", "Prototyping"],
    featured: false,
  },
  {
    num: "04",
    icon: FileText,
    title: "CMS Development",
    desc: "Editable, structured content systems your team can actually use — no developer required for day-to-day updates.",
    tags: ["Sanity", "Contentful", "Custom CMS"],
    featured: false,
  },
  {
    num: "05",
    icon: Wrench,
    title: "Website Maintenance",
    desc: "Ongoing monitoring, updates, and performance care so your site stays secure, fast, and reliable long after launch.",
    tags: ["Uptime Monitoring", "Security Patches", "SLA"],
    featured: false,
  },
  {
    num: "06",
    icon: Search,
    title: "SEO",
    desc: "Technical and content SEO that compounds — from Core Web Vitals to structured data and crawlability audits.",
    tags: ["Core Web Vitals", "Schema", "Audits"],
    featured: false,
  },
];

function ProjectCard({
  label, title, desc, tech, url, img, featured, year, index,
}: (typeof PROJECTS)[0] & { index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease }}
      className="relative overflow-hidden group cursor-pointer"
      style={{
        background: "#111110",
        border: "1px solid rgba(240,236,228,0.07)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: featured ? "16/7" : "4/3" }}
      >
        {/* Background color while image loads */}
        <div className="absolute inset-0" style={{ background: "#1a1a18" }} />

        <motion.img
          src={img}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Persistent bottom gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(10,10,9,0.92) 0%, rgba(10,10,9,0.3) 45%, transparent 70%)",
          }}
        />

        {/* Hover overlay darken */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "rgba(10,10,9,0.35)" }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Top-right: year badge + arrow */}
        <div className="absolute top-5 right-5 flex items-center gap-2.5">
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(10,10,9,0.7)",
              color: "#6b6860",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(240,236,228,0.08)",
            }}
          >
            {year}
          </span>
          <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              background: "#c8ff00",
              backdropFilter: "blur(8px)",
            }}
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.7 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ArrowUpRight size={15} color="#0a0a09" />
          </motion.a>
        </div>

        {/* Top-left: featured badge */}
        {featured && (
          <div
            className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide"
            style={{
              background: "rgba(200,255,0,0.12)",
              color: "#c8ff00",
              border: "1px solid rgba(200,255,0,0.2)",
              backdropFilter: "blur(8px)",
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#c8ff00" }} />
            Featured project
          </div>
        )}

        {/* Bottom info — always visible base, more detail on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <p
            className="text-xs font-medium tracking-widest uppercase mb-2"
            style={{ color: "#6b6860" }}
          >
            {label}
          </p>
          <h3
            className="font-extrabold leading-tight tracking-tight"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: featured ? "clamp(1.6rem, 3.5vw, 2.4rem)" : "clamp(1.2rem, 2.5vw, 1.5rem)",
              color: "#f0ece4",
              letterSpacing: "-0.025em",
            }}
          >
            {title}
          </h3>

          {/* Hover-reveal: desc + tech */}
          <motion.div
            animate={{
              opacity: hovered ? 1 : 0,
              y: hovered ? 0 : 12,
            }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-sm leading-relaxed mt-3 mb-4"
              style={{ color: "#9a9690", maxWidth: featured ? "52ch" : "36ch" }}
            >
              {desc}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2.5 py-1 rounded-md"
                  style={{
                    background: "rgba(200,255,0,0.08)",
                    color: "#c8ff00",
                    border: "1px solid rgba(200,255,0,0.15)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar — always visible on non-featured */}
      {!featured && (
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderTop: "1px solid rgba(240,236,228,0.06)" }}
        >
          <div className="flex flex-wrap gap-1.5">
            {tech.slice(0, 2).map((t) => (
              <span
                key={t}
                className="text-xs px-2.5 py-1 rounded-md"
                style={{
                  background: "rgba(240,236,228,0.04)",
                  color: "#4a4a48",
                  border: "1px solid rgba(240,236,228,0.06)",
                }}
              >
                {t}
              </span>
            ))}
            {tech.length > 2 && (
              <span
                className="text-xs px-2.5 py-1 rounded-md"
                style={{
                  background: "rgba(240,236,228,0.04)",
                  color: "#4a4a48",
                  border: "1px solid rgba(240,236,228,0.06)",
                }}
              >
                +{tech.length - 2}
              </span>
            )}
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium transition-colors duration-200 hover:text-accent"
            style={{ color: "#6b6860", fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Visit site
            <ArrowUpRight size={12} />
          </a>
        </div>
      )}
    </motion.div>
  );
}

function PortfolioSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-60px" });
  const featured = PROJECTS[0];
  const rest = PROJECTS.slice(1);

  return (
    <section
      className="px-8 md:px-12 pt-24 md:pt-32 pb-24"
      style={{ borderTop: "1px solid rgba(240,236,228,0.08)" }}
    >
      {/* Header */}
      <div ref={headerRef} className="grid md:grid-cols-2 gap-8 md:gap-16 mb-14 md:mb-16">
        <div>
          <motion.p
            className="text-xs font-medium tracking-[0.2em] uppercase mb-7 flex items-center gap-3"
            style={{ color: "#6b6860" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block w-6 h-px" style={{ background: "#6b6860" }} />
            Featured work
          </motion.p>

          <div className="overflow-hidden">
            <motion.h2
              className="font-extrabold leading-[1.0] tracking-[-0.035em]"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
                color: "#f0ece4",
              }}
              initial={{ y: "110%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.1, ease }}
            >
              Products we&apos;re
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              className="font-extrabold leading-[1.0] tracking-[-0.035em]"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
                color: "#c8ff00",
              }}
              initial={{ y: "110%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.18, ease }}
            >
              proud to ship.
            </motion.h2>
          </div>
        </div>

        <motion.div
          className="flex flex-col justify-end gap-5"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.3, ease }}
        >
          <p className="text-base leading-relaxed" style={{ color: "#6b6860" }}>
            A selection of recent client work — from SaaS platforms to e-commerce storefronts and interactive brand experiences. Hover to explore each project.
          </p>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["#c8ff00", "#6b8fa8", "#a78bfa"].map((c, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full"
                  style={{ background: c, border: "2px solid #0a0a09" }}
                />
              ))}
            </div>
            <span className="text-sm" style={{ color: "#6b6860" }}>
              {PROJECTS.length} featured project · Powering thousands of gamers
            </span>
          </div>
        </motion.div>
      </div>

      {/* Featured project */}
      <div className="mb-4">
        <ProjectCard {...featured} index={0} />
      </div>

      {/* 2×2 grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {rest.map((p, i) => (
          <ProjectCard key={p.id} {...p} index={i + 1} />
        ))}
      </div>

      {/* CTA */}
      <div
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 pt-8"
        style={{ borderTop: "1px solid rgba(240,236,228,0.08)" }}
      >
        <p className="text-sm" style={{ color: "#6b6860" }}>
          These are five of 140+ projects. Each one has a full case study available on request.
        </p>
        <a
          href="/work"
          className="group flex items-center gap-2 text-sm font-semibold transition-all duration-200"
          style={{ color: "#c8ff00", fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          View all work
          <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </section>
  );
}

function ServiceCard({
  num,
  icon: Icon,
  title,
  desc,
  tags,
  index,
}: (typeof SERVICES)[0] & { index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease }}
      className="relative flex flex-col h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent line */}
      <div className="h-px w-full mb-7 overflow-hidden" style={{ background: "rgba(240,236,228,0.08)" }}>
        <motion.div
          className="h-full"
          style={{ background: "#c8ff00" }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="flex flex-col flex-1 gap-5">
        {/* Number + icon row */}
        <div className="flex items-center justify-between">
          <span
            className="text-xs font-semibold tabular-nums tracking-widest transition-colors duration-300"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              color: hovered ? "#c8ff00" : "#3a3a38",
            }}
          >
            {num}
          </span>
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
            style={{
              background: hovered ? "rgba(200,255,0,0.1)" : "rgba(240,236,228,0.04)",
              border: "1px solid",
              borderColor: hovered ? "rgba(200,255,0,0.25)" : "rgba(240,236,228,0.08)",
            }}
          >
            <Icon
              size={16}
              style={{ color: hovered ? "#c8ff00" : "#6b6860" }}
              className="transition-colors duration-300"
            />
          </div>
        </div>

        {/* Title */}
        <h3
          className="font-bold leading-tight tracking-tight transition-colors duration-300"
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
            color: hovered ? "#f0ece4" : "#c8c4bc",
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-relaxed flex-1 transition-colors duration-300"
          style={{ color: hovered ? "#9a9690" : "#6b6860", fontWeight: 400 }}
        >
          {desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-md transition-all duration-300"
              style={{
                background: hovered ? "rgba(200,255,0,0.07)" : "rgba(240,236,228,0.04)",
                color: hovered ? "#c8ff00" : "#4a4a48",
                border: "1px solid",
                borderColor: hovered ? "rgba(200,255,0,0.15)" : "rgba(240,236,228,0.06)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Learn more link */}
        <div
          className="flex items-center gap-1.5 mt-1 transition-all duration-300"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(5px)" }}
        >
          <span className="text-xs font-medium" style={{ color: "#c8ff00" }}>Learn more</span>
          <ArrowUpRight size={12} style={{ color: "#c8ff00" }} />
        </div>
      </div>
    </motion.div>
  );
}

function ServicesSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section
      className="px-8 md:px-12 pt-24 md:pt-32 pb-24"
      style={{ borderTop: "1px solid rgba(240,236,228,0.08)" }}
    >
      {/* Section header */}
      <div ref={headerRef} className="grid md:grid-cols-2 gap-8 md:gap-16 mb-16 md:mb-20">

        {/* Left */}
        <div>
          <motion.p
            className="text-xs font-medium tracking-[0.2em] uppercase mb-7 flex items-center gap-3"
            style={{ color: "#6b6860" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block w-6 h-px" style={{ background: "#6b6860" }} />
            Our services
          </motion.p>

          <div className="overflow-hidden">
            <motion.h2
              className="font-extrabold leading-[1.0] tracking-[-0.035em]"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
                color: "#f0ece4",
              }}
              initial={{ y: "110%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.1, ease }}
            >
              Everything you need
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              className="font-extrabold leading-[1.0] tracking-[-0.035em]"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
                color: "#c8ff00",
              }}
              initial={{ y: "110%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.18, ease }}
            >
              to build and grow.
            </motion.h2>
          </div>
        </div>

        {/* Right */}
        <motion.div
          className="flex flex-col justify-end gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.3, ease }}
        >
          {/* Secure & Scalable badge */}
          <div className="inline-flex self-start items-center gap-2.5 px-4 py-2.5 rounded-full"
            style={{
              background: "rgba(200,255,0,0.06)",
              border: "1px solid rgba(200,255,0,0.18)",
            }}
          >
            <ShieldCheck size={14} style={{ color: "#c8ff00" }} />
            <span
              className="text-xs font-semibold tracking-wide uppercase"
              style={{ color: "#c8ff00", fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Secure &amp; Scalable
            </span>
          </div>

          <p className="text-base leading-relaxed" style={{ color: "#6b6860" }}>
            Six core disciplines, one accountable team. Every service is delivered with the same standard of craft — whether it&apos;s a homepage or a full e-commerce platform.
          </p>
        </motion.div>
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
        style={{ background: "rgba(240,236,228,0.06)", border: "1px solid rgba(240,236,228,0.06)" }}
      >
        {SERVICES.map((service, i) => (
          <div
            key={service.num}
            className="p-8 md:p-10"
            style={{ background: "#0a0a09" }}
          >
            <ServiceCard {...service} index={i} />
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mt-0 pt-7"
        style={{ borderTop: "1px solid rgba(240,236,228,0.06)" }}
      >
        <p className="text-sm" style={{ color: "#6b6860" }}>
          Need something custom? We scope and build bespoke solutions too.
        </p>
        <a
          href="/contact"
          className="group flex items-center gap-2 text-sm font-semibold transition-all duration-200"
          style={{ color: "#c8ff00", fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          Discuss your project
          <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </section>
  );
}

function ValueRow({
  num,
  title,
  desc,
  detail,
  index,
}: {
  num: string;
  title: string;
  desc: string;
  detail: string;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease }}
    >
      <div
        className="relative grid md:grid-cols-[80px_1fr_auto] gap-6 md:gap-12 items-start py-8 md:py-10 cursor-default group"
        style={{ borderTop: "1px solid rgba(240,236,228,0.08)" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Hover background fill */}
        <div
          className="absolute inset-0 -mx-8 md:-mx-12 pointer-events-none transition-opacity duration-300"
          style={{
            background: "rgba(200,255,0,0.03)",
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Number */}
        <div className="relative flex items-start pt-1">
          <span
            className="font-bold text-sm tabular-nums transition-colors duration-300"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              color: hovered ? "#c8ff00" : "#3a3a38",
              letterSpacing: "0.04em",
            }}
          >
            {num}
          </span>
        </div>

        {/* Title + desc */}
        <div className="flex flex-col gap-3">
          <h3
            className="font-bold leading-tight transition-colors duration-300"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: "clamp(1.25rem, 2.5vw, 1.65rem)",
              color: hovered ? "#f0ece4" : "#c8c4bc",
              letterSpacing: "-0.025em",
            }}
          >
            {title}
          </h3>
          <p
            className="text-sm md:text-base leading-relaxed max-w-xl transition-colors duration-300"
            style={{ color: hovered ? "#9a9690" : "#6b6860", fontWeight: 400 }}
          >
            {desc}
          </p>

          {/* Detail tag */}
          <div
            className="inline-flex self-start items-center gap-2 mt-1 transition-all duration-300"
            style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(4px)" }}
          >
            <span
              className="text-xs font-medium tracking-wide"
              style={{ color: "#c8ff00" }}
            >
              — {detail}
            </span>
          </div>
        </div>

        {/* Arrow */}
        <div className="hidden md:flex items-start pt-1.5">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: hovered ? "#c8ff00" : "rgba(240,236,228,0.05)",
              border: "1px solid",
              borderColor: hovered ? "#c8ff00" : "rgba(240,236,228,0.1)",
            }}
          >
            <ArrowUpRight
              size={15}
              style={{ color: hovered ? "#0a0a09" : "#6b6860" }}
              className="transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function WhyUs() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section className="px-8 md:px-12 pt-24 md:pt-32 pb-20">
      {/* Section header */}
      <div
        ref={headerRef}
        className="grid md:grid-cols-2 gap-8 md:gap-16 pb-16"
        style={{ borderBottom: "1px solid rgba(240,236,228,0.08)" }}
      >
        {/* Left: label + big statement */}
        <div>
          <motion.p
            className="text-xs font-medium tracking-[0.2em] uppercase mb-7 flex items-center gap-3"
            style={{ color: "#6b6860" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block w-6 h-px" style={{ background: "#6b6860" }} />
            Why cloudmint
          </motion.p>

          <div className="overflow-hidden">
            <motion.h2
              className="font-extrabold leading-[1.0] tracking-[-0.035em]"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                color: "#f0ece4",
              }}
              initial={{ y: "110%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.1, ease }}
            >
              Built different.
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              className="font-extrabold leading-[1.0] tracking-[-0.035em]"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                color: "#c8ff00",
              }}
              initial={{ y: "110%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.18, ease }}
            >
              Delivered with care.
            </motion.h2>
          </div>
        </div>

        {/* Right: supporting copy + small proof */}
        <motion.div
          className="flex flex-col justify-end gap-8"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.3, ease }}
        >
          <p className="text-base md:text-lg leading-relaxed" style={{ color: "#6b6860" }}>
            Most agencies ship fast and leave. We embed ourselves in your product, sweat every detail, and stay accountable long after launch. Here is what that looks like in practice.
          </p>

          {/* Inline proof chips */}
          <div className="flex flex-wrap gap-2.5">
            {["140+ products shipped", "5-star client retention", "No locked-in retainers"].map((chip) => (
              <span
                key={chip}
                className="text-xs font-medium px-3.5 py-2 rounded-full"
                style={{
                  background: "rgba(240,236,228,0.05)",
                  color: "#9a9690",
                  border: "1px solid rgba(240,236,228,0.08)",
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Value rows */}
      <div>
        {VALUES.map((v, i) => (
          <ValueRow key={v.num} {...v} index={i} />
        ))}

        {/* Closing row — CTA */}
        <div
          className="py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{ borderTop: "1px solid rgba(240,236,228,0.08)" }}
        >
          <p
            className="text-base"
            style={{ color: "#6b6860", maxWidth: "36rem" }}
          >
            Ready to build something worth building? We take on a limited number of projects each quarter to keep quality high.
          </p>
          <a
            href="/contact"
            className="group flex items-center gap-2.5 px-6 py-3.5 rounded-full font-semibold text-sm shrink-0 transition-all duration-200 hover:brightness-95 active:scale-[0.97]"
            style={{
              background: "#c8ff00",
              color: "#0a0a09",
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}
          >
            Start a project
            <ArrowUpRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const projects = useCounter(140, 1600, mounted);
  const uptime = useCounter(9999, 1400, mounted);
  const ttfb = useCounter(38, 1200, mounted);

  return (
    <>
      {/* Hero */}
      <main className="flex-1 grid md:grid-cols-[1fr_auto] px-8 md:px-12 pt-12 md:pt-16 pb-0 gap-0 relative">
        <div className="flex flex-col justify-between pb-12">
          <div>
            <motion.p
              className="text-xs font-medium tracking-[0.2em] uppercase mb-8 flex items-center gap-3"
              style={{ color: "#6b6860" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="inline-block w-6 h-px" style={{ background: "#6b6860" }} />
              Web development studio — est. 2019
            </motion.p>

            <div className="overflow-hidden">
              <motion.h1
                className="font-extrabold leading-[0.94] tracking-[-0.04em]"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 9vw, 8rem)", color: "#f0ece4" }}
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.28, ease }}
              >
                We make
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                className="font-extrabold leading-[0.94] tracking-[-0.04em]"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 9vw, 8rem)", color: "#c8ff00" }}
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.38, ease }}
              >
                websites
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                className="font-extrabold leading-[0.94] tracking-[-0.04em]"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 9vw, 8rem)", color: "#f0ece4" }}
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.46, ease }}
              >
                that matter.
              </motion.h1>
            </div>
          </div>

          <motion.div
            className="flex flex-wrap gap-10 mt-16 pt-8"
            style={{ borderTop: "1px solid rgba(240,236,228,0.08)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {[
              { val: `${projects}+`, label: "Projects shipped" },
              { val: `${(uptime / 100).toFixed(2)}%`, label: "Average uptime" },
              { val: `<${ttfb}ms`, label: "Global TTFB" },
            ].map(({ val, label }) => (
              <div key={label}>
                <p className="text-4xl font-bold tabular-nums" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "#f0ece4" }}>
                  {val}
                </p>
                <p className="text-xs mt-1 tracking-wide uppercase" style={{ color: "#6b6860" }}>{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="flex flex-col justify-end pb-0 md:pb-12 md:pl-16 md:max-w-xs md:border-l"
          style={{ borderColor: "rgba(240,236,228,0.08)" }}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease }}
        >
          <p className="text-base leading-relaxed mb-10 mt-10 md:mt-0" style={{ color: "#6b6860", fontWeight: 400 }}>
            From brand-new startups to scaling teams — we design and engineer digital products that perform flawlessly and feel genuinely considered.
          </p>

          <div className="flex flex-col gap-3">
            <a
              href="/contact"
              className="group flex items-center justify-between px-5 py-4 rounded-xl font-semibold text-sm transition-all duration-200 hover:brightness-95 active:scale-[0.98]"
              style={{ background: "#c8ff00", color: "#0a0a09", fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Start a project
              <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="/work"
              className="group flex items-center justify-between px-5 py-4 rounded-xl font-medium text-sm transition-all duration-200"
              style={{ background: "#1c1c1a", color: "#f0ece4", fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              View our work
              <ArrowUpRight size={16} className="text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="flex items-center gap-2.5 mt-8 pt-8" style={{ borderTop: "1px solid rgba(240,236,228,0.08)" }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#c8ff00" }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#c8ff00" }} />
            </span>
            <span className="text-xs" style={{ color: "#6b6860" }}>
              Available for new projects — Q3 2025
            </span>
          </div>
        </motion.div>
      </main>

      {/* Tech marquee */}
      <motion.div
        className="border-t overflow-hidden py-4"
        style={{ borderColor: "rgba(240,236,228,0.08)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <motion.div
          className="flex gap-0 whitespace-nowrap"
          animate={{ x: [0, "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {[...TECH, ...TECH, ...TECH, ...TECH].map((t, i) => (
            <span key={i} className="inline-flex items-center text-xs tracking-[0.15em] uppercase px-8" style={{ color: "#3a3a38" }}>
              {t}
              <span className="ml-8 opacity-40">·</span>
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Why Us */}
      <WhyUs />

      {/* Services */}
      <ServicesSection />

      {/* Portfolio */}
      <PortfolioSection />
    </>
  );
}
