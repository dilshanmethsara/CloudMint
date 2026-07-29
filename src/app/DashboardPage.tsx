import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { getMessages, ContactMessage, deleteMessage, getVisitCount, incrementVisit } from "../lib/storage";
import { MessageSquare, Users, TrendingUp, Trash2, ArrowLeft, LogOut, ExternalLink } from "lucide-react";

export default function DashboardPage() {
  const nav = useNavigate();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [visits] = useState(getVisitCount);
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  useEffect(() => {
    // Check auth
    if (!sessionStorage.getItem("cloudmint_admin")) {
      nav("/admin", { replace: true });
      return;
    }
    incrementVisit();
    setMessages(getMessages());
  }, [nav]);

  const handleLogout = () => {
    sessionStorage.removeItem("cloudmint_admin");
    nav("/admin", { replace: true });
  };

  const handleDelete = (id: string) => {
    deleteMessage(id);
    setMessages(getMessages());
    if (selected?.id === id) setSelected(null);
  };

  // Stats
  const totalMessages = messages.length;
  const thisMonth = messages.filter(m => {
    const d = new Date(m.createdAt);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="min-h-screen" style={{ background: "#0a0a09" }}>
      {/* Header */}
      <header className="px-8 md:px-12 py-5 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(240,236,228,0.06)" }}>
        <div className="flex items-center gap-4">
          <img src="/logo.jpg" alt="Cloudmint" className="h-7 w-auto rounded-md" />
          <span className="text-sm font-semibold" style={{ color: "#f0ece4", fontFamily: "'Bricolage Grotesque', sans-serif" }}>Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs transition-colors duration-150"
            style={{ color: "#6b6860" }}
          >
            View site <ExternalLink size={12} />
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs transition-colors duration-150 hover:text-foreground"
            style={{ color: "#6b6860" }}
          >
            <LogOut size={12} /> Logout
          </button>
        </div>
      </header>

      <div className="px-8 md:px-12 py-8 max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <button
          onClick={() => nav("/")}
          className="flex items-center gap-1.5 text-xs mb-8 transition-colors duration-150"
          style={{ color: "#6b6860" }}
        >
          <ArrowLeft size={12} /> Back to site
        </button>

        <h1 className="text-2xl font-bold mb-8" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "#f0ece4" }}>
          Dashboard
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: "Total inquiries", value: totalMessages, icon: MessageSquare, color: "#c8ff00" },
            { label: "This month", value: thisMonth, icon: TrendingUp, color: "#f0ece4" },
            { label: "Site visits", value: visits, icon: Users, color: "#6b6860" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="rounded-2xl p-5"
              style={{ background: "#141412", border: "1px solid rgba(240,236,228,0.06)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon size={16} style={{ color: stat.color }} />
              </div>
              <p className="text-2xl font-bold mb-1" style={{ color: "#f0ece4", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                {stat.value}
              </p>
              <p className="text-xs" style={{ color: "#6b6860" }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Messages */}
        <div className="grid md:grid-cols-[1fr_360px] gap-8">
          {/* List */}
          <div>
            <h2 className="text-sm font-semibold mb-4" style={{ color: "#f0ece4" }}>
              Messages {messages.length > 0 && <span className="text-xs ml-2" style={{ color: "#6b6860" }}>({messages.length})</span>}
            </h2>

            {messages.length === 0 ? (
              <div className="rounded-2xl p-8 text-center" style={{ background: "#141412", border: "1px solid rgba(240,236,228,0.06)" }}>
                <p className="text-sm" style={{ color: "#6b6860" }}>No messages yet. Contact form submissions will appear here.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {messages.map((msg, i) => (
                  <motion.button
                    key={msg.id}
                    onClick={() => setSelected(msg)}
                    className="w-full text-left rounded-xl p-4 transition-all duration-200"
                    style={{
                      background: selected?.id === msg.id ? "#1c1c1a" : "#141412",
                      border: selected?.id === msg.id ? "1px solid rgba(200,255,0,0.2)" : "1px solid rgba(240,236,228,0.06)",
                    }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium" style={{ color: "#f0ece4" }}>{msg.name}</span>
                      <span className="text-[10px]" style={{ color: "#3a3a38" }}>
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs truncate" style={{ color: "#6b6860" }}>{msg.email}</p>
                    <p className="text-xs mt-1 truncate" style={{ color: "#3a3a38" }}>{msg.projectType} · {msg.budget}</p>
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Detail panel */}
          <div>
            {selected ? (
              <div
                className="rounded-2xl p-6 sticky top-8"
                style={{ background: "#141412", border: "1px solid rgba(240,236,228,0.06)" }}
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-sm font-semibold" style={{ color: "#f0ece4" }}>Details</h3>
                  <button
                    onClick={() => handleDelete(selected.id)}
                    className="flex items-center gap-1 text-xs transition-colors duration-150"
                    style={{ color: "#6b6860" }}
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-medium tracking-wider uppercase mb-1" style={{ color: "#3a3a38" }}>Name</p>
                    <p className="text-sm" style={{ color: "#f0ece4" }}>{selected.name}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium tracking-wider uppercase mb-1" style={{ color: "#3a3a38" }}>Email</p>
                    <p className="text-sm" style={{ color: "#f0ece4" }}>{selected.email}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium tracking-wider uppercase mb-1" style={{ color: "#3a3a38" }}>Project type</p>
                    <p className="text-sm" style={{ color: "#f0ece4" }}>{selected.projectType}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium tracking-wider uppercase mb-1" style={{ color: "#3a3a38" }}>Budget</p>
                    <p className="text-sm" style={{ color: "#f0ece4" }}>{selected.budget}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium tracking-wider uppercase mb-1" style={{ color: "#3a3a38" }}>Message</p>
                    <p className="text-sm leading-relaxed" style={{ color: "#f0ece4" }}>{selected.message}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium tracking-wider uppercase mb-1" style={{ color: "#3a3a38" }}>Received</p>
                    <p className="text-xs" style={{ color: "#6b6860" }}>{new Date(selected.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
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
