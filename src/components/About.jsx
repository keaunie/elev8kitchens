// ========================
// components/About.jsx
// ========================
import React from "react";

export default function About({
    title = "About Us",
    headline = "We Build the Ultimate Outdoor Kitchen Experience",
    body = [
        "Enjoy premium materials, cutting-edge safety tech, and sleek design all-in-one modular setup.",
        "We bring luxury, function, and style to your outdoor space. With smart features and pro-level grills, the ELEV8 system turns any backyard into a modern cooking and entertainment hub.",
    ],
    cta = { label: "Order Now", href: "/products" },
    leftImage = {
        src: "https://elev8kitchens.com/cdn/shop/files/about-left.jpg?v=1",
        alt: "ELEV8 black outdoor kitchen",
    },
    rightImage = {
        src: "https://elev8kitchens.com/cdn/shop/files/about-right.jpg?v=1",
        alt: "ELEV8 light outdoor kitchen by pool",
    },
}) {
    return (
        <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
            <div className="grid items-stretch gap-6 md:grid-cols-3">
                {/* Left image */}
                <figure className="rounded-[28px] bg-[#151515] p-2 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
                    <img
                        src={leftImage.src}
                        alt={leftImage.alt}
                        className="h-full w-full rounded-[22px] object-cover"
                        loading="lazy"
                        decoding="async"
                    />
                </figure>

                {/* Center card */}
                <div className="relative rounded-[36px] bg-[#151515] px-8 py-10 text-center shadow-[0_12px_40px_rgba(0,0,0,0.55)] md:px-10 md:py-12">
                    <h2 className="text-3xl font-serif text-[#C1A88B] md:text-4xl">{title}</h2>
                    <p className="mx-auto mt-4 max-w-xl text-base font-semibold text-white md:text-lg">
                        {headline}
                    </p>
                    <div className="mx-auto mt-4 max-w-xl space-y-4 text-sm leading-7 text-white/85 md:text-base">
                        {body.map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </div>

                    {cta?.label && (
                        <a
                            href={cta.href || "#"}
                            className="mx-auto mt-8 inline-flex items-center rounded-full bg-[#C1A88B] px-6 py-3 text-sm font-medium text-black shadow-lg transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1A88B]/60"
                        >
                            {cta.label}
                        </a>
                    )}

                    {/* Subtle rounded highlight behind */}
                    <div className="pointer-events-none absolute -left-6 -right-6 -bottom-6 -top-6 -z-10 rounded-[48px] bg-black/20" />
                </div>

                {/* Right image */}
                <figure className="rounded-[28px] bg-[#151515] p-2 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
                    <img
                        src={rightImage.src}
                        alt={rightImage.alt}
                        className="h-full w-full rounded-[22px] object-cover"
                        loading="lazy"
                        decoding="async"
                    />
                </figure>
            </div>
        </section>
    );
}