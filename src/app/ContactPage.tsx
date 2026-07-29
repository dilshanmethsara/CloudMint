import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useInView } from "motion/react";
import { ArrowUpRight, Mail, MessageSquare, MapPin, Linkedin, Twitter, Github } from "lucide-react";
import { addMessage } from "../lib/storage";

export default function ContactPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const formInView = useInView(formRef, { once: true, margin: "-60px" });
  const infoInView = useInView(infoRef, { once: true, margin: "-60px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.projectType) newErrors.projectType = "Please select a project type";
    if (!formData.budget) newErrors.budget = "Please select a budget range";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 20) newErrors.message = "Message must be at least 20 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addMessage({
      name: formData.name.trim(),
      email: formData.email.trim(),
      projectType: formData.projectType,
      budget: formData.budget,
      message: formData.message.trim(),
    });

    setSubmitted(true);
    setFormData({ name: "", email: "", projectType: "", budget: "", message: "" });
  };

  const ease = [0.22, 1, 0.36, 1] as const;

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "https://twitter.com", color: "#1da1f2" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com", color: "#0077b5" },
    { name: "GitHub", icon: Github, href: "https://github.com", color: "#f0ece4" },
  ];

  if (submitted) {
    return (
      <main className="flex-1 grid md:grid-cols-[1fr_auto] px-8 md:px-12 pt-12 md:pt-16 pb-20 gap-0 relative">
          <div className="flex flex-col justify-center pb-12">
            <div ref={headerRef} className="max-w-2xl">
              <motion.div className="overflow-hidden" initial={{ opacity: 0 }} animate={headerInView ? { opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
                <motion.h1 className="font-extrabold leading-[0.94] tracking-[-0.04em]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 7vw, 5.5rem)", color: "#f0ece4" }} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 0.85, delay: 0.28, ease }}>
                  Message sent!
                </motion.h1>
              </motion.div>
              <motion.p className="text-base md:text-lg leading-relaxed mt-6" style={{ color: "#6b6860" }} initial={{ opacity: 0, y: 16 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5, ease }}>
                Thanks for reaching out. We&apos;ll review your project details and get back to you within 24 hours.
              </motion.p>
              {(() => {
                const BackLink = motion(Link);
                return (
                  <BackLink
                    to="/"
                    className="group inline-flex items-center gap-2 mt-10 px-6 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:brightness-95 active:scale-[0.97]"
                    style={{ background: "#c8ff00", color: "#0a0a09", fontFamily: "'Bricolage Grotesque', sans-serif" }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.7, ease }}
                  >
                    Back to home
                    <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </BackLink>
                );
              })()}
            </div>
          </div>

          <motion.div className="hidden md:flex flex-col justify-end pb-12 pl-16 max-w-xs" style={{ borderLeft: "1px solid rgba(240,236,228,0.08)" }} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.55, ease }}>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: "#6b6860" }}>Other ways to connect</span>
              {socialLinks.map((social) => (
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200" style={{ background: "#1c1c1a", color: "#f0ece4", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300" style={{ background: "rgba(200,255,0,0.1)", border: "1px solid rgba(200,255,0,0.2)" }}>
                    <social.icon size={16} style={{ color: "#c8ff00" }} className="transition-colors duration-300 group-hover:scale-110" />
                  </div>
                  <span className="text-sm font-medium">{social.name}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </main>
    );
  }

  return (
    <>
      {/* Hero / Page Header */}
      <main className="flex-1 grid md:grid-cols-[1fr_auto] px-8 md:px-12 pt-12 md:pt-16 pb-20 gap-0 relative">
        <div className="flex flex-col justify-between pb-12">
          <div ref={headerRef} className="max-w-2xl">
            <motion.p className="text-xs font-medium tracking-[0.2em] uppercase mb-8 flex items-center gap-3" style={{ color: "#6b6860" }} initial={{ opacity: 0 }} animate={headerInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
              <span className="inline-block w-6 h-px" style={{ background: "#6b6860" }} />
              Let&apos;s work together
            </motion.p>

            <div className="overflow-hidden">
              <motion.h1 className="font-extrabold leading-[0.94] tracking-[-0.04em]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 7vw, 5.5rem)", color: "#f0ece4" }} initial={{ y: "105%" }} animate={headerInView ? { y: 0 } : {}} transition={{ duration: 0.85, delay: 0.28, ease }}>
                Start a
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1 className="font-extrabold leading-[0.94] tracking-[-0.04em]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 7vw, 5.5rem)", color: "#c8ff00" }} initial={{ y: "105%" }} animate={headerInView ? { y: 0 } : {}} transition={{ duration: 0.85, delay: 0.38, ease }}>
                conversation
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1 className="font-extrabold leading-[0.94] tracking-[-0.04em]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 7vw, 5.5rem)", color: "#f0ece4" }} initial={{ y: "105%" }} animate={headerInView ? { y: 0 } : {}} transition={{ duration: 0.85, delay: 0.46, ease }}>
                that matters.
              </motion.h1>
            </div>
          </div>

          <motion.div className="flex flex-wrap gap-10 mt-16 pt-8" style={{ borderTop: "1px solid rgba(240,236,228,0.08)" }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}>
            <div>
              <p className="text-4xl font-bold tabular-nums" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "#f0ece4" }}>140+</p>
              <p className="text-xs mt-1 tracking-wide uppercase" style={{ color: "#6b6860" }}>Projects shipped</p>
            </div>
            <div>
              <p className="text-4xl font-bold tabular-nums" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "#f0ece4" }}>99.99%</p>
              <p className="text-xs mt-1 tracking-wide uppercase" style={{ color: "#6b6860" }}>Average uptime</p>
            </div>
            <div>
              <p className="text-4xl font-bold tabular-nums" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "#f0ece4" }}>&lt;38ms</p>
              <p className="text-xs mt-1 tracking-wide uppercase" style={{ color: "#6b6860" }}>Global TTFB</p>
            </div>
          </motion.div>
        </div>

        {/* Contact Form + Info Side Panel */}
        <motion.div className="flex flex-col gap-8 md:gap-12 md:pl-16 max-w-[580px]" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.55, ease }}>
          {/* Contact Info */}
          <div ref={infoRef} className="flex flex-col gap-8">
            <motion.div className="flex flex-col gap-6" initial={{ opacity: 0, y: 16 }} animate={infoInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1, ease }}>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(200,255,0,0.1)", border: "1px solid rgba(200,255,0,0.2)" }}>
                  <Mail size={18} style={{ color: "#c8ff00" }} />
                </div>
                <div>
                  <p className="text-xs font-medium tracking-[0.15em] uppercase" style={{ color: "#6b6860" }}>Email</p>
                  <a href="mailto:hello@cloudmint.io" className="text-base font-medium transition-colors duration-200 hover:text-accent" style={{ color: "#f0ece4", fontFamily: "'Bricolage Grotesque', sans-serif" }}>hello@cloudmint.io</a>
                  <p className="text-xs mt-1" style={{ color: "#6b6860" }}>Typical reply within 4 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(200,255,0,0.1)", border: "1px solid rgba(200,255,0,0.2)" }}>
                  <MessageSquare size={18} style={{ color: "#c8ff00" }} />
                </div>
                <div>
                  <p className="text-xs font-medium tracking-[0.15em] uppercase" style={{ color: "#6b6860" }}>Chat</p>
                  <a href="#" className="text-base font-medium transition-colors duration-200 hover:text-accent" style={{ color: "#f0ece4", fontFamily: "'Bricolage Grotesque', sans-serif" }}>Schedule a call</a>
                  <p className="text-xs mt-1" style={{ color: "#6b6860" }}>30 min discovery session</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(200,255,0,0.1)", border: "1px solid rgba(200,255,0,0.2)" }}>
                  <MapPin size={18} style={{ color: "#c8ff00" }} />
                </div>
                <div>
                  <p className="text-xs font-medium tracking-[0.15em] uppercase" style={{ color: "#6b6860" }}>Location</p>
                  <p className="text-base font-medium" style={{ color: "#f0ece4", fontFamily: "'Bricolage Grotesque', sans-serif" }}>Remote-first, worldwide</p>
                  <p className="text-xs mt-1" style={{ color: "#6b6860" }}>Available across time zones</p>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div className="pt-4" style={{ borderTop: "1px solid rgba(240,236,228,0.08)" }} initial={{ opacity: 0, y: 16 }} animate={infoInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3, ease }}>
              <p className="text-xs font-medium tracking-[0.2em] uppercase mb-4" style={{ color: "#6b6860" }}>Follow our work</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="group w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300" style={{ background: "rgba(240,236,228,0.04)", border: "1px solid rgba(240,236,228,0.08)" }}>
                    <social.icon size={16} style={{ color: "#6b6860" }} className="transition-all duration-300 group-hover:scale-110" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div id="form" ref={formRef} className="relative" style={{ background: "#0a0a09", border: "1px solid rgba(240,236,228,0.06)", borderRadius: "1.5rem", padding: "2rem 2rem 2.5rem" }}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={formInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2, ease }}>
              <p className="text-xs font-medium tracking-[0.2em] uppercase mb-2" style={{ color: "#6b6860" }}>Project details</p>
              <h3 className="font-bold leading-tight mb-8" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#f0ece4", letterSpacing: "-0.025em" }}>
                Tell us about your project
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="text-xs font-medium tracking-wide uppercase mb-2 block" style={{ color: "#6b6860" }}>Full name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-lg text-base transition-all duration-200"
                      style={{
                        background: "#141412",
                        border: errors.name ? "1px solid #ef4444" : "1px solid rgba(240,236,228,0.1)",
                        color: "#f0ece4",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                      placeholder="Jane Doe"
                    />
                    {errors.name && <p className="text-xs mt-1.5" style={{ color: "#ef4444" }}>{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="text-xs font-medium tracking-wide uppercase mb-2 block" style={{ color: "#6b6860" }}>Email address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-lg text-base transition-all duration-200"
                      style={{
                        background: "#141412",
                        border: errors.email ? "1px solid #ef4444" : "1px solid rgba(240,236,228,0.1)",
                        color: "#f0ece4",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                      placeholder="jane@company.com"
                    />
                    {errors.email && <p className="text-xs mt-1.5" style={{ color: "#ef4444" }}>{errors.email}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="projectType" className="text-xs font-medium tracking-wide uppercase mb-2 block" style={{ color: "#6b6860" }}>Project type</label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-lg text-base transition-all duration-200 appearance-none"
                      style={{
                        background: "#141412",
                        border: errors.projectType ? "1px solid #ef4444" : "1px solid rgba(240,236,228,0.1)",
                        color: "#f0ece4",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      <option value="" disabled>Select project type</option>
                      <option value="website">Website Development</option>
                      <option value="ecommerce">E-commerce Development</option>
                      <option value="uiux">UI/UX Design</option>
                      <option value="cms">CMS Development</option>
                      <option value="maintenance">Website Maintenance</option>
                      <option value="seo">SEO</option>
                      <option value="custom">Custom / Other</option>
                    </select>
                    {errors.projectType && <p className="text-xs mt-1.5" style={{ color: "#ef4444" }}>{errors.projectType}</p>}
                  </div>
                  <div>
                    <label htmlFor="budget" className="text-xs font-medium tracking-wide uppercase mb-2 block" style={{ color: "#6b6860" }}>Budget range</label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-lg text-base transition-all duration-200 appearance-none"
                      style={{
                        background: "#141412",
                        border: errors.budget ? "1px solid #ef4444" : "1px solid rgba(240,236,228,0.1)",
                        color: "#f0ece4",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      <option value="" disabled>Select budget range</option>
                      <option value="10-25">$10k - $25k</option>
                      <option value="25-50">$25k - $50k</option>
                      <option value="50-100">$50k - $100k</option>
                      <option value="100-250">$100k - $250k</option>
                      <option value="250+">$250k+</option>
                    </select>
                    {errors.budget && <p className="text-xs mt-1.5" style={{ color: "#ef4444" }}>{errors.budget}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="text-xs font-medium tracking-wide uppercase mb-2 block" style={{ color: "#6b6860" }}>Project details</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3.5 rounded-lg text-base transition-all duration-200 resize-none"
                    style={{
                      background: "#141412",
                      border: errors.message ? "1px solid #ef4444" : "1px solid rgba(240,236,228,0.1)",
                      color: "#f0ece4",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                    placeholder="Tell us about your goals, timeline, tech stack preferences, and anything else relevant..."
                  />
                  {errors.message && <p className="text-xs mt-1.5" style={{ color: "#ef4444" }}>{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="group w-full px-6 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:brightness-95 active:scale-[0.98]"
                  style={{ background: "#c8ff00", color: "#0a0a09", fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  Send message
                  <ArrowUpRight size={16} className="inline-block ml-2 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <p className="text-xs text-center" style={{ color: "#3a3a38" }}>
                  By submitting, you agree to our <a href="#" className="underline hover:text-accent" style={{ color: "#6b6860" }}>Privacy Policy</a>. No spam, ever.
                </p>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Tech marquee */}
      <motion.div className="border-t overflow-hidden py-4" style={{ borderColor: "rgba(240,236,228,0.08)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1 }}>
        <motion.div className="flex gap-0 whitespace-nowrap" animate={{ x: [0, "-50%"] }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}>
          {["React", "Next.js", "TypeScript", "Figma", "Supabase", "Vercel", "Cloudflare", "Tailwind", "React", "Next.js", "TypeScript", "Figma", "Supabase", "Vercel", "Cloudflare", "Tailwind", "React", "Next.js", "TypeScript", "Figma", "Supabase", "Vercel", "Cloudflare", "Tailwind", "React", "Next.js", "TypeScript", "Figma", "Supabase", "Vercel", "Cloudflare", "Tailwind"].map((t, i) => (
            <span key={i} className="inline-flex items-center text-xs tracking-[0.15em] uppercase px-8" style={{ color: "#3a3a38" }}>
              {t}
              <span className="ml-8 opacity-40">·</span>
            </span>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
}


