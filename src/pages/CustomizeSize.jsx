import React, { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Ruler, Gauge, Sparkles } from "lucide-react";
import catalog from "../data/products.json";

const getProduct = () => catalog.products[0];

export default function CustomizeSizePage() {
    const product = useMemo(() => getProduct(), []);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const sizeValues = product.options.find((o) => o.name === "Size").values;
    const sizeParam = searchParams.get("size");
    const initialSize = sizeParam && sizeValues.includes(sizeParam) ? sizeParam : sizeValues[0];

    const [size, setSize] = useState(initialSize);
    const [isExiting, setIsExiting] = useState(false);

    const variantForSize =
        product.variants.find((v) => v.options.Size === size) || product.variants[0];
    const heroImage = variantForSize?.images?.[0] || product.variants[0]?.images?.[0];

    const handleContinue = () => {
        setIsExiting(true);
        const firstColor =
            product.variants.find((v) => v.options.Size === size)?.options.Color ||
            product.options.find((o) => o.name === "Color").values[0];

        setTimeout(() => {
            navigate(
                `/customize/finish?size=${encodeURIComponent(size)}&color=${encodeURIComponent(
                    firstColor
                )}`
            );
        }, 2000);
    };

    const handleBackToCollection = () => {
        setIsExiting(true);
        setTimeout(() => {
            navigate("/Elev8Kitchens");
        }, 2000);
    };

    return (
        <motion.section
            className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-[#0a0a0a] to-[#050505] text-white"
            initial={{ opacity: 1, y: 0 }}
            animate={
                isExiting
                    ? { opacity: 0.9, scale: 0.96, filter: "blur(2px)" }
                    : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
            }
            transition={{ duration: isExiting ? 1 : 0.5, ease: "easeInOut" }}
        >
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-12 top-16 h-72 w-72 rounded-full bg-[#C1A88B]/12 blur-3xl" />
                <div className="absolute right-[-80px] top-20 h-96 w-96 rounded-full bg-[#8b6d46]/20 blur-3xl" />
                <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-[#C1A88B]/15 via-transparent to-[#C1A88B]/8 blur-3xl" />
            </div>
            {/* Vignette fade-out overlay */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: isExiting ? 1 : 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                style={{
                    background:
                        "radial-gradient(circle at center, rgba(0,0,0,0) 35%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.9) 90%, rgba(0,0,0,1) 100%)",
                }}
            />
            {/* Solid blackout layer to hold for loading feel */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-10 bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: isExiting ? 1 : 0 }}
                transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
            />

            <div className="mx-auto max-w-7xl px-6 py-12 relative">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <button
                        onClick={handleBackToCollection}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-[#C1A88B]/50 hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to collection
                    </button>
                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-white/70">
                        <span className="rounded-full bg-white/10 px-3 py-1">Step 1 of 2</span>
                        <span className="rounded-full bg-[#C1A88B]/15 px-3 py-1 text-[#C1A88B]">
                            Choose Size
                        </span>
                    </div>
                </div>

                <div className="relative mt-10 flex flex-col gap-10 lg:flex-row lg:items-start">
                    {/* Showroom stage */}
                    <div className="relative h-full min-h-[650px] flex-1">
                        <div className="absolute inset-0 -z-10 rounded-[32px] border border-white/5 bg-gradient-to-b from-white/5 via-white/0 to-white/5 blur-xl" />
                        <div className="relative h-full overflow-hidden rounded-[32px] border border-white/10 bg-[#0b0b0b]/80 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                                        Showroom stage
                                    </p>
                                    <h3 className="text-2xl font-semibold text-white">
                                        {product.title}
                                    </h3>
                                    <p className="text-sm text-white/65">
                                        Preview your platform before dialing in finishes.
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                                        <Ruler className="h-4 w-4" />
                                        {size}
                                    </span>
                                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                                        <Gauge className="h-4 w-4" />
                                        {variantForSize?.price
                                            ? `$${variantForSize.price.toLocaleString()}`
                                            : "Pricing TBD"}
                                    </span>
                                </div>
                            </div>

                            <div className="relative mt-6 h-[55vh] max-h-[520px]">
                                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(193,168,139,0.18),_transparent_55%)]" />
                                <div className="relative h-full overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-black via-[#0d0d0d] to-black shadow-inner">
                                    <motion.img
                                        key={size}
                                        src={heroImage}
                                        alt={`${product.title} ${size}`}
                                        className="h-full w-full object-cover"
                                        initial={{ opacity: 0.4, scale: 1.02 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.6 }}
                                    />
                                    <div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_0_120px_rgba(0,0,0,0.4)]" />
                                    <div className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs text-white/80">
                                        Size: {size}
                                    </div>
                                    <div className="absolute right-4 bottom-4 flex gap-2">
                                        <span className="rounded-full bg-black/60 px-3 py-1 text-xs text-white/75">
                                            {variantForSize?.availability_note || "Select finish next"}
                                        </span>
                                        <span className="rounded-full bg-[#C1A88B] px-3 py-1 text-xs font-semibold text-black">
                                            {variantForSize?.price
                                                ? `$${variantForSize.price.toLocaleString()}`
                                                : "Pricing soon"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-3 text-sm text-white/75">
                                <Sparkles className="h-4 w-4 text-[#C1A88B]" />
                                <span>Step 2 unlocks finishes tailored to this size.</span>
                            </div>
                        </div>
                    </div>

                    {/* Size selector + chosen card */}
                    <div className="w-full lg:max-w-[420px]">
                        <div className="space-y-6 flex flex-col w-full">
                            <div>
                                <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                                    Size selection
                                </p>
                                <h2 className="text-3xl font-semibold text-[#C1A88B]">
                                    Set your platform
                                </h2>
                                <p className="mt-2 text-sm text-white/70">
                                    Choose the footprint that fits your backyard—then we’ll fine-tune the finishes.
                                </p>
                            </div>

                            <SizeCarousel sizeValues={sizeValues} size={size} setSize={setSize} />

                            <div className="rounded-2xl border border-[#C1A88B]/30 bg-[#C1A88B]/10 p-4 shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
                                <p className="text-sm text-[#C1A88B]">Chosen size</p>
                                <p className="text-lg font-semibold text-white mt-1">{size}</p>
                                <p className="mt-2 text-xs text-white/70">
                                    Continue to finishes to unlock available colorways and Special Edition treatments.
                                </p>
                                <button
                                    onClick={handleContinue}
                                    className="mt-4 w-full rounded-full bg-[#C1A88B] px-4 py-3 text-sm font-semibold text-black shadow-lg transition hover:brightness-95"
                                >
                                    Continue to finishes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}

function SizeCarousel({ sizeValues, size, setSize }) {
    const total = sizeValues.length || 1;
    const currentIndex = Math.max(sizeValues.indexOf(size), 0);
    const slideWidth = 100; // show one at a time
    const trackWidth = total * slideWidth;

    return (
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a]/80 p-4 min-h-[260px]">
            <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-[#c7e19a] uppercase tracking-[0.14em]">
                    Sizes
                </span>
                <div className="h-1 w-28 rounded-full bg-white/10">
                    <div
                        className="h-1 rounded-full bg-[#c7e19a]"
                        style={{
                            width: total ? `${Math.min(100, ((currentIndex + 1) / total) * 100)}%` : "0%",
                        }}
                    />
                </div>
            </div>

            <div className="relative">
                <button
                    aria-label="Previous size"
                    onClick={() => setSize(sizeValues[Math.max(currentIndex - 1, 0)])}
                    disabled={currentIndex === 0}
                    className={`absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 px-1.5 py-1 text-white ring-1 ring-white/15 hover:ring-[#c7e19a] ${
                        currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    ‹
                </button>
                <button
                    aria-label="Next size"
                    onClick={() => setSize(sizeValues[Math.min(currentIndex + 1, total - 1)])}
                    disabled={currentIndex === total - 1}
                    className={`absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 px-1.5 py-1 text-white ring-1 ring-white/15 hover:ring-[#c7e19a] ${
                        currentIndex === total - 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    ›
                </button>

                <div className="overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-r from-white/5 via-[#111] to-white/5 px-4 py-5 min-h-[200px] flex items-center">
                    <motion.div
                        className="flex items-center"
                        animate={{
                            x: sizeValues.length ? `-${currentIndex * slideWidth}%` : "0%",
                        }}
                        transition={{ type: "spring", stiffness: 120, damping: 18 }}
                        style={{ width: `${trackWidth}%` }}
                    >
                        {sizeValues.map((s) => {
                            const selected = size === s;
                            return (
                                <div
                                    key={s}
                                    className="flex flex-col items-center justify-center gap-3 min-h-[180px]"
                                    style={{ flex: `0 0 ${slideWidth}%` }}
                                >
                                    <button
                                        onClick={() => setSize(s)}
                                        className={`flex h-20 w-20 items-center justify-center rounded-full border-2 transition ${
                                            selected
                                                ? "border-[#c7e19a] bg-white/20 shadow-[0_0_0_6px_rgba(199,225,154,0.12)]"
                                                : "border-white/20 bg-white/10 hover:border-[#c7e19a]/80"
                                        }`}
                                    >
                                        <Ruler className="h-7 w-7 text-[#c7e19a]" />
                                    </button>
                                    <p className={`text-sm font-semibold ${selected ? "text-[#c7e19a]" : "text-white/80"}`}>
                                        {s}
                                    </p>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>

            <div className="mt-4 flex justify-center gap-2">
                {sizeValues.map((s, i) => (
                    <button
                        key={s}
                        aria-label={`Go to ${s}`}
                        onClick={() => setSize(s)}
                        className={`h-2 w-6 rounded-full transition ${
                            i === currentIndex ? "bg-[#c7e19a]" : "bg-white/20 hover:bg-white/40"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
