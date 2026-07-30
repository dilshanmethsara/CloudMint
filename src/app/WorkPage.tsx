import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

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

const FILTERS = ["All", "Gaming", "Top-up"];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease }}
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden rounded-2xl mb-5"
        style={{ background: "rgba(240,236,228,0.04)" }}
      >
        <div
          className="aspect-[16/10] bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: `url(${project.img})`,
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />
        {project.featured && (
          <div
            className="absolute top-4 left-4 px-2.5 py-1 rounded-md text-xs font-semibold"
            style={{
              background: "rgba(200,255,0,0.15)",
              color: "#c8ff00",
              backdropFilter: "blur(6px)",
            }}
          >
            Featured
          </div>
        )}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: hovered
              ? "linear-gradient(180deg, rgba(200,255,0,0.04) 0%, transparent 100%)"
              : "transparent",
            opacity: hovered ? 1 : 0,
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span
            className="text-xs font-semibold tracking-wider uppercase"
            style={{ color: "#6b6860" }}
          >
            {project.label}
          </span>
          <span
            className="text-xs tabular-nums"
            style={{ color: "#4a4a48" }}
          >
            {project.year}
          </span>
        </div>
        <h3
          className="font-bold text-lg leading-tight tracking-tight transition-colors duration-300"
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            color: hovered ? "#f0ece4" : "#c8c4bc",
          }}
        >
          {project.title}
        </h3>
        <p
          className="text-sm leading-relaxed transition-colors duration-300"
          style={{ color: hovered ? "#9a9690" : "#6b6860" }}
        >
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tech.map((t) => (
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
        </div>
        <div
          className="flex items-center gap-1.5 mt-1 transition-all duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(5px)",
          }}
        >
          <span className="text-xs font-medium" style={{ color: "#c8ff00" }}>
            View project
          </span>
          <ArrowUpRight size={12} style={{ color: "#c8ff00" }} />
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkPage() {
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState("All");
  useEffect(() => {
    setMounted(true);
  }, []);

  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-60px" });

  const filtered =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) =>
          p.label.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <>

      {/* Hero */}
      <main className="flex-1 px-8 md:px-12 pt-12 md:pt-16 pb-20">
        <div
          ref={headerRef}
          className="grid md:grid-cols-2 gap-8 md:gap-16 mb-14 md:mb-18"
        >
          <div>
            <motion.p
              className="text-xs font-medium tracking-[0.2em] uppercase mb-7 flex items-center gap-3"
              style={{ color: "#6b6860" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span
                className="inline-block w-6 h-px"
                style={{ background: "#6b6860" }}
              />
              Our work
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
                Selected projects
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
                we&apos;ve shipped.
              </motion.h1>
            </div>
          </div>

          <motion.div
            className="flex flex-col justify-end gap-6"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.3, ease }}
          >
            <p className="text-base leading-relaxed" style={{ color: "#6b6860" }}>
              Five years, thirty-plus projects, and counting. Each one built with
              the same standard of craft — from early-stage MVPs to enterprise
              platforms serving millions.
            </p>
            <div
              className="flex items-center gap-6"
              style={{ color: "#4a4a48" }}
            >
              <div>
                <span
                  className="text-xl font-bold"
                  style={{
                    color: "#c8ff00",
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                  }}
                >
                  30+
                </span>
                <span className="text-xs ml-1.5">projects</span>
              </div>
              <div>
                <span
                  className="text-xl font-bold"
                  style={{
                    color: "#c8ff00",
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                  }}
                >
                  12
                </span>
                <span className="text-xs ml-1.5">industries</span>
              </div>
              <div>
                <span
                  className="text-xl font-bold"
                  style={{
                    color: "#c8ff00",
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                  }}
                >
                  99%
                </span>
                <span className="text-xs ml-1.5">client sat.</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35, ease }}
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="text-xs font-medium px-4 py-2 rounded-full transition-all duration-200"
              style={{
                background:
                  filter === f
                    ? "rgba(200,255,0,0.12)"
                    : "rgba(240,236,228,0.04)",
                color: filter === f ? "#c8ff00" : "#6b6860",
                border: "1px solid",
                borderColor:
                  filter === f
                    ? "rgba(200,255,0,0.25)"
                    : "rgba(240,236,228,0.06)",
              }}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-16">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </main>
    </>
  );
}
