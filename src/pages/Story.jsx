import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import TeamHero from "../components/TeamHero.jsx";

/** ==========================
 * Small reusable tilt/shine card with overlay slot
 * =========================== */
function TiltImage({ img, onOpen, index, className = "", children, align = "left" }) {
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

      {/* Luxe gradient + vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_0_80px_rgba(0,0,0,0.35)]" />

      {/* Overlay content slot */}
      {children && (
        <div className={`pointer-events-none absolute inset-0 flex items-end ${align === "right" ? "justify-end" : "justify-start"} p-4 sm:p-6 md:p-8`}>
          <div className={`max-w-xl pointer-events-auto rounded-2xl bg-black/45 backdrop-blur-md ring-1 ring-white/10 p-4 sm:p-5 md:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.45)] ${align === "right" ? "text-right" : "text-left"}`}>
            {children}
          </div>
        </div>
      )}

      {/* Corner hint */}
      <div className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/45 px-2 py-1 text-xs text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
        <Maximize2 size={14} />
        <span>View</span>
      </div>
    </motion.figure>
  );
}

/** ==========================
 * Lightbox modal
 * =========================== */
function Lightbox({ images, index, onClose, onPrev, onNext }) {
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
          className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 focus:outline-none"
          aria-label="Close"
        >
          <X />
        </button>
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
          aria-label="Previous"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
          aria-label="Next"
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

/** ==========================
 * Split layout now overlays text on the image (alternating left/right)
 * =========================== */
function SectionSplit({ title, image, reverse = false, children, caption, onOpen, index }) {
  return (
    <div className="mx-auto w-full">
      <div className="grid items-center gap-8 lg:gap-12 lg:grid-cols-12">
        <div className={`lg:col-span-12`}>
          <TiltImage
            img={{ src: image, alt: title || "image" }}
            onOpen={onOpen}
            index={index}
            align={reverse ? "right" : "left"}
          >
            {title && (
              <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl text-[#C1A88B] mb-2 md:mb-3">{title}</h2>
            )}
            <div className="font-body text-white/90 text-sm md:text-[17px] leading-6 md:leading-7">{children}</div>
            {caption && (
              <p className="mt-3 text-xs text-white/70">{caption}</p>
            )}
          </TiltImage>
        </div>
      </div>
    </div>
  );
}

export default function Story() {
  // Base pool of images
  const pool = [
    { src: "https://res.cloudinary.com/dczzibbkw/image/upload/v1762286610/Untitled_Design_-_1_copy_tana54.webp", alt: "ELEV8 Anthracite — Hydraulic canopy shown" },
    { src: "https://res.cloudinary.com/dczzibbkw/image/upload/v1762286609/NF-101_25_copy_phd0or.webp", alt: "ELEV8 marble worktop with gold fixtures" },
    { src: "https://res.cloudinary.com/dczzibbkw/image/upload/v1762286609/NF-101_20_copy_m8kfku.webp", alt: "ELEV8 island module with premium grill" },
    { src: "https://res.cloudinary.com/dczzibbkw/image/upload/v1762286609/NF-101_17_copy_vrkn4s.webp", alt: "ELEV8 light outdoor kitchen by pool" },
    { src: "https://res.cloudinary.com/dczzibbkw/image/upload/v1762286609/NF-101_15_1_copy_l9li1j.webp", alt: "ELEV8 charcoal finish closeup" },
  ];

  // Content blocks that will each consume one unique image
  const pairedBlocks = [
    {
      title: "Our Origin",
      copy: (
        <>
          ELEV8 Kitchens was born from a simple idea: the best memories are made around great food and they shouldn’t be limited to the indoors. As part of the <strong className="text-white">Habitat28</strong> family, we’ve applied our proven expertise in <strong className="text-white">modular design</strong> to the outdoors.
        </>
      ),
      caption: "ELEV8 — Hydraulic canopy shown",
    },
    {
      title: "",
      copy: (
        <>
          We craft <strong className="text-white">luxury modular outdoor kitchens</strong> built for performance, durability, and style. Each ELEV8 kitchen transforms your backyard into a gourmet cooking space, blending modern design with premium materials to bring the heart of the home outdoors.
        </>
      ),
      caption: "",
    },
  ];

  const featureRows = [
    {
      kicker: "Built in Canada. Designed for Everywhere.",
      copy:
        "Each ELEV8 Modular Outdoor Kitchen is proudly built in Canada using commercial-grade stainless steel and engineered to thrive through harsh winters, summer BBQs, and everything in between. With E-SAFE Certification, plug-and-play installation, and luxury finishes, ELEV8 Kitchens deliver the perfect blend of durability, performance, and designer style.",
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

  // Assign unique images to every block without duplicates
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

  // Wire images to paired blocks and feature rows
  const pairedWithImages = pairedBlocks.map((b, i) => ({ ...b, img: takeImage(i) }));
  const featuresWithImages = featureRows.map((f) => ({ ...f, img: takeImage() }));

  // Build lightbox image list from what is actually displayed (dedup by src)
  const lightboxImages = Array.from(
    new Map(
      [...pairedWithImages.map((x) => x.img), ...featuresWithImages.map((x) => x.img)].map((o) => [o.src, o])
    ).values()
  );

  const indexBySrc = (src) => lightboxImages.findIndex((x) => x.src === src);

  const [openIndex, setOpenIndex] = useState(null);

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
          Crafting luxury modular outdoor kitchens built for performance, durability, and style.
        </motion.p>
      </div>

      {/* Body sections (centered container) */}
      <div className="mx-auto max-w-6xl space-y-14 px-6 py-16 md:py-20">
        {/* Pair each paragraph with its own image (alternating overlay) */}
        {pairedWithImages.map((b, i) => (
          <SectionSplit
            key={i}
            title={b.title}
            image={b.img.src}
            caption={b.caption}
            reverse={i % 2 === 1}
            onOpen={() => setOpenIndex(indexBySrc(b.img.src))}
            index={i}
          >
            <p>{b.copy}</p>
          </SectionSplit>
        ))}

        {/* Feature rows with overlayed copy (alternating alignment) */}
        {featuresWithImages.map((f, i) => (
          <TiltImage
            key={`f-${i}`}
            img={f.img}
            index={i + 4}
            onOpen={() => setOpenIndex(indexBySrc(f.img.src))}
            align={i % 2 ? "right" : "left"}
            className="mt-8"
          >
            <p className="font-heading text-sm tracking-[0.2em] text-[#C1A88B]/90">{f.kicker.toUpperCase()}</p>
            <p className="mt-2 font-body text-[15px] leading-7 text-white/90">{f.copy}</p>
          </TiltImage>
        ))}

        <blockquote className="rounded-2xl bg-[#111]/60 p-8 ring-1 ring-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
          <p className="font-heading text-2xl text-[#C1A88B]">Join the Outdoor Revolution</p>
          <p className="mt-3 font-body text-white/85">
            From Sunday brunches to evening wine nights or full backyard parties, ELEV8 Kitchens bring the soul of indoor living outdoors. Experience bold design, seamless performance, and an unmatched outdoor cooking experience, crafted for those who demand more from their space.
          </p>
        </blockquote>
      </div>

      {/* ===== Full-bleed TeamHero (edge-to-edge) ===== */}
      <div className="relative left-1/2 right-1/2 my-8 w-screen -ml-[50vw] -mr-[50vw]">
        <TeamHero
          image="https://elev8kitchens.com/cdn/shop/files/habitat28-team-1024x674.jpg?v=1748054711&width=3840"
          title="Our Team"
          subtitle="The craft, the precision, the people behind ELEV8 Kitchens"
        />
      </div>

      {/* Lightbox uses only the images actually rendered, in order, without duplicates */}
      {openIndex !== null && (
        <Lightbox
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
