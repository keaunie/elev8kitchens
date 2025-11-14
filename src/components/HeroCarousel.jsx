// ========================
// components/HeroCarousel.jsx
// ========================
import { useEffect, useRef, useState } from "react";

export default function HeroCarousel({ slides = [], interval = 6000 }) {
  const [index, setIndex] = useState(0);
  const wrap = (i) => (i + slides.length) % slides.length;
  const timerRef = useRef(null);
  const startX = useRef(null);
  const containerRef = useRef(null);

  const go = (i) => setIndex(wrap(i));

  useEffect(() => {
    if (slides.length < 2) return;
    timerRef.current && clearInterval(timerRef.current);
    timerRef.current = setInterval(() => go(index + 1), interval);
    return () => clearInterval(timerRef.current);
  }, [index, interval, slides.length]);

  const pause = () => timerRef.current && clearInterval(timerRef.current);

  const onPointerDown = (e) => {
    startX.current = e.clientX ?? e.touches?.[0]?.clientX;
  };
  const onPointerUp = (e) => {
    const endX = e.clientX ?? e.changedTouches?.[0]?.clientX;
    if (startX.current == null || endX == null) return;
    const dx = endX - startX.current;
    if (Math.abs(dx) > 40) {
      go(index + (dx < 0 ? 1 : -1));
    }
    startX.current = null;
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") go(index + 1);
    if (e.key === "ArrowLeft") go(index - 1);
  };

  return (
    <section
      className="relative w-full select-none"
      aria-roledescription="carousel"
      onMouseEnter={pause}
      onMouseLeave={() => (timerRef.current = setInterval(() => go(index + 1), interval))}
      onKeyDown={onKeyDown}
      tabIndex={0}
      ref={containerRef}
    >
      <div
        className="relative overflow-hidden"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchEnd={onPointerUp}
      >
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div key={i} className="relative h-[70vh] md:h-[78vh] w-full shrink-0">
              <img
                src={s.image}
                alt={s.alt || s.title || `Slide ${i + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              {/* Dark-to-transparent gradient for left overlay readability */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

              {/* Left overlay content */}
              <div className="relative z-10 flex h-full items-center">
                <div className="mx-auto w-full max-w-7xl px-6">
                  <div className="max-w-lg">
                    {s.kicker && (
                      <p className="text-xs font-medium tracking-widest text-[#C1A88B]/90">
                        {s.kicker}
                      </p>
                    )}
                    {s.title && (
                      <h2 className="mt-2 text-3xl font-light text-white md:text-5xl">
                        {s.title}
                      </h2>
                    )}
                    {s.subtitle && (
                      <p className="mt-3 text-sm text-white/80 md:text-base">
                        {s.subtitle}
                      </p>
                    )}
                    {s.cta && (
                      <a
                        href={s.href || "#"}
                        className="mt-6 inline-flex items-center rounded-full border border-[#C1A88B] px-5 py-2 text-sm font-medium text-[#C1A88B] transition hover:bg-[#C1A88B] hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1A88B]/50"
                      >
                        {s.cta}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          aria-label="Previous slide"
          onClick={() => go(index - 1)}
          className="
            absolute left-2 sm:left-4
            bottom-16
            xl:bottom-auto xl:top-1/2 xl:-translate-y-1/2
            rounded-full border border-white/20 bg-black/30 p-2 text-white
            backdrop-blur transition hover:bg-black/60
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1A88B]/60
          "
        >
          ‹
        </button>
        <button
          aria-label="Next slide"
          onClick={() => go(index + 1)}
          className="
            absolute right-2 sm:right-4
            bottom-16
            xl:bottom-auto xl:top-1/2 xl:-translate-y-1/2
            rounded-full border border-white/20 bg-black/30 p-2 text-white
            backdrop-blur transition hover:bg-black/60
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1A88B]/60
          "
        >
          ›
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-6 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => go(i)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === index ? "bg-[#C1A88B]" : "bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
