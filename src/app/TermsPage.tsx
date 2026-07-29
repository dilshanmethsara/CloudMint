import { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

const ease = [0.22, 1, 0.36, 1] as const;

export default function TermsPage() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const sections = [
    {
      title: "Acceptance of Terms",
      content: "By accessing or using Cloudmint's website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.",
    },
    {
      title: "Services",
      content: "Cloudmint provides web development, design, and consulting services. The specific scope, deliverables, and timelines will be defined in a separate agreement for each project.",
    },
    {
      title: "Intellectual Property",
      content: "Upon full payment, clients receive ownership of the final deliverables. Cloudmint retains the right to display completed work in our portfolio unless otherwise agreed in writing.",
    },
    {
      title: "Client Responsibilities",
      content: "Clients agree to provide timely feedback, necessary assets, and access to required platforms. Delays caused by the client may affect project timelines and costs.",
    },
    {
      title: "Payments & Billing",
      content: "Payment terms are outlined in each project agreement. Invoices not paid within the agreed period may result in a pause of work and late fees.",
    },
    {
      title: "Limitation of Liability",
      content: "Cloudmint shall not be liable for indirect, incidental, or consequential damages arising from the use of our services, to the maximum extent permitted by law.",
    },
    {
      title: "Termination",
      content: "Either party may terminate a project agreement with written notice. Client shall pay for all work completed up to the termination date.",
    },
    {
      title: "Governing Law",
      content: "These terms are governed by the laws of the State of California. Any disputes shall be resolved in the courts of San Francisco County.",
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
              Terms of Service
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
