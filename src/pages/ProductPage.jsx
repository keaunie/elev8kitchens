// ProductPage.jsx (imports catalog JSON + variant-aware UI)

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
    Star, ShieldCheck, Truck, RefreshCcw, Zap, Sparkles, Check,
    Plus, Minus, X, ChevronLeft, ChevronRight, ChevronRight as ChevronRightIcon
} from "lucide-react";

import catalog from "../data/products.json"; // <— path to the JSON file

const formatMoney = (dollars) =>
    `$ ${Number(dollars).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const getProductByHandle = (handle) =>
    catalog.products.find((p) => p.handle === handle) || catalog.products[0];

const getVariant = (product, size, color) =>
    product.variants.find((v) => v.options.Size === size && v.options.Color === color);

function useSticky(ref, rootMargin = "0px 0px -80% 0px") {
    const [stuck, setStuck] = useState(false);
    useEffect(() => {
        if (!ref.current) return;
        const obs = new IntersectionObserver(
            ([e]) => setStuck(!e.isIntersecting),
            { root: null, rootMargin, threshold: 0 }
        );
        obs.observe(ref.current);
        return () => obs.disconnect();
    }, [ref, rootMargin]);
    return stuck;
}

function Stars({ rating }) {
    const r = Math.round(rating * 2) / 2;
    return (
        <div className="flex items-center gap-1 text-[#C1A88B]">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(r) ? "fill-current" : ""}`} />
            ))}
            <span className="ml-2 text-sm text-white/80">{r.toFixed(1)}</span>
        </div>
    );
}

function Lightbox({ images, index, onClose }) {
    const [i, setI] = useState(index ?? 0);
    const prev = () => setI((x) => (x === 0 ? images.length - 1 : x - 1));
    const next = () => setI((x) => (x === images.length - 1 ? 0 : x + 1));
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") onClose?.();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);
    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
                <button aria-label="Close" onClick={onClose} className="absolute right-6 top-6 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"><X /></button>
                <button aria-label="Prev" onClick={prev} className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"><ChevronLeft /></button>
                <button aria-label="Next" onClick={next} className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"><ChevronRight /></button>
                <motion.img key={i} src={images[i]} alt="Gallery image" className="mx-6 max-h-[86vh] rounded-2xl shadow-2xl"
                    initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} />
            </motion.div>
        </AnimatePresence>
    );
}

