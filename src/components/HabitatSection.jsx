import React from "react";

export default function HabitatSection() {
    return (
        <section className="relative w-full bg-white py-10 sm:py-12 lg:py-14 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#f5f5f5] to-white" />

            {/* Top Title & Subtitle */}
            <div className="relative z-10 text-center px-4">
                <h2 className="text-2xl md:text-4xl font-serif text-[#C1A88B]">
                    START YOUR MODULAR JOURNEY WITH US.
                </h2>

                <p className="mx-auto mt-3 max-w-2xl text-base sm:text-lg text-neutral-700 leading-relaxed">
                    At <span className="font-semibold text-black">Habitat28</span>, we blend modern design,
                    smart home technology, and eco-friendly materials to create sustainable living spaces.
                </p>
            </div>

            {/* IMAGE + LOGO SIDE BY SIDE */}
            <div className="relative z-10 mx-auto mt-10 max-w-6xl px-4 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-10 items-center">

                {/* LEFT: Logo */}
                <div className="flex justify-center md:justify-start">
                    <img
                        src="https://habitat28.com/wp-content/uploads/2024/06/Black-background-High-resolutionTM-1.png"
                        alt="Habitat28 logo"
                        className="
                            w-auto
                            h-14 sm:h-16 md:h-20 lg:h-24
                            object-contain 
                            transition-transform duration-300 hover:scale-105
                        "
                        loading="lazy"
                        decoding="async"
                    />
                </div>

                {/* RIGHT: Modular Unit Image */}
                <a
                    href="https://habitat28.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block w-full"
                >
                    <img
                        src="https://habitat28.com/wp-content/uploads/2024/06/Enscape_2023-11-22-09-24-13_Scene-16.png"
                        alt="Habitat28 Modular Unit"
                        className="
                            w-full rounded-2xl object-cover 
                            transition-transform duration-700 
                            group-hover:scale-[1.02] 
                            group-hover:brightness-105
                        "
                        loading="lazy"
                        decoding="async"
                    />
                </a>
            </div>

            {/* CTA */}
            <div className="relative z-10 mt-10 text-center">
                <a
                    href="https://habitat28.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        inline-flex items-center rounded-full bg-[#C1A88B] px-8 py-3 
                        text-sm font-medium text-black shadow-lg
                        transition-transform duration-300 
                        hover:scale-105 hover:brightness-95
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1A88B]/60
                    "
                >
                    Learn More About Habitat 28
                </a>
            </div>
        </section>
    );
}
