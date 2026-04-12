"use client";

import { useState } from "react";
import api from "@/app/api/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import styles from "./Support.module.css";
import { useAuth } from "../hooks/useAuth";

// Optional — only used if the page is inside the dashboard
// If public, user will simply be null

const faqs = [
  {
    q: "How accurate are the admission predictions?",
    a: "Our predictions are based on historical admissions data. However, final admission decisions depend on the university.",
  },
  {
    q: "How do I purchase tokens?",
    a: "Go to the Token Wallet page and select a package. We accept payments via Paystack — cards, bank transfers, and USSD.",
  },
  {
    q: "Can I get a refund?",
    a: "Tokens are non-refundable once purchased. However, if you experience a technical issue, please contact support.",
  },
  {
    q: "How long does past questions access last?",
    a: "Once unlocked with 1 token, you get unlimited access to past questions for 30 days.",
  },
  {
    q: "What happens if my exam time runs out?",
    a: "Your exam is automatically submitted with whatever answers you had at the time. You will still see your results.",
  },
];

// ── Icons ─────────────────────────────────────────────────────────────────

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
    />
  </svg>
);

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
    />
  </svg>
);

const ChevronIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
);

export default function Support() {
  const { user } = useAuth();
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState(user?.email ?? "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSend = async () => {
    if (!subject || !email || !message) {
      return toast.error("Please fill in all fields");
    }
    setLoading(true);

    try {
      await api.post("/message", { subject, email, message });
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setSubject("");
      setMessage("");
      if (!user?.email) setEmail("");
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error?.response?.data?.error ?? "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div>
        <h1 className={styles.heading}>Support & Help</h1>
        <p className={styles.subheading}>
          Get assistance with your account or questions
        </p>
      </div>

      {/* Contact Cards */}
      <div className={styles.contactGrid}>
        <div className={styles.contactCard}>
          <div className={`${styles.contactIconWrap} ${styles.iconBlue}`}>
            <MailIcon />
          </div>
          <p className={styles.contactTitle}>Email Support</p>
          <p className={styles.contactValue}>
            admissioncompass.official@gmail.com
          </p>
          <a
            className={styles.contactBtn}
            href="mailto:admissioncompass.official@gmail.com"
          >
            Send Email
          </a>
        </div>

        <div className={styles.contactCard}>
          <div className={`${styles.contactIconWrap} ${styles.iconGreen}`}>
            <WhatsAppIcon />
          </div>
          <p className={styles.contactTitle}>WhatsApp</p>
          <p className={styles.contactValue}>09064311029</p>
          <a
            className={styles.contactBtn}
            href="https://wa.me/2349064311029"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat Now
          </a>
        </div>

        <div className={styles.contactCard}>
          <div className={`${styles.contactIconWrap} ${styles.iconPurple}`}>
            <PhoneIcon />
          </div>
          <p className={styles.contactTitle}>Phone</p>
          <p className={styles.contactValue}>09064311029 · Mon–Fri, 9am–5pm</p>
          <a className={styles.contactBtn} href="tel:+2349064311029">
            Call Us
          </a>
        </div>
      </div>

      {/* Contact Form */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Send Us a Message</h2>
          <p className={styles.cardDesc}>
            We&apos;ll get back to you within 24 hours
          </p>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.formRow}>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Subject</label>
              <input
                className={styles.input}
                placeholder="What can we help with?"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Your Email</label>
              <input
                className={styles.input}
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!!user?.email}
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Message</label>
            <textarea
              className={styles.textarea}
              placeholder="Describe your issue or question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button
            className={styles.btnPrimary}
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? "Sending…" : "Send Message"}
          </button>
        </div>
      </div>

      {/* FAQ */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Frequently Asked Questions</h2>
          <p className={styles.cardDesc}>Quick answers to common questions</p>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.faqList}>
            {faqs.map((faq, i) => (
              <div key={i} className={styles.faqItem}>
                <button
                  className={styles.faqTrigger}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  <span
                    className={`${styles.faqChevron} ${openFaq === i ? styles.faqChevronOpen : ""}`}
                  >
                    <ChevronIcon />
                  </span>
                </button>
                {openFaq === i && <p className={styles.faqAnswer}>{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
