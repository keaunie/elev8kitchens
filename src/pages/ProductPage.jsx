// ProductPage.jsx (imports catalog JSON + variant-aware UI)

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
    Star,
    ShieldCheck,
    Truck,
    RefreshCcw,
    Zap,
    Sparkles,
    Check,
    Plus,
    Minus,
    X,
    ChevronLeft,
    ChevronRight,
    ChevronRight as ChevronRightIcon,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import catalog from "../data/products.json"; // <— path to the JSON file
import { useCart } from "../context/CartContext";
import Payment from "../components/Payment";

const formatMoney = (dollars) =>
    `$ ${Number(dollars).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;

const getProductByHandle = (handle) =>
    catalog.products.find((p) => p.handle === handle) || catalog.products[0];

const getVariant = (product, size, color) =>
    product.variants.find(
        (v) => v.options.Size === size && v.options.Color === color
    );

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
                <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(r) ? "fill-current" : ""}`}
                />
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <button
                    aria-label="Close"
                    onClick={onClose}
                    className="absolute right-6 top-6 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
                >
                    <X />
                </button>
                <button
                    aria-label="Prev"
                    onClick={prev}
                    className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
                >
                    <ChevronLeft />
                </button>
                <button
                    aria-label="Next"
                    onClick={next}
                    className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
                >
                    <ChevronRight />
                </button>
                <motion.img
                    key={i}
                    src={images[i]}
                    alt="Gallery image"
                    className="mx-6 max-h-[86vh] rounded-2xl shadow-2xl"
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                />
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
                <button
                    onClick={() => onOpen?.(active)}
                    className="absolute right-3 top-3 rounded-full bg-black/45 px-3 py-1 text-xs text-white backdrop-blur hover:bg-black/60"
                >
                    View
                </button>
            </div>
            <div className="mt-3 grid grid-cols-5 gap-2">
                {images.map((src, i) => (
                    <button
                        key={i}
                        aria-label={`Preview ${i + 1}`}
                        onClick={() => setActive(i)}
                        className={`overflow-hidden rounded-xl ring-1 ring-white/10 ${active === i ? "outline outline-2 outline-[#C1A88B]" : ""
                            }`}
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
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex w-full items-center justify-between p-5 text-left"
            >
                <span className="font-medium text-white">{title}</span>
                <motion.span animate={{ rotate: open ? 180 : 0 }}>
                    <ChevronRightIcon className="h-5 w-5 text-white/70" />
                </motion.span>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-5 pb-5"
                    >
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
                                <p className="text-xl font-semibold text-white">
                                    {`$ ${price.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                    })}`}
                                </p>
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

function FullBleed({ children, className = "" }) {
    return (
        <div
            className={`relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] ${className}`}
        >
            {children}
        </div>
    );
}

function ProductStoryParallax() {
    const features = [
        {
            title: "Weatherproof, Year-Round Durability",
            kicker: "Built for Every Season",
            icon: <ShieldCheck className="h-5 w-5 text-[#C1A88B]" />,
            body: "Built from SS304 commercial-grade stainless steel, ELEV8 Outdoor Kitchens are engineered to withstand harsh Canadian winters, hot California summers, and every season in between without rust, fading, or wear.",
        },
        {
            title: "High-Performance Grilling Station",
            kicker: "Precision Cooking",
            icon: <Zap className="h-5 w-5 text-[#C1A88B]" />,
            body: "Cook like a pro with a 4- or 6-burner BBQ, rotisserie, rear infrared burner, vent hood, and a 50A power panel delivering unmatched grilling power and reliability.",
        },
        {
            title: "Entertainment That Lasts",
            kicker: "Screen & Sound, Built-In",
            icon: <Sparkles className="h-5 w-5 text-[#C1A88B]" />,
            body: "Weatherproof 26” (XL) or 42” (XXL) Smart TVs and in-wall Bluetooth speakers turn every cookout into a cinematic, music-filled experience.",
        },
        {
            title: "Organized Outdoor Living",
            kicker: "Luxury Storage & Bar",
            icon: <Truck className="h-5 w-5 text-[#C1A88B]" />,
            body: "Enjoy effortless organization with a built-in fridge, wine-glass rack, soft-close honeycomb drawers, upper storage, and a pull-out trash bin to keep your space clean and refined.",
        },
        {
            title: "Intelligent Hydraulic Access",
            kicker: "Lift • Light • Luxury",
            icon: <RefreshCcw className="h-5 w-5 text-[#C1A88B]" />,
            body: "Remote-controlled electro-hydraulic lift door with manual override combines dramatic flair with everyday practicality, enhanced by integrated LED lighting.",
        },
        {
            title: "Built-In Safety & Smart Design",
            kicker: "Confidence, Engineered",
            icon: <ShieldCheck className="h-5 w-5 text-[#C1A88B]" />,
            body: "Standard gas-leak detector, exhaust system, GFCI outlets, USB ports, and winter-ready plumbing ensure your outdoor kitchen is as safe and smart as it is beautiful.",
        },
    ];

    return (
        <div className="bg-black">
            {/* Intro header */}
            <FullBleed>
                <section className="bg-gradient-to-b from-black to-[#0b0b0b] py-20 md:py-28">
                    <div
                        className="mx-auto max-w-4xl px-6 text-center"
                        id="why-elev8"
                    >
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
                            Crafted by Habitat28, ELEV8 isn’t just a BBQ—it’s a complete
                            outdoor living upgrade, blending professional performance
                            with hotel-grade design.
                        </motion.p>
                    </div>
                </section>
            </FullBleed>

            {/* Luxury 3-column animated feature cards */}
            <section className="bg-black pb-24 pt-15 md:pb-32">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                        {features.map((f, i) => (
                            <motion.article
                                key={f.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: i * 0.07 }}
                                className="group rounded-2xl bg-[#0c0c0c]/80 p-6 lg:p-7 ring-1 ring-white/10 shadow-[0_14px_40px_rgba(0,0,0,0.55)] 
                                           hover:-translate-y-1 hover:ring-[#C1A88B]/70 hover:shadow-[0_22px_55px_rgba(0,0,0,0.75)] transition-all duration-300"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C1A88B]/12 ring-1 ring-[#C1A88B]/40">
                                        {f.icon}
                                    </div>
                                    <div className="flex flex-col">
                                        {f.kicker && (
                                            <span className="text-[11px] uppercase tracking-[0.18em] text-[#C1A88B]/80">
                                                {f.kicker}
                                            </span>
                                        )}
                                        <h3 className="mt-1 text-sm font-semibold text-white md:text-base">
                                            {f.title}
                                        </h3>
                                    </div>
                                </div>

                                <p className="mt-4 text-sm leading-relaxed text-white/80">
                                    {f.body}
                                </p>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

/* ===================== END STORY ===================== */

export default function ProductPage({
    handle = "elev8-modular-outdoor-bbq-kitchen",
}) {
    const product = useMemo(() => getProductByHandle(handle), [handle]);

    const defaultSize = product.options.find((o) => o.name === "Size").values[0];
    const defaultColor = product.options.find((o) => o.name === "Color").values[0];

    const [size, setSize] = useState(defaultSize);
    const [color, setColor] = useState(defaultColor);
    const [qty, setQty] = useState(1);
    const [lightbox, setLightbox] = useState(null);
    const [toastVisible, setToastVisible] = useState(false);
    const [showAllFeatures, setShowAllFeatures] = useState(false);

    const variant = useMemo(
        () => getVariant(product, size, color),
        [product, size, color]
    );
    const gallery = variant?.images ?? [];
    const price = variant?.price ?? 0;
    const compareAt = variant?.compare_at_price ?? null;

    const colorSwatches = product.options
        .find((o) => o.name === "Color")
        .values.map((c) => ({
            id: c.toLowerCase(),
            name: c,
            swatch: product.swatches?.[c] || "#d4d4d4",
        }));
    const sizes = product.options.find((o) => o.name === "Size").values;

    const topRef = useRef(null);
    const stuck = useSticky(topRef);

    const badges = product.badges || [];

    const { addItem } = useCart();
    const navigate = useNavigate();

    const handleAddToCart = () => {
        if (!variant) return;

        addItem({
            productId: product.id,
            handle: product.handle,
            sku: variant.sku,
            size,
            color,
            qty,
        });

        // Show a quick toast
        setToastVisible(true);
        setTimeout(() => {
            setToastVisible(false);
        }, 2000);
    };

    const handleBuyNow = () => {
        if (!variant) return;
        addItem({
            productId: product.id,
            handle: product.handle,
            sku: variant.sku,
            size,
            color,
            qty,
        });
        navigate("/cart");
    };

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
                    <MediaGallery
                        images={gallery}
                        onOpen={(i) => setLightbox({ index: i })}
                    />
                    <div className="mt-6 grid grid-cols-3 gap-3 text-white/80">
                        {badges.map((b) => (
                            <div
                                key={b}
                                className="flex items-center gap-2 rounded-xl bg-white/5 p-3 ring-1 ring-white/10"
                            >
                                <Check className="h-4 w-4 text-[#C1A88B]" />{" "}
                                <span className="text-sm">{b}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Purchase Panel */}
                <div className="lg:col-span-5">
                    <div className="rounded-[28px] bg-[#0f0f0f]/70 p-6 ring-1 ring-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
                        <div className="mb-3">
                            <h1 className="font-heading text-3xl md:text-4xl text-[#C1A88B]">
                                {product.title}
                            </h1>
                            <div className="mt-2 flex items-center gap-3">
                                <Stars rating={product.rating} />
                                <span className="text-sm text-white/70">
                                    ({product.reviewsCount} reviews)
                                </span>
                            </div>
                        </div>
                        {/* Marketing Banner */}
                        <div className="mb-4 rounded-xl bg-white/10 p-4 text-center text-white/90 text-sm leading-relaxed">
                            This isn’t just a BBQ. It’s the kitchen you’ve been dreaming about.
                            Trusted by 100s. Own yours today!
                        </div>

                        <div className="flex items-end gap-2">
                            <div className="flex items-baseline gap-1">
                                <p className="text-3xl font-semibold text-white">
                                    {formatMoney(price)}
                                </p>
                                <span className="text-xs text-white/60 tracking-wide">USD</span>
                            </div>

                            {compareAt && (
                                <div className="flex items-baseline gap-1">
                                    <p className="text-lg text-white/60 line-through">
                                        {formatMoney(compareAt)}
                                    </p>
                                    <span className="text-[10px] text-white/40">USD</span>
                                </div>
                            )}
                        </div>

                        {compareAt && (
                            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#ff5b5b] px-3 py-1 text-xs font-semibold tracking-wide text-white shadow">
                                <span className="text-sm">🔥</span>
                                <span>ON SALE &amp; LIMITED STOCK!</span>
                            </div>
                        )}

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
                                            className={`h-8 w-8 rounded-full ring-1 ring-white/20 transition hover:scale-105 ${color === c.name
                                                ? "outline outline-2 outline-[#C1A88B]"
                                                : ""
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
                                            className={`rounded-full px-4 py-2 ring-1 ring-white/15 hover:bg-white/5 ${size === s
                                                ? "bg-white/10 outline outline-2 outline-[#C1A88B]"
                                                : ""
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
                                    <button
                                        className="p-2"
                                        aria-label="Decrease"
                                        onClick={() => setQty(Math.max(1, qty - 1))}
                                    >
                                        <Minus />
                                    </button>
                                    <span className="px-4 tabular-nums">{qty}</span>
                                    <button
                                        className="p-2"
                                        aria-label="Increase"
                                        onClick={() => setQty(qty + 1)}
                                    >
                                        <Plus />
                                    </button>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-white/70">
                                    <ShieldCheck className="h-4 w-4 text-[#C1A88B]" /> 1-Year
                                    warranty included
                                </div>
                            </div>

                            {/* CTAs */}
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <button
                                    className="rounded-full bg-[#C1A88B] px-6 py-4 font-medium text-black shadow hover:brightness-95 disabled:opacity-60 disabled:cursor-not-allowed"
                                    disabled={!variant}
                                    onClick={handleAddToCart}
                                >
                                    Add to Cart
                                </button>
                                <button
                                    className="rounded-full border border-[#C1A88B]/30 px-6 py-4 font-medium text-white hover:bg-white/5 disabled:opacity-60 disabled:cursor-not-allowed"
                                    disabled={!variant}
                                    onClick={handleBuyNow}
                                >
                                    Buy Now
                                </button>
                            </div>

                            {/* Key Features */}
                            <div className="space-y-4">
                                <p className="text-lg font-medium text-white/95">
                                    Key Features{" "}
                                    <span className="text-xs text-white/50">
                                        (Some features are present in XXL only)
                                    </span>
                                </p>


                                {(() => {
                                    const allFeatures = [
                                        {
                                            title: "Professional-Grade Grilling",
                                            body: "Unleash your inner chef with a 4/6-burner, Up to 85,000 BTU BBQ and rotisserie system—built for precision, performance, and perfection.",
                                            icon: <Zap className="h-5 w-5 text-[#C1A88B]" />,
                                        },
                                        {
                                            title: "All-Weather Stainless Steel",
                                            body: "Crafted from SS304 stainless steel to endure every season with unmatched durability and timeless elegance.",
                                            icon: <ShieldCheck className="h-5 w-5 text-[#C1A88B]" />,
                                        },
                                        {
                                            title: "Smart Entertainment Hub",
                                            body: "Integrated Smart TV (42” XXL / 26” XL) and Bluetooth speakers create the ultimate outdoor lounge experience.",
                                            icon: <Sparkles className="h-5 w-5 text-[#C1A88B]" />,
                                        },
                                        {
                                            title: "Luxury Storage & Bar Setup",
                                            body: "Features honeycomb drawers, a wine-glass rack, upper storage, and a pull-out trash system for seamless organization.",
                                            icon: <Truck className="h-5 w-5 text-[#C1A88B]" />,
                                        },
                                        {
                                            title: "Integrated Bar Fridge",
                                            body: "Keep beverages perfectly chilled on a sleek sintered-stone countertop—where design meets function.",
                                            icon: <RefreshCcw className="h-5 w-5 text-[#C1A88B]" />,
                                        },
                                        {
                                            title: "Hydraulic Lift Door",
                                            body: "Effortless remote-controlled access with manual override, blending innovation and elegance.",
                                            icon: <ChevronRight className="h-5 w-5 text-[#C1A88B]" />,
                                        },
                                        {
                                            title: "Advanced Safety System",
                                            body: "Includes gas leak detection and exhaust hood.",
                                            icon: <ShieldCheck className="h-5 w-5 text-[#C1A88B]" />,
                                        },
                                        {
                                            title: "LED Ambience Lighting",
                                            body: "Interior and exterior LED illumination set the perfect tone for night-time sophistication.",
                                            icon: <Sparkles className="h-5 w-5 text-[#C1A88B]" />,
                                        },
                                    ];

                                    const visible = showAllFeatures
                                        ? allFeatures
                                        : allFeatures.slice(0, 4);

                                    return (
                                        <>
                                            <div className="space-y-4">
                                                {visible.map((f, i) => (
                                                    <div key={i} className="flex items-start gap-3">
                                                        <span className="mt-1">{f.icon}</span>

                                                        <div>
                                                            <p className="text-sm font-semibold text-white/95">
                                                                {f.title}
                                                            </p>
                                                            <p className="text-sm text-white/75 leading-relaxed mt-0.5">
                                                                {f.body}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {allFeatures.length > 4 && (
                                                <button
                                                    type="button"
                                                    onClick={() => setShowAllFeatures((v) => !v)}
                                                    className="mt-3 text-xs sm:text-sm text-white/70 hover:text-white transition underline underline-offset-4"
                                                >
                                                    {showAllFeatures ? "Show less features" : "See all features"}
                                                </button>
                                            )}
                                        </>
                                    );
                                })()}
                            </div>

                            {/* Accordion */}
                            <div className="divide-y divide-white/10 rounded-2xl ring-1 ring-white/10 bg-[#0f0f0f]/70">
                                {[
                                    {
                                        title: "Details",
                                        content: (
                                            <div className="space-y-4 text-white/80 text-sm leading-relaxed">
                                                {/* Sizes */}
                                                <div>
                                                    <p className="font-semibold text-white">Sizes</p>
                                                    <ul className="mt-1 space-y-1">
                                                        <li>
                                                            • <strong className="text-white">XL:</strong> 3ft WIDE | 8.11ft
                                                            LONG | 7.8ft TALL
                                                        </li>
                                                        <li>
                                                            • <strong className="text-white">XXL:</strong> 3ft WIDE |
                                                            11.7ft LONG | 7.8ft TALL
                                                        </li>
                                                    </ul>
                                                    <p className="mt-1 text-white/70 text-xs">
                                                        The XXL comes with the upgraded Smart TV, extra storage, and a
                                                        sink/faucet to complete your outdoor kitchen experience.
                                                    </p>
                                                </div>

                                                {/* Colors */}
                                                <div>
                                                    <p className="font-semibold text-white">Color Options</p>
                                                    <ul className="mt-1 space-y-1">
                                                        <li>
                                                            • <strong className="text-white">Titanium:</strong> Grey
                                                            exterior, black cabinet, beige countertop
                                                        </li>
                                                        <li>
                                                            • <strong className="text-white">Platinum:</strong> White
                                                            exterior, beige cabinet, dark grey countertop
                                                        </li>
                                                        <li>
                                                            • <strong className="text-white">Anthracite:</strong> Black
                                                            exterior, black cabinet, beige countertop
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        ),
                                    },

                                    {
                                        title: "Specifications",
                                        content: (
                                            <div className="space-y-4 text-white/80 text-sm leading-relaxed">
                                                {/* Core Build */}
                                                <div>
                                                    <p className="font-semibold text-white">
                                                        Core Construction
                                                    </p>
                                                    <ul className="mt-1 space-y-1">
                                                        <li>
                                                            • Commercial-grade{" "}
                                                            <strong className="text-white">SS304 stainless steel</strong>{" "}
                                                            frame and body
                                                        </li>
                                                        <li>
                                                            • Weather-resistant exterior panels and premium
                                                            powder-coated finishes
                                                        </li>
                                                        <li>
                                                            • Sintered-stone countertop with high heat & scratch
                                                            resistance
                                                        </li>
                                                    </ul>
                                                </div>

                                                {/* Grilling System */}
                                                <div>
                                                    <p className="font-semibold text-white">Grilling System</p>
                                                    <ul className="mt-1 space-y-1">
                                                        <li>
                                                            • Available in{" "}
                                                            <strong className="text-white">4-burner</strong> or{" "}
                                                            <strong className="text-white">6-burner</strong>{" "}
                                                            configuration
                                                        </li>
                                                        <li>
                                                            • Up to <strong className="text-white">85,000 BTU</strong>{" "}
                                                            total output
                                                        </li>
                                                        <li>• Integrated rotisserie with dedicated rear infrared burner</li>
                                                        <li>• Full-width drip tray for easy cleanup</li>
                                                    </ul>
                                                </div>

                                                {/* Smart Features */}
                                                <div>
                                                    <p className="font-semibold text-white">
                                                        Integrated Smart Features
                                                    </p>
                                                    <ul className="mt-1 space-y-1">
                                                        <li>• Smart TV: 26” (XL) or upgraded 42” (XXL)</li>
                                                        <li>• Built-in Bluetooth speakers</li>
                                                        <li>• LED interior and exterior ambiance lighting</li>
                                                    </ul>
                                                </div>

                                                {/* Hydraulic System */}
                                                <div>
                                                    <p className="font-semibold text-white">
                                                        Hydraulic Lift System
                                                    </p>
                                                    <ul className="mt-1 space-y-1">
                                                        <li>
                                                            • Remote-controlled{" "}
                                                            <strong className="text-white">
                                                                electro-hydraulic lift door
                                                            </strong>
                                                        </li>
                                                        <li>• Manual override safety feature</li>
                                                        <li>• Soft-close, balanced door engineering</li>
                                                    </ul>
                                                </div>

                                                {/* Utility & Safety */}
                                                <div>
                                                    <p className="font-semibold text-white">
                                                        Utility & Safety
                                                    </p>
                                                    <ul className="mt-1 space-y-1">
                                                        <li>
                                                            • Built-in{" "}
                                                            <strong className="text-white">
                                                                gas leak detection
                                                            </strong>{" "}
                                                            system
                                                        </li>
                                                        <li>• High-capacity ventilation/exhaust hood</li>
                                                        <li>• 50-amp plug-and-play electrical panel</li>
                                                        <li>• GFCI outlets & USB ports</li>
                                                    </ul>
                                                </div>

                                                {/* Storage */}
                                                <div>
                                                    <p className="font-semibold text-white">
                                                        Storage & Bar Setup
                                                    </p>
                                                    <ul className="mt-1 space-y-1">
                                                        <li>• Honeycomb soft-close drawers</li>
                                                        <li>• Wine-glass rack & upper cabinet storage</li>
                                                        <li>• Pull-out hidden trash system</li>
                                                        <li>• Integrated bar fridge</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        ),
                                    },

                                    {
                                        title: "Shipping & Returns",
                                        content: (
                                            <div className="space-y-4 text-white/80 text-sm leading-relaxed">
                                                <div>
                                                    <p className="font-semibold text-white">
                                                        Shipping Coverage
                                                    </p>
                                                    <p className="mt-1">
                                                        We deliver across the U.S. and Canada. For an exact
                                                        delivery cost to your address, please speak with one of our
                                                        representatives.
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-white">Please Note</p>
                                                    <ul className="mt-1 space-y-2">
                                                        <li>
                                                            • From time to time, we run promotions to provide the best
                                                            delivery prices.
                                                        </li>
                                                        <li>
                                                            • Shipping availability and delivery timelines may vary
                                                            depending on your location.
                                                        </li>
                                                    </ul>
                                                </div>

                                                {product.stock_note && (
                                                    <p className="text-white/70 text-xs">
                                                        {product.stock_note}
                                                    </p>
                                                )}
                                            </div>
                                        ),
                                    },
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


            <ProductStoryParallax />

            <Payment />

            {/* NEW: Info + Image section directly below hero */}
            <section className="border-t border-white/10 bg-[#050505] py-16 md:py-20">
                <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 md:grid md:grid-cols-2 md:items-center">

                    {/* Left: Text */}
                    <div className="space-y-4 md:pr-10">
                        <p className="text-[11px] uppercase tracking-[0.24em] text-[#C1A88B]/80">
                            Precision • Power • Performance
                        </p>

                        <h2 className="font-heading text-2xl md:text-3xl text-[#C1A88B]">
                            Precision Grilling at Its Finest
                        </h2>

                        <p className="text-sm md:text-base text-white/80 leading-relaxed">
                            Delivering up to <strong className="text-white">85,000 BTU</strong> across six stainless steel burners,
                            the ELEV8 grilling system is engineered for unmatched heat performance and consistency.
                        </p>

                        <ul className="space-y-2 text-sm text-white/75">
                            <li className="flex items-start gap-2">
                                <Zap className="mt-0.5 h-4 w-4 text-[#C1A88B]" />
                                <span>
                                    Integrated rotisserie kit with a dedicated rear infrared burner for slow-roasted perfection.
                                </span>
                            </li>

                            <li className="flex items-start gap-2">
                                <ShieldCheck className="mt-0.5 h-4 w-4 text-[#C1A88B]" />
                                <span>
                                    Built entirely from <strong className="text-white">Black Stainless Steel</strong> —
                                    including grates, racks, and flame tamers — for superior durability and corrosion resistance.
                                </span>
                            </li>

                            <li className="flex items-start gap-2">
                                <RefreshCcw className="mt-0.5 h-4 w-4 text-[#C1A88B]" />
                                <span>
                                    Full-width drip tray design ensures fast, effortless cleanup, keeping your kitchen ready
                                    for the next gathering.
                                </span>
                            </li>
                        </ul>

                        <p className="text-xs text-white/60">
                            Engineered for precision and longevity — crafted to elevate every backyard culinary moment.
                        </p>
                    </div>

                    {/* Right: Full Image */}
                    <div className="md:pl-4">
                        <div className="relative overflow-hidden rounded-3xl bg-[#0f0f0f] ring-1 ring-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.7)] p-4">
                            <motion.img
                                src="https://elev8kitchens.com/cdn/shop/files/elev8-grill-station-rotisserie-burners.png?v=1748400731&width=750"
                                alt="ELEV8 outdoor kitchen grilling system"
                                className="w-full h-full object-contain"
                                initial={{ scale: 1.03, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.7 }}
                            />

                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

                            <div className="absolute bottom-4 left-4 rounded-full bg-black/65 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/80">
                                High-Performance Grill System
                            </div>
                        </div>
                    </div>

                </div>
            </section>


            {/* NEW: Smart Design + Night-Time Vibe section */}
            <section className="border-t border-white/10 bg-[#050505] py-16 md:py-20">
                <div className="mx-auto flex max-w-7xl flex-col-reverse gap-10 px-6 md:grid md:grid-cols-2 md:items-center md:flex-row">

                    {/* Left: Image */}
                    <div className="md:pr-4">
                        <div className="relative overflow-hidden rounded-3xl bg-[#0f0f0f] ring-1 ring-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.7)] p-4">
                            <motion.img
                                src="https://elev8kitchens.com/cdn/shop/files/elev8-outdoor-kitchen-hydraulic-door-ambient-lighting.png?v=1748400659&width=900"
                                alt="Hydraulic Lift Door & Ambient Lighting"
                                className="w-full h-full object-contain"
                                initial={{ scale: 1.03, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.7 }}
                            />

                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

                            <div className="absolute bottom-4 left-4 rounded-full bg-black/65 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/80">
                                Hydraulic Lift • Ambient Lighting
                            </div>
                        </div>
                    </div>

                    {/* Right: Text */}
                    <div className="space-y-4 md:pl-10">
                        <p className="text-[11px] uppercase tracking-[0.24em] text-[#C1A88B]/80">
                            Intelligent • Elegant • Effortless
                        </p>

                        <h2 className="font-heading text-2xl md:text-3xl text-[#C1A88B]">
                            Smart Design Meets Night-Time Vibe
                        </h2>

                        <p className="text-sm md:text-base text-white/80 leading-relaxed">
                            Effortlessly open your outdoor kitchen with a touch, thanks to the powerful
                            electro-hydraulic lift system designed for modern living.
                        </p>

                        <p className="text-sm md:text-base text-white/80 leading-relaxed">
                            Set the perfect mood with sleek, built-in LED lights that enhance both aesthetics
                            and functionality after sunset.
                        </p>

                        {/* CTA button */}
                        <button
                            className="mt-4 inline-flex items-center rounded-full bg-[#C1A88B] px-6 py-3 text-sm font-medium text-black shadow hover:brightness-95 transition"
                            onClick={() => window.location.href = "/consultation"}
                        >
                            Book an Appointment
                        </button>
                    </div>

                </div>
            </section>

            {/* FULL-BLEED VIDEO SECTION */}
            <section className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] bg-black py-0">
                <div className="relative w-full overflow-hidden bg-black">

                    {/* Ambient luxury glow */}
                    <div className="pointer-events-none absolute inset-0 -z-10">
                        <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-[#C1A88B]/10 blur-3xl" />
                        <div className="absolute right-10 bottom-10 h-72 w-72 rounded-full bg-[#C1A88B]/10 blur-3xl" />
                    </div>

                    {/* Video Container */}
                    <div className="relative aspect-video w-full">
                        <iframe
                            src="https://player.vimeo.com/video/1088233838?h=8c5471cc7a&badge=0&autopause=0&player_id=0&app_id=58479"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 h-full w-full"
                            title="ELEV8 Outdoor Kitchen Video"
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* NEW: Outdoor Entertainment Redefined Section */}
            <section className="border-t border-white/10 bg-[#050505] py-16 md:py-20">
                <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 md:grid md:grid-cols-2 md:items-center">

                    {/* Left: Text */}
                    <div className="space-y-4 md:pr-10">
                        <p className="text-[11px] uppercase tracking-[0.24em] text-[#C1A88B]/80">
                            Entertainment • Immersion • Lifestyle
                        </p>

                        <h2 className="font-heading text-2xl md:text-3xl text-[#C1A88B]">
                            Outdoor Entertainment Redefined
                        </h2>

                        <p className="text-sm md:text-base text-white/80 leading-relaxed">
                            Take your gatherings to the next level with a built-in
                            <strong className="text-white"> 42” / 26” Smart TV</strong>.
                            Seamlessly stream your favorite shows, sports, or cooking videos
                            right from your outdoor kitchen.
                        </p>

                        <p className="text-sm md:text-base text-white/80 leading-relaxed">
                            Integrated premium in-wall Bluetooth speakers deliver rich, immersive sound—
                            perfect for ambient music, movie nights, or lively social moments.
                        </p>

                    </div>

                    {/* Right: Image */}
                    <div className="md:pl-4">
                        <div className="relative overflow-hidden rounded-3xl bg-[#0f0f0f] ring-1 ring-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.7)] p-4">
                            <motion.img
                                src="https://elev8kitchens.com/cdn/shop/files/elev8-bbq-kitchen-smart-tv-bluetooth-speakers.png?v=1748400701&width=750"
                                alt="Outdoor Smart TV & Bluetooth Speakers"
                                className="w-full h-full object-contain"
                                initial={{ scale: 1.03, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.7 }}
                            />

                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

                            <div className="absolute bottom-4 left-4 rounded-full bg-black/65 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/80">
                                Smart TV • Immersive Audio
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* NEW: Performance / Capacity / Durability Section */}
            <section className="border-t border-white/10 bg-[#050505] py-16 md:py-20">
                <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 md:grid md:grid-cols-2 md:items-center">

                    {/* Left: Image */}
                    <div className="md:pr-4">
                        <div className="relative overflow-hidden rounded-3xl bg-[#0f0f0f] ring-1 ring-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.7)] p-4">

                            {/* Replace src="" with your chosen image */}
                            <motion.img
                                src="https://elev8kitchens.com/cdn/shop/files/elev8-outdoor-bar-fridge-3-layer-storage.png?v=1748400762&width=750"
                                alt="Outdoor fridge performance and storage"
                                className="w-full h-full object-contain"
                                initial={{ scale: 1.03, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.7 }}
                            />

                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

                            <div className="absolute bottom-4 left-4 rounded-full bg-black/65 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/80">
                                High-Performance Fridge System
                            </div>
                        </div>
                    </div>

                    {/* Right: Text */}
                    <div className="space-y-4 md:pl-10">
                        <p className="text-[11px] uppercase tracking-[0.24em] text-[#C1A88B]/80">
                            Performance • Capacity • Durability
                        </p>

                        <h2 className="font-heading text-2xl md:text-3xl text-[#C1A88B]">
                            Performance. Capacity. Built to Endure.
                        </h2>

                        <ul className="space-y-3 text-sm md:text-base text-white/80 leading-relaxed">
                            <li>Corrosion-resistant build designed for long-term outdoor use.</li>
                            <li>Spacious <strong className="text-white">5.3 cu. ft.</strong> storage holds up to <strong className="text-white">180 cans effortlessly</strong>.</li>
                            <li>Engineered to operate reliably in temperatures exceeding <strong className="text-white">100°F</strong>.</li>
                            <li>Optimized shelving ensures even cooling and organized access.</li>
                        </ul>

                        {/* WhatsApp CTA Button */}
                        <button
                            className="mt-4 inline-flex items-center rounded-full bg-[#C1A88B] px-6 py-3 text-sm font-medium text-black shadow hover:brightness-95 transition"
                            onClick={() => window.open('https://wa.me/19056930028?text=Hello%2C%20I%27m%20interested%20in%20your%20products', '_blank')}
                        >
                            Talk With A Specialist On WhatsApp
                        </button>
                    </div>

                </div>
            </section>

            {/* PREPARATION / INSTALLATION STEPS SECTION */}
            <section className="border-t border-white/10 bg-black py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <p className="text-[11px] uppercase tracking-[0.24em] text-[#C1A88B]/80">
                            Install • Setup • Enjoy
                        </p>
                        <h2 className="mt-3 font-heading text-3xl md:text-4xl text-[#C1A88B]">
                            Prepare to Install Your ELEV8 Outdoor Kitchen
                        </h2>
                        <p className="mx-auto mt-3 max-w-2xl text-sm md:text-base text-white/75">
                            A few simple steps ensure your ELEV8 kitchen arrives, installs, and performs
                            exactly the way it was designed—flawless from day one.
                        </p>
                    </div>

                    {/* Steps */}
                    <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-5">
                        {[
                            {
                                step: "Step 1",
                                title: "Site Prep",
                                body: "Locate a level space for your new Modular BBQ.",
                                icon: <Sparkles className="h-7 w-7" />,
                            },
                            {
                                step: "Step 2",
                                title: "Confirm Delivery",
                                body: "Our customer Service will in touch to confirm a convenient delivery date.",
                                icon: <Truck className="h-7 w-7" />,
                            },
                            {
                                step: "Step 3",
                                title: "Prep Electrical Hook up",
                                body: "Check if you already have the necessary electrical connection or get one installed.",
                                icon: <Zap className="h-7 w-7" />,
                            },
                            {
                                step: "Step 4",
                                title: "Delivery Day",
                                body: "Get and sign for your delivery, make sure you check the unit's condition.",
                                icon: <ShieldCheck className="h-7 w-7" />,
                            },
                            {
                                step: "Step 5",
                                title: "Connect and Enjoy",
                                body: "Place your BBQ on previously prepped site and enjoy your modular outdoor BBQ kitchen.",
                                icon: <RefreshCcw className="h-7 w-7" />,
                            },
                        ].map((item) => (
                            <div
                                key={item.step}
                                className="flex flex-col items-center text-center text-white/80"
                            >
                                {/* Circular “illustration” */}
                                <div className="mb-5 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-[#151515] via-[#1f1a15] to-[#050505] ring-2 ring-[#C1A88B]/40 shadow-[0_18px_60px_rgba(0,0,0,0.75)]">
                                    <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-black/80 ring-1 ring-white/15">
                                        <span className="text-[11px] uppercase tracking-[0.2em] text-white/60">
                                            {item.step}
                                        </span>
                                        <div className="mt-1 text-[#C1A88B]">{item.icon}</div>
                                    </div>
                                </div>

                                {/* Text */}
                                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                                <p className="mt-2 max-w-xs text-xs md:text-sm text-white/70 leading-relaxed">
                                    {item.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS SECTION 2 */}
            <section className="border-t border-white/10 bg-black py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Heading */}
                    <div className="mb-10 text-center">
                        <p className="text-[11px] uppercase tracking-[0.24em] text-[#C1A88B]/80">
                            Real Homes • Real Evenings
                        </p>
                        <h2 className="mt-3 font-heading text-3xl md:text-4xl text-white">
                            More Stories From ELEV8 Owners
                        </h2>
                        <p className="mx-auto mt-3 max-w-2xl text-sm md:text-base text-white/70">
                            From quiet weeknights to big celebrations, these are the moments our customers
                            built their ELEV8 kitchens for.
                        </p>
                    </div>

                    {/* Grid wrapper with subtle dividers */}
                    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                        <div className="grid gap-px md:grid-cols-2 bg-white/5">
                            {/* Card 1 */}
                            <div className="bg-black px-6 py-10 text-center md:px-10">
                                <p className="text-sm md:text-base text-white italic mb-4">
                                    “The heart of every gathering.”
                                </p>
                                <p className="text-sm md:text-base text-white/80 leading-relaxed">
                                    Friends don’t ask to sit inside anymore. The ELEV8 has become the natural
                                    place to gather—TV on, music low, and dinner on the grill. It changed how
                                    we use our home.
                                </p>
                                <p className="mt-5 text-sm font-semibold text-white">
                                    – Lauren M.
                                </p>
                                <p className="text-xs text-white/65 tracking-wide uppercase">
                                    Verified Buyer
                                </p>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-black px-6 py-10 text-center md:px-10">
                                <p className="text-sm md:text-base text-white italic mb-4">
                                    “Hotel feel, at home.”
                                </p>
                                <p className="text-sm md:text-base text-white/80 leading-relaxed">
                                    The finishes, lighting, and layout feel like something from a boutique hotel.
                                    We use it for morning coffee, Sunday brunch, and late-night cocktails.
                                </p>
                                <p className="mt-5 text-sm font-semibold text-white">
                                    – Michael & Dana S.
                                </p>
                                <p className="text-xs text-white/65 tracking-wide uppercase">
                                    Verified Buyers
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-black px-6 py-10 text-center md:px-10">
                                <p className="text-sm md:text-base text-white italic mb-4">
                                    “Winter? We still use it.”
                                </p>
                                <p className="text-sm md:text-base text-white/80 leading-relaxed">
                                    We live where winters are harsh, and I worried about durability. The ELEV8
                                    hasn’t missed a beat—no rust, no issues. It’s as solid as the day it arrived.
                                </p>
                                <p className="mt-5 text-sm font-semibold text-white">
                                    – Chris T.
                                </p>
                                <p className="text-xs text-white/65 tracking-wide uppercase">
                                    Verified Buyer
                                </p>
                            </div>

                            {/* Card 4 */}
                            <div className="bg-black px-6 py-10 text-center md:px-10">
                                <p className="text-sm md:text-base text-white italic mb-4">
                                    “The upgrade our backyard needed.”
                                </p>
                                <p className="text-sm md:text-base text-white/80 leading-relaxed">
                                    Between the sound system, the TV, and the grill setup, our backyard finally
                                    matches the rest of the house. Guests always ask where we got it.
                                </p>
                                <p className="mt-5 text-sm font-semibold text-white">
                                    – Priya K.
                                </p>
                                <p className="text-xs text-white/65 tracking-wide uppercase">
                                    Verified Buyer
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <StickyATC
                visible={stuck}
                title={`${product.title} — ${size} / ${color}`}
                price={price}
                onClick={handleAddToCart}
            />

            {lightbox && (
                <Lightbox
                    images={gallery}
                    index={lightbox.index}
                    onClose={() => setLightbox(null)}
                />
            )}

            {/* Add-to-cart toast */}
            <AnimatePresence>
                {toastVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                        className="fixed right-4 bottom-24 z-50 rounded-2xl bg-[#111]/90 px-4 py-3 text-sm text-white shadow-lg ring-1 ring-white/15"
                    >
                        <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-[#C1A88B]/15 flex items-center justify-center">
                                <Check className="h-4 w-4 text-[#C1A88B]" />
                            </div>
                            <div>
                                <p className="font-medium">Added to cart</p>
                                <p className="text-xs text-white/70">
                                    {product.title} — {size} / {color}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
