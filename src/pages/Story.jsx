import React from "react";
import { motion } from "framer-motion";
import TeamHero from "../components/TeamHero.jsx";

/** Split layout with image (left or right) + rich text */
function SectionSplit({
    title,
    image,
    reverse = false,
    children,
    caption,
}) {
    return (
        <div className="mx-auto w-full">
            <div
                className={[
                    "grid items-center gap-8 lg:gap-12",
                    "lg:grid-cols-12",
                    reverse ? "lg:[&>*:first-child]:order-2" : "",
                ].join(" ")}
            >
                {/* Image block */}
                <motion.figure
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="lg:col-span-5"
                >
                    <div className="group relative overflow-hidden rounded-[28px] ring-1 ring-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.55)]">
                        <img
                            src={image}
                            alt={title}
                            className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]"
                        />
                        {/* subtle left→right mask for a premium finish */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent" />
                        {/* vignette */}
                        <div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_0_80px_rgba(0,0,0,0.35)]" />
                        {caption && (
                            <figcaption className="pointer-events-none absolute bottom-2 right-3 rounded-full bg-black/45 px-3 py-1 text-xs text-white/85 backdrop-blur">
                                {caption}
                            </figcaption>
                        )}
                    </div>
                </motion.figure>

                {/* Copy block */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="lg:col-span-7"
                >
                    <h2 className="font-heading text-3xl md:text-5xl text-[#C1A88B]">
                        {title}
                    </h2>
                    <div className="mt-5 space-y-5 font-body text-white/85 leading-7 md:text-[17px]">
                        {children}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}


export default function Story() {
    return (
        <section className="relative bg-black text-white">
            {/* Ambient gold glows (page background) */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-[#C1A88B]/10 blur-3xl" />
                <div className="absolute right-10 bottom-10 h-72 w-72 rounded-full bg-[#C1A88B]/10 blur-3xl" />
            </div>

            {/* Page intro (centered) */}
            <div className="mx-auto max-w-6xl px-6 pt-24 md:pt-32">
                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="font-heading text-center text-4xl md:text-6xl text-[#C1A88B]"
                >
                    About Us
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mx-auto mt-4 max-w-2xl text-center text-white/80 font-body"
                >
                    Crafting luxury modular outdoor kitchens built for performance,
                    durability, and style.
                </motion.p>
            </div>

            {/* Body sections (centered container) */}
            <div className="mx-auto max-w-6xl px-6 py-16 md:py-20 space-y-14">
                <SectionSplit
                    title="Our Origin"
                    image="https://res.cloudinary.com/dczzibbkw/image/upload/v1762285478/hero1_pbo5gx.webp"
                    caption="ELEV8 Anthracite — Hydraulic canopy shown"
                >
                    <p>
                        ELEV8 Kitchens was born from a simple idea: the best memories are made
                        around great food and they shouldn’t be limited to the indoors. As part
                        of the <strong className="text-white">Habitat28</strong> family, we’ve
                        applied our proven expertise in{" "}
                        <strong className="text-white">modular design</strong> to the outdoors,
                        crafting <strong className="text-white">luxury modular outdoor kitchens</strong>{" "}
                        built for performance, durability, and style.
                    </p>
                    <p>
                        Each ELEV8 kitchen transforms your backyard into a gourmet cooking
                        space, blending modern design with premium materials to bring the heart
                        of the home outdoors.
                    </p>
                </SectionSplit>

                <Section
                    kicker="Built in Canada. Designed for Everywhere."
                    copy={`Each ELEV8 Modular Outdoor Kitchen is proudly built in Canada using commercial-grade stainless steel and engineered to thrive through harsh winters, summer BBQs, and everything in between. With E-SAFE Certification, plug-and-play installation, and luxury finishes, ELEV8 Kitchens deliver the perfect blend of durability, performance, and designer style.`}
                />

                <Section
                    kicker="More Than a BBQ"
                    copy={`This isn’t your average grill setup — it’s a complete outdoor culinary system. Every ELEV8 kitchen can include integrated fridges, LED lighting, Bluetooth speakers, Smart TVs, ample storage, sinks, and even hydraulic doors, transforming your patio or backyard into a high-end entertainment space built for every season.`}
                />

                <Section
                    kicker="Why ELEV8?"
                    copy={`Because cooking outdoors should never mean compromising on convenience, aesthetics, or quality. Our team at ELEV8 obsesses over craftsmanship, functionality, and design flow, ensuring every outdoor kitchen is as stunning as it is smart.`}
                />

                <blockquote className="rounded-2xl bg-[#111]/60 p-8 ring-1 ring-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
                    <p className="font-heading text-2xl text-[#C1A88B]">
                        Join the Outdoor Revolution
                    </p>
                    <p className="mt-3 font-body text-white/85">
                        From Sunday brunches to evening wine nights or full backyard
                        parties, ELEV8 Kitchens bring the soul of indoor living outdoors.
                        Experience bold design, seamless performance, and an unmatched
                        outdoor cooking experience, crafted for those who demand more from
                        their space.
                    </p>
                </blockquote>
            </div>

            {/* ===== Full-bleed TeamHero (edge-to-edge) ===== */}
            <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] my-8">
                <TeamHero
                    image="https://elev8kitchens.com/cdn/shop/files/habitat28-team-1024x674.jpg?v=1748054711&width=3840"
                    title="Our Team"
                    subtitle="The craft, the precision, the people behind ELEV8 Kitchens"
                />
            </div>
            {/* ============================================= */}
        </section>
    );
}

function Section({ kicker, copy }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-[#0f0f0f]/70 p-6 md:p-8 ring-1 ring-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
        >
            <p className="font-heading text-sm tracking-[0.2em] text-[#C1A88B]/90">
                {kicker?.toUpperCase()}
            </p>
            <p className="mt-3 font-body text-[15px] leading-7 text-white/85">
                {copy}
            </p>
        </motion.div>
    );
}
