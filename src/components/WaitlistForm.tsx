"use client";

import { useState, type FormEvent } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/maqrelgq";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, _subject: "PhotoVault Waitlist Signup" }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="waitlist-success">
        <p className="waitlist-success-text">You&apos;re on the list. We&apos;ll notify you when it&apos;s ready.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="waitlist-form">
      <div className="waitlist-input-group">
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="waitlist-input"
          disabled={status === "loading"}
        />
        <button
          type="submit"
          className="waitlist-button"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Joining..." : "Join Waitlist"}
        </button>
      </div>
      {status === "error" && (
        <p className="waitlist-error">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
