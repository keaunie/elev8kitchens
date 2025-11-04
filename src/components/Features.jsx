
// ========================
// components/FeaturesSection.jsx
// ========================
import React from "react";

/**
 * FeaturesSection — Four feature cards with images and copy
 * - Kicker + Title centered
 * - 1/2/4 responsive grid
 * - Brand gold accents (#C1A88B)
 */
export default function FeaturesSection({ title, kicker, features = [], cta }) {
    const items = features.length ? features : defaultFeatures;

    return (
        <section className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">
            {/* Kicker */}
            {kicker && (
                <p className="text-center text-xs tracking-[0.25em] text-[#C1A88B]">
                    {kicker.toUpperCase()}
                </p>
            )}

            {/* Title */}
            {title && (
                <h2 className="mt-3 text-center text-3xl font-light text-white md:text-5xl">
                    {title}
                </h2>
            )}

            {/* Cards */}
            <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2 lg:grid-cols-4">
                {items.map((f, i) => (
                    <article
                        key={i}
                        className="rounded-3xl bg-[#191919] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.45)] ring-1 ring-white/5"
                    >
                        <div className="overflow-hidden rounded-2xl">
                            <img
                                src={f.image}
                                alt={f.alt || f.title}
                                className="h-56 w-full object-cover"
                                loading={i === 0 ? "eager" : "lazy"}
                                decoding="async"
                            />
                        </div>

                        <h3 className="mt-6 text-xl font-semibold text-[#C1A88B]">
                            {f.title}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-white/85">{f.description}</p>
                    </article>
                ))}
            </div>

            {/* CTA */}
            {cta && (
                <div className="mt-10 flex justify-center">
                    <a
                        href={cta.href || "#"}
                        className="inline-flex items-center rounded-full bg-[#C1A88B] px-6 py-3 text-sm font-medium text-black shadow-lg transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1A88B]/60"
                    >
                        {cta.label}
                    </a>
                </div>
            )}
        </section>
    );
}

const defaultFeatures = [
    {
        title: "Safety & Innovation",
        description:
            "Hydraulic doors, gas‑leak detection, and a dedicated 60‑amp safety panel for worry‑free outdoor cooking.",
        image:
            "https://res.cloudinary.com/dczzibbkw/image/upload/v1762286603/NF-101_12_copy_on3yzt.webp",
        alt: "Outdoor kitchen with hydraulic doors",
    },
    {
        title: "Premium Grilling Station",
        description:
            "6‑burner pro grill with rotisserie for even heat, bold sear, and chef‑level results.",
        image:
            "https://res.cloudinary.com/dczzibbkw/image/upload/v1762286609/NF-101_15_1_copy_l9li1j.webp",
        alt: "Professional grill setup",
    },
    {
        title: "Smart Entertainment",
        description:
            "26\"–42\" Smart TV plus integrated Bluetooth speakers for games, recipes, and music while you cook.",
        image:
            "https://res.cloudinary.com/dczzibbkw/image/upload/v1762286600/k3_copy_rc9jcp.webp",
        alt: "Modern outdoor kitchen beside pool",
    },
    {
        title: "Storage & Style",
        description:
            "Fridge, soft‑close drawers, wine rack, and hidden trash keep the space organized and refined.",
        image:
            "https://res.cloudinary.com/dczzibbkw/image/upload/v1762286609/NF-101_25_copy_phd0or.webp",
        alt: "Cabinetry with premium finishes",
    },
];