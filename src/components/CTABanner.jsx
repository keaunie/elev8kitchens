import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CTABanner() {
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        comment: "",
        // honeypot (anti-bot)
        company: "",
    });

    const update = (e) =>
        setForm((f) => ({
            ...f,
            [e.target.name]: e.target.value,
        }));

    const submit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.phone) {
            alert("Please complete the required fields.");
            return;
        }

        // bot trap
        if (form.company) return;

        setLoading(true);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "7eb54f95-3ec0-46ee-9c0b-5463a7fad524", // ⬅️ put your key here
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    comment: form.comment,
                    subject: "New quotation request from website",
                    from_name: "Website Contact Form",
                    // You can add more fields if you want; Web3Forms will just include them in the email
                }),
            });

            const result = await response.json();

            if (result.success) {
                setSent(true);
                // optional: reset form fields
                setForm({
                    name: "",
                    email: "",
                    phone: "",
                    comment: "",
                    company: "",
                });
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
        <section className="relative isolate overflow-hidden bg-[#0c0c0c] py-16 sm:py-20">
            {/* Ambient brand glows */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-[#C1A88B]/10 blur-3xl" />
                <div className="absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[#C1A88B]/10 blur-3xl" />
                <div className="absolute -bottom-20 left-1/2 h-96 w-[36rem] -translate-x-1/2 rounded-[999px] bg-gradient-to-r from-[#C1A88B]/20 via-transparent to-[#C1A88B]/20 blur-3xl" />
            </div>

            <div className="mx-auto max-w-4xl px-6">
                {/* Title */}
                <motion.h2
                    initial={{ y: 16, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center font-serif text-4xl leading-tight text-[#E8D6BF] sm:text-5xl"
                >
                    Get Your Quotation Today
                </motion.h2>

                <AnimatePresence initial={false} mode="wait">
                    {!sent ? (
                        <motion.form
                            key="form"
                            initial={{ y: 16, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6 }}
                            onSubmit={submit}
                            className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
                        >
                            {/* hidden honeypot */}
                            <input
                                type="text"
                                name="company"
                                value={form.company}
                                onChange={update}
                                className="hidden"
                                tabIndex={-1}
                                autoComplete="off"
                            />

                            {/* Grid */}
                            <div className="grid gap-4 sm:grid-cols-2">
                                <FloatingInput
                                    label="Name*"
                                    name="name"
                                    value={form.name}
                                    onChange={update}
                                    required
                                />
                                <FloatingInput
                                    label="Email *"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={update}
                                    required
                                />
                            </div>

                            <div className="mt-4">
                                <FloatingInput
                                    label="Phone number*"
                                    name="phone"
                                    type="tel"
                                    value={form.phone}
                                    onChange={update}
                                    required
                                />
                            </div>

                            <div className="mt-4">
                                <FloatingTextarea
                                    label="Comment"
                                    name="comment"
                                    value={form.comment}
                                    onChange={update}
                                    rows={5}
                                />
                            </div>

                            {/* CTA */}
                            <div className="mt-7 flex justify-center">
                                <motion.button
                                    type="submit"
                                    whileHover={{ y: -1 }}
                                    whileTap={{ y: 0 }}
                                    disabled={loading}
                                    className="rounded-full bg-[#C1A88B] px-8 py-3 text-sm font-medium text-black shadow-[0_10px_30px_rgba(193,168,139,0.35)] transition disabled:cursor-not-allowed disabled:opacity-70 hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1A88B]/60"
                                >
                                    {loading ? "Sending…" : "Send"}
                                </motion.button>
                            </div>

                            {/* tiny reassurance text */}
                            <p className="mt-4 text-center text-xs text-white/60">
                                We usually respond within 24 hours. Your information is secure and
                                will not be shared.
                            </p>
                        </motion.form>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ y: 16, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -8, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mt-10 rounded-3xl border border-emerald-400/30 bg-emerald-500/10 p-8 text-center backdrop-blur-md"
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
                                Request sent!
                            </h3>
                            <p className="mt-2 text-sm text-emerald-100/80">
                                Thanks for reaching out. We’ll contact you shortly.
                            </p>
                            <button
                                onClick={() => setSent(false)}
                                className="mt-6 text-sm text-[#C1A88B] underline underline-offset-4 hover:text-[#ddbfa3]"
                            >
                                Send another request
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

/* ---------- Floating Inputs ---------- */

function FloatingInput({
    label,
    name,
    type = "text",
    value,
    onChange,
    required,
}) {
    return (
        <label className="group relative block">
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="peer w-full rounded-md border border-white/20 bg-transparent px-4 py-4 text-white placeholder-transparent outline-none transition focus:border-[#C1A88B] focus:ring-1 focus:ring-[#C1A88B]/60"
                placeholder={label}
            />
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 bg-transparent px-1 text-sm text-white/70 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#C1A88B] peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs">
                {label}
            </span>
        </label>
    );
}

function FloatingTextarea({ label, name, value, onChange, rows = 4 }) {
    return (
        <label className="group relative block">
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                rows={rows}
                className="peer w-full resize-y rounded-md border border-white/20 bg-transparent px-4 py-4 text-white placeholder-transparent outline-none transition focus:border-[#C1A88B] focus:ring-1 focus:ring-[#C1A88B]/60"
                placeholder={label}
            />
            <span className="pointer-events-none absolute left-3 top-3 bg-transparent px-1 text-sm text-white/70 transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#C1A88B] peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs">
                {label}
            </span>
        </label>
    );
}
