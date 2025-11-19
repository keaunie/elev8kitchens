// AboutUsResponsive.jsx
// Renders Desktop/Tablet on md+ and Mobile on smaller screens.
// Uses your two implementations verbatim, namespaced to avoid conflicts.

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import TeamHero from "../components/TeamHero.jsx";


import img0102 from "../assets/IMG_0102.jpg";
import img0108 from "../assets/IMG_0108.jpg";
import img0128 from "../assets/IMG_0128.jpg";
import img0130 from "../assets/IMG_0130.jpg";
import img0140 from "../assets/IMG_0140.jpg";
import img0153 from "../assets/IMG_0153.jpg";

/* =========================================================
   ===============  DESKTOP / TABLET VERSION  ==============
   ========================================================= */

function DT_TiltImage({ img, onOpen, index, className = "", children, align = "left" }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el || !e?.clientX) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(py - 0.5) * -8}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * 8}deg`);
    el.style.setProperty("--mx", `${(px - 0.5) * 28}px`);
    el.style.setProperty("--my", `${(py - 0.5) * 28}px`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
    el.style.setProperty("--mx", `0px`);
    el.style.setProperty("--my", `0px`);
  };

  return (
    <motion.figure
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={() => onOpen?.(index)}
      className={[
        "group relative cursor-pointer overflow-hidden",
        "rounded-2xl md:rounded-[28px]",
        "ring-1 ring-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.55)]",
        className,
      ].join(" ")}
      style={{
        transform: "perspective(1000px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
      }}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: 0.05 * (index ?? 0) }}
    >
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-auto">
        <img
          src={img.src}
          alt={img.alt}
          className="h-full w-full object-cover md:rounded-[22px]"
          loading="lazy"
          decoding="async"
          style={{ transform: "translate3d(var(--mx,0px), var(--my,0px), 0)" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent md:from-black/60 md:via-black/10" />
        <div className="pointer-events-none absolute inset-0 md:rounded-[28px] shadow-[inset_0_0_80px_rgba(0,0,0,0.35)]" />

        {children && (
          <div
            className={[
              "pointer-events-none absolute inset-0 flex items-end",
              align === "right" ? "justify-end" : "justify-start",
              "p-3 sm:p-5 md:p-8",
            ].join(" ")}
          >
            <div
              className={[
                "pointer-events-auto shadow-[0_10px_35px_rgba(0,0,0,0.45)] ring-1 ring-white/10",
                "rounded-xl md:rounded-2xl",
                "w-[92%] sm:w-[88%] md:w-auto",
                align === "right" ? "text-right ml-auto" : "text-left mr-auto",
                "bg-black/45 backdrop-blur-[6px] md:backdrop-blur-md",
                "px-4 py-3 sm:px-5 sm:py-4 md:p-6",
              ].join(" ")}
            >
              {children}
            </div>
          </div>
        )}

        <div className="hidden sm:flex pointer-events-none absolute right-3 top-3 items-center gap-1 rounded-full bg-black/45 px-2 py-1 text-xs text-white backdrop-blur">
          <Maximize2 size={14} />
          <span>View</span>
        </div>
      </div>
    </motion.figure>
  );
}

function DT_Lightbox({ images, index, onClose, onPrev, onNext }) {
  const img = images[index];
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
        >
          <X />
        </button>
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
        >
          <ChevronRight />
        </button>
        <motion.img
          key={img?.src}
          src={img?.src}
          alt={img?.alt}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="mx-6 max-h-[82vh] w-auto rounded-2xl shadow-2xl"
        />
      </motion.div>
    </AnimatePresence>
  );
}

function DT_SectionSplit({ title, image, reverse = false, children, caption, onOpen, index }) {
  return (
    <div className="mx-auto w-full">
      <div className="grid items-center gap-6 sm:gap-8 lg:gap-12 lg:grid-cols-12">
        <div className="lg:col-span-12">
          <DT_TiltImage
            img={{ src: image, alt: title || "image" }}
            onOpen={onOpen}
            index={index}
            align={reverse ? "right" : "left"}
          >
            {title && (
              <h2 className="font-heading text-[22px] sm:text-3xl md:text-5xl text-[#C1A88B] mb-2 md:mb-3">
                {title}
              </h2>
            )}
            <div className="font-body text-white/90 text-[15px] sm:text-[16px] md:text-[17px] leading-6 sm:leading-7">
              {children}
            </div>
            {caption && <p className="mt-3 text-xs text-white/70">{caption}</p>}
          </DT_TiltImage>
        </div>
      </div>
    </div>
  );
}

function DesktopTablet() {
  // ----- shared data (same as your original) -----
  const pool = [
    {
      src: "https://res.cloudinary.com/dczzibbkw/image/upload/v1762286610/Untitled_Design_-_1_copy_tana54.webp",
      alt: "ELEV8 Anthracite — Hydraulic canopy shown",
    },
    {
      src: "https://res.cloudinary.com/dczzibbkw/image/upload/v1762286609/NF-101_25_copy_phd0or.webp",
      alt: "ELEV8 marble worktop with gold fixtures",
    },
    {
      src: "https://res.cloudinary.com/dczzibbkw/image/upload/v1762286609/NF-101_20_copy_m8kfku.webp",
      alt: "ELEV8 island module with premium grill",
    },
    {
      src: "https://res.cloudinary.com/dczzibbkw/image/upload/v1762286609/NF-101_17_copy_vrkn4s.webp",
      alt: "ELEV8 light outdoor kitchen by pool",
    },
    {
      src: "https://res.cloudinary.com/dczzibbkw/image/upload/v1762286609/NF-101_15_1_copy_l9li1j.webp",
      alt: "ELEV8 charcoal finish closeup",
    },
  ];

  const pairedBlocks = [
    {
      title: "Our Origin",
      copy: (
        <>
          ELEV8 Kitchens was born from a simple idea: the best memories are made around great food and they shouldn’t be
          limited to the indoors. As part of the <strong className="text-white">Habitat28</strong> family, we’ve applied
          our proven expertise in <strong className="text-white">modular design</strong> to the outdoors.
        </>
      ),
      caption: "ELEV8 — Hydraulic canopy shown",
    },
    {
      title: "",
      copy: (
        <>
          We craft <strong className="text-white">luxury modular outdoor kitchens</strong> built for performance,
          durability, and style. Each ELEV8 kitchen transforms your backyard into a gourmet cooking space, blending
          modern design with premium materials to bring the heart of the home outdoors.
        </>
      ),
      caption: "",
    },
  ];

  const featureRows = [
    {
      kicker: "Built For Canada & U.S.A Harsh Weather. Designed for Anywhere.",
      copy:
        "Each ELEV8 Modular Outdoor Kitchen is designed to withstand the harsh climates of Canada and the U.S., using commercial-grade stainless steel and engineered to thrive through harsh winters, summers, and everything in between. With UL Certified Components, plug-and-play installation, and luxury finishes, ELEV8 Kitchens deliver the perfect blend of durability, performance, and designer style.",
    },
    {
      kicker: "More Than a BBQ",
      copy:
        "This isn’t your average grill setup — it’s a complete outdoor culinary system. Every ELEV8 kitchen can include integrated fridges, LED lighting, Bluetooth speakers, Smart TVs, ample storage, sinks, and even hydraulic doors, transforming your patio or backyard into a high-end entertainment space built for every season.",
    },
    {
      kicker: "Why ELEV8?",
      copy:
        "Because cooking outdoors should never mean compromising on convenience, aesthetics, or quality. Our team at ELEV8 obsesses over craftsmanship, functionality, and design flow, ensuring every outdoor kitchen is as stunning as it is smart.",
    },
  ];

  const used = new Set();
  const takeImage = (start = 0) => {
    for (let i = start; i < pool.length; i++) {
      const it = pool[i];
      if (!used.has(it.src)) {
        used.add(it.src);
        return it;
      }
    }
    return pool[0];
  };

  const pairedWithImages = pairedBlocks.map((b, i) => ({ ...b, img: takeImage(i) }));
  const featuresWithImages = featureRows.map((f) => ({ ...f, img: takeImage() }));

  const lightboxImages = Array.from(
    new Map(
      [...pairedWithImages.map((x) => x.img), ...featuresWithImages.map((x) => x.img)].map((o) => [o.src, o])
    ).values()
  );
  const indexBySrc = (src) => lightboxImages.findIndex((x) => x.src === src);
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-24 md:pt-32">
        <motion.h1
          className="font-heading text-center text-4xl md:text-6xl text-[#C1A88B]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About Us
        </motion.h1>
        <motion.p
          className="mx-auto mt-4 max-w-2xl text-center text-white/80 font-body"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Crafting luxury modular outdoor kitchens built for performance, durability, and style.
        </motion.p>
      </div>

      <div className="mx-auto max-w-6xl space-y-10 sm:space-y-14 px-4 sm:px-6 py-14 md:py-20">
        {pairedWithImages.map((b, i) => (
          <DT_SectionSplit
            key={i}
            title={b.title}
            image={b.img.src}
            caption={b.caption}
            reverse={i % 2 === 1}
            onOpen={() => setOpenIndex(indexBySrc(b.img.src))}
            index={i}
          >
            <p>{b.copy}</p>
          </DT_SectionSplit>
        ))}

        {featuresWithImages.map((f, i) => (
          <DT_TiltImage
            key={`f-${i}`}
            img={f.img}
            index={i + 4}
            onOpen={() => setOpenIndex(indexBySrc(f.img.src))}
            align={i % 2 ? "right" : "left"}
            className="mt-8"
          >
            <p className="font-heading text-sm tracking-[0.2em] text-[#C1A88B]/90">
              {f.kicker.toUpperCase()}
            </p>
            <p className="mt-2 font-body text-[15px] leading-7 text-white/90">{f.copy}</p>

            {f.kicker.startsWith("Built For Canada") && (
              <div className="mt-4 flex items-center gap-3">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/UL_Mark.svg/512px-UL_Mark.svg.png?20160322023709"
                  alt="UL Certification"
                  className="h-10 w-auto md:h-12 opacity-90 drop-shadow-[0_0_10px_rgba(193,168,139,0.45)] transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <span className="text-white/70 text-sm md:text-base tracking-wide">
                  UL Certified Components for Safety & Performance
                </span>
              </div>
            )}
          </DT_TiltImage>
        ))}

        <blockquote className="rounded-2xl bg-[#111]/60 p-8 ring-1 ring-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
          <p className="font-heading text-2xl text-[#C1A88B]">Join the Outdoor Revolution</p>
          <p className="mt-3 font-body text-white/85">
            From Sunday brunches to evening wine nights or full backyard parties, ELEV8 Kitchens bring the soul of
            indoor living outdoors. Experience bold design, seamless performance, and an unmatched outdoor cooking
            experience, crafted for those who demand more from their space.
          </p>
        </blockquote>
      </div>

      {/* Full-bleed masonry hero */}
      <div className="relative left-1/2 right-1/2 my-12 w-screen -ml-[50vw] -mr-[50vw]">

        {/* Masonry grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 h-[55vh] overflow-hidden">

          {/* Column 1 */}
          <div className="flex flex-col gap-3">
            <img
              src="./assets/IMG_0128.jpg"
              className="h-full w-full object-cover rounded-xl"
              alt="Team Image 1"
            />
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-3">
            <img
              src="https://elev8kitchen.netlify.app/assets/IMG_0108-D9c-14nd.jpg"
              className="h-[60%] w-full object-cover rounded-xl"
              alt="Team Image 2"
            />
            <img
              src="https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&q=80&w=2400"
              className="h-[40%] w-full object-cover rounded-xl"
              alt="Team Image 3"
            />
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-3">
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&q=80&w=2400"
              className="h-[45%] w-full object-cover rounded-xl"
              alt="Team Image 4"
            />
            <img
              src="https://images.unsplash.com/photo-1518609571773-39b7d303a6b8?auto=format&q=80&w=2400"
              className="h-[55%] w-full object-cover rounded-xl"
              alt="Team Image 5"
            />
            <button
              onClick={() => window.location.href = "/booking"} // <-- change link if needed
              className="
    mt-6
    rounded-full
    bg-[#C1A88B]
    px-8
    py-3
    text-black
    font-medium
    text-sm
    leading-none
    shadow-[0_4px_20px_rgba(0,0,0,0.4)]
    hover:brightness-95
    hover:shadow-[0_8px_28px_rgba(0,0,0,0.55)]
    transition-all
    duration-300
  "
            >
              BOOK NOW
            </button>

          </div>
        </div>

        {/* Centered overlay text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[1px]">
          <h2 className="text-4xl md:text-5xl font-semibold text-white drop-shadow-lg">
            Our Team
          </h2>
          <p className="mt-2 text-white/85 max-w-xl text-center text-sm md:text-base">
            The craft, the precision, the people behind ELEV8 Kitchens
          </p>
        </div>
      </div>


      {openIndex !== null && (
        <DT_Lightbox
          images={lightboxImages}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onPrev={() => setOpenIndex((i) => (i === 0 ? lightboxImages.length - 1 : (i ?? 0) - 1))}
          onNext={() => setOpenIndex((i) => (i === lightboxImages.length - 1 ? 0 : (i ?? 0) + 1))}
        />
      )}
    </section>
  );
}

/* =========================================================
   ====================  MOBILE VERSION  ===================
   ========================================================= */

function M_TiltImage({ img, onOpen, index, className = "" }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(py - 0.5) * -8}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * 8}deg`);
    el.style.setProperty("--mx", `${(px - 0.5) * 28}px`);
    el.style.setProperty("--my", `${(py - 0.5) * 28}px`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
    el.style.setProperty("--mx", `0px`);
    el.style.setProperty("--my", `0px`);
  };

  return (
    <motion.figure
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={() => onOpen?.(index)}
      className={`group relative cursor-pointer overflow-hidden rounded-[28px] ring-1 ring-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.55)] ${className}`}
      style={{ transform: "perspective(1000px) rotateX(var(--rx)) rotateY(var(--ry))" }}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: 0.05 * (index ?? 0) }}
    >
      <img
        src={img.src}
        alt={img.alt}
        className="h-full w-full rounded-[22px] object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]"
        loading="lazy"
        decoding="async"
        style={{ transform: "translate3d(var(--mx), var(--my), 0)" }}
      />
      <div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_0_80px_rgba(0,0,0,0.35)]" />
      <div className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/45 px-2 py-1 text-xs text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
        <Maximize2 size={14} />
        <span>View</span>
      </div>
    </motion.figure>
  );
}

