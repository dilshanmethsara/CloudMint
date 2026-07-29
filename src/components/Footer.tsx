import { Link } from "react-router";
import { ArrowUpRight, Linkedin, Twitter, Github, Mail } from "lucide-react";

const NAV_ITEMS = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL_LINKS = [
  { icon: Linkedin, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Github, href: "#" },
  { icon: Mail, href: "mailto:hello@cloudmint.studio" },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#0a0a09", borderTop: "1px solid rgba(200,255,0,0.06)" }}
    >
      {/* Subtle glow top edge */}
      <div
        className="absolute top-0 left-1/4 right-1/4 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(200,255,0,0.3), transparent)",
        }}
      />

      <div className="px-8 md:px-12 pt-16 md:pt-20 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-14 md:mb-18">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-5">
              <img src="/logo.jpg" alt="Cloudmint" className="h-7 w-auto rounded-md" />
            </Link>
            <p className="text-sm leading-relaxed max-w-[260px]" style={{ color: "#6b6860" }}>
              Web development studio crafting performant, considered digital products for startups and scaling teams.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: "rgba(200,255,0,0.06)", border: "1px solid rgba(200,255,0,0.1)" }}
                >
                  <s.icon size={14} style={{ color: "#c8ff00" }} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase mb-5" style={{ color: "#3a3a38" }}>
              Navigation
            </h4>
            <ul className="flex flex-col gap-3.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-sm transition-colors duration-150 hover:text-foreground"
                    style={{ color: "#6b6860", fontWeight: 500 }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase mb-5" style={{ color: "#3a3a38" }}>
              Services
            </h4>
            <ul className="flex flex-col gap-3.5">
              {["Web Design", "Development", "UI/UX", "Consulting"].map((s) => (
                <li key={s}>
                  <span className="text-sm" style={{ color: "#6b6860", fontWeight: 500 }}>
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase mb-5" style={{ color: "#3a3a38" }}>
              Start a project
            </h4>
            <Link
              to="/contact#form"
              className="group inline-flex items-center gap-2 text-base font-semibold px-6 py-3.5 rounded-full transition-all duration-200 hover:brightness-95 active:scale-[0.97]"
              style={{
                background: "#c8ff00",
                color: "#0a0a09",
                fontFamily: "'Bricolage Grotesque', sans-serif",
              }}
            >
              Let&apos;s talk
              <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <p className="text-xs mt-4" style={{ color: "#3a3a38" }}>
              Reply within 24 hours
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-8"
          style={{ borderTop: "1px solid rgba(240,236,228,0.06)" }}
        >
          <p className="text-xs" style={{ color: "#3a3a38" }}>
            &copy; {new Date().getFullYear()} Cloudmint. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="text-xs transition-colors duration-150 hover:text-foreground"
              style={{ color: "#3a3a38" }}
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-xs transition-colors duration-150 hover:text-foreground"
              style={{ color: "#3a3a38" }}
            >
              Terms
            </Link>
            <a
              href="#"
              className="text-xs transition-colors duration-150 hover:text-foreground"
              style={{ color: "#3a3a38" }}
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