function MediaGallery({ images, onOpen }) {
    const [active, setActive] = useState(0);
    return (
        <div className="w-full">
            <div className="relative overflow-hidden rounded-[28px] bg-[#121212] ring-1 ring-white/10">
                <motion.img
                    key={active}
                    src={images[active]}
                    alt="Product image"
                    className="aspect-square w-full object-cover"
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 pointer-events-none rounded-[28px] shadow-[inset_0_0_80px_rgba(0,0,0,0.35)]" />
                <button onClick={() => onOpen?.(active)} className="absolute right-3 top-3 rounded-full bg-black/45 px-3 py-1 text-xs text-white backdrop-blur hover:bg-black/60">View</button>
            </div>
            <div className="mt-3 grid grid-cols-5 gap-2">
                {images.map((src, i) => (
                    <button
                        key={i}
                        aria-label={`Preview ${i + 1}`}
                        onClick={() => setActive(i)}
                        className={`overflow-hidden rounded-xl ring-1 ring-white/10 ${active === i ? "outline outline-2 outline-[#C1A88B]" : ""}`}
                    >
                        <img src={src} alt="thumb" className="aspect-square w-full object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
}

function AccordionItem({ title, children }) {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between p-5 text-left">
                <span className="font-medium text-white">{title}</span>
                <motion.span animate={{ rotate: open ? 180 : 0 }}>
                    <ChevronRightIcon className="h-5 w-5 text-white/70" />
                </motion.span>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-5 pb-5">
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
function StickyATC({ visible, title, price, onClick }) {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 80, opacity: 0 }}
                    className="fixed inset-x-0 bottom-0 z-40"
                >
                    <div className="mx-auto max-w-7xl rounded-t-2xl bg-[#111]/80 backdrop-blur p-4 ring-1 ring-white/10">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm text-white/70">{title}</p>
                                <p className="text-xl font-semibold text-white">{`$ ${price.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                })}`}</p>
                            </div>

                            {/* Responsive button size */}
                            <button
                                onClick={onClick}
                                className="
                  rounded-full bg-[#C1A88B] font-medium text-black shadow 
                  hover:brightness-95 transition-all
                  px-5 py-3 text-sm 
                  sm:px-6 sm:py-3 sm:text-base
                  md:px-8 md:py-4 md:text-lg
                "
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}


/* ===================== FULL-BLEED STORY (PARALLAX) ===================== */
// ======== Full-bleed wrapper (edge-to-edge) ========
function FullBleed({ children, className = "" }) {
    return (
        <div className={`relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] ${className}`}>
            {children}
        </div>
    );
}

// ======== Full-bleed Parallax Panel (image + overlay copy) ========
function ParallaxPanel({
    title,
    kicker,
    copy,
    image,
    align = "right", // "left" | "right" | "center"
}) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    // subtle motion for depth (image drifts slightly)
    const yImg = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
    const scaleImg = useTransform(scrollYProgress, [0, 1], [1.04, 1]);

    const alignStyles =
        align === "left"
            ? "items-start text-left"
            : align === "center"
                ? "items-center text-center"
                : "items-end text-right";

    const alignPad =
        align === "left"
            ? "lg:pl-24"
            : align === "center"
                ? ""
                : "lg:pr-24";

    return (
        <FullBleed className="bg-black">
            <section ref={ref} className="relative h-[80vh] min-h-[520px] w-screen overflow-hidden">
                {/* Image */}
                <motion.img
                    src={image}
                    alt={title || kicker}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ y: yImg, scale: scaleImg }}
                    loading="lazy"
                    decoding="async"
                />

                {/* Scrim for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/35 to-black/20" />

                {/* Overlay copy */}
                <div className={`relative z-10 mx-auto flex h-full max-w-7xl px-6 ${alignPad}`}>
                    <div className={`mt-auto mb-14 flex w-full flex-col ${alignStyles}`}>
                        {kicker && (
                            <p className="font-heading text-xs tracking-[0.25em] text-[#C1A88B]/90">
                                {kicker.toUpperCase()}
                            </p>
                        )}
                        <h3 className="mt-2 font-heading text-3xl md:text-4xl text-[#C1A88B]">
                            {title}
                        </h3>
                        <div className={`mt-3 max-w-2xl ${align === "right" ? "ml-auto" : align === "center" ? "mx-auto" : ""}`}>
                            {Array.isArray(copy)
                                ? copy.map((p, i) => (
                                    <p key={i} className="text-white/90 md:text-lg leading-relaxed">
                                        {p}
                                    </p>
                                ))
                                : <p className="text-white/90 md:text-lg leading-relaxed">{copy}</p>}
                        </div>
                    </div>
                </div>

                {/* Soft inner vignette edge */}
                <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_140px_rgba(0,0,0,0.55)]" />
            </section>
        </FullBleed>
    );
}
function ProductStoryParallax() {
    const IMGS = {
        weather: "https://res.cloudinary.com/dczzibbkw/image/upload/v1762286609/NF-101_15_1_copy_l9li1j.webp",
        grilling: "https://res.cloudinary.com/dczzibbkw/image/upload/v1762286609/NF-101_20_copy_m8kfku.webp",
        entertainment: "https://res.cloudinary.com/dczzibbkw/image/upload/v1762286609/NF-101_17_copy_vrkn4s.webp",
        storage: "https://res.cloudinary.com/dczzibbkw/image/upload/v1762286609/NF-101_25_copy_phd0or.webp",
        hydraulic: "https://res.cloudinary.com/dczzibbkw/image/upload/v1762286601/NF-101_4_copy_isrpfu.webp",
        safety: "https://res.cloudinary.com/dczzibbkw/image/upload/v1762285478/hero1_pbo5gx.webp",
    };

    return (
        <div className="bg-black">
            {/* Opening band */}
            <FullBleed>
                <section className="bg-gradient-to-b from-black to-[#0b0b0b] py-20 md:py-28">
                    <div className="mx-auto max-w-4xl px-6 text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="font-heading text-4xl md:text-5xl text-[#C1A88B]"
                        >
                            Why North Americans Call ELEV8 Their Backyard’s Crown Jewel
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15, duration: 0.6 }}
                            className="mx-auto mt-4 max-w-3xl text-white/85 md:text-lg"
                        >
                            Crafted by Habitat28, ELEV8 isn’t just a BBQ—it’s a complete outdoor living upgrade.
                            Built from premium SS304 stainless steel, it delivers extreme durability, sleek aesthetics,
                            and weather resistance that lasts.
                        </motion.p>
                    </div>
                </section>
            </FullBleed>

            {/* Panels */}
            <ParallaxPanel
                title="Weatherproof, Year-Round Durability"
                kicker="Built for Every Season"
                image={IMGS.weather}
                align="left"
                copy={[
                    "Engineered with SS304 commercial-grade stainless steel to thrive through harsh Canadian winters, hot California summers, and everything in between.",
                    "No rust, no fading—just lasting performance and a timeless finish."
                ]}
            />

            <ParallaxPanel
                title="High-Performance Grilling Station"
                kicker="Precision Cooking"
                image={IMGS.grilling}
                align="right"
                copy={[
                    "Cook like a pro with 4- or 6-burner power up to 85,000 BTU, rotisserie with dedicated rear infrared burner, vent hood, and a 50A power panel.",
                    "Full-width drip tray and black stainless internals simplify cleanup and maximize lifespan."
                ]}
            />

            <ParallaxPanel
                title="Outdoor Entertainment, Redefined"
                kicker="Screen & Sound — Built-In"
                image={IMGS.entertainment}
                align="left"
                copy={[
                    "Weatherproof 26” (XL) or 42” (XXL) Smart TV keeps games, shows, and recipes in view while you cook.",
                    "Premium in-wall Bluetooth speakers deliver immersive audio for movie nights or lively socials."
                ]}
            />

            <ParallaxPanel
                title="Organized Outdoor Living"
                kicker="Luxury Storage & Bar"
                image={IMGS.storage}
                align="right"
                copy={[
                    "Built-in fridge, wine-glass rack, soft-close honeycomb drawers, upper storage, and a pull-out trash bin.",
                    "Sintered-stone worktops balance refined design with rugged practicality."
                ]}
            />

            <ParallaxPanel
                title="Intelligent Hydraulic Access"
                kicker="Lift • Light • Luxury"
                image={IMGS.hydraulic}
                align="left"
                copy={[
                    "Remote-controlled electro-hydraulic lift door with manual override combines convenience with dramatic flair.",
                    "Integrated LED lighting elevates visibility and ambiance after sunset."
                ]}
            />

            <ParallaxPanel
                title="Built-In Safety & Smart Design"
                kicker="Confidence, Engineered"
                image={IMGS.safety}
                align="right"
                copy={[
                    "Standard gas-leak detector, exhaust system, GFCI outlets, USB ports, and winter-ready plumbing.",
                    "ELEV8 is as safe and smart as it is beautiful."
                ]}
            />
        </div>
    );
}

