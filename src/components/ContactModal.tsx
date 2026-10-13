"use client";

import { useState } from "react";
import { X, Send, CheckCircle2 } from "lucide-react";

export default function ContactModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setSent(false);
    setError("");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-card-border bg-background p-6 md:p-8 relative">
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors"
        >
          <X size={18} />
        </button>

        {sent ? (
          <div className="flex flex-col items-center text-center gap-3 py-6">
            <CheckCircle2 size={40} className="text-foreground" />
            <h3 className="font-mono text-lg">Message Sent!</h3>
            <p className="text-sm text-muted">
              Thanks for reaching out — I&apos;ll get back to you soon.
            </p>
            <button
              onClick={handleClose}
              className="mt-4 px-5 py-2.5 rounded-full bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:opacity-80 transition-opacity"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-mono text-xl mb-1">Send a Message</h3>
            <p className="text-sm text-muted mb-6">
              Fill out the form below and I&apos;ll reply as soon as I can.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-card-border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-foreground transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-card-border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-foreground transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-1.5">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-lg border border-card-border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-foreground transition-colors resize-none"
                  placeholder="Write your message..."
                />
              </div>

              {error && <p className="text-xs text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:opacity-80 transition-opacity disabled:opacity-40"
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    <Send size={14} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}