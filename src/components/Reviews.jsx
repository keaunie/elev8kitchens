// ========================
// components/Reviews.jsx
// ========================
import React from "react";


export default function Reviews({
    title = "See What Our Customers Are Saying",
    items = defaultReviews,
}) {
    return (
        <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
            <h2 className="text-center text-3xl font-light text-white md:text-5xl">
                {title}
            </h2>


            <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2">
                {items.map((r, i) => (
                    <figure
                        key={i}
                        className="rounded-2xl bg-[#141414] p-8 text-center shadow-[0_10px_30px_rgba(0,0,0,0.45)] ring-1 ring-white/5 md:p-10"
                    >
                        {r.headline && (
                            <figcaption className="font-serif text-xl italic text-white/90">
                                “{r.headline}”
                            </figcaption>
                        )}


                        <blockquote className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/85 md:text-lg md:leading-8">
                            {r.quote}
                        </blockquote>


                        <div className="mt-6 space-y-1 text-white/80">
                            <p className="font-semibold">-{r.author}</p>
                            <p className="text-sm italic opacity-80">Verified Buyer</p>
                        </div>
                    </figure>
                ))}
            </div>
        </section>
    );
}


const defaultReviews = [
    {
        headline: "Backyard Centerpiece",
        quote:
            "I wasn’t sure it was worth the investment until we hosted our first BBQ. Everyone was blown away. The smart TV, the lighting, the finish… it’s more than a grill it’s an experience.",
        author: "James P.",
    },
    {
        headline: "Built like a tank",
        quote:
            "Living in Canada means crazy weather swings, but this kitchen hasn't flinched once. Rain, snow, heat—everything still works and looks flawless. True craftsmanship.",
        author: "Samantha R.",
    },
    {
        headline: "My favorite place to be",
        quote:
            "I used to avoid cooking outdoors. Now, I start my evenings with a glass of wine, music on the speakers, and the grill going. It turned my backyard into my sanctuary.",
        author: "Daniel K.",
    },
    {
        headline: "More than I expected",
        quote:
            "I was hesitant at first, but the quality is unmatched. The marble, the soft‑close drawers, even the lighting—it’s like having a luxury kitchen outdoors.",
        author: "Priya R.",
    },
];