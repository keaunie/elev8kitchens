// ==============================
// FaqPage.jsx — ELEV8 Luxe FAQ
// Stack: React + Tailwind + Framer Motion + Lucide
// ==============================

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    ChevronDown,
    ChevronRight,
    HelpCircle,
    Link as LinkIcon,
    ThumbsUp,
    ThumbsDown,
    Copy,
    Check,
    MessageSquare,
    Phone,
    Mail,
    MessageCircle,
} from "lucide-react";

// ---------- Data (edit freely or swap for a JSON import) ----------
const faqs = [
    {
        id: "why-buy",
        q: "Why buy from ELEV8 Kitchens?",
        a: [
            "ELEV8 Kitchens offer innovative, premium, modular outdoor kitchens built with commercial-grade stainless steel and smart design features.",
            "Our kitchens come in 2 sizes and 3 stylish colors, with built-in storage, LED lighting, bar fridge, Smart TV, and Bluetooth speakers.",
        ],
        cats: ["General", "Product"],
    },
    {
        id: "shipping",
        q: "Where do you ship?",
        a: [
            "We deliver across the entire U.S. lower 48 states, as well as Canada-wide. ",
            "For exact delivery costs outside Ontario or for specialized routes, please contact our team for a custom shipping quote.",
        ],
        cats: ["Shipping"],
    },
    {
        id: "showroom",
        q: "Do you have a showroom?",
        a: [
            "You can visit our factory/showroom or catch us at pop-up locations across U.S.",
            "Virtual consultations and detailed product videos are also available. ELEV8 Discovery Centers will be opening soon across California.",
        ],
        cats: ["General", "Visit"],
    },
    {
        id: "installation",
        q: "Do you offer installation?",
        a: [
            "Yes. A level surface is required. While the unit has plug-and-play electricals, we recommend using a licensed electrician when necessary.",
            "We offer full-service installation—contact us for a quote.",
        ],
        cats: ["Install"],
    },
    {
        id: "size-weight",
        q: "What is the size and weight of the unit?",
        a: [
            "XL: 3 ft W × 8.11 ft L × 7.8 ft H",
            "XXL: 3 ft W × 11.7 ft L × 7.8 ft H",
            "Weight: Approx. 1000 lbs depending on size.",
        ],
        cats: ["Specs"],
    },
    {
        id: "xl-vs-xxl",
        q: "What is the difference between XL and XXL models?",
        a: [
            "XL has no plumbing (no sink/faucet), while XXL includes them.",
            "XXL also comes with a larger TV and more storage space.",
        ],
        cats: ["Product", "Specs"],
    },
    {
        id: "options",
        q: "What are the color and size options?",
        a: [
            "XXL:",
            "• Titanium: Grey exterior, black cabinets, beige countertops",
            "• Platinum: White exterior, beige cabinets, dark grey countertops",
            "• Anthracite: Black exterior, black cabinets, beige countertops",
            "XL:",
            "• Titanium",
            "• Platinum",
        ],
        cats: ["Product", "Options"],
    },
    {
        id: "materials",
        q: "What is the body of the unit made of?",
        a: [
            "It is made from stainless steel honeycomb panels with powder-coated paint for extra durability.",
        ],
        cats: ["Specs", "Materials"],
    },
    {
        id: "waterproof",
        q: "Is the kitchen waterproof?",
        a: ["Yes, the kitchen is waterproof once the hydraulic door is closed."],
        cats: ["Product", "Use"],
    },
    {
        id: "btus",
        q: "How many BTUs is the barbecue?",
        a: ["XL: 4-burner, 60,000 BTU", "XXL: 6-burner, 85,000 BTU"],
        cats: ["Specs", "Performance"],
    },
    {
        id: "ship-calc",
        q: "How is shipping calculated?",
        a: [
            "Shipping cost is based on your address using a per-mile rate.",
            "We work with reliable carriers to ensure curbside delivery.",
        ],
        cats: ["Shipping"],
    },
    {
        id: "appliances",
        q: "What appliances are included?",
        a: [
            "Each unit includes a stainless steel bar fridge, 4/6-burner BBQ, smoke hood, in-wall Bluetooth speakers, 26\"/42\" Smart TV, gas leak detector, and a remote-controlled hydraulic door with LED lighting.",
        ],
        cats: ["Product", "Specs"],
    },
];

