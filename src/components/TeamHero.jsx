import React from "react";
import { motion } from "framer-motion";

export default function TeamHero({
    image = "https://res.cloudinary.com/dczzibbkw/image/upload/v1762285478/your-team-photo.webp",
    title = "Our Team",
    subtitle = "The craft, the precision, the people behind ELEV8 Kitchens",
}) {
    return (
        <section className="relative isolate w-full min-h-[100svh] bg-black text-white overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center bg-black">
                <img
                    src={image}
                    alt={title}
                    className="
            h-full w-full
            object-contain     /* keep full image visible */
            md:object-cover
            transition-all duration-[1200ms]
            scale-100 md:scale-105
          "
                    loading="eager"
                    decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80" />
            </div>

            {/* Floating gold shimmer */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 opacity-40"
            >
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%222%22 height=%222%22><circle cx=%221%22 cy=%221%22 r=%220.5%22 fill=%22%23C1A88B%22 fill-opacity=%220.15%22/></svg>')]"></div>
            </div>

            {/* Text content (moved upward) */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-16 md:pt-20 lg:pt-24">
                <motion.h1
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="font-heading text-4xl sm:text-5xl md:text-6xl text-[#C1A88B] mb-2"
                >
                    {title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="max-w-2xl font-body text-white/90 text-[15px] sm:text-[17px] leading-relaxed"
                >
                    {subtitle}
                </motion.p>
            </div>

            {/* Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute bottom-[8%] left-1/2 -translate-x-1/2 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
                <a
                    href="/consultation"
                    className="
            inline-flex items-center justify-center rounded-full
            bg-[#C1A88B] px-6 py-3 text-[15px] font-medium text-black
            shadow-[0_10px_30px_rgba(0,0,0,0.35)]
            ring-1 ring-black/10 transition hover:brightness-95
          "
                >
                    Book a Visit
                </a>

                <a
                    href="/story#makers"
                    className="
            inline-flex items-center justify-center rounded-full
            bg-white/10 px-6 py-3 text-[15px] font-medium text-white
            backdrop-blur-sm ring-1 ring-white/20 transition hover:bg-white/15
          "
                >
                    Meet the Makers
                </a>
            </motion.div>

        </section>
    );
}
