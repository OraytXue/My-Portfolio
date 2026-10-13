"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MessageCircle, X, Send } from "lucide-react";
import { profile } from "@/lib/profile";

type Message = {
  role: "user" | "bot";
  content: string;
};

const QUICK_PROMPTS = ["Skills", "Experience", "Projects", "Contact info"];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: `Hi! I'm ${profile.firstName}'s portfolio assistant. Ask me about his background, skills, experience, projects, or how to reach him.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await res.json();
      const reply: string = res.ok
        ? data.reply
        : "Sorry, something went wrong. Please try asking again.";
      setMessages((prev) => [...prev, { role: "bot", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "I couldn't connect just now — please try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="animate-chat-pop w-[88vw] max-w-[360px] h-[70vh] max-h-[520px] flex flex-col rounded-2xl border border-card-border bg-background shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-card-border">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-card-border shrink-0">
                <Image src="/images/Pp.png" alt={profile.name} fill sizes="32px" className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-xs truncate">{profile.name}</p>
                <p className="flex items-center gap-1 text-[10px] text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
                  Portfolio assistant
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="p-1.5 rounded-full text-muted hover:text-foreground transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <div ref={scrollRef} className="chat-scroll flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] whitespace-pre-line text-sm leading-relaxed rounded-2xl px-4 py-2.5 ${
                  m.role === "user"
                    ? "ml-auto bg-foreground text-background rounded-br-sm"
                    : "mr-auto border border-card-border text-foreground/90 rounded-bl-sm"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="mr-auto flex items-center gap-1 rounded-2xl rounded-bl-sm border border-card-border px-4 py-3">
                <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce-dot [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce-dot [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce-dot [animation-delay:300ms]" />
              </div>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto px-4 pb-2">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => sendMessage(prompt)}
                className="shrink-0 font-mono text-[10px] uppercase tracking-widest border border-card-border rounded-full px-3 py-1.5 text-muted hover:text-foreground hover:border-foreground transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex items-center gap-2 border-t border-card-border p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Marc..."
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted min-w-0"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              aria-label="Send message"
              className="p-2 rounded-full bg-foreground text-background disabled:opacity-40 transition-opacity shrink-0"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Chat about Marc"}
        className="w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center shadow-lg hover:opacity-85 transition-opacity"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>
    </div>
  );
}
