import React from "react";

export default function HabitatSection() {
    return (
        <section className="relative w-full bg-[#FDFDFD] py-8 sm:py-9 lg:py-10 overflow-hidden">

            {/* BACKGROUND GRADIENT */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#f7f7f7] to-[#ffffff]" />

            {/* VIGNETTE SPOTLIGHT EFFECT */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle at center, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.2) 100%)",
                }}
            />


            <div className="relative z-10 mx-auto max-w-6xl px-4">

                {/* TOP: Logo + Title/Subtitle */}
                <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-6">

                    {/* Larger Logo */}
                    <div className="shrink-0">
                        <img
                            src="https://habitat28.com/wp-content/uploads/2024/06/Black-background-High-resolutionTM-1.png"
                            alt="Habitat28 logo"
                            className="
                                w-auto
                                h-12 sm:h-14 md:h-16 lg:h-20
                                object-contain
                                transition-transform duration-300 hover:scale-105
                            "
                            loading="lazy"
                            decoding="async"
                        />
                    </div>

                    {/* Title + Subtitle */}
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl md:text-4xl font-serif text-[#C1A88B]">
                            START YOUR MODULAR JOURNEY WITH US.
                        </h2>

                        <p className="mt-2 max-w-2xl text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed md:mt-3">
                            At <span className="font-semibold text-black">Habitat28</span>, we blend modern design,
                            smart home technology, and eco-friendly materials to create sustainable living spaces.
                        </p>
                    </div>
                </div>

                {/* IMAGE */}
                <a
                    href="https://habitat28.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-6 sm:mt-8 block w-full"
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

                {/* CTA */}
                <div className="mt-6 sm:mt-7 text-center">
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
            </div>
        </section>
    );
}
