import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <motion.header
      className="flex items-center justify-between px-8 md:px-12 py-7 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.05 }}
    >
      <Link to="/" className="flex items-center gap-2">
        <img src="/logo.jpg" alt="Logo" className="h-7 w-auto rounded-md" />
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-9">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className="text-sm transition-colors duration-150 hover:text-foreground"
            style={{
              color: isActive(item.href) ? "#c8ff00" : "#6b6860",
              letterSpacing: "0.01em",
              fontWeight: isActive(item.href) ? 600 : 400,
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <Link
        to="/contact"
        className="hidden md:flex group items-center gap-1.5 text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-200"
        style={{
          background: "#c8ff00",
          color: "#0a0a09",
          fontFamily: "'Bricolage Grotesque', sans-serif",
        }}
      >
        Let&apos;s talk
        <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>

      {/* Hamburger — mobile */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden flex flex-col gap-1.5 p-2"
        aria-label="Open menu"
        style={{ color: "#f0ece4" }}
      >
        <span className="block w-5 h-px bg-current" />
        <span className="block w-5 h-px bg-current" />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col"
            style={{ background: "#0a0a09" }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-8 md:px-12 py-7">
              <Link to="/" className="flex items-center gap-2">
                <img src="/logo.jpg" alt="Logo" className="h-7 w-auto rounded-md" />
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="p-2"
                aria-label="Close menu"
                style={{ color: "#f0ece4" }}
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col items-center justify-center gap-10 pb-20">
              {NAV_ITEMS.map((item, i) => {
                const MobileLink = motion(Link);
                return (
                  <MobileLink
                    key={item.label}
                    to={item.href}
                    className="text-3xl font-bold tracking-tight"
                    style={{
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                      color: isActive(item.href) ? "#c8ff00" : "#f0ece4",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => { setOpen(false); }}
                  >
                    {item.label}
                  </MobileLink>
                );
              })}
              {(() => {
                const MobileTalkLink = motion(Link);
                return (
                  <MobileTalkLink
                    to="/contact"
                    className="group flex items-center gap-2 text-base font-semibold mt-6 px-7 py-3.5 rounded-full transition-all duration-200"
                    style={{
                      background: "#c8ff00",
                      color: "#0a0a09",
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.33, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => setOpen(false)}
                  >
                    Let&apos;s talk
                    <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </MobileTalkLink>
                );
              })()}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
