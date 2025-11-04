import React from "react";

export default function HabitatSection() {
    return (
        <section className="relative w-full bg-white py-20 overflow-hidden">
            {/* Background accent */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#f5f5f5] to-white" />

            {/* === LOGO pinned to the top-left of the SECTION === */}
            <a
                href="https://habitat28.com"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-4 top-4 sm:left-6 sm:top-6 lg:left-10 lg:top-8 z-20"
                aria-label="Habitat28"
            >
                <img
                    src="https://habitat28.com/wp-content/uploads/2024/06/Black-background-High-resolutionTM-1.png"
                    alt="Habitat28 logo"
                    className="h-9 w-auto sm:h-11 lg:h-14 object-contain transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                />
            </a>

            {/* Centered content; add padding-top so it doesn't collide with the logo */}
            <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 sm:pt-20 lg:pt-24 text-center">
                <h2 className="text-3xl md:text-5xl font-serif text-[#C1A88B]">
                    START YOUR MODULAR JOURNEY WITH US.
                </h2>

                <p className="mx-auto mt-4 max-w-3xl text-lg text-neutral-700 leading-relaxed">
                    At <span className="font-semibold text-black">Habitat28</span>, we blend modern design,
                    smart home technology, and eco-friendly materials to create sustainable living spaces.
                </p>

                <a
                    href="https://habitat28.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative mt-10 block w-full"
                >
                    <img
                        src="https://habitat28.com/wp-content/uploads/2024/06/Enscape_2023-11-22-09-24-13_Scene-16.png"
                        alt="Habitat28 Modular Unit"
                        className="mx-auto w-full max-w-6xl rounded-2xl object-cover transition-transform duration-700 group-hover:scale-[1.02] group-hover:brightness-105"
                        loading="lazy"
                        decoding="async"
                    />
                </a>

                <div className="mt-10">
                    <a
                        href="https://habitat28.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-full bg-[#C1A88B] px-8 py-3 text-sm font-medium text-black shadow-lg transition-transform duration-300 hover:scale-105 hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1A88B]/60"
                    >
                        Learn More About Habitat 28
                    </a>
                </div>
            </div>
        </section>
    );
}