// Distinct categories
const categories = ["All", ...Array.from(new Set(faqs.flatMap((f) => f.cats)))];

// ---------- Utilities ----------
const highlight = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "ig"));
    return parts.map((p, i) =>
        p.toLowerCase() === query.toLowerCase() ? (
            <mark
                key={i}
                className="rounded bg-[#C1A88B]/20 px-0.5 text-[#C1A88B]"
            >
                {p}
            </mark>
        ) : (
            <span key={i}>{p}</span>
        )
    );
};

// ---------- Tiny components ----------
function Badge({ children }) {
    return (
        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/80 ring-1 ring-white/10">
            {children}
        </span>
    );
}

function CopyLinkButton({ id }) {
    const [copied, setCopied] = useState(false);
    return (
        <button
            onClick={() => {
                const url = `${window.location.origin}${window.location.pathname}#${id}`;
                navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
            }}
            className="inline-flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-xs text-white/80 ring-1 ring-white/10 hover:bg-black/60"
            title="Copy link"
        >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
        </button>
    );
}

// ---------- FAQ Item (accordion) ----------
function FaqItem({ item, query, defaultOpen = false }) {
    const [open, setOpen] = useState(defaultOpen);
    const [helpful, setHelpful] = useState(null); // true | false | null

    useEffect(() => {
        // open if deep-linked
        if (window.location.hash === `#${item.id}`) setOpen(true);
    }, [item.id]);

    return (
        <li
            id={item.id}
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
            className="rounded-2xl bg-[#0f0f0f]/70 ring-1 ring-white/10"
        >
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex w-full items-center justify-between gap-3 p-5 text-left"
                aria-expanded={open}
            >
                <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-[#C1A88B]" />
                    <h3 itemProp="name" className="font-medium text-white">
                        {highlight(item.q, query)}
                    </h3>
                </div>
                <motion.span animate={{ rotate: open ? 180 : 0 }}>
                    <ChevronDown className="h-5 w-5 text-white/70" />
                </motion.span>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-5 pb-5"
                    >
                        <div
                            itemScope
                            itemProp="acceptedAnswer"
                            itemType="https://schema.org/Answer"
                        >
                            <div
                                itemProp="text"
                                className="space-y-2 text-white/85 leading-7"
                            >
                                {item.a.map((p, i) => (
                                    <p key={i}>{highlight(p, query)}</p>
                                ))}
                            </div>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                            {item.cats.map((c) => (
                                <Badge key={c}>{c}</Badge>
                            ))}
                            <div className="ml-auto flex items-center gap-2">
                                <CopyLinkButton id={item.id} />
                                <span className="text-xs text-white/60">Was this helpful?</span>
                                <button
                                    onClick={() => setHelpful(true)}
                                    className={`rounded-full p-1 ring-1 ring-white/10 ${helpful === true
                                        ? "bg-[#C1A88B]/20 text-[#C1A88B]"
                                        : "text-white/70 hover:bg-white/5"
                                        }`}
                                    aria-label="Helpful"
                                    title="Helpful"
                                >
                                    <ThumbsUp size={16} />
                                </button>
                                <button
                                    onClick={() => setHelpful(false)}
                                    className={`rounded-full p-1 ring-1 ring-white/10 ${helpful === false
                                        ? "bg-white/10 text-white"
                                        : "text-white/70 hover:bg-white/5"
                                        }`}
                                    aria-label="Not helpful"
                                    title="Not helpful"
                                >
                                    <ThumbsDown size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </li>
    );
}

// ---------- Sticky Quick Nav ----------
function QuickNav({ categories, active, onPick }) {
    return (
        <div className="sticky top-20 z-10 hidden lg:block">
            <div className="rounded-2xl bg-[#0f0f0f]/70 p-3 ring-1 ring-white/10">
                <p className="px-2 pb-2 text-xs tracking-wider text-white/60">FILTER</p>
                <div className="flex flex-col gap-2">
                    {categories.map((c) => (
                        <button
                            key={c}
                            onClick={() => onPick(c)}
                            className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm ring-1 ring-white/10 hover:bg-white/5 ${active === c ? "bg-white/10 text-[#C1A88B]" : "text-white/80"
                                }`}
                        >
                            <span>{c}</span>
                            <ChevronRight size={16} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ---------- Main Page ----------
export default function FaqPage() {
    const [query, setQuery] = useState("");
    const [cat, setCat] = useState("All");
    const [expandAll, setExpandAll] = useState(false);

    // NEW: state for Web3Forms widget
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    // Filter & score
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return faqs.filter((f) => {
            const inCat = cat === "All" || f.cats.includes(cat);
            if (!q) return inCat;
            const hay = [f.q, ...f.a].join(" ").toLowerCase();
            return inCat && hay.includes(q);
        });
    }, [query, cat]);

    const handleQuickSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const name = formData.get("name");
        const email = formData.get("email");
        const phone = formData.get("phone");

        if (!name || !email || !phone) {
            alert("Please complete the required fields.");
            return;
        }

        const payload = {
            access_key: "7eb54f95-3ec0-46ee-9c0b-5463a7fad524", // your Web3Forms key
            name,
            email,
            phone,
            comment: formData.get("comment") || "",
            subject: "Quick message from Elev8 Kitchens FAQ widget",
            from_name: "Elev8Kitchens Website",
            page: "FAQ Page",
        };

        try {
            setLoading(true);

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (result.success) {
                e.target.reset();
                setSent(true);
            } else {
                console.error(result);
                alert("Something went wrong sending your request. Please try again.");
            }
        } catch (err) {
            console.error(err);
            alert("Network error. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative bg-black text-white overflow-hidden">
            {/* Pulsing scattered gold background */}
            <style>{`
              @keyframes pulseGold {
                0%   { transform: scale(0.9); opacity: 0.32; }
                50%  { transform: scale(1.15); opacity: 0.9; }
                100% { transform: scale(0.9); opacity: 0.32; }
              }
            `}</style>

            <div className="pointer-events-none absolute inset-0 -z-10">
                {/* Large glows */}
                <div
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "6%",
                        width: "520px",
                        height: "520px",
                        marginLeft: "-260px",
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(193,168,139,0.7) 0%, rgba(193,168,139,0.4) 30%, transparent 70%)",
                        filter: "blur(40px)",
                        animation: "pulseGold 8s ease-in-out infinite",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        left: "-6%",
                        top: "30%",
                        width: "420px",
                        height: "420px",
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(193,168,139,0.55) 0%, rgba(193,168,139,0.28) 35%, transparent 70%)",
                        filter: "blur(34px)",
                        animation: "pulseGold 7s ease-in-out infinite",
                        animationDelay: "1.1s",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        right: "-6%",
                        top: "22%",
                        width: "480px",
                        height: "480px",
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(193,168,139,0.6) 0%, rgba(193,168,139,0.3) 30%, transparent 70%)",
                        filter: "blur(36px)",
                        animation: "pulseGold 9s ease-in-out infinite",
                        animationDelay: "0.6s",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        left: "50%",
                        bottom: "-4%",
                        width: "460px",
                        height: "460px",
                        marginLeft: "-230px",
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(193,168,139,0.45) 0%, rgba(193,168,139,0.18) 35%, transparent 70%)",
                        filter: "blur(38px)",
                        animation: "pulseGold 10s ease-in-out infinite",
                        animationDelay: "1.8s",
                    }}
                />

                {/* Accent glows */}
                <div
                    style={{
                        position: "absolute",
                        left: "10%",
                        top: "14%",
                        width: "220px",
                        height: "220px",
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(193,168,139,0.55) 0%, rgba(193,168,139,0.22) 40%, transparent 72%)",
                        filter: "blur(26px)",
                        animation: "pulseGold 6s ease-in-out infinite",
                        animationDelay: "0.4s",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        right: "14%",
                        top: "50%",
                        width: "260px",
                        height: "260px",
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(193,168,139,0.5) 0%, rgba(193,168,139,0.2) 38%, transparent 70%)",
                        filter: "blur(28px)",
                        animation: "pulseGold 8s ease-in-out infinite",
                        animationDelay: "2s",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        left: "6%",
                        bottom: "24%",
                        width: "240px",
                        height: "240px",
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(193,168,139,0.48) 0%, rgba(193,168,139,0.18) 38%, transparent 70%)",
                        filter: "blur(26px)",
                        animation: "pulseGold 7.2s ease-in-out infinite",
                        animationDelay: "3s",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        right: "30%",
                        top: "68%",
                        width: "180px",
                        height: "180px",
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(193,168,139,0.55) 0%, rgba(193,168,139,0.25) 45%, transparent 75%)",
                        filter: "blur(20px)",
                        animation: "pulseGold 5.5s ease-in-out infinite",
                        animationDelay: "1s",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        right: "18%",
                        bottom: "8%",
                        width: "160px",
                        height: "160px",
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(193,168,139,0.6) 0%, rgba(193,168,139,0.26) 45%, transparent 75%)",
                        filter: "blur(18px)",
                        animation: "pulseGold 6.8s ease-in-out infinite",
                        animationDelay: "4s",
                    }}
                />
            </div>


            {/* Hero */}
            <div className="mx-auto max-w-6xl px-6 pt-24 md:pt-32">
                <motion.h1
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center font-heading text-4xl md:text-6xl text-[#C1A88B]"
                >
                    Frequently Asked Questions
                </motion.h1>
                <p className="mx-auto mt-3 max-w-2xl text-center text-white/80">
                    Quick answers about ELEV8 modular outdoor kitchens—shipping, specs,
                    installation, options, and more.
                </p>

                {/* Search + Controls */}
                <div className="mx-auto mt-6 flex max-w-3xl flex-col items-center gap-3 md:flex-row">
                    <div className="relative w-full">
                        <Search
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/60"
                            size={18}
                        />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search FAQs (e.g., shipping, BTU, showroom)…"
                            className="w-full rounded-full bg-white/5 py-3 pl-9 pr-4 text-sm text-white placeholder-white/50 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-[#C1A88B]/60"
                        />
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:py-16 lg:grid-cols-12 lg:gap-12">
                {/* Left: Sticky quick nav */}
                <div className="lg:col-span-3">
                    <QuickNav categories={categories} active={cat} onPick={setCat} />
                </div>

                {/* Right: FAQ list + CTA */}
                <div className="lg:col-span-9">
                    {/* Results meta */}
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm text-white/70">
                            Showing <span className="text-white">{filtered.length}</span>{" "}
                            result{filtered.length === 1 ? "" : "s"}
                            {cat !== "All" ? (
                                <>
                                    {" "}
                                    in <span className="text-white">{cat}</span>
                                </>
                            ) : null}
                            {query ? (
                                <>
                                    {" "}
                                    for “<span className="text-white">{query}</span>”
                                </>
                            ) : null}
                        </p>
                    </div>

                    {/* FAQ list */}
                    <ul
                        className="space-y-3"
                        itemScope
                        itemType="https://schema.org/FAQPage"
                    >
                        {filtered.map((f, idx) => (
                            <FaqItem
                                key={f.id}
                                item={f}
                                query={query}
                                defaultOpen={expandAll}
                            />
                        ))}
                        {filtered.length === 0 && (
                            <li className="rounded-2xl bg-[#0f0f0f]/70 p-6 text-white/70 ring-1 ring-white/10">
                                No results. Try another term (e.g., “installation”, “XXL”,
                                “shipping”).
                            </li>
                        )}
                    </ul>

                    {/* Contact / Specialist CTA + Web3Forms widget */}
                    <div className="mt-10 grid gap-6 md:grid-cols-2">
                        <div className="rounded-2xl bg-gradient-to-br from-[#0b0b0b] to-[#121212] p-6 ring-1 ring-white/10">
                            <h3 className="font-heading text-2xl text-[#C1A88B]">
                                Still have questions?
                            </h3>
                            <p className="mt-2 text-white/80">
                                Speak with a real specialist. We’ll help you choose size, color,
                                and installation options—no pressure.
                            </p>
                            <div className="mt-4 grid gap-2">
                                <a
                                    href="mailto:sales.elev8@habitat28.com"
                                    className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm text-white ring-1 ring-white/10 hover:bg-white/10"
                                >
                                    <Mail size={16} /> sales.elev8@habitat28.com
                                </a>
                                <a
                                    href="https://wa.me/19056930028?text=Hello%2C%20I%27m%20interested%20in%20your%20products"
                                    className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm text-white ring-1 ring-white/10 hover:bg-white/10"
                                >
                                    <MessageCircle size={16} /> WhatsApp Specialist
                                </a>
                            </div>
                        </div>

                        {/* Quick form wired to Web3Forms + success state */}
                        <AnimatePresence mode="wait" initial={false}>
                            {!sent ? (
                                <motion.form
                                    key="faq-form"
                                    initial={{ y: 16, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -8, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="rounded-2xl bg-gradient-to-br from-[#0b0b0b] to-[#121212] p-6 ring-1 ring-white/10"
                                    onSubmit={handleQuickSubmit}
                                >
                                    <h3 className="font-heading text-2xl text-[#C1A88B]">
                                        Send a message
                                    </h3>
                                    <div className="mt-4 grid gap-3">
                                        <input
                                            name="name"
                                            className="rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-white/50 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-[#C1A88B]/60"
                                            placeholder="Name *"
                                            required
                                        />
                                        <input
                                            name="email"
                                            type="email"
                                            className="rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-white/50 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-[#C1A88B]/60"
                                            placeholder="Email *"
                                            required
                                        />
                                        <input
                                            name="phone"
                                            className="rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-white/50 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-[#C1A88B]/60"
                                            placeholder="Phone number *"
                                            required
                                        />
                                        <textarea
                                            name="comment"
                                            rows={4}
                                            className="rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-white/50 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-[#C1A88B]/60"
                                            placeholder="Comment"
                                        />
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C1A88B] px-6 py-3 font-medium text-black text-sm shadow hover:brightness-95 disabled:opacity-60 disabled:cursor-not-allowed"
                                        >
                                            <MessageSquare size={16} />
                                            {loading ? "Sending..." : "Send"}
                                        </button>
                                    </div>
                                    <p className="mt-3 text-xs text-white/60">
                                        By sending, you agree to our Terms &amp; Privacy Policy.
                                    </p>
                                </motion.form>
                            ) : (
                                <motion.div
                                    key="faq-success"
                                    initial={{ y: 16, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -8, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="rounded-3xl border border-emerald-400/30 bg-emerald-500/10 p-8 text-center backdrop-blur-md"
                                >
                                    <div className="mx-auto h-12 w-12 rounded-full bg-emerald-500/20 ring-1 ring-emerald-400/40 grid place-items-center">
                                        <svg viewBox="0 0 24 24" className="h-6 w-6 text-emerald-300">
                                            <path
                                                fill="currentColor"
                                                d="m9.6 16.2-3.8-3.9L4 14.1l5.6 5.7L20 9.4l-1.8-1.8z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="mt-4 text-xl font-semibold text-emerald-200">
                                        Message sent!
                                    </h3>
                                    <p className="mt-2 text-sm text-emerald-100/80">
                                        Thanks for reaching out. We’ll contact you shortly.
                                    </p>
                                    <button
                                        onClick={() => setSent(false)}
                                        className="mt-6 text-sm text-[#C1A88B] underline underline-offset-4 hover:text-[#ddbfa3]"
                                    >
                                        Send another message
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
