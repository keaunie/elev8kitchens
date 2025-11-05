// ========================
// components/Payment.jsx — Burning Effect with aligned bottom buttons
// ========================
import React from "react";
import { motion } from "framer-motion";
import { CreditCard, Users } from "lucide-react";

export default function Payment({
    title = "Flexible Payment Options",
    subtitle =
    "Pay your way — with interest-free installments, financing, or group payments.",
    options = defaultOptions,
}) {
    return (
        <section className="relative isolate mx-auto max-w-7xl px-6 py-24">
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-10 top-0 h-56 w-56 rounded-full bg-[#C1A88B]/10 blur-3xl animate-pulse" />
                <div className="absolute right-24 bottom-10 h-72 w-72 rounded-full bg-[#C1A88B]/10 blur-3xl animate-pulse" />
            </div>

            <h2 className="text-center text-3xl font-light text-white md:text-5xl">
                {title}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-white/80">
                {subtitle}
            </p>

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
                className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
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
            className="group relative flex flex-col justify-between rounded-3xl bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)] ring-1 ring-[#C1A88B]/10 overflow-hidden min-h-[520px]"
        >
            {/* Flame border animation */}
            <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-[linear-gradient(120deg,#C1A88B,transparent_60%,#ff4500)] [background-size:300%_300%] opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:animate-[flame_2s_linear_infinite]" />

            {/* Glow layer */}
            <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_50%_120%,rgba(255,90,0,0.2),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Top content */}
            <div className="relative z-10 flex flex-col flex-grow">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-black/40 mb-6">
                    {icon}
                </div>
                <h3 className="text-center text-xl font-semibold text-[#C1A88B]">
                    {title}
                </h3>
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

            {/* Bottom CTA aligned */}
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
        icon: (
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/67/IFinance_logo.png"
                alt="iFinance"
                className="h-12 w-12 object-contain"
            />
        ),
        title: "iFinance",
        description:
            "Flexible installment options with iFinance. Get your dream kitchen today! (Available only in Canada)",
        bullets: [
            "Loans from $500 to $40,000",
            "Terms up to 84 months",
            "Interest rates as low as 9.99% or 0% promos",
            "No penalties for early repayment",
            "Fast, flexible, and credit-score friendly",
        ],
        cta: { label: "Apply Now", href: "/finance" },
    },
    {
        icon: <CreditCard className="h-12 w-12 text-[#C1A88B]" />,
        title: "Split Payment",
        description: "Pay in easy installments with Split Payment.",
        bullets: [
            "No interest cost",
            "Pay 20% upfront",
            "1 remaining payment in 10 days",
            "0% interest — simple and stress-free",
        ],
        cta: { label: "Choose at Checkout", href: "/checkout" },
    },
    {
        icon: <Users className="h-12 w-12 text-[#C1A88B]" />,
        title: "Group Payment",
        description:
            "Share the cost with Group Payment. Ideal for family or friends.",
        bullets: [
            "Split the cost with family or friends",
            "Use multiple cards or sources",
            "Perfect for shared gifts or big orders",
        ],
        cta: { label: "Choose at Checkout", href: "/checkout" },
    },
    // ⬇️ New: Square option
    {
        icon: (
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/8f/Square%2C_Inc._logo.svg"
                alt="Square"
                className="h-12 w-12 object-contain"
            />
        ),
        title: "Square",
        description:
            "Fast, secure checkout via Square — pay with cards, Apple Pay, or Google Pay.",
        bullets: [
            "All major debit/credit cards",
            "Apple Pay & Google Pay supported",
            "Afterpay (Pay-in-4) where available",
            "PCI-compliant, encrypted payments",
        ],
        cta: { label: "Pay with Square", href: "/checkout" },
    },
];


// Add this to index.css or Tailwind config:
// @keyframes flame {
//   0% { background-position: 0% 50%; filter: hue-rotate(0deg) brightness(1); }
//   50% { background-position: 100% 50%; filter: hue-rotate(45deg) brightness(1.3); }
//   100% { background-position: 0% 50%; filter: hue-rotate(0deg) brightness(1); }
// }