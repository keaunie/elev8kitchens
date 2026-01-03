import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Palette, Ruler, Gauge, Sparkles, Flame } from "lucide-react";
import catalog from "../data/products.json";

const getProduct = () => catalog.products[0];

export default function CustomizeFinishPage() {
    const product = useMemo(() => getProduct(), []);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [activeHotspot, setActiveHotspot] = useState(null);
    const [stoveUpgrade, setStoveUpgrade] = useState(false); // 4 burner with side stove
    const [plumbing, setPlumbing] = useState(false); // Plumbing hookup
    const [countertop, setCountertop] = useState("Stainless Steel"); // Countertop material
    const [showSpecialistModal, setShowSpecialistModal] = useState(false);
    const [showMobileLightbox, setShowMobileLightbox] = useState(false);

    const sizeValues = product.options.find((o) => o.name === "Size").values;
    const sizeParam = searchParams.get("size");
    const colorParam = searchParams.get("color");

    const size = sizeParam && sizeValues.includes(sizeParam) ? sizeParam : sizeValues[0];
    const [isExiting, setIsExiting] = useState(false);

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
    const [fuelType, setFuelType] = useState("Propane");

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

    // Always use only the first photo from the images array
    const heroImage =
        (variant?.images && variant.images.length > 0 ? variant.images[0] : undefined) ||
        product.variants[0]?.images?.[0];
    const swatches = product.swatches || {};
    const stoveLabel = stoveUpgrade ? "4 Burner w/ Side Stove" : "Standard";
    const hotspotPositions = {
        fuel: {
            default: { top: "65%", left: "46%" },
            XL: { top: "56%", left: "49%" },
            XXL: { top: "80%", left: "55%" },
            "XXXL (Special Edition)": { top: "70%", left: "46%" },
        },
        burner: {
            default: { top: "53%", left: "44%" },
            XL: { top: "59%", left: "53%" },
            XXL: { top: "69%", left: "55%" },
            "XXXL (Special Edition)": { top: "57%", left: "45%" },
        },
        plumbing: {
            default: { top: "60%", left: "29%" },
            XL: { top: "62%", left: "27%" },
            XXL: { top: "63%", left: "39%" },
            "XXXL (Special Edition)": { top: "60%", left: "29%" },
        },
        countertop: {
            default: { top: "57%", left: "57%" },
            XL: { top: "64%", left: "69%" },
            XXL: { top: "65%", left: "75%" },
            "XXXL (Special Edition)": { top: "57%", left: "57%" },
        },
    };

    const hotspots = useMemo(
        () => [
            {
                id: "fuel",
                label: "Stove / Countertop",
                description: "Choose your fuel source for the cooktop & grill.",
                options: ["Propane", "Natural Gas"],
                icon: Flame,
                pricing: {
                    Propane: "Included",
                    "Natural Gas": "+$150",
                },
            },
            {
                id: "burner",
                label: "Burner Setup",
                description: "Upgrade to a 4-burner package with side stove.",
                options: ["Standard", "4 Burner w/ Side Stove"],
                icon: Sparkles,
                pricing: {
                    Standard: "Included",
                    "4 Burner w/ Side Stove": "+$300",
                },
            },
            {
                id: "plumbing",
                label: "Plumbing",
                description: "Add water + drain prep near the sink.",
                options: ["No Plumbing", "Add Plumbing"],
                icon: Sparkles,
                pricing: {
                    "No Plumbing": "Included",
                    "Add Plumbing": "+$350",
                },
            },
            {
                id: "countertop",
                label: "Countertop",
                description: "Choose your worktop material.",
                options: ["Stainless Steel", "Sintered Stone"],
                icon: Palette,
                pricing: {
                    "Stainless Steel": "Included",
                    "Sintered Stone": "+$400",
                },
            },
        ],
        []
    );
    const fuelUpcharge = fuelType === "Natural Gas" ? 150 : 0;
    const stoveUpcharge = stoveUpgrade ? 300 : 0;
    const plumbingUpcharge = plumbing ? 350 : 0;
    const countertopUpcharge = countertop === "Sintered Stone" ? 400 : 0;
    const totalUpcharge = fuelUpcharge + stoveUpcharge + plumbingUpcharge + countertopUpcharge;
    const breakdown = [
        { label: "Color", value: color, cost: 0 },
        { label: "Fuel", value: fuelType, cost: fuelUpcharge },
        { label: "Burner", value: stoveLabel, cost: stoveUpcharge },
        { label: "Plumbing", value: plumbing ? "Added" : "Standard", cost: plumbingUpcharge },
        { label: "Countertop", value: countertop, cost: countertopUpcharge },
    ];
    const xxxlDimensionsIn = { width: 40, length: 148, height: 93 };
    const xxxlDimensionsFt = {
        width: (xxxlDimensionsIn.width / 12).toFixed(2),
        length: (xxxlDimensionsIn.length / 12).toFixed(2),
        height: (xxxlDimensionsIn.height / 12).toFixed(2),
    };
    const tintColor = swatches[color] || "#C1A88B";
    const displayPrice = variant?.price ? variant.price + totalUpcharge : null;

    const handleBack = () => {
        setIsExiting(true);
        setTimeout(() => {
            navigate(`/customize/size?size=${encodeURIComponent(size || "")}`);
        }, 2000);
    };

    const handleGeneratePdf = () => {
        if (typeof window === "undefined") return;
        const docTitle = "Elev8 Kitchens Build Summary";
        const logo = "https://cdn.shopify.com/s/files/1/0692/3147/6903/files/ELEV8-Crafted-Kitchens-Logo.png?v=1748394896";
        const html = `
          <html>
            <head>
              <title>${docTitle}</title>
              <style>
                * { box-sizing: border-box; }
                body { font-family: "Helvetica Neue", Arial, sans-serif; background: #0b0b0b; color: #f4f4f4; padding: 32px; }
                h1, h2, h3 { margin: 0 0 8px; }
                .card { background: #121212; border: 1px solid rgba(193,168,139,0.25); border-radius: 18px; padding: 24px; }
                .header { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
                .badge { display: inline-block; padding: 6px 10px; border-radius: 999px; background: rgba(193,168,139,0.15); color: #c1a88b; font-size: 12px; letter-spacing: 0.08em; }
                ul { list-style: none; padding: 0; margin: 12px 0; }
                li { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
                li:last-child { border-bottom: none; }
                .label { color: #f4f4f4; font-weight: 600; }
                .value { color: #cfcfcf; }
                .cost { color: #c1a88b; font-weight: 600; }
                .meta { margin-top: 12px; color: #b8b8b8; font-size: 13px; }
              </style>
            </head>
            <body>
              <div class="card">
                <div class="header">
                  <img src="${logo}" alt="Elev8 Kitchens" style="height:56px;object-fit:contain;" />
                  <div>
                    <div class="badge">Build Summary</div>
                    <h2>${product.title}</h2>
                    <div class="meta">Size: ${size} • Finish: ${color} • Price: ${displayPrice ? `$${displayPrice.toLocaleString()}` : "TBD"}</div>
                  </div>
                </div>
                <ul>
                  ${breakdown
                        .map(
                            (item) =>
                                `<li><span class="label">${item.label}</span><span class="value">${item.value}</span><span class="cost">${item.cost > 0 ? `+$${item.cost.toLocaleString()}` : "Included"}</span></li>`
                        )
                        .join("")}
                </ul>
                <div class="meta">Upgrades total: ${totalUpcharge > 0 ? `+$${totalUpcharge.toLocaleString()}` : "Included in base"}</div>
              </div>
              <script>window.onload = () => { window.print(); }</script>
            </body>
          </html>
        `;
        const win = window.open("", "_blank");
        if (win) {
            win.document.open();
            win.document.write(html);
            win.document.close();
        }
        setShowSpecialistModal(true);
    };

    if (!size) return null;

    return (
        <>
        <motion.section
            className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-[#0a0a0a] to-[#050505] text-white"
            initial={{ opacity: 0 }}
            animate={
                isExiting
                    ? { opacity: 0.9, scale: 0.96, filter: "blur(2px)" }
                    : { opacity: 1, scale: 1, filter: "blur(0px)" }
            }
            transition={{ duration: isExiting ? 1 : 1, ease: "easeInOut" }}
        >
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-12 top-16 h-72 w-72 rounded-full bg-[#C1A88B]/12 blur-3xl" />
                <div className="absolute right-[-80px] top-20 h-96 w-96 rounded-full bg-[#8b6d46]/20 blur-3xl" />
                <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-[#C1A88B]/15 via-transparent to-[#C1A88B]/8 blur-3xl" />
            </div>
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
            <motion.div
                className="pointer-events-none absolute inset-0 z-10 bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: isExiting ? 1 : 0 }}
                transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
            />

            <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 md:py-12 relative">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                        onClick={handleBack}
                        className="inline-flex w-full justify-center sm:w-auto items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-[#C1A88B]/50 hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to size
                    </button>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs uppercase tracking-[0.16em] text-white/70">
                        <span className="rounded-full bg-white/10 px-3 py-1">Step 2 of 2</span>
                        <span className="rounded-full bg-[#C1A88B]/15 px-3 py-1 text-[#C1A88B]">
                            Choose Finish
                        </span>
                    </div>
                </div>

                <div className="relative mt-6 md:mt-10 space-y-6 md:space-y-10">
                    {/* Showroom stage */}
                    <div className="relative h-full min-h-[360px] md:min-h-[650px] w-full">
                        <div className="absolute inset-0 -z-10 rounded-[32px] border border-white/5 bg-gradient-to-b from-white/5 via-white/0 to-white/5 blur-xl" />
                        <div className="relative h-full overflow-hidden rounded-[24px] md:rounded-[32px] border border-white/10 bg-[#0b0b0b]/80 p-4 md:p-6 shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
                            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                                        Showroom stage
                                    </p>
                                    <h3 className="text-xl md:text-2xl font-semibold text-white">
                                        {product.title}
                                    </h3>
                                    <p className="text-sm text-white/65">
                                        Finish the build with a curated palette.
                                    </p>
                                </div>
                            <div className="hidden md:flex flex-wrap gap-2 md:justify-end">
                                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] md:px-3 md:py-1 md:text-xs text-white/80">
                                        <Ruler className="h-4 w-4" />
                                        {size}
                                    </span>
                                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] md:px-3 md:py-1 md:text-xs text-white/80">
                                        <Palette className="h-4 w-4" />
                                        {color}
                                    </span>
                                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] md:px-3 md:py-1 md:text-xs text-white/80">
                                        <Flame className="h-4 w-4" />
                                        {fuelType}
                                    </span>
                                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] md:px-3 md:py-1 md:text-xs text-white/80">
                                        <Sparkles className="h-4 w-4" />
                                        {stoveLabel}
                                    </span>
                                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] md:px-3 md:py-1 md:text-xs text-white/80">
                                        <Gauge className="h-4 w-4" />
                                        {displayPrice ? `$${displayPrice.toLocaleString()}` : "Pricing TBD"}
                                    </span>
                                </div>
                            </div>

                            <div className="relative mt-6">
                                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(193,168,139,0.18),_transparent_55%)]" />
                                <div
                                    className="relative aspect-video overflow-hidden rounded-[22px] md:rounded-[28px] border border-white/10 bg-gradient-to-b from-black via-[#0d0d0d] to-black shadow-inner"
                                    onClick={() => setShowMobileLightbox(true)}
                                >
                                    <img
                                        key={`${size}-${color}`}
                                        src={heroImage}
                                        alt={`${product.title} in ${color}`}
                                        className="h-full w-full object-cover transition-none cursor-zoom-in md:cursor-default"
                                    />
                                    <motion.div
        aria-hidden
        className="absolute inset-0 rounded-[22px] md:rounded-[28px] mix-blend-soft-light"
        animate={{ backgroundColor: tintColor, opacity: 0.26 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
                                    />
                                    <div className="pointer-events-none absolute inset-0 rounded-[22px] md:rounded-[28px] shadow-[inset_0_0_120px_rgba(0,0,0,0.4)]" />
                                    <div className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs text-white/80">
                                        {size} • {color}
                                    </div>
                                    <div className="absolute left-3 right-3 bottom-3 md:left-auto md:right-4 md:bottom-4 flex flex-col items-start md:items-center md:flex-row gap-2">
                                        <span className="rounded-full bg-black/60 px-3 py-1 text-xs text-white/75">
                                            {variant?.availability_note || "Build ready"}
                                        </span>
                                        <span className="rounded-full bg-[#C1A88B] px-3 py-1 text-xs font-semibold text-black">
                                            {displayPrice ? `$${displayPrice.toLocaleString()}` : "Pricing soon"}
                                        </span>
                                        {totalUpcharge > 0 && (
                                            <span className="rounded-full bg-black/60 px-3 py-1 text-[11px] text-[#C1A88B]">
                                                +${totalUpcharge.toLocaleString()} upgrades
                                            </span>
                                        )}
                                    </div>
                                    <div className="hidden md:block">
                                        {hotspots.map((spot) => {
                                            const Icon = spot.icon || Flame;
                                            const hotspotSize =
                                                size === "XXXL (Special Edition)" ? "h-12 w-12" : "h-10 w-10";
                                            const position =
                                                hotspotPositions[spot.id]?.[size] ||
                                                hotspotPositions[spot.id]?.default ||
                                                { top: "50%", left: "50%" };
                                            return (
                                                <React.Fragment key={spot.id}>
                                                    <button
                                                        type="button"
                                                        aria-label={`${spot.label} hotspot`}
                                                        onClick={() =>
                                                            setActiveHotspot((prev) =>
                                                                prev === spot.id ? null : spot.id
                                                            )
                                                        }
                                                        className={`absolute z-20 grid ${hotspotSize} md:h-12 md:w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-black/60 ring-2 ring-[#C1A88B]/60 backdrop-blur hover:ring-[#C1A88B]`}
                                                        style={position}
                                                    >
                                                        <Icon className="h-5 w-5 text-[#C1A88B]" />
                                                    </button>
                                                    {activeHotspot === spot.id && (
                                                        <div
                                                            className="absolute z-30 min-w-[220px] -translate-x-1/2 -translate-y-full rounded-2xl border border-white/10 bg-black/80 p-4 text-left shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur"
                                                            style={{
                                                                top: `calc(${position.top} - 12px)`,
                                                                left: position.left,
                                                            }}
                                                        >
                                                            <p className="text-xs uppercase tracking-[0.14em] text-white/60">
                                                                {spot.label}
                                                            </p>
                                                            <p className="text-sm font-semibold text-white">
                                                                Select an option
                                                            </p>
                                                            <p className="mt-1 text-xs text-white/65">
                                                                {spot.description}
                                                            </p>
                                                            <div className="mt-3 flex flex-wrap gap-2">
                                                                {spot.options.map((opt) => (
                                                                    <button
                                                                        key={opt}
                                                                        onClick={() => {
                                                                            if (spot.id === "fuel") {
                                                                                setFuelType(opt);
                                                                            } else if (spot.id === "burner") {
                                                                                setStoveUpgrade(opt === "4 Burner w/ Side Stove");
                                                                            } else if (spot.id === "plumbing") {
                                                                                setPlumbing(opt === "Add Plumbing");
                                                                            } else if (spot.id === "countertop") {
                                                                                setCountertop(opt);
                                                                            }
                                                                            setActiveHotspot(null);
                                                                        }}
                                                                        className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${
                                                                            (spot.id === "fuel"
                                                                                ? fuelType === opt
                                                                                : spot.id === "burner"
                                                                                    ? stoveLabel === opt
                                                                                    : spot.id === "plumbing"
                                                                                        ? (plumbing ? opt === "Add Plumbing" : opt === "No Plumbing")
                                                                                        : spot.id === "countertop"
                                                                                            ? countertop === opt
                                                                                        : false)
                                                                                ? "border-[#C1A88B]/70 bg-[#C1A88B]/15 text-[#C1A88B]"
                                                                                : "border-white/15 bg-white/5 text-white hover:border-[#C1A88B]/40 hover:text-[#C1A88B]"
                                                                        }`}
                                                                    >
                                                                        <span className="flex items-center gap-2">
                                                                            <span>{opt}</span>
                                                                            {spot.pricing?.[opt] && (
                                                                                <span className="text-[10px] text-[#C1A88B]">
                                                                                    {spot.pricing[opt]}
                                                                                </span>
                                                                            )}
                                                                        </span>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </React.Fragment>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Finishes & actions aligned to the right under the stage */}
                    <div className="w-full max-w-4xl mx-auto">
                        <div className="space-y-5 w-full">
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

                            <div className="columns-1 md:columns-2 gap-5 [column-fill:balance]">
                                {size.includes("XXXL") && (
                                    <div className="mb-5 break-inside-avoid rounded-2xl border border-white/10 bg-white/5 p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                                                    Details
                                                </p>
                                                <h3 className="text-lg font-semibold text-white">XXXL Dimensions</h3>
                                            </div>
                                            <Sparkles className="h-5 w-5 text-[#C1A88B]" />
                                        </div>
                                        <p className="mt-2 text-sm text-white/80">
                                            Special Edition footprint to complete your outdoor kitchen experience.
                                        </p>
                                        <ul className="mt-3 space-y-1 text-sm text-white/80">
                                            <li className="font-semibold text-white">
                                                XXXL: {xxxlDimensionsFt.width}ft W | {xxxlDimensionsFt.length}ft L | {xxxlDimensionsFt.height}ft H
                                            </li>
                                            <li className="text-white/60 text-xs">
                                                ({xxxlDimensionsIn.length}" × {xxxlDimensionsIn.width}" × {xxxlDimensionsIn.height}")
                                            </li>
                                        </ul>
                                    </div>
                                )}

                                <div className="mb-5 break-inside-avoid rounded-2xl border border-white/10 bg-white/5 p-4">
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

                                <div className="mb-5 break-inside-avoid rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                                                Fuel preference
                                            </p>
                                            <h3 className="text-lg font-semibold text-white">Stove / Cooktop</h3>
                                        </div>
                                        <Flame className="h-5 w-5 text-[#C1A88B]" />
                                    </div>
                                    <p className="mt-2 text-sm text-white/70">
                                        Tap the hotspot on the image or choose below to set the fuel for your burner.
                                    </p>
                                    <p className="mt-1 text-xs text-[#C1A88B]">
                                        Choosing Natural Gas adds $150 for the hookup kit.
                                    </p>
                                    <div className="mt-3 flex flex-wrap gap-3">
                                        {["Propane", "Natural Gas"].map((opt) => (
                                            <button
                                                key={opt}
                                                onClick={() => {
                                                    setFuelType(opt);
                                                    setActiveHotspot(null);
                                                }}
                                                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                                                    fuelType === opt
                                                        ? "border-[#C1A88B]/70 bg-[#C1A88B]/15 text-[#C1A88B]"
                                                        : "border-white/15 bg-black/30 text-white hover:border-[#C1A88B]/40 hover:text-[#C1A88B]"
                                                }`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-5 break-inside-avoid rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                                                Cooking setup
                                            </p>
                                            <h3 className="text-lg font-semibold text-white">4 burner with side stove</h3>
                                        </div>
                                        <Sparkles className="h-5 w-5 text-[#C1A88B]" />
                                    </div>
                                    <p className="mt-2 text-sm text-white/70">
                                        Upgrade your burner package with side stove capability.
                                    </p>
                                    <div className="mt-3 flex flex-wrap gap-3">
                                        <button
                                            onClick={() => setStoveUpgrade(false)}
                                            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                                                !stoveUpgrade
                                                    ? "border-[#C1A88B]/70 bg-[#C1A88B]/15 text-[#C1A88B]"
                                                    : "border-white/15 bg-black/30 text-white hover:border-[#C1A88B]/40 hover:text-[#C1A88B]"
                                            }`}
                                        >
                                            Standard (Included)
                                        </button>
                                        <button
                                            onClick={() => setStoveUpgrade(true)}
                                            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                                                stoveUpgrade
                                                    ? "border-[#C1A88B]/70 bg-[#C1A88B]/15 text-[#C1A88B]"
                                                    : "border-white/15 bg-black/30 text-white hover:border-[#C1A88B]/40 hover:text-[#C1A88B]"
                                            }`}
                                        >
                                            Add +$300
                                        </button>
                                    </div>
                                </div>

                                <div className="mb-5 break-inside-avoid rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                                                Plumbing
                                            </p>
                                            <h3 className="text-lg font-semibold text-white">Water & drain prep</h3>
                                        </div>
                                        <Sparkles className="h-5 w-5 text-[#C1A88B]" />
                                    </div>
                                    <p className="mt-2 text-sm text-white/70">
                                        Add plumbing ready connections for sink integration.
                                    </p>
                                    <div className="mt-3 flex flex-wrap gap-3">
                                    <button
                                        onClick={() => setPlumbing(false)}
                                        className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                                            !plumbing
                                                ? "border-[#C1A88B]/70 bg-[#C1A88B]/15 text-[#C1A88B]"
                                                : "border-white/15 bg-black/30 text-white hover:border-[#C1A88B]/40 hover:text-[#C1A88B]"
                                        }`}
                                    >
                                        Standard (No add-on)
                                    </button>
                                    <button
                                        onClick={() => setPlumbing(true)}
                                        className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                                            plumbing
                                                ? "border-[#C1A88B]/70 bg-[#C1A88B]/15 text-[#C1A88B]"
                                                : "border-white/15 bg-black/30 text-white hover:border-[#C1A88B]/40 hover:text-[#C1A88B]"
                                        }`}
                                    >
                                        Add +$350
                                    </button>
                                </div>
                                </div>

                                <div className="mb-5 break-inside-avoid rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                                                Countertop
                                            </p>
                                            <h3 className="text-lg font-semibold text-white">Finish material</h3>
                                        </div>
                                        <Palette className="h-5 w-5 text-[#C1A88B]" />
                                    </div>
                                    <p className="mt-2 text-sm text-white/70">
                                        Choose the worktop surface that fits your style and use.
                                    </p>
                                    <div className="mt-3 flex flex-wrap gap-3">
                                        {["Stainless Steel", "Sintered Stone"].map((opt) => (
                                            <button
                                                key={opt}
                                                onClick={() => setCountertop(opt)}
                                                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                                                    countertop === opt
                                                        ? "border-[#C1A88B]/70 bg-[#C1A88B]/15 text-[#C1A88B]"
                                                        : "border-white/15 bg-black/30 text-white hover:border-[#C1A88B]/40 hover:text-[#C1A88B]"
                                                }`}
                                            >
                                                {opt === "Stainless Steel" ? "Stainless (Included)" : "Sintered Stone +$400"}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-5 break-inside-avoid rounded-2xl border border-[#C1A88B]/30 bg-[#C1A88B]/10 p-4 shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
                                    <p className="text-sm text-[#C1A88B]">Next</p>
                                    <p className="text-lg font-semibold text-white mt-1">Lock this build</p>
                                    <p className="mt-2 text-xs text-white/70">
                                        Generate a branded PDF with your size, finish, and selected options, then connect with a specialist.
                                    </p>
                                    <p className="mt-1 text-xs text-[#C1A88B]">
                                        Upgrades added: ${totalUpcharge.toLocaleString()} (included in price shown).
                                    </p>
                                    <div className="mt-3 rounded-xl border border-white/10 bg-black/30 p-3">
                                        <p className="text-[11px] uppercase tracking-[0.14em] text-white/60">
                                            Breakdown
                                        </p>
                                        <ul className="mt-2 space-y-1 text-xs text-white/80">
                                            {breakdown.map((item) => (
                                                <li key={item.label} className="flex items-center justify-between gap-2">
                                                    <span className="text-white/70">
                                                        {item.label}: <span className="text-white">{item.value}</span>
                                                    </span>
                                                    <span className={item.cost > 0 ? "text-[#C1A88B]" : "text-white/60"}>
                                                        {item.cost > 0 ? `+$${item.cost.toLocaleString()}` : "Included"}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <button
                                        onClick={handleGeneratePdf}
                                        className="mt-4 w-full rounded-full bg-[#C1A88B] px-4 py-3 text-sm font-semibold text-black shadow-lg transition hover:brightness-95"
                                    >
                                        Download PDF & Contact Specialist
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
        <MobileLightbox
            open={showMobileLightbox}
            onClose={() => setShowMobileLightbox(false)}
            image={heroImage}
            label={`${size} • ${color}`}
        />
        <SpecialistModal key="specialist-modal" open={showSpecialistModal} onClose={() => setShowSpecialistModal(false)} />
        </>
    );
}

function SpecialistModal({ open, onClose }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
            <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0d0d0d] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-[#C1A88B]">Specialist</p>
                        <h3 className="mt-1 text-xl font-semibold text-white">Talk to an Elev8 Kitchen Specialist</h3>
                        <p className="mt-1 text-sm text-white/70">
                            Share your PDF summary and we’ll finalize specs, scheduling, and payment.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/60 transition hover:text-white"
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>
                <div className="mt-4 space-y-3">
                    <a
                        href="tel:+19056930028"
                        className="block w-full rounded-full border border-[#C1A88B]/40 bg-[#C1A88B]/15 px-4 py-3 text-center text-sm font-semibold text-[#C1A88B] transition hover:border-[#C1A88B] hover:bg-[#C1A88B]/25"
                    >
                        Call a Specialist
                    </a>
                    <a
                        href="https://wa.me/19056930028?text=Hello%2C%20I%27d%20like%20to%20review%20my%20Elev8%20Kitchen%20PDF%20summary."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full rounded-full border border-white/15 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white transition hover:border-[#C1A88B]/40 hover:text-[#C1A88B]"
                    >
                        Message on WhatsApp
                    </a>
                    <a
                        href="mailto:info@elev8kitchens.com?subject=Elev8%20Kitchen%20PDF%20Summary&body=Hi%20Elev8%20team%2C%20please%20find%20my%20build%20summary%20attached%20or%20let%20me%20know%20next%20steps."
                        className="block w-full rounded-full border border-white/15 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white transition hover:border-[#C1A88B]/40 hover:text-[#C1A88B]"
                    >
                        Email a Specialist
                    </a>
                </div>
            </div>
        </div>
    );
}

function MobileLightbox({ open, onClose, image, label }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-[140] bg-black/90 backdrop-blur-sm md:hidden">
            <button
                onClick={onClose}
                className="absolute right-4 top-4 z-10 rounded-full bg-white/10 px-3 py-2 text-sm text-white"
            >
                Close
            </button>
            <div className="flex h-full w-full items-center justify-center p-4">
                <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-black">
                    {label && (
                        <div className="absolute left-3 top-3 z-10 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
                            {label}
                        </div>
                    )}
                    <img src={image} alt={label || "Preview"} className="h-full w-full object-contain" />
                </div>
            </div>
        </div>
    );
}
