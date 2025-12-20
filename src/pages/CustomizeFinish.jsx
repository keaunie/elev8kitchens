import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Palette, Ruler, Gauge, Sparkles } from "lucide-react";
import catalog from "../data/products.json";

const getProduct = () => catalog.products[0];

export default function CustomizeFinishPage() {
    const product = useMemo(() => getProduct(), []);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const sizeValues = product.options.find((o) => o.name === "Size").values;
    const sizeParam = searchParams.get("size");
    const colorParam = searchParams.get("color");

    const size = sizeParam && sizeValues.includes(sizeParam) ? sizeParam : null;

    useEffect(() => {
        if (!size) {
            navigate("/customize/size");
        }
    }, [navigate, size]);

    const allowedColors = useMemo(() => {
        if (!size) return [];
        return product.variants
            .filter((v) => v.options.Size === size)
            .map((v) => v.options.Color);
    }, [product, size]);

    const initialColor =
        colorParam && allowedColors.includes(colorParam)
            ? colorParam
            : allowedColors[0];
    const [color, setColor] = useState(initialColor);

    useEffect(() => {
        if (allowedColors.length && !allowedColors.includes(color)) {
            setColor(allowedColors[0]);
        }
    }, [allowedColors, color]);

    const variant = useMemo(() => {
        if (!size) return null;
        return (
            product.variants.find(
                (v) => v.options.Size === size && v.options.Color === color
            ) ||
            product.variants.find((v) => v.options.Size === size) ||
            product.variants[0]
        );
    }, [product, size, color]);

    const heroImage = variant?.images?.[0] || product.variants[0]?.images?.[0];
    const swatches = product.swatches || {};

    const handleBack = () => {
        navigate(`/customize/size?size=${encodeURIComponent(size || "")}`);
    };

    const handleContinue = () => {
        if (!size || !color) return;
        navigate(
            `/Elev8Kitchens?size=${encodeURIComponent(size)}&color=${encodeURIComponent(
                color
            )}`
        );
    };

    if (!size) return null;

    return (
        <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-[#0a0a0a] to-[#050505] text-white">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-12 top-16 h-72 w-72 rounded-full bg-[#C1A88B]/12 blur-3xl" />
                <div className="absolute right-[-80px] top-20 h-96 w-96 rounded-full bg-[#8b6d46]/20 blur-3xl" />
                <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-[#C1A88B]/15 via-transparent to-[#C1A88B]/8 blur-3xl" />
            </div>

            <div className="mx-auto max-w-7xl px-6 py-12 relative">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <button
                        onClick={handleBack}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-[#C1A88B]/50 hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to size
                    </button>
                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-white/70">
                        <span className="rounded-full bg-white/10 px-3 py-1">Step 2 of 2</span>
                        <span className="rounded-full bg-[#C1A88B]/15 px-3 py-1 text-[#C1A88B]">
                            Choose Finish
                        </span>
                    </div>
                </div>

                <div className="mt-10 grid gap-10 lg:grid-cols-[340px,1fr,240px] items-center">
                    {/* Left rail: summary */}
                    <div className="space-y-5">
                        <div>
                            <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                                Finishes for {size}
                            </p>
                            <h2 className="text-3xl font-semibold text-[#C1A88B]">
                                Dial in your finish
                            </h2>
                            <p className="mt-2 text-sm text-white/70">
                                Select the colorway curated for this platform, including Special Edition exclusives.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C1A88B]/15 text-[#C1A88B]">
                                    <Ruler className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                                        Platform
                                    </p>
                                    <p className="text-sm font-semibold text-white">{size}</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl border border-[#C1A88B]/30 bg-[#C1A88B]/10 p-4 shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
                            <p className="text-sm text-[#C1A88B]">Next</p>
                            <p className="text-lg font-semibold text-white mt-1">Lock this build</p>
                            <p className="mt-2 text-xs text-white/70">
                                Continue to the product page with your size and finish preselected.
                            </p>
                            <button
                                onClick={handleContinue}
                                className="mt-4 w-full rounded-full bg-[#C1A88B] px-4 py-3 text-sm font-semibold text-black shadow-lg transition hover:brightness-95"
                            >
                                Continue to product page
                            </button>
                        </div>
                    </div>

                    {/* Center stage */}
                    <div className="relative">
                        <div className="absolute inset-0 -z-10 rounded-[32px] border border-white/5 bg-gradient-to-b from-white/5 via-white/0 to-white/5 blur-xl" />
                        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0b0b0b]/80 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                                        Showroom stage
                                    </p>
                                    <h3 className="text-2xl font-semibold text-white">
                                        {product.title}
                                    </h3>
                                    <p className="text-sm text-white/65">
                                        Finish the build with a curated palette.
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                                        <Ruler className="h-4 w-4" />
                                        {size}
                                    </span>
                                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                                        <Palette className="h-4 w-4" />
                                        {color}
                                    </span>
                                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                                        <Gauge className="h-4 w-4" />
                                        {variant?.price ? `$${variant.price.toLocaleString()}` : "Pricing TBD"}
                                    </span>
                                </div>
                            </div>

                            <div className="relative mt-6">
                                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(193,168,139,0.18),_transparent_55%)]" />
                                <div className="relative aspect-video overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-black via-[#0d0d0d] to-black shadow-inner">
                                    <motion.img
                                        key={`${size}-${color}`}
                                        src={heroImage}
                                        alt={`${product.title} in ${color}`}
                                        className="h-full w-full object-cover"
                                        initial={{ opacity: 0.4, scale: 1.02 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.6 }}
                                    />
                                    <div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_0_120px_rgba(0,0,0,0.4)]" />
                                    <div className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs text-white/80">
                                        {size} • {color}
                                    </div>
                                    <div className="absolute right-4 bottom-4 flex gap-2">
                                        <span className="rounded-full bg-black/60 px-3 py-1 text-xs text-white/75">
                                            {variant?.availability_note || "Build ready"}
                                        </span>
                                        <span className="rounded-full bg-[#C1A88B] px-3 py-1 text-xs font-semibold text-black">
                                            {variant?.price ? `$${variant.price.toLocaleString()}` : "Pricing soon"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right rail: colors */}
                    <div className="space-y-5">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                                        Finishes
                                    </p>
                                    <h3 className="text-lg font-semibold text-white">Color palette</h3>
                                </div>
                                <Palette className="h-5 w-5 text-[#C1A88B]" />
                            </div>

                            <div className="mt-4 space-y-3">
                                {allowedColors.map((c) => (
                                    <button
                                        key={c}
                                        onClick={() => setColor(c)}
                                        className={`flex items-center justify-between rounded-xl border px-3 py-2 transition ${
                                            color === c
                                                ? "border-[#C1A88B]/70 bg-[#C1A88B]/10"
                                                : "border-white/10 bg-black/40 hover:border-[#C1A88B]/40"
                                        }`}
                                    >
                                        <span className="flex items-center gap-3 text-sm text-white">
                                            <span
                                                className="h-6 w-6 rounded-full border border-white/10"
                                                style={{ background: swatches[c] || "#d4d4d4" }}
                                            />
                                            {c}
                                        </span>
                                        <Sparkles className="h-4 w-4 text-[#C1A88B]" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
