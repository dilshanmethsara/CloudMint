import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { getMessages, ContactMessage, deleteMessage, toggleContacted, getContactedCount, getVisitCount, incrementVisit } from "../lib/storage";
import { MessageSquare, Users, TrendingUp, Trash2, ArrowLeft, LogOut, ExternalLink, CheckCheck, Phone, Mail, Clock, ChevronDown } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

type Filter = "all" | "unread" | "contacted";

export default function DashboardPage() {
  const nav = useNavigate();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [visits] = useState(getVisitCount);
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    if (!sessionStorage.getItem("cloudmint_admin")) {
      nav("/admin", { replace: true });
      return;
    }
    incrementVisit();
    setMessages(getMessages());
  }, [nav]);

  const refresh = () => setMessages(getMessages());

  const handleLogout = () => {
    sessionStorage.removeItem("cloudmint_admin");
    nav("/admin", { replace: true });
  };

  const handleDelete = (id: string) => {
    deleteMessage(id);
    refresh();
    if (selected?.id === id) setSelected(null);
  };

  const handleToggle = (id: string) => {
    toggleContacted(id);
    refresh();
    if (selected?.id === id) {
      setSelected(getMessages().find(m => m.id === id) || null);
    }
  };

  const filtered = messages.filter(m => {
    if (filter === "contacted") return m.contacted;
    if (filter === "unread") return !m.contacted;
    return true;
  });

  const stats = [
    { label: "Total inquiries", value: messages.length, icon: MessageSquare, color: "#c8ff00", sub: `${messages.filter(m => !m.contacted).length} unread` },
    { label: "Contacted", value: getContactedCount(), icon: CheckCheck, color: "#4ade80", sub: `${(messages.length ? Math.round(getContactedCount() / messages.length * 100) : 0)}% response rate` },
    { label: "Site visits", value: visits, icon: Users, color: "#f0ece4", sub: "all time" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#0a0a09" }}>
      {/* Header */}
      <header className="px-6 md:px-10 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(240,236,228,0.06)" }}>
        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt="Cloudmint" className="h-7 w-auto rounded-md" />
          <span className="text-sm font-semibold" style={{ color: "#f0ece4", fontFamily: "'Bricolage Grotesque', sans-serif" }}>Admin</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full ml-2" style={{ background: "rgba(200,255,0,0.1)", color: "#c8ff00", border: "1px solid rgba(200,255,0,0.2)" }}>v2</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all duration-200" style={{ color: "#6b6860", background: "rgba(240,236,228,0.04)", border: "1px solid rgba(240,236,228,0.06)" }}>
            <ExternalLink size={11} /> View site
          </a>
          <button onClick={handleLogout} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all duration-200 hover:bg-red-500/10 hover:text-red-400" style={{ color: "#6b6860", border: "1px solid rgba(240,236,228,0.06)" }}>
            <LogOut size={11} /> Logout
          </button>
        </div>
      </header>

      <div className="px-6 md:px-10 py-6 max-w-6xl mx-auto">
        {/* Breadcrumb + title */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button onClick={() => nav("/")} className="flex items-center gap-1 text-xs transition-colors duration-150 hover:text-foreground" style={{ color: "#3a3a38" }}>
              <ArrowLeft size={12} /> Back to site
            </button>
            <span className="text-xs" style={{ color: "#3a3a38" }}>/</span>
            <h1 className="text-lg font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "#f0ece4" }}>Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            {(messages.length - getContactedCount()) > 0 && (
              <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}>
                {messages.length - getContactedCount()} unread
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="rounded-2xl p-5"
              style={{ background: "#141412", border: "1px solid rgba(240,236,228,0.06)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon size={14} style={{ color: stat.color }} />
              </div>
              <p className="text-2xl font-bold mb-0.5" style={{ color: "#f0ece4", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                {stat.value}
              </p>
              <p className="text-xs" style={{ color: "#6b6860" }}>{stat.label}</p>
              <p className="text-[10px] mt-1" style={{ color: "#3a3a38" }}>{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-1 mb-5">
          {(["all", "unread", "contacted"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => { setFilter(f); setSelected(null); }}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
              style={{
                background: filter === f ? "#1c1c1a" : "transparent",
                color: filter === f ? "#f0ece4" : "#3a3a38",
                border: filter === f ? "1px solid rgba(240,236,228,0.1)" : "1px solid transparent",
              }}
            >
              {f === "all" && `All (${messages.length})`}
              {f === "unread" && `Unread (${messages.filter(m => !m.contacted).length})`}
              {f === "contacted" && `Contacted (${getContactedCount()})`}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="grid md:grid-cols-[1fr_360px] gap-6">
          {/* List */}
          <div>
            {filtered.length === 0 ? (
              <div className="rounded-2xl p-10 text-center" style={{ background: "#141412", border: "1px solid rgba(240,236,228,0.06)" }}>
                <MessageSquare size={28} style={{ color: "#3a3a38" }} className="mx-auto mb-3" />
                <p className="text-sm" style={{ color: "#6b6860" }}>No {filter !== "all" ? filter : ""} messages</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <AnimatePresence mode="popLayout">
                  {filtered.map((msg, i) => (
                    <motion.button
                      key={msg.id}
                      layout
                      onClick={() => setSelected(msg)}
                      className="w-full text-left rounded-xl p-4 transition-all duration-200"
                      style={{
                        background: selected?.id === msg.id ? "#1c1c1a" : "#141412",
                        border: selected?.id === msg.id ? "1px solid rgba(200,255,0,0.2)" : "1px solid rgba(240,236,228,0.06)",
                        opacity: msg.contacted ? 0.6 : 1,
                      }}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: msg.contacted ? 0.6 : 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25, ease }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          {!msg.contacted && <span className="w-2 h-2 rounded-full" style={{ background: "#c8ff00" }} />}
                          <span className="text-sm font-medium" style={{ color: msg.contacted ? "#6b6860" : "#f0ece4" }}>{msg.name}</span>
                        </div>
                        <span className="text-[10px]" style={{ color: "#3a3a38" }}>
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs" style={{ color: "#6b6860" }}>
                        <Mail size={10} />
                        <span className="truncate">{msg.email}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1" style={{ color: "#3a3a38" }}>
                        <span className="text-[10px]">{msg.projectType}</span>
                        <span>·</span>
                        <span className="text-[10px]">{msg.budget}</span>
                      </div>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Detail panel */}
          <div>
            {selected ? (
              <motion.div
                key={selected.id}
                className="rounded-2xl p-6 sticky top-8"
                style={{ background: "#141412", border: "1px solid rgba(240,236,228,0.06)" }}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, ease }}
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-sm font-semibold flex items-center gap-2" style={{ color: "#f0ece4" }}>
                    {selected.contacted ? <CheckCheck size={14} style={{ color: "#4ade80" }} /> : <Clock size={14} style={{ color: "#c8ff00" }} />}
                    {selected.contacted ? "Contacted" : "Pending"}
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggle(selected.id)}
                      className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg transition-all duration-200"
                      style={{
                        background: selected.contacted ? "rgba(74,222,128,0.1)" : "rgba(200,255,0,0.1)",
                        color: selected.contacted ? "#4ade80" : "#c8ff00",
                        border: `1px solid ${selected.contacted ? "rgba(74,222,128,0.2)" : "rgba(200,255,0,0.2)"}`,
                      }}
                    >
                      {selected.contacted ? <CheckCheck size={10} /> : <CheckCheck size={10} />}
                      {selected.contacted ? "Mark pending" : "Mark contacted"}
                    </button>
                    <button
                      onClick={() => handleDelete(selected.id)}
                      className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg transition-all duration-200 hover:bg-red-500/10 hover:text-red-400"
                      style={{ color: "#6b6860", border: "1px solid rgba(240,236,228,0.06)" }}
                    >
                      <Trash2 size={10} /> Delete
                    </button>
                  </div>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-2" style={{ color: "#f0ece4" }}>
                    <span className="font-medium">{selected.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs" style={{ color: "#6b6860" }}>
                    <Mail size={11} /> {selected.email}
                  </div>
                  {selected.phone && (
                    <div className="flex items-center gap-2 text-xs" style={{ color: "#6b6860" }}>
                      <Phone size={11} /> {selected.phone}
                    </div>
                  )}
                  <div className="h-px" style={{ background: "rgba(240,236,228,0.06)" }} />
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[10px] font-medium tracking-wider uppercase mb-1" style={{ color: "#3a3a38" }}>Project type</p>
                      <p className="text-xs" style={{ color: "#f0ece4" }}>{selected.projectType}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-medium tracking-wider uppercase mb-1" style={{ color: "#3a3a38" }}>Budget</p>
                      <p className="text-xs" style={{ color: "#f0ece4" }}>{selected.budget}</p>
                    </div>
                  </div>
                  <div className="h-px" style={{ background: "rgba(240,236,228,0.06)" }} />
                  <div>
                    <p className="text-[10px] font-medium tracking-wider uppercase mb-1.5" style={{ color: "#3a3a38" }}>Message</p>
                    <p className="text-xs leading-relaxed" style={{ color: "#f0ece4" }}>{selected.message}</p>
                  </div>
                  <div className="h-px" style={{ background: "rgba(240,236,228,0.06)" }} />
                  <p className="text-[10px]" style={{ color: "#3a3a38" }}>Received {new Date(selected.createdAt).toLocaleString()}</p>
                </div>
              </motion.div>
            ) : (
              <div
                className="rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[200px]"
                style={{ background: "#141412", border: "1px solid rgba(240,236,228,0.06)" }}
              >
                <MessageSquare size={24} style={{ color: "#3a3a38" }} className="mb-3" />
                <p className="text-xs" style={{ color: "#3a3a38" }}>Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
