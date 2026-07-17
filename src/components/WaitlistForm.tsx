"use client";

import { useState, type FormEvent } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/maqrelgq";

const ALLOWED_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.in",
  "yahoo.co.uk",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "msn.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
  "protonmail.com",
  "proton.me",
  "zoho.com",
  "yandex.com",
  "mail.com",
  "gmx.com",
  "gmx.net",
  "fastmail.com",
  "tutanota.com",
  "tuta.com",
  "rediffmail.com",
]);

function validateEmail(email: string): string | null {
  const trimmed = email.trim().toLowerCase();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return "Please enter a valid email address.";
  }

  const domain = trimmed.split("@")[1];
  if (!ALLOWED_DOMAINS.has(domain)) {
    return "Please use a personal email (Gmail, Outlook, iCloud, etc.).";
  }

  return null;
}

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const error = validateEmail(email);
    if (error) {
      setValidationError(error);
      return;
    }
    setValidationError(null);

    setStatus("loading");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), _subject: "PhotoVault Waitlist Signup" }),
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
    <form onSubmit={handleSubmit} className="waitlist-form" noValidate>
      <div className="waitlist-input-group">
        <input
          type="email"
          required
          placeholder="you@gmail.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (validationError) setValidationError(null);
          }}
          className={`waitlist-input${validationError ? " waitlist-input-error" : ""}`}
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
      {validationError && (
        <p className="waitlist-error">{validationError}</p>
      )}
      {status === "error" && (
        <p className="waitlist-error">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
