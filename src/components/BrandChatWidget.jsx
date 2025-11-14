import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Sparkles } from "lucide-react";

/**
 * Elev8ChatWidget.jsx
 * ---------------------------------------------------------
 * Production-ready AI chat widget for Elev8 Kitchens.
 *
 * ✔ Floating launcher button (bottom-right)
 * ✔ Modal chat window with streaming responses
 * ✔ Local session storage (simple persistence)
 * ✔ Clean Tailwind UI (no external CSS required)
 * ✔ Lightweight (no UI framework lock-in)
 *
 * Backend expectation:
 * - POST `${endpoint}` with { messages: [{role, content}], brand: "elev8" }
 * - Stream back assistant text (text/event-stream or chunked)
 */

// ----------------------------------------------
// 1) Elev8 Brand Tokens
// ----------------------------------------------
const ELEV8_THEME = {
  name: "Elev8 Kitchens",
  logoText: "ELEV8",
  primary: "#0f0f10",
  primaryAlt: "#151517",
  brand: "#d4af37", // gold accent
  subtle: "#bdbdbd",
  ring: "rgba(212,175,55,.35)",
  gradient:
    "linear-gradient(135deg, rgba(212,175,55,.12), rgba(212,175,55,.02) 60%)",
  greeting:
    "Hi! I'm your Elev8 Kitchen Configurator. Ask me about layouts, modules, finishes, pricing and installation timelines.",
};

// ----------------------------------------------
// 2) Utilities
// ----------------------------------------------
const cn = (...c) => c.filter(Boolean).join(" ");
const uid = () => Math.random().toString(36).slice(2);

const useLocalSession = (key, initial) => {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch { }
  }, [key, state]);
  return [state, setState];
};

// ----------------------------------------------
// 3) Core Chat Widget
// ----------------------------------------------
export default function Elev8ChatWidget({
  endpoint = "/api/chat",
  storageKey = "ai_widget_session_elev8",
  openByDefault = false,
  welcome = true,
}) {
  const theme = ELEV8_THEME;
  const [open, setOpen] = useState(openByDefault);
  const [messages, setMessages] = useLocalSession(storageKey, []);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-welcome
  useEffect(() => {
    if (!welcome) return;
    if (messages.length === 0) {
      setMessages([
        {
          id: uid(),
          role: "assistant",
          content: theme.greeting,
          ts: Date.now(),
        },
      ]);
    }
  }, []); // eslint-disable-line

  // Auto-scroll on new messages
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { id: uid(), role: "user", content: text, ts: Date.now() };
    const asstMsg = { id: uid(), role: "assistant", content: "", ts: Date.now() };
    setMessages((m) => [...m, userMsg, asstMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(({ role, content }) => ({ role, content })),
          brand: "elev8",
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      while (reader) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split(/\n/).filter(Boolean);
        for (const ln of lines) {
          const data = ln.startsWith("data:") ? ln.slice(5).trim() : ln;
          if (data === "[DONE]") continue;
          setMessages((prev) =>
            prev.map((m) => (m.id === asstMsg.id ? { ...m, content: (m.content || "") + data } : m))
          );
        }
      }
    } catch (err) {
      setMessages((prev) =>
        prev.map((m) =>
          m.role === "assistant" && m.content === ""
            ? { ...m, content: "Sorry—I'm having trouble reaching the AI service right now." }
            : m
        )
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed z-[1000]" style={{ right: 20, bottom: 20 }}>
      {/* Launcher Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            onClick={() => setOpen(true)}
            className="group rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2"
            style={{
              background: theme.primaryAlt,
              border: `1px solid ${theme.ring}`,
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <MessageCircle className="w-5 h-5" />
            {/* <span className="font-medium tracking-wide" style={{ color: theme.subtle }}>
              Chat with {theme.name}
            </span> */}
          </motion.button>
          
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed inset-0 flex items-end sm:items-center justify-center"
            style={{ background: "rgba(0,0,0,.35)" }}
          >
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.98 }}
              className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto rounded-2xl overflow-hidden border"
              style={{ borderColor: theme.ring, background: theme.primary }}
            >
              {/* Header */}
              <div
                className="px-4 py-3 border-b flex items-center justify-between"
                style={{ borderColor: theme.ring, background: theme.gradient }}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" style={{ color: theme.brand }} />
                  <div className="leading-tight">
                    <div className="text-sm" style={{ color: theme.subtle }}>
                      {theme.logoText}
                    </div>
                    <div className="font-semibold">AI Configurator</div>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-xl hover:opacity-80"
                  aria-label="Close chat"
                  style={{ border: `1px solid ${theme.ring}` }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="px-4 py-4 space-y-3 h-[60vh] sm:h-[58vh] overflow-y-auto"
                style={{ background: theme.primary }}
              >
                {messages.map((m) => (
                  <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                    <div
                      className="max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow"
                      style={{
                        background: m.role === "user" ? theme.primaryAlt : "#0c0c0d",
                        border: `1px solid ${theme.ring}`,
                        color: "#fff",
                      }}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex items-center gap-2 text-xs opacity-80">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Thinking…
                  </div>
                )}
              </div>

              {/* Composer */}
              <div className="p-3 border-t" style={{ borderColor: theme.ring }}>
                <div className="flex items-center gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    className="flex-1 bg-transparent outline-none rounded-xl px-3 py-2 text-sm"
                    placeholder="Type your message…"
                    style={{ border: `1px solid ${theme.ring}`, color: "#fff" }}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={loading}
                    className="px-3 py-2 rounded-xl inline-flex items-center gap-2 disabled:opacity-50"
                    style={{ background: theme.primaryAlt, border: `1px solid ${theme.ring}`, color: "#fff" }}
                  >
                    <Send className="w-4 h-4" />
                    Send
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ----------------------------------------------
// 4) Example usage
// ----------------------------------------------
/*
import Elev8ChatWidget from "./Elev8ChatWidget.jsx";

export default function App() {
  return <Elev8ChatWidget endpoint="/api/chat" />;
}
*/

// ----------------------------------------------
// 5) Minimal Node/Express streaming backend (example)
// ----------------------------------------------
/*
import express from "express";
import fetch from "node-fetch"; // or global fetch in Node 18+

const app = express();
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { messages = [] } = req.body || {};

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
  });

  function stream(text) {
    res.write(`data: ${text}\n\n`);
  }

  const demo = `Thanks for contacting Elev8 Kitchens! Ask me anything about our modular designs.`;
  for (const ch of demo) {
    await new Promise((r) => setTimeout(r, 15));
    stream(ch);
  }
  stream("\n\n— This is a demo stream. Wire your LLM here. —");
  res.write("data: [DONE]\n\n");
  res.end();
});

app.listen(3000, () => console.log("API listening on :3000"));
*/