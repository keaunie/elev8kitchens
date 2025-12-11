// Payment.jsx - simplified for Stripe-focused messaging
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, ShieldCheck, BadgeDollarSign } from "lucide-react";

export default function Payment({
  title = "Secure Payment Options",
  subtitle = "Pay securely with Stripe - in full or with a deposit.",
  options = defaultOptions,
}) {
  const [showSpecialistModal, setShowSpecialistModal] = useState(false);

  return (
    <section className="relative isolate mx-auto max-w-7xl px-6 py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-10 top-0 h-56 w-56 rounded-full bg-[#C1A88B]/10 blur-3xl animate-pulse" />
        <div className="absolute right-24 bottom-10 h-72 w-72 rounded-full bg-[#C1A88B]/10 blur-3xl animate-pulse" />
      </div>

      <h2 className="text-center text-3xl font-light text-white md:text-5xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-white/80">{subtitle}</p>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 },
          },
        }}
        className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {options.map((opt, i) => (
          <BurnCard
            key={i}
            {...opt}
            onSpecialistClick={() => setShowSpecialistModal(true)}
          />
        ))}
      </motion.div>

      <AnimatePresence>
        {showSpecialistModal && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a] p-6 ring-1 ring-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[#C1A88B]/80">Connect with us</p>
                  <h3 className="mt-1 text-xl font-semibold text-white">Talk to a Specialist</h3>
                </div>
                <button
                  onClick={() => setShowSpecialistModal(false)}
                  className="rounded-full bg-white/10 px-3 py-1 text-lg text-white hover:bg-white/15"
                  aria-label="Close"
                >
                  x
                </button>
              </div>

              <div className="mt-4 space-y-4 text-sm text-white/85">
                <p>
                  Reach us any way you prefer and we'll guide you through sizes, finishes, delivery, and installation.
                </p>
                <div className="space-y-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <a
                    href="tel:+19056930028"
                    className="flex items-center justify-between rounded-xl bg-black/40 px-4 py-3 ring-1 ring-white/10 hover:ring-[#C1A88B]/50"
                  >
                    <span className="text-white">Call</span>
                    <span className="font-semibold text-[#C1A88B]">+1 (905) 693-0028</span>
                  </a>
                  <a
                    href="mailto:sales.elev8@habitat28.com"
                    className="flex items-center justify-between rounded-xl bg-black/40 px-4 py-3 ring-1 ring-white/10 hover:ring-[#C1A88B]/50"
                  >
                    <span className="text-white">Email</span>
                    <span className="font-semibold text-[#C1A88B]">sales.elev8@habitat28.com</span>
                  </a>
                  <a
                    href="https://wa.me/19056930028?text=Hi%2C%20I%27d%20like%20to%20talk%20to%20a%20specialist%20about%20ELEV8%20Kitchens."
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-xl bg-black/40 px-4 py-3 ring-1 ring-white/10 hover:ring-[#C1A88B]/50"
                  >
                    <span className="text-white">WhatsApp</span>
                    <span className="font-semibold text-[#C1A88B]">Chat now</span>
                  </a>
                </div>
                <p className="text-xs text-white/60">
                  We can also arrange showroom visits and provide shipping quotations after your payment preference (full or deposit).
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function BurnCard({ icon, title, description, bullets = [], cta, onSpecialistClick }) {
  return (
    <motion.article
      variants={{
        hidden: { y: 30, opacity: 0 },
        show: {
          y: 0,
          opacity: 1,
          transition: { type: "spring", stiffness: 120 },
        },
      }}
      whileHover={{ scale: 1.05 }}
      className="group relative flex flex-col justify-between rounded-3xl bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)] ring-1 ring-[#C1A88B]/10 overflow-hidden min-h-[480px]"
    >
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-[linear-gradient(120deg,#C1A88B,transparent_60%,#ff4500)] [background-size:300%_300%] opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:animate-[flame_2s_linear_infinite]" />
      <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_50%_120%,rgba(255,90,0,0.2),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative z-10 flex flex-col flex-grow">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-black/40 mb-6">
          {icon}
        </div>
        <h3 className="text-center text-xl font-semibold text-[#C1A88B]">{title}</h3>
        <p className="mt-3 text-center text-white/80">{description}</p>

        <ul className="mt-6 space-y-2 text-sm text-white/85">
          {bullets.map((b, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#C1A88B]" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      {cta && (
        <div className="relative z-10 mt-auto pt-6">
          {cta.label === "Talk to a Specialist" && onSpecialistClick ? (
            <button
              type="button"
              onClick={onSpecialistClick}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#C1A88B] px-6 py-3 text-sm font-medium text-black shadow-lg transition-transform duration-300 hover:scale-105 hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1A88B]/60"
            >
              {cta.label}
            </button>
          ) : (
            <a
              href={cta.href || "#"}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#C1A88B] px-6 py-3 text-sm font-medium text-black shadow-lg transition-transform duration-300 hover:scale-105 hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1A88B]/60"
            >
              {cta.label}
            </a>
          )}
        </div>
      )}
    </motion.article>
  );
}

const defaultOptions = [
  {
    icon: <CreditCard className="h-12 w-12 text-[#C1A88B]" />,
    title: "Stripe Secure Checkout",
    description: "Pay in full via Stripe with major cards and wallets.",
    bullets: [
      "All major credit/debit cards",
      "Apple Pay / Google Pay support",
      "Encrypted, PCI-compliant payments",
      "Instant confirmation & receipts",
    ],
    cta: { label: "Proceed to Checkout", href: "/checkout" },
  },
  {
    icon: <ShieldCheck className="h-12 w-12 text-[#C1A88B]" />,
    title: "Reserve with a Deposit",
    description: "Place a deposit now; finalize the balance with our team.",
    bullets: [
      "Flexible deposit options",
      "Balance arranged before delivery",
      "Ideal for phased projects",
      "Concierge support for next steps",
    ],
    cta: { label: "Talk to a Specialist", href: "/contact" },
  },
  {
    icon: <BadgeDollarSign className="h-12 w-12 text-[#C1A88B]" />,
    title: "Buy Now, Pay Later (Coming Soon)",
    description: "Spread payments over time with BNPL. Placeholder until link is ready.",
    bullets: [
      "Pay in 4 or monthly installments",
      "Instant decision and transparent fees",
      "Keep your cash flow flexible",
      "Integrates with our checkout soon",
    ],
    cta: { label: "Coming Soon", href: "#" },
  },
];
