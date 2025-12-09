// Payment.jsx — simplified for Stripe-focused messaging
import React from "react";
import { motion } from "framer-motion";
import { CreditCard, ShieldCheck } from "lucide-react";

export default function Payment({
  title = "Secure Payment Options",
  subtitle = "Pay securely with Stripe — in full or with a deposit.",
  options = defaultOptions,
}) {
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
          <BurnCard key={i} {...opt} />
        ))}
      </motion.div>
    </section>
  );
}

function BurnCard({ icon, title, description, bullets = [], cta }) {
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
          <a
            href={cta.href || "#"}
            className="inline-flex w-full items-center justify-center rounded-full bg-[#C1A88B] px-6 py-3 text-sm font-medium text-black shadow-lg transition-transform duration-300 hover:scale-105 hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1A88B]/60"
          >
            {cta.label}
          </a>
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
];