function M_Lightbox({ images, index, onClose, onPrev, onNext }) {
  const img = images[index];
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
        >
          <X />
        </button>
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
        >
          <ChevronRight />
        </button>
        <motion.img
          key={img?.src}
          src={img?.src}
          alt={img?.alt}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="mx-6 max-h-[82vh] w-auto rounded-2xl shadow-2xl"
        />
      </motion.div>
    </AnimatePresence>
  );
}

function M_SectionSplit({ title, image, reverse = false, children, caption, onOpen, index }) {
  return (
    <div className="mx-auto w-full">
      <div
        className={[
          "grid items-center gap-8 lg:gap-12",
          "lg:grid-cols-12",
          reverse ? "lg:[&>*:first-child]:order-2" : "",
        ].join(" ")}
      >
        <motion.figure
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5"
        >
          <div
            onClick={() => onOpen?.(index)}
            className="group relative cursor-pointer overflow-hidden rounded-[28px] ring-1 ring-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.55)]"
          >
            <img
              src={image}
              alt={title || "image"}
              className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_0_80px_rgba(0,0,0,0.35)]" />
            {caption && (
              <figcaption className="pointer-events-none absolute bottom-2 right-3 rounded-full bg-black/45 px-3 py-1 text-xs text-white/85 backdrop-blur">
                {caption}
              </figcaption>
            )}
          </div>
        </motion.figure>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-7"
        >
          {title && <h2 className="font-heading text-3xl md:text-5xl text-[#C1A88B]">{title}</h2>}
          <div className="mt-5 space-y-5 font-body text-white/85 leading-7 md:text-[17px]">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function M_Section({ kicker, copy, showUL = false }) {
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
      <p className="mt-3 font-body text-[15px] leading-7 text-white/85">{copy}</p>

      {showUL && (
        <div className="mt-4 flex items-center gap-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/UL_Mark.svg/512px-UL_Mark.svg.png?20160322023709"
            alt="UL Certification"
            className="h-10 w-auto opacity-90 drop-shadow-[0_0_10px_rgba(193,168,139,0.45)] transition-transform duration-300 hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <span className="text-white/70 text-[13px] tracking-wide">
            UL Certified for Safety & Performance
          </span>
        </div>
      )}
    </motion.div>
  );
}

