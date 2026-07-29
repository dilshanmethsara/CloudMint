import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { getMessages, ContactMessage, deleteMessage, toggleContacted, bulkMarkContacted, bulkDelete, getContactedCount, getVisitCount, incrementVisit } from "../lib/storage";
import { MessageSquare, Users, TrendingUp, Trash2, ArrowLeft, LogOut, ExternalLink, CheckCheck, Phone, Mail, Clock, ChevronDown, Search, X, CheckSquare, Square, Inbox } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

type Filter = "all" | "unread" | "contacted";

export default function DashboardPage() {
  const nav = useNavigate();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [visits] = useState(getVisitCount);
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [sortAsc, setSortAsc] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("cloudmint_admin")) {
      nav("/admin", { replace: true });
      return;
    }
    incrementVisit();
    setMessages(getMessages());
  }, [nav]);

  const refresh = () => {
    setMessages(getMessages());
    setSelectedIds(new Set());
  };

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

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map(m => m.id)));
    }
  };

  const handleBulkContacted = () => {
    bulkMarkContacted(Array.from(selectedIds), true);
    refresh();
  };

  const handleBulkUncontacted = () => {
    bulkMarkContacted(Array.from(selectedIds), false);
    refresh();
  };

  const handleBulkDelete = () => {
    if (selectedIds.size === 0) return;
    bulkDelete(Array.from(selectedIds));
    if (selected && selectedIds.has(selected.id)) setSelected(null);
    refresh();
  };

  const filtered = useMemo(() => {
    let list = messages;
    if (filter === "contacted") list = list.filter(m => m.contacted);
    else if (filter === "unread") list = list.filter(m => !m.contacted);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.phone?.toLowerCase().includes(q) ||
        m.projectType.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
      );
    }
    return sortAsc ? [...list].reverse() : list;
  }, [messages, filter, search, sortAsc]);

  const contactedCount = useMemo(() => getContactedCount(), [messages]);
  const pendingCount = messages.length - contactedCount;

  const stats = [
    { label: "Total inquiries", value: messages.length, icon: Inbox, color: "#c8ff00", sub: `${pendingCount} unread` },
    { label: "Contacted", value: contactedCount, icon: CheckCheck, color: "#4ade80", sub: `${messages.length ? Math.round(contactedCount / messages.length * 100) : 0}% response rate` },
    { label: "Site visits", value: visits, icon: Users, color: "#f0ece4", sub: "all time" },
    { label: "Conversion", value: messages.length ? Math.round(contactedCount / messages.length * 100) + "%" : "0%", icon: TrendingUp, color: "#a78bfa", sub: `${contactedCount} contacted` },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#0a0a09" }}>
      {/* Header */}
      <header className="px-6 md:px-10 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(240,236,228,0.06)" }}>
        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt="Cloudmint" className="h-7 w-auto rounded-md" />
          <span className="text-sm font-semibold" style={{ color: "#f0ece4", fontFamily: "'Bricolage Grotesque', sans-serif" }}>Admin</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full ml-2" style={{ background: "rgba(200,255,0,0.1)", color: "#c8ff00", border: "1px solid rgba(200,255,0,0.2)" }}>v3</span>
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
            {pendingCount > 0 && (
              <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}>
                {pendingCount} pending
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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

        {/* Search + filters */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          {/* Filter tabs */}
          <div className="flex items-center gap-1">
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
                {f === "unread" && `Pending (${pendingCount})`}
                {f === "contacted" && `Contacted (${contactedCount})`}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-[320px]">
            <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#3a3a38" }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search messages..."
              className="w-full text-xs px-8 py-1.5 rounded-lg transition-all duration-200"
              style={{
                background: "#141412",
                border: "1px solid rgba(240,236,228,0.06)",
                color: "#f0ece4",
              }}
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X size={10} style={{ color: "#3a3a38" }} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Sort toggle */}
            <button
              onClick={() => setSortAsc(!sortAsc)}
              className="text-xs px-2.5 py-1.5 rounded-lg transition-all duration-200"
              style={{ color: sortAsc ? "#f0ece4" : "#3a3a38", border: "1px solid rgba(240,236,228,0.06)", background: sortAsc ? "#1c1c1a" : "transparent" }}
              title={sortAsc ? "Oldest first" : "Newest first"}
            >
              <ChevronDown size={11} className={`transition-transform ${sortAsc ? "rotate-180" : ""}`} />
            </button>

            {/* Select mode toggle */}
            <button
              onClick={() => { setSelectMode(!selectMode); setSelectedIds(new Set()); }}
              className="text-xs px-2.5 py-1.5 rounded-lg transition-all duration-200"
              style={{ color: selectMode ? "#f0ece4" : "#3a3a38", border: "1px solid rgba(240,236,228,0.06)", background: selectMode ? "#1c1c1a" : "transparent" }}
            >
              {selectMode ? <Square size={11} /> : <CheckSquare size={11} />}
            </button>
          </div>
        </div>

        {/* Bulk actions bar */}
        <AnimatePresence>
          {selectMode && selectedIds.size > 0 && (
            <motion.div
              className="flex items-center gap-2 mb-4 p-3 rounded-xl"
              style={{ background: "#1c1c1a", border: "1px solid rgba(200,255,0,0.1)" }}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease }}
            >
              <span className="text-xs font-medium" style={{ color: "#6b6860" }}>{selectedIds.size} selected</span>
              <div className="h-4 w-px" style={{ background: "rgba(240,236,228,0.06)" }} />
              <button onClick={handleBulkContacted} className="text-xs px-2.5 py-1 rounded-lg transition-all duration-200" style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}>
                <CheckCheck size={10} className="inline mr-1" />Mark contacted
              </button>
              <button onClick={handleBulkUncontacted} className="text-xs px-2.5 py-1 rounded-lg transition-all duration-200" style={{ background: "rgba(200,255,0,0.1)", color: "#c8ff00", border: "1px solid rgba(200,255,0,0.2)" }}>
                <Clock size={10} className="inline mr-1" />Mark pending
              </button>
              <button onClick={handleBulkDelete} className="text-xs px-2.5 py-1 rounded-lg transition-all duration-200 hover:bg-red-500/10 hover:text-red-400" style={{ color: "#6b6860", border: "1px solid rgba(240,236,228,0.06)" }}>
                <Trash2 size={10} className="inline mr-1" />Delete
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages */}
        <div className="grid md:grid-cols-[1fr_360px] gap-6">
          {/* List */}
          <div>
            {filtered.length === 0 ? (
              <div className="rounded-2xl p-10 text-center" style={{ background: "#141412", border: "1px solid rgba(240,236,228,0.06)" }}>
                <MessageSquare size={28} style={{ color: "#3a3a38" }} className="mx-auto mb-3" />
                <p className="text-sm" style={{ color: "#6b6860" }}>
                  {search ? "No messages match your search" : `No ${filter !== "all" ? filter : ""} messages`}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {/* Select all checkbox when in select mode */}
                {selectMode && (
                  <button
                    onClick={toggleSelectAll}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs transition-all"
                    style={{ color: "#6b6860", border: "1px solid rgba(240,236,228,0.04)" }}
                  >
                    {selectedIds.size === filtered.length ? <CheckCheck size={12} style={{ color: "#c8ff00" }} /> : <Square size={12} />}
                    {selectedIds.size === filtered.length ? "Deselect all" : `Select all (${filtered.length})`}
                  </button>
                )}

                <AnimatePresence mode="popLayout">
                  {filtered.map((msg, i) => (
                    <motion.button
                      key={msg.id}
                      layout
                      onClick={() => selectMode ? toggleSelect(msg.id) : setSelected(msg)}
                      className="w-full text-left rounded-xl p-4 transition-all duration-200"
                      style={{
                        background: selected?.id === msg.id ? "#1c1c1a" : selectMode && selectedIds.has(msg.id) ? "rgba(200,255,0,0.04)" : "#141412",
                        border: selected?.id === msg.id
                          ? "1px solid rgba(200,255,0,0.2)"
                          : selectMode && selectedIds.has(msg.id)
                            ? "1px solid rgba(200,255,0,0.15)"
                            : "1px solid rgba(240,236,228,0.06)",
                        opacity: msg.contacted && !selectMode ? 0.6 : 1,
                      }}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: msg.contacted && !selectMode ? 0.6 : 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25, ease }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          {selectMode ? (
                            selectedIds.has(msg.id) ? <CheckCheck size={12} style={{ color: "#c8ff00" }} /> : <Square size={12} style={{ color: "#3a3a38" }} />
                          ) : (
                            !msg.contacted && <span className="w-2 h-2 rounded-full" style={{ background: "#c8ff00" }} />
                          )}
                          <span className="text-sm font-medium" style={{ color: msg.contacted && !selectMode ? "#6b6860" : "#f0ece4" }}>{msg.name}</span>
                          {msg.contacted && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80" }}>contacted</span>
                          )}
                        </div>
                        <span className="text-[10px]" style={{ color: "#3a3a38" }}>
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs" style={{ color: "#6b6860" }}>
                        <span className="flex items-center gap-1"><Mail size={10} /><span className="truncate max-w-[140px]">{msg.email}</span></span>
                        {msg.phone && <span className="flex items-center gap-1"><Phone size={10} /><span className="truncate max-w-[100px]">{msg.phone}</span></span>}
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
                      <CheckCheck size={10} />
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
                  <div className="flex items-center justify-between">
                    <span className="font-medium" style={{ color: "#f0ece4" }}>{selected.name}</span>
                    {selected.contacted && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}>
                        contacted
                      </span>
                    )}
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
