import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ArrowUpRight, Quote, Sparkles, Target, Users, Zap } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const TEAM = [
  { name: "Alex Chen", role: "Founder & Lead Developer", initials: "AC" },
  { name: "Maya Patel", role: "Design Director", initials: "MP" },
  { name: "Jordan Kim", role: "Senior Engineer", initials: "JK" },
  { name: "Sam Rivera", role: "Project Manager", initials: "SR" },
];

const VALUES = [
  {
    icon: Target,
    title: "Craft over templates",
    desc: "Every project starts from scratch. No themes, no shortcuts — just purpose-built code for your product.",
  },
  {
    icon: Zap,
    title: "Performance as default",
    desc: "Sub-40ms TTFB, lazy loading, and Core Web Vitals that stay green long after launch.",
  },
  {
    icon: Users,
    title: "End-to-end ownership",
    desc: "Design, engineering, deployment — one team, no handoffs, full accountability.",
  },
  {
    icon: Sparkles,
    title: "Transparent by default",
    desc: "Weekly demos, shared roadmaps, honest timelines. No surprises, no radio silence.",
  },
];

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-60px" });
  const storyRef = useRef<HTMLDivElement>(null);
  const storyInView = useInView(storyRef, { once: true, margin: "-40px" });

  return (
    <>

      <main className="flex-1 px-8 md:px-12 pt-12 md:pt-16 pb-20">
        {/* Hero */}
        <div ref={headerRef} className="grid md:grid-cols-2 gap-8 md:gap-16 mb-20 md:mb-28">
          <div>
            <motion.p
              className="text-xs font-medium tracking-[0.2em] uppercase mb-7 flex items-center gap-3"
              style={{ color: "#6b6860" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block w-6 h-px" style={{ background: "#6b6860" }} />
              About us
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
                We build digital
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
                products that last.
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
              <Sparkles size={14} style={{ color: "#c8ff00" }} />
              <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: "#c8ff00", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Since 2020
              </span>
            </div>
            <p className="text-base leading-relaxed" style={{ color: "#6b6860" }}>
              Cloudmint is a small, focused studio of designers and engineers who believe great digital products
              come from craft, not scale. We ship everything from marketing sites to full SaaS platforms — and we
              stand behind every line of code.
            </p>
          </motion.div>
        </div>

        {/* Story */}
        <div ref={storyRef} className="grid md:grid-cols-5 gap-10 md:gap-16 mb-20 md:mb-28">
          <div className="md:col-span-2">
            <motion.div
              className="sticky top-24"
              initial={{ opacity: 0 }}
              animate={storyInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs font-medium tracking-[0.2em] uppercase mb-5 flex items-center gap-3" style={{ color: "#6b6860" }}>
                <span className="inline-block w-6 h-px" style={{ background: "#6b6860" }} />
                Our story
              </p>
              <h2
                className="text-2xl md:text-3xl font-bold leading-tight tracking-tight"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "#f0ece4" }}
              >
                From freelance roots to <span style={{ color: "#c8ff00" }}>studio scale</span>
              </h2>
            </motion.div>
          </div>

          <div className="md:col-span-3 space-y-6">
            {[
              "Cloudmint started in 2020 as a two-person freelance operation. We built websites for local businesses, learned the hard way what breaks at scale, and gradually earned the trust of founders who cared about craft as much as we did.",
              "By 2022, we had shipped over a dozen products — from a Y Combinator startup's analytics dashboard to a Shopify store doing seven figures in monthly revenue. We hired our first engineer, moved out of coffee shops, and started calling ourselves a studio.",
              "Today we're a team of four across design and engineering. We turn down more work than we take because we believe the best results come from saying no to the wrong projects. Every client gets the full attention of the entire team — no account managers, no outsourcing, no bureaucracy.",
              "Our north star hasn't changed: build digital products that are fast, beautiful, and built to last. If that sounds like your kind of team, we'd love to hear from you.",
            ].map((p, i) => (
              <motion.p
                key={i}
                className="text-base leading-relaxed"
                style={{ color: i === 3 ? "#c8ff00" : "#9a9690" }}
                initial={{ opacity: 0, y: 16 }}
                animate={storyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-20 md:mb-28">
          <motion.p
            className="text-xs font-medium tracking-[0.2em] uppercase mb-8 flex items-center gap-3"
            style={{ color: "#6b6860" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block w-6 h-px" style={{ background: "#6b6860" }} />
            What we believe
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-px" style={{ background: "rgba(240,236,228,0.06)", border: "1px solid rgba(240,236,228,0.06)" }}>
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                className="p-7 md:p-9 flex flex-col gap-4"
                style={{ background: "#0a0a09" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(200,255,0,0.08)", border: "1px solid rgba(200,255,0,0.15)" }}
                >
                  <v.icon size={18} style={{ color: "#c8ff00" }} />
                </div>
                <h3
                  className="font-bold leading-tight tracking-tight"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "#f0ece4", fontSize: "1.1rem" }}
                >
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6b6860" }}>
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <motion.p
            className="text-xs font-medium tracking-[0.2em] uppercase mb-8 flex items-center gap-3"
            style={{ color: "#6b6860" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block w-6 h-px" style={{ background: "#6b6860" }} />
            Meet the team
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                className="relative overflow-hidden rounded-2xl p-7"
                style={{ background: "rgba(240,236,228,0.03)", border: "1px solid rgba(240,236,228,0.06)" }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 text-lg font-bold"
                  style={{
                    background: "rgba(200,255,0,0.1)",
                    color: "#c8ff00",
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                  }}
                >
                  {member.initials}
                </div>
                <h4
                  className="font-bold text-base mb-1"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "#f0ece4" }}
                >
                  {member.name}
                </h4>
                <p className="text-sm" style={{ color: "#6b6860" }}>
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <motion.div
          className="relative rounded-2xl overflow-hidden p-10 md:p-14"
          style={{
            background: "linear-gradient(135deg, rgba(200,255,0,0.06) 0%, rgba(200,255,0,0.02) 100%)",
            border: "1px solid rgba(200,255,0,0.1)",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
        >
          <Quote size={32} style={{ color: "rgba(200,255,0,0.2)" }} className="mb-4" />
          <blockquote
            className="text-xl md:text-2xl font-bold leading-snug tracking-tight max-w-2xl"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              color: "#f0ece4",
            }}
          >
            &ldquo;We don&apos;t just build what you ask for — we build what you actually need. Sometimes those are the same thing. Sometimes they&apos;re not.&rdquo;
          </blockquote>
          <div className="mt-5 flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: "#c8ff00", color: "#0a0a09" }}
            >
              AC
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "#c8ff00" }}>Alex Chen</p>
              <p className="text-xs" style={{ color: "#6b6860" }}>Founder, Cloudmint</p>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mt-12 pt-7"
          style={{ borderTop: "1px solid rgba(240,236,228,0.06)" }}
        >
          <p className="text-sm" style={{ color: "#6b6860" }}>
            Ready to build something great together?
          </p>
          <a
            href="/contact"
            className="group flex items-center gap-2 text-sm font-semibold transition-all duration-200"
            style={{ color: "#c8ff00", fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Start a conversation
            <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </main>
    </>
  );
}
