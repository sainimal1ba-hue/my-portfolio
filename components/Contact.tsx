"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { SectionContainer } from "./animations";

interface ContactLink {
  label: string;
  href: string;
  external?: boolean;
}

const contactLinks: ContactLink[] = [
  {
    label: "sainimal1ba@gmail.com",
    href: "mailto:sainimal1ba@gmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/sainimal-g-e-503345387",
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/sainimal1ba-hue",
    external: true,
  },
  {
    label: "www.sainimal.com",
    href: "https://www.sainimal.com",
    external: true,
  },
];

type FormStatus = "idle" | "submitting" | "success" | "error" | "service-unavailable";

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!formData.name.trim()) errs.name = "Name is required.";
    if (!formData.email.trim()) errs.email = "Email is required.";
    else if (!validateEmail(formData.email.trim())) errs.email = "Please enter a valid email.";
    if (!formData.subject.trim()) errs.subject = "Subject is required.";
    if (!formData.message.trim()) errs.message = "Message is required.";
    return errs;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    setStatusMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setStatusMessage("Message sent successfully.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else if (data.serviceUnavailable) {
        setStatus("service-unavailable");
        setStatusMessage("Contact service is not configured yet. Please use the email address below.");
      } else if (data.errors) {
        setErrors(data.errors);
        setStatus("error");
        setStatusMessage("Please fix the errors above.");
      } else {
        setStatus("error");
        setStatusMessage(data.message || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setStatusMessage("Network error. Please try again later.");
    }
  }

  const inputBaseStyle = {
    background: "rgba(237, 240, 242, 0.03)",
    border: "1px solid rgba(237, 240, 242, 0.1)",
    color: "rgba(237, 240, 242, 0.9)",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  };

  return (
    <SectionContainer id="contact" className="min-h-screen flex flex-col justify-center">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          visible: { transition: { staggerChildren: 0.4 } },
        }}
        className="flex flex-col"
      >
        <div className="mb-4">
          <motion.span
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 1.4, ease: "easeOut" } },
            }}
            className="inline-block text-xs tracking-[0.2em] uppercase font-medium"
            style={{ color: "rgba(125, 211, 252, 0.7)" }}
          >
            06 — Contact
          </motion.span>
        </div>

        <motion.h2
          variants={{
            hidden: { opacity: 0, filter: "blur(8px)" },
            visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 1.4, ease: "easeOut" } },
          }}
          className="mb-16 text-4xl md:text-5xl lg:text-7xl font-light tracking-wide"
          style={{ color: "rgba(237, 240, 242, 0.9)" }}
        >
          Let&apos;s Talk
        </motion.h2>

        {/* Two-column layout */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 1.4, ease: "easeOut" } },
          }}
          className="flex flex-col md:flex-row md:gap-16 lg:gap-24"
        >
          {/* Left: Microcopy + links */}
          <div className="md:w-2/5 mb-12 md:mb-0">
            <p
              className="font-serif text-lg leading-relaxed mb-10"
              style={{ color: "rgba(237, 240, 242, 0.65)" }}
            >
              Interested in a project, collaboration, or software
              engineering opportunity?
              <br /><br />
              Send a message.
            </p>

            <div className="space-y-3">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-sm tracking-wide transition-colors duration-500 hover:text-[rgba(237,240,242,0.9)]"
                  style={{ color: "rgba(237, 240, 242, 0.4)" }}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <p
              className="mt-10 text-xs tracking-[0.15em] uppercase"
              style={{ color: "rgba(237, 240, 242, 0.25)" }}
            >
              Tamil Nadu, India
            </p>
          </div>

          {/* Right: Contact form */}
          <div className="md:w-3/5">
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs tracking-[0.12em] uppercase mb-2"
                  style={{ color: "rgba(237, 240, 242, 0.5)" }}
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  className="w-full rounded-md px-4 py-3 text-sm tracking-wide outline-none focus:border-[#7DD3FC] focus:shadow-[0_0_0_1px_rgba(125,211,252,0.3)]"
                  style={inputBaseStyle}
                  maxLength={200}
                  autoComplete="name"
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs" style={{ color: "#f87171" }}>{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs tracking-[0.12em] uppercase mb-2"
                  style={{ color: "rgba(237, 240, 242, 0.5)" }}
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  className="w-full rounded-md px-4 py-3 text-sm tracking-wide outline-none focus:border-[#7DD3FC] focus:shadow-[0_0_0_1px_rgba(125,211,252,0.3)]"
                  style={inputBaseStyle}
                  maxLength={200}
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs" style={{ color: "#f87171" }}>{errors.email}</p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs tracking-[0.12em] uppercase mb-2"
                  style={{ color: "rgba(237, 240, 242, 0.5)" }}
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => {
                    setFormData({ ...formData, subject: e.target.value });
                    if (errors.subject) setErrors({ ...errors, subject: undefined });
                  }}
                  className="w-full rounded-md px-4 py-3 text-sm tracking-wide outline-none focus:border-[#7DD3FC] focus:shadow-[0_0_0_1px_rgba(125,211,252,0.3)]"
                  style={inputBaseStyle}
                  maxLength={500}
                />
                {errors.subject && (
                  <p className="mt-1.5 text-xs" style={{ color: "#f87171" }}>{errors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs tracking-[0.12em] uppercase mb-2"
                  style={{ color: "rgba(237, 240, 242, 0.5)" }}
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: undefined });
                  }}
                  rows={5}
                  className="w-full rounded-md px-4 py-3 text-sm tracking-wide outline-none resize-y min-h-[120px] focus:border-[#7DD3FC] focus:shadow-[0_0_0_1px_rgba(125,211,252,0.3)]"
                  style={inputBaseStyle}
                  maxLength={5000}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs" style={{ color: "#f87171" }}>{errors.message}</p>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="group inline-flex items-center gap-3 rounded-md px-6 py-3 text-sm tracking-[0.12em] uppercase transition-all duration-300 disabled:opacity-50"
                style={{
                  color: "#050505",
                  background: "#7DD3FC",
                }}
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
                {status !== "submitting" && (
                  <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                )}
              </button>

              {/* Status messages */}
              {status === "success" && (
                <p className="text-sm" style={{ color: "#7DD3FC" }}>
                  {statusMessage}
                </p>
              )}
              {status === "error" && (
                <p className="text-sm" style={{ color: "#f87171" }}>
                  {statusMessage}
                </p>
              )}
              {status === "service-unavailable" && (
                <p className="text-sm" style={{ color: "rgba(237, 240, 242, 0.6)" }}>
                  {statusMessage}
                </p>
              )}
            </form>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 1.4, delay: 0.8, ease: "easeOut" } },
          }}
          className="mt-32 border-t pt-8"
          style={{ borderColor: "rgba(237, 240, 242, 0.05)" }}
        >
          <p
            className="text-[10px] tracking-[0.15em]"
            style={{ color: "rgba(237, 240, 242, 0.2)" }}
          >
            © {new Date().getFullYear()} SAINIMAL G E
          </p>
        </motion.footer>
      </motion.div>
    </SectionContainer>
  );
}
