"use client";

import { useRef, useState, FormEvent } from "react";
import { motion, useInView } from "framer-motion";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FieldState {
  name: string;
  email: string;
  message: string;
  /** Honeypot -- must stay empty */
  website: string;
}

const INITIAL: FieldState = { name: "", email: "", message: "", website: "" };

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [fields, setFields] = useState<FieldState>(INITIAL);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [serverError, setServerError] = useState<string>("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Honeypot gate -- bots fill this, humans leave it blank
    if (fields.website) return;

    setStatus("submitting");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          message: fields.message,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      setFields(INITIAL);
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    }
  }

  return (
    <section
      id="contact"
      className="section-padding bg-surface"
      aria-labelledby="contact-heading"
    >
      <div className="container-content" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl"
        >
          {/* Header */}
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">
            Contact
          </p>
          <h2
            id="contact-heading"
            className="mb-3 text-3xl font-bold text-ink sm:text-4xl"
          >
            Let&apos;s work together
          </h2>
          <p className="mb-10 text-ink-muted leading-relaxed">
            Have a project in mind or just want to say hello? Send a message and
            I&apos;ll get back to you within one business day.
          </p>

          {/* Success state */}
          {status === "success" ? (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
              <p className="text-lg font-semibold text-green-800">
                Message sent.
              </p>
              <p className="mt-2 text-sm text-green-700">
                Thank you for reaching out. I will reply to{" "}
                <strong>{fields.email || "your email"}</strong> shortly.
              </p>
              <button
                className="btn-outline mt-6"
                onClick={() => setStatus("idle")}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-5"
              aria-label="Contact form"
            >
              {/* Honeypot -- visually hidden, never labelled */}
              <div
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}
              >
                <label htmlFor="website">Leave this blank</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={fields.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-ink"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  minLength={2}
                  value={fields.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="form-input"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-ink"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={fields.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="form-input"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-ink"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={10}
                  rows={5}
                  value={fields.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  className="form-input resize-none"
                />
              </div>

              {/* Error */}
              {status === "error" && serverError && (
                <p role="alert" className="text-sm text-red-600">
                  {serverError}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-primary self-start disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