/* ===================== END STORY ===================== */

export default function ProductPage({ handle = "elev8-modular-outdoor-bbq-kitchen" }) {
    const product = useMemo(() => getProductByHandle(handle), [handle]);

    const defaultSize = product.options.find((o) => o.name === "Size").values[0];
    const defaultColor = product.options.find((o) => o.name === "Color").values[0];

    const [size, setSize] = useState(defaultSize);
    const [color, setColor] = useState(defaultColor);
    const [qty, setQty] = useState(1);
    const [lightbox, setLightbox] = useState(null);

    const variant = useMemo(() => getVariant(product, size, color), [product, size, color]);
    const gallery = variant?.images ?? [];
    const price = variant?.price ?? 0;
    const compareAt = variant?.compare_at_price ?? null;

    const colorSwatches = product.options.find((o) => o.name === "Color").values
        .map((c) => ({ id: c.toLowerCase(), name: c, swatch: product.swatches?.[c] || "#d4d4d4" }));
    const sizes = product.options.find((o) => o.name === "Size").values;

    const topRef = useRef(null);
    const stuck = useSticky(topRef);

    const badges = product.badges || [];

    return (
        <section className="relative bg-black text-white">
            {/* Ambient gold glows */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-[#C1A88B]/10 blur-3xl" />
                <div className="absolute right-10 bottom-10 h-72 w-72 rounded-full bg-[#C1A88B]/10 blur-3xl" />
            </div>

            {/* MAIN GRID */}
            <div
                ref={topRef}
                className="mx-auto grid max-w-7xl gap-10 px-6 pb-28 pt-20 lg:grid-cols-12 lg:gap-12 lg:pt-28"
            >
                {/* Left: Sticky Gallery */}
                <div className="lg:col-span-7 lg:sticky lg:top-24 lg:self-start">
                    <MediaGallery images={gallery} onOpen={(i) => setLightbox({ index: i })} />
                    <div className="mt-6 grid grid-cols-3 gap-3 text-white/80">
                        {badges.map((b) => (
                            <div key={b} className="flex items-center gap-2 rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                                <Check className="h-4 w-4 text-[#C1A88B]" /> <span className="text-sm">{b}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Purchase Panel */}
                <div className="lg:col-span-5">
                    <div className="rounded-[28px] bg-[#0f0f0f]/70 p-6 ring-1 ring-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
                        <div className="mb-3">
                            <h1 className="font-heading text-3xl md:text-4xl text-[#C1A88B]">{product.title}</h1>
                            <div className="mt-2 flex items-center gap-3">
                                <Stars rating={product.rating} />
                                <span className="text-sm text-white/70">({product.reviewsCount} reviews)</span>
                            </div>
                        </div>

                        <div className="flex items-end gap-3">
                            <p className="text-3xl font-semibold text-white">{formatMoney(price)}</p>
                            {compareAt && <p className="text-lg text-white/60 line-through">{formatMoney(compareAt)}</p>}
                        </div>
                        <p className="mt-1 text-sm text-white/70">Installments available at checkout.</p>

                        <div className="mt-6 space-y-5">
                            {/* Color */}
                            <div>
                                <p className="mb-2 text-sm text-white/80">Color</p>
                                <div className="flex flex-wrap items-center gap-3">
                                    {colorSwatches.map((c) => (
                                        <button
                                            key={c.id}
                                            aria-label={c.name}
                                            onClick={() => setColor(c.name)}
                                            className={`h-8 w-8 rounded-full ring-1 ring-white/20 transition hover:scale-105 ${color === c.name ? "outline outline-2 outline-[#C1A88B]" : ""
                                                }`}
                                            style={{ background: c.swatch }}
                                            title={c.name}
                                        />
                                    ))}
                                    <span className="text-sm text-white/70">{color}</span>
                                </div>
                            </div>

                            {/* Size */}
                            <div>
                                <p className="mb-2 text-sm text-white/80">Size</p>
                                <div className="flex flex-wrap gap-2">
                                    {sizes.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => setSize(s)}
                                            className={`rounded-full px-4 py-2 ring-1 ring-white/15 hover:bg-white/5 ${size === s ? "bg:white/10 outline outline-2 outline-[#C1A88B]" : ""
                                                }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Qty + Warranty note */}
                            <div className="flex items-center justify-between">
                                <div className="inline-flex items-center rounded-full bg-white/5 ring-1 ring-white/10">
                                    <button className="p-2" aria-label="Decrease" onClick={() => setQty(Math.max(1, qty - 1))}>
                                        <Minus />
                                    </button>
                                    <span className="px-4 tabular-nums">{qty}</span>
                                    <button className="p-2" aria-label="Increase" onClick={() => setQty(qty + 1)}>
                                        <Plus />
                                    </button>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-white/70">
                                    <ShieldCheck className="h-4 w-4 text-[#C1A88B]" /> 2-Year warranty included
                                </div>
                            </div>

                            {/* CTAs */}
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <button className="rounded-full bg-[#C1A88B] px-6 py-4 font-medium text-black shadow hover:brightness-95">
                                    Add to Cart
                                </button>
                                <button className="rounded-full border border-[#C1A88B]/30 px-6 py-4 font-medium text-white hover:bg:white/5">
                                    Buy Now
                                </button>
                            </div>

                            {/* Highlights */}
                            <div className="space-y-3">
                                <p className="text-white/90">Highlights</p>
                                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    {product.key_features.slice(0, 4).map((txt, i) => (
                                        <li key={i} className="flex items-start gap-3 rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                                            <span className="mt-0.5 text-[#C1A88B]">
                                                {i === 0 ? <Zap className="h-5 w-5" /> : i === 1 ? <Sparkles className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
                                            </span>
                                            <span className="text-sm text-white/90">{txt}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Accordion */}
                            <div className="divide-y divide-white/10 rounded-2xl ring-1 ring-white/10 bg-[#0f0f0f]/70">
                                {[
                                    { title: "Details", content: "Premium materials, entertainment features, and a safety-first design." },
                                    { title: "Specifications", content: "SS304 stainless, hydraulic lift, 4/6 burners up to 85,000 BTU." },
                                    { title: "Shipping & Returns", content: `U.S. & Canada shipping. 30-day returns. ${product.stock_note}` },
                                    { title: "Warranty", content: "2-Year limited warranty." }
                                ].map((it, idx) => (
                                    <AccordionItem key={idx} title={it.title}>
                                        <p className="text-white/80">{it.content}</p>
                                    </AccordionItem>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Full-bleed cinematic story */}
            <div className="mt-10 md:mt-16">
                <ProductStoryParallax />
            </div>

            <StickyATC
                visible={stuck}
                title={`${product.title} — ${size} / ${color}`}
                price={price}
                onClick={() => { }}
            />

            {lightbox && (
                <Lightbox images={gallery} index={lightbox.index} onClose={() => setLightbox(null)} />
            )}
        </section>
    );

}
