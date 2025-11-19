// GalleryPage.jsx — ELEV8 Kitchens Gallery (single masonry grid, images + video)
// Stack: React + Tailwind + Framer Motion + Lucide Icons

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const GOLD = "#C1A88B";

// ---- LOCAL IMAGES + VIDEO ----
// Adjust path if GalleryPage.jsx is not inside /components

import img0102 from "../assets/IMG_0102.jpg";
import img0108 from "../assets/IMG_0108.jpg";
import img0128 from "../assets/IMG_0128.jpg";
import img0130 from "../assets/IMG_0130.jpg";
import img0140 from "../assets/IMG_0140.jpg";
import img0153 from "../assets/IMG_0153.jpg";

// One flat list of all media
const galleryMedia = [
  {
    id: 1,
    type: "image",
    src: img0102,
    alt: "Elev8 Kitchens – image 0102",
    // name: "Factory View 0102",
  },
  {
    id: 2,
    type: "image",
    src: img0108,
    alt: "Elev8 Kitchens – image 0108",
    // name: "Factory View 0108",
  },
  {
    id: 3,
    type: "image",
    src: img0128,
    alt: "Elev8 Kitchens – image 0128",
    // name: "Factory View 0128",
  },
  {
    id: 4,
    type: "image",
    src: img0140,
    alt: "Elev8 Kitchens – image 0140",
    // name: "Factory View 0140",
  },
  {
    id: 5,
    type: "image",
    src: img0153,
    alt: "Elev8 Kitchens – image 0153",
    // name: "Factory View 0153",
  },
  {
    id: 6,
    type: "image",
    src: img0130,
    alt: "Elev8 Kitchens – image 0130",
    // name: "Factory View 0128",
  },
  // {
  //   id: 6,
  //   type: "video",
  //   src: vid0100,
  //   alt: "Elev8 Kitchens – factory video 0100",
  //   // name: "Factory Video 0100",
  // },
];

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  const openLightbox = (index) => {
    setLightbox({ open: true, index });
  };

  const closeLightbox = () => {
    setLightbox((prev) => ({ ...prev, open: false }));
  };

  const goNext = () => {
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index + 1) % galleryMedia.length,
    }));
  };

  const goPrev = () => {
    setLightbox((prev) => ({
      ...prev,
      index:
        (prev.index - 1 + galleryMedia.length) % galleryMedia.length,
    }));
  };

  const current = galleryMedia[lightbox.index];

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white">
      {/* soft gold glows */}
      <div className="pointer-events-none fixed inset-0 opacity-60 mix-blend-screen">
        <div
          className="absolute -top-40 left-0 h-72 w-72 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(193,168,139,0.35), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 h-72 w-72 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(193,168,139,0.18), transparent 70%)",
          }}
        />
      </div>

      <main className="relative mx-auto max-w-6xl px-4 pt-24 pb-32">
        {/* HEADER */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p
            className="inline-flex px-4 py-1 text-xs font-semibold tracking-[0.25em] rounded-full uppercase"
            style={{
              border: `1px solid ${GOLD}55`,
              color: GOLD,
              backgroundColor: "rgba(0,0,0,0.6)",
            }}
          >
            ELEV8 CRAFTED KITCHENS
          </p>

          <h1 className="mt-4 text-4xl lg:text-5xl font-semibold tracking-tight">
            Gallery
          </h1>

          <p className="mt-3 text-neutral-300 max-w-2xl mx-auto text-sm sm:text-base">
            A look inside our factory — images + a behind-the-scenes video.
          </p>
        </motion.header>

        {/* MASONRY GALLERY */}
        <section className="mt-10">
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 [column-gap:1rem]"
          >
            {galleryMedia.map((item, i) => (
              <motion.button
                key={item.id}
                layout
                style={{ breakInside: "avoid" }}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={() => openLightbox(i)}
                className="mb-4 group relative w-full overflow-hidden rounded-xl border border-white/10 bg-black/50 shadow-md"
              >
                <div className="relative w-full overflow-hidden">
                  {item.type === "image" ? (
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-auto object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <video
                      src={item.src}
                      className="w-full h-auto object-cover"
                      muted
                      autoPlay
                      loop
                    />
                  )}

                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.1))",
                    }}
                  />
                </div>

                <div className="absolute bottom-3 left-3">
                  <p className="text-sm font-medium">{item.name}</p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </section>
      </main>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox.open && current && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="absolute top-5 right-5 p-2"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6 text-white" />
            </button>

            <button
              className="absolute left-5 top-1/2 -translate-y-1/2 p-2"
              onClick={goPrev}
            >
              <ChevronLeft className="h-8 w-8 text-white" />
            </button>

            <button
              className="absolute right-5 top-1/2 -translate-y-1/2 p-2"
              onClick={goNext}
            >
              <ChevronRight className="h-8 w-8 text-white" />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="max-w-4xl px-6"
            >
              {current.type === "image" ? (
                <img
                  src={current.src}
                  alt={current.alt}
                  className="w-full max-h-[80vh] object-contain rounded-xl"
                />
              ) : (
                <video
                  src={current.src}
                  className="w-full max-h-[80vh] object-contain rounded-xl"
                  controls
                  autoPlay
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
