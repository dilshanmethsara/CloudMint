import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ArrowUpRight, Globe, ShoppingCart, Palette, FileText, Wrench, Search, ShieldCheck } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

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
  {
    num: "07",
    icon: ShieldCheck,
    title: "Security & Compliance",
    desc: "SOC 2-aligned infrastructure, penetration testing, and GDPR/CCPA compliance built into every deliverable.",
    tags: ["SOC 2", "GDPR", "Pentesting"],
    featured: true,
  },
  {
    num: "08",
    icon: Search,
    title: "Analytics & CRO",
    desc: "Data-driven conversion rate optimization with custom dashboards, heatmaps, and A/B testing infrastructure.",
    tags: ["Mixpanel", "Hotjar", "VWO"],
    featured: true,
  },
];

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
            <Icon size={16} style={{ color: hovered ? "#c8ff00" : "#6b6860" }} className="transition-colors duration-300" />
          </div>
        </div>

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

        <p className="text-sm leading-relaxed flex-1 transition-colors duration-300" style={{ color: hovered ? "#9a9690" : "#6b6860", fontWeight: 400 }}>
          {desc}
        </p>

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

export default function ServicesPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <>
      {/* Hero */}
      <main className="flex-1 px-8 md:px-12 pt-12 md:pt-16 pb-20">
        {/* Section header */}
        <div ref={headerRef} className="grid md:grid-cols-2 gap-8 md:gap-16 mb-16 md:mb-20">
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
              <motion.h1
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
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
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
              </motion.h1>
            </div>
          </div>

          <motion.div
            className="flex flex-col justify-end gap-6"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.3, ease }}
          >
            <div
              className="inline-flex self-start items-center gap-2.5 px-4 py-2.5 rounded-full"
              style={{ background: "rgba(200,255,0,0.06)", border: "1px solid rgba(200,255,0,0.18)" }}
            >
              <ShieldCheck size={14} style={{ color: "#c8ff00" }} />
              <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: "#c8ff00", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Secure &amp; Scalable
              </span>
            </div>
            <p className="text-base leading-relaxed" style={{ color: "#6b6860" }}>
              Six core disciplines, one accountable team. Every service is delivered with the same standard of craft — whether it&apos;s a homepage or a full e-commerce platform.
            </p>
          </motion.div>
        </div>

        {/* Services grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ background: "rgba(240,236,228,0.06)", border: "1px solid rgba(240,236,228,0.06)" }}
        >
          {SERVICES.map((service, i) => (
            <div key={service.num} className="p-8 md:p-10" style={{ background: "#0a0a09" }}>
              <ServiceCard {...service} index={i} />
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mt-10 pt-7"
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
          {["React", "Next.js", "TypeScript", "Figma", "Supabase", "Vercel", "Cloudflare", "Tailwind"].map((t) => (
            <>
              {[0, 1, 2, 3].map((j) => (
                <span key={`${t}-${j}`} className="inline-flex items-center text-xs tracking-[0.15em] uppercase px-8" style={{ color: "#3a3a38" }}>
                  {t}
                  <span className="ml-8 opacity-40">·</span>
                </span>
              ))}
            </>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
}
