import { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

const ease = [0.22, 1, 0.36, 1] as const;

export default function PrivacyPage() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const sections = [
    {
      title: "Information We Collect",
      content: "We collect information you provide directly to us, such as when you fill out a contact form, subscribe to a newsletter, or communicate with us. This may include your name, email address, phone number, and project details.",
    },
    {
      title: "How We Use Your Information",
      content: "We use the information we collect to respond to your inquiries, provide our services, improve our website, send administrative information, and comply with legal obligations.",
    },
    {
      title: "Data Sharing & Disclosure",
      content: "We do not sell your personal information. We may share data with trusted third-party service providers who assist in operating our website and business, subject to confidentiality agreements.",
    },
    {
      title: "Data Security",
      content: "We implement industry-standard security measures to protect your data against unauthorized access, alteration, disclosure, or destruction.",
    },
    {
      title: "Your Rights",
      content: "You have the right to access, correct, or delete your personal data. You may also withdraw consent at any time. Contact us at privacy@cloudmint.studio to exercise these rights.",
    },
    {
      title: "Cookies",
      content: "We use essential cookies for site functionality and analytics cookies to understand usage patterns. You can control cookie preferences through your browser settings.",
    },
    {
      title: "Changes to This Policy",
      content: "We may update this policy from time to time. Changes will be posted on this page with an updated effective date.",
    },
  ];

  return (
    <>
      <main className="flex-1 px-8 md:px-12 pt-12 md:pt-16 pb-20">
        {/* Hero */}
        <div ref={headerRef} className="max-w-3xl mb-16 md:mb-20">
          <motion.p
            className="text-xs font-medium tracking-[0.2em] uppercase mb-8 flex items-center gap-3"
            style={{ color: "#6b6860" }}
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="inline-block w-6 h-px" style={{ background: "#6b6860" }} />
            Legal
          </motion.p>

          <div className="overflow-hidden mb-6">
            <motion.h1
              className="font-extrabold leading-[0.94] tracking-[-0.04em]"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "#f0ece4" }}
              initial={{ y: "105%" }}
              animate={headerInView ? { y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.28, ease }}
            >
              Privacy Policy
            </motion.h1>
          </div>

          <motion.p
            className="text-base leading-relaxed"
            style={{ color: "#6b6860" }}
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease }}
          >
            Last updated: January 2025
          </motion.p>
        </div>

        {/* Sections */}
        <div className="max-w-3xl">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              className="py-8 md:py-10"
              style={{ borderTop: "1px solid rgba(240,236,228,0.06)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease }}
            >
              <h2
                className="text-xl font-bold mb-4"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "#f0ece4" }}
              >
                {section.title}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "#6b6860" }}>
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Back link */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm font-semibold px-6 py-3.5 rounded-full transition-all duration-200 hover:brightness-95 active:scale-[0.97]"
            style={{ background: "#c8ff00", color: "#0a0a09", fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Back to home
            <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </main>
    </>
  );
}