function Mobile() {
  const pool = [
    {
      src: "https://res.cloudinary.com/dczzibbkw/image/upload/v1762286610/Untitled_Design_-_1_copy_tana54.webp",
      alt: "ELEV8 Anthracite — Hydraulic canopy shown",
    },
    {
      src: "https://res.cloudinary.com/dczzibbkw/image/upload/v1762286609/NF-101_25_copy_phd0or.webp",
      alt: "ELEV8 marble worktop with gold fixtures",
    },
    {
      src: "https://res.cloudinary.com/dczzibbkw/image/upload/v1762286609/NF-101_20_copy_m8kfku.webp",
      alt: "ELEV8 island module with premium grill",
    },
    {
      src: "https://res.cloudinary.com/dczzibbkw/image/upload/v1762286609/NF-101_17_copy_vrkn4s.webp",
      alt: "ELEV8 light outdoor kitchen by pool",
    },
    {
      src: "https://res.cloudinary.com/dczzibbkw/image/upload/v1762286609/NF-101_15_1_copy_l9li1j.webp",
      alt: "ELEV8 charcoal finish closeup",
    },
  ];

  const pairedBlocks = [
    {
      title: "Our Origin",
      copy: (
        <>
          ELEV8 Kitchens was born from a simple idea: the best memories are made around great food and they shouldn’t be
          limited to the indoors. As part of the <strong className="text-white">Habitat28</strong> family, we’ve applied
          our proven expertise in <strong className="text-white">modular design</strong> to the outdoors.
        </>
      ),
      caption: "ELEV8 — Hydraulic canopy shown",
    },
    {
      title: "",
      copy: (
        <>
          We craft <strong className="text-white">luxury modular outdoor kitchens</strong> built for performance,
          durability, and style. Each ELEV8 kitchen transforms your backyard into a gourmet cooking space, blending
          modern design with premium materials to bring the heart of the home outdoors.
        </>
      ),
    },
  ];

  const featureRows = [
    {
      kicker: "Built For Canada & U.S.A Harsh Weather. Designed for Anywhere.",
      copy:
        "Each ELEV8 Modular Outdoor Kitchen is designed to withstand the harsh climates of Canada and the U.S., using commercial-grade stainless steel and engineered to thrive through harsh winters, summers, and everything in between. With UL certified components, plug-and-play installation, and luxury finishes, ELEV8 Kitchens deliver the perfect blend of durability, performance, and designer style.",
    },
    {
      kicker: "More Than a BBQ",
      copy:
        "This isn’t your average grill setup — it’s a complete outdoor culinary system. Every ELEV8 kitchen can include integrated fridges, LED lighting, Bluetooth speakers, Smart TVs, ample storage, sinks, and even hydraulic doors, transforming your patio or backyard into a high-end entertainment space built for every season.",
    },
    {
      kicker: "Why ELEV8?",
      copy:
        "Because cooking outdoors should never mean compromising on convenience, aesthetics, or quality. Our team at ELEV8 obsesses over craftsmanship, functionality, and design flow, ensuring every outdoor kitchen is as stunning as it is smart.",
    },
  ];

  const used = new Set();
  const takeImage = (start = 0) => {
    for (let i = start; i < pool.length; i++) {
      const it = pool[i];
      if (!used.has(it.src)) {
        used.add(it.src);
        return it;
      }
    }
    return pool[0];
  };

  const pairedWithImages = pairedBlocks.map((b, i) => ({ ...b, img: takeImage(i) }));
  const featuresWithImages = featureRows.map((f) => ({ ...f, img: takeImage() }));

  const lightboxImages = Array.from(
    new Map(
      [...pairedWithImages.map((x) => x.img), ...featuresWithImages.map((x) => x.img)].map((o) => [o.src, o])
    ).values()
  );
  const indexBySrc = (src) => lightboxImages.findIndex((x) => x.src === src);
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 pt-24 md:pt-32">
        <motion.h1
          className="font-heading text-center text-4xl md:text-6xl text-[#C1A88B]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About Us
        </motion.h1>
        <motion.p
          className="mx-auto mt-4 max-w-2xl text-center text-white/80 font-body"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Crafting luxury modular outdoor kitchens built for performance, durability, and style.
        </motion.p>
      </div>

      <div className="mx-auto max-w-6xl space-y-14 px-6 py-16 md:py-20">
        {pairedWithImages.map((b, i) => (
          <M_SectionSplit
            key={i}
            title={b.title}
            image={b.img.src}
            caption={b.caption}
            reverse={i % 2 === 1}
            onOpen={() => setOpenIndex(indexBySrc(b.img.src))}
            index={i}
          >
            <p>{b.copy}</p>
          </M_SectionSplit>
        ))}

        {featuresWithImages.map((f, i) => (
          <div key={`f-${i}`} className="grid items-center gap-6 md:grid-cols-12">
            <div className={`md:col-span-5 ${i % 2 ? "md:order-2" : ""}`}>
              <M_TiltImage
                img={f.img}
                index={i + 4}
                onOpen={() => setOpenIndex(indexBySrc(f.img.src))}
              />
            </div>
            <div className={`md:col-span-7 ${i % 2 ? "md:order-1" : ""}`}>
              <M_Section
                kicker={f.kicker}
                copy={f.copy}
                showUL={f.kicker.startsWith("Built For Canada")}
              />
            </div>
          </div>
        ))}

        <blockquote className="rounded-2xl bg-[#111]/60 p-8 ring-1 ring-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
          <p className="font-heading text-2xl text-[#C1A88B]">Join the Outdoor Revolution</p>
          <p className="mt-3 font-body text-white/85">
            From Sunday brunches to evening wine nights or full backyard parties, ELEV8 Kitchens bring the soul of
            indoor living outdoors. Experience bold design, seamless performance, and an unmatched outdoor cooking
            experience, crafted for those who demand more from their space.
          </p>
        </blockquote>
      </div>

      {/* <div className="relative left-1/2 right-1/2 my-8 w-screen -ml-[50vw] -mr-[50vw]">
        <TeamHero
          image="https://elev8kitchens.com/cdn/shop/files/habitat28-team-1024x674.jpg?v=1748054711&width=3840"
          title="Our Team"
          subtitle="The craft, the precision, the people behind ELEV8 Kitchens"
        />
      </div> */}

      {openIndex !== null && (
        <M_Lightbox
          images={lightboxImages}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onPrev={() => setOpenIndex((i) => (i === 0 ? lightboxImages.length - 1 : (i ?? 0) - 1))}
          onNext={() => setOpenIndex((i) => (i === lightboxImages.length - 1 ? 0 : (i ?? 0) + 1))}
        />
      )}
    </section>
  );
}

/* =========================================================
   ===================  RESPONSIVE WRAPPER  =================
   ========================================================= */

export default function AboutUsResponsive() {
  return (
    <div className="relative bg-black">
      {/* Mobile */}
      <div className="block md:hidden">
        <Mobile />
      </div>
      {/* Desktop / Tablet */}
      <div className="hidden md:block">
        <DesktopTablet />
      </div>
    </div>
  );
}
