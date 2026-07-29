import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";

const ADMIN_PASSWORD = "admin123";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const nav = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("cloudmint_admin", "true");
      nav("/admin/dashboard");
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a0a09" }}>
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-sm px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src="/logo.jpg" alt="Cloudmint" className="h-8 w-auto rounded-md mb-8" />

        <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "#f0ece4" }}>
          Admin access
        </h1>
        <p className="text-sm mb-8" style={{ color: "#6b6860" }}>Enter password to continue.</p>

        <input
          type="password"
          value={password}
          onChange={e => { setPassword(e.target.value); setError(false); }}
          className="w-full px-4 py-3.5 rounded-lg text-base mb-2 transition-all duration-200"
          placeholder="Password"
          style={{
            background: "#141412",
            border: error ? "1px solid #ef4444" : "1px solid rgba(240,236,228,0.1)",
            color: "#f0ece4",
          }}
          autoFocus
        />
        {error && <p className="text-xs mb-4" style={{ color: "#ef4444" }}>Incorrect password</p>}

        <button
          type="submit"
          className="group w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:brightness-95 active:scale-[0.98]"
          style={{ background: "#c8ff00", color: "#0a0a09", fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          Enter dashboard
          <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </motion.form>
    </div>
  );
}
