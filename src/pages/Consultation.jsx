// CalendlyLuxePage.jsx

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, ShieldCheck, Sparkles, Phone, Mail, Clock } from "lucide-react";

let InlineWidget = null;
try {
  // eslint-disable-next-line global-require
  InlineWidget = require("react-calendly").InlineWidget;
} catch { }

const GOLD = "#C1A88B";

function GlowDot({ className = "" }) {
  return (
    <div className={`pointer-events-none absolute blur-3xl opacity-30 ${className}`}>
      <div className="h-64 w-64 rounded-full" style={{ background: GOLD }} />
    </div>
  );
}

export default function CalendlyLuxePage({
  calendlyUrl = "https://calendly.com/sales-elev8-habitat28/30min",
}) {
  const [loaded, setLoaded] = useState(false);

  const src = useMemo(() => {
    if (!calendlyUrl) return "";
    const url = new URL(calendlyUrl);
    url.searchParams.set("hide_event_type_details", "1");
    url.searchParams.set("primary_color", GOLD.replace("#", ""));
    url.searchParams.set("hide_gdpr_banner", "1");
    url.searchParams.set("background_color", "0b0b0b");
    url.searchParams.set("text_color", "ffffff");
    return url.toString();
  }, [calendlyUrl]);

  return (
    <section className="relative isolate bg-black text-white">
      {/* Ambient gold glows */}
      <GlowDot className="left-[8%] top-[-40px]" />
      <GlowDot className="right-[10%] bottom-[-20px]" />

      {/* Top header */}
      <div className="mx-auto max-w-6xl px-5 pt-24 md:pt-32">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center font-heading text-4xl md:text-6xl"
          style={{ color: GOLD }}
        >
          Book a Consultation
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mx-auto mt-4 max-w-2xl text-center text-white/80"
        >
          Choose a time that works for you. We’ll confirm, prep a tailored agenda,
          and keep things seamless.
        </motion.p>
      </div>

      {/* Two-column shell */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-10 md:grid-cols-12 md:py-16">
        {/* Left side */}
        <motion.aside
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-5"
        >
          <div className="rounded-2xl bg-[#0f0f10]/70 p-6 md:p-8 ring-1 ring-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
            <p
              className="font-heading text-sm tracking-[0.2em]"
              style={{ color: GOLD }}
            >
              CONSULT • DESIGN • DELIVER
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl">What to Expect</h2>
            <ul className="mt-5 space-y-4 text-white/85">
              <li className="flex gap-3">
                <CalendarDays className="mt-0.5 shrink-0" color={GOLD} />
                <span>
                  <strong className="text-white">30–45 minutes</strong> on your
                  goals, scope, and timeline.
                </span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 shrink-0" color={GOLD} />
                <span>Clear next steps: Planning, Purchase Proposal, Delivery.</span>
              </li>
              <li className="flex gap-3">
                <ShieldCheck className="mt-0.5 shrink-0" color={GOLD} />
                <span>Private and secure — your details stay with us.</span>
              </li>
              <li className="flex gap-3">
                <Sparkles className="mt-0.5 shrink-0" color={GOLD} />
                <span>Optional: share inspiration links or a brief ahead of time.</span>
              </li>
            </ul>

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <a
                href="tel:+10000000000"
                className="flex items-center justify-center gap-2 rounded-xl bg-white/5 p-3 ring-1 ring-white/10 hover:bg-white/[0.08]"
              >
                <Phone color={GOLD} /> Call
              </a>
              <a
                href="mailto:sales.elev8@habitat28.com"
                className="flex items-center justify-center gap-2 rounded-xl bg-white/5 p-3 ring-1 ring-white/10 hover:bg-white/[0.08]"
              >
                <Mail color={GOLD} /> Email
              </a>
            </div>
          </div>
        </motion.aside>

        {/* Right side: Calendly */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="md:col-span-7"
        >
          <div className="rounded-2xl bg-[#0f0f10]/70 p-2 md:p-3 ring-1 ring-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.55)]">
            <div className="relative overflow-hidden rounded-xl">
              {/* Loading shimmer overlay */}
              {!loaded && (
                <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent" />
              )}

              {/* Single iframe embed with fixed height, cropped bottom */}
              <iframe
                title="Book a Consultation"
                src={src}
                style={{ height: "600px" }}   // tweak 600–640 if needed
                className="block w-full border-0"
                onLoad={() => setLoaded(true)}
              />
            </div>
          </div>

        </motion.div>
      </div>

      {/* Hairline divider + FAQ stays the same */}
      <div className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw]">
        <div
          className="h-px w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-20 pt-10">
        {/* ... FAQ blocks unchanged ... */}
      </div>
    </section>
  );
}
