// GalleryPage.jsx — ELEV8 Kitchens Team, Factory & Around-the-Factory Gallery
// Masonry layout + luxe animations
// Stack: React + Tailwind + Framer Motion + Lucide Icons

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Users, Factory, Camera } from "lucide-react";

const GOLD = "#C1A88B";

// ------------ DATA (placeholder stock images – replace with your own) ------------

// TEAM
const teamPhotos = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/1181562/pexels-photo-1181562.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Leadership team in a modern office",
    name: "Leadership Team",
    role: "Design & Operations",
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Design team collaborating on layouts",
    name: "Design Team",
    role: "Layouts & Planning",
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/3862372/pexels-photo-3862372.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Sales team in discussion",
    name: "Sales & Client Care",
    role: "Client Experience",
  },
];

// FACTORY
const factoryPhotos = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/3735810/pexels-photo-3735810.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Stainless steel production line",
    name: "Production Line",
    role: "Stainless Steel Modules",
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/4484078/pexels-photo-4484078.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Cutting and welding area",
    name: "Fabrication",
    role: "Cutting & Welding",
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/4484077/pexels-photo-4484077.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Quality control station",
    name: "Quality Control",
    role: "Final Checks",
  },
];

// 🎉 AROUND THE FACTORY (candid shots, workers, lifestyle)
const aroundPhotos = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/4484076/pexels-photo-4484076.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Worker checking stainless module",
    name: "On the Floor",
    role: "Daily Workflow",
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/4484070/pexels-photo-4484070.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Worker polishing metal surface",
    name: "Polishing Details",
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/3735811/pexels-photo-3735811.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Wide view of the factory",
    name: "Factory Overview",
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/959325/pexels-photo-959325.jpeg",
    alt: "Worker assembling unit",
    name: "Assembly",
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/4484073/pexels-photo-4484073.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Team in protective gear",
    name: "Safety First",
  },
  {
    id: 6,
    src: "https://images.pexels.com/photos/3735781/pexels-photo-3735781.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Worker inspecting metal part",
    name: "Inspection",
  },
  {
    id: 7,
    src: "https://images.pexels.com/photos/3735802/pexels-photo-3735802.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Close-up of welding work",
    name: "Precision Work",
  },
  {
    id: 8,
    src: "https://images.pexels.com/photos/3735761/pexels-photo-3735761.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Boxes ready for shipping",
    name: "Ready to Ship",
  },
  {
    id: 9,
    src: "https://images.pexels.com/photos/3758104/pexels-photo-3758104.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Candid shot of two workers discussing",
    name: "Candid Moment",
  },
];

// ------------ COMPONENT ------------

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("team");
  const [lightbox, setLightbox] = useState({ open: false, section: "team", index: 0 });

  const tabs = [
    { id: "team", label: "Our Team", icon: Users },
    { id: "factory", label: "Our Factory", icon: Factory },
    { id: "all", label: "All", icon: Camera },
  ];

  const getPhotos = () => {
    if (activeTab === "team") return { list: teamPhotos, section: "team" };
    if (activeTab === "factory") return { list: factoryPhotos, section: "factory" };
    return {
      list: [
        ...teamPhotos.map((p) => ({ ...p, _s: "team" })),
        ...factoryPhotos.map((p) => ({ ...p, _s: "factory" })),
      ],
      section: "mixed",
    };
  };

  const { list: photos, section } = getPhotos();

  const openLightbox = (index, sectionOverride) => {
    setLightbox({
      open: true,
      section: sectionOverride || section,
      index,
    });
  };

  const closeLightbox = () => setLightbox((prev) => ({ ...prev, open: false }));

  const resolveList = (sectionName) => {
    if (sectionName === "team") return teamPhotos;
    if (sectionName === "factory") return factoryPhotos;
    if (sectionName === "around") return aroundPhotos;
    return [];
  };

  const goNext = () => {
    const currentList = resolveList(lightbox.section);
    if (!currentList.length) return;
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index + 1) % currentList.length,
    }));
  };

  const goPrev = () => {
    const currentList = resolveList(lightbox.section);
    if (!currentList.length) return;
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index - 1 + currentList.length) % currentList.length,
    }));
  };

  const currentList = resolveList(lightbox.section);
  const currentPhoto = currentList[lightbox.index];

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white">
      {/* soft gold glows */}
      <div className="pointer-events-none fixed inset-0 opacity-60 mix-blend-screen">
        <div
          className="absolute -top-40 left-0 h-72 w-72 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(193,168,139,0.35), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 h-72 w-72 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(193,168,139,0.18), transparent 70%)",
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
            style={{ border: `1px solid ${GOLD}55`, color: GOLD, backgroundColor: "rgba(0,0,0,0.6)" }}
          >
            ELEV8 CRAFTED KITCHENS
          </p>

          <h1 className="mt-4 text-4xl lg:text-5xl font-semibold tracking-tight">
            Gallery
          </h1>

          <p className="mt-3 text-neutral-300 max-w-2xl mx-auto text-sm sm:text-base">
            Meet the team, explore the factory, and take a look behind the scenes of every crafted module.
          </p>
        </motion.header>

        {/* TABS */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mx-auto mt-8 flex gap-3 justify-center rounded-full bg-black/50 backdrop-blur p-2 border border-white/10"
        >
          {tabs.map(({ id, label, icon: Icon }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs sm:text-sm transition ${
                  active ? "text-white shadow-lg" : "text-neutral-400 hover:text-white"
                }`}
                style={
                  active
                    ? {
                        background: "linear-gradient(135deg, rgba(193,168,139,0.3), rgba(5,5,5,0.95))",
                        border: `1px solid ${GOLD}80`,
                      }
                    : {}
                }
              >
                {Icon && <Icon className="h-4 w-4" />} {label}
              </button>
            );
          })}
        </motion.div>

        {/* MAIN MASONRY GALLERY */}
        <section className="mt-10">
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 [column-gap:1rem]"
          >
            {photos.map((photo, i) => (
              <motion.button
                key={`${photo.id}-${i}`}
                layout
                style={{ breakInside: "avoid" }}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={() => openLightbox(i, photo._s)}
                className="mb-4 group relative w-full overflow-hidden rounded-xl border border-white/10 bg-black/50 shadow-md"
              >
                <div className="relative w-full overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-auto object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.1))",
                    }}
                  />
                </div>
                <div className="absolute bottom-3 left-3">
                  <p className="text-sm font-medium">{photo.name}</p>
                  {photo.role && (
                    <p className="text-xs text-neutral-400">{photo.role}</p>
                  )}
                </div>
              </motion.button>
            ))}
          </motion.div>
        </section>

        {/* 🎉 MASONRY — AROUND THE FACTORY */}
        <section className="mt-20">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3"
          >
            Around the Factory
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-neutral-400 mb-6 max-w-2xl text-sm sm:text-base"
          >
            Candid moments, daily work, and the people who bring every Elev8 Kitchen module to life.
          </motion.p>

          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 [column-gap:1rem]"
          >
            {aroundPhotos.map((photo, index) => (
              <motion.button
                key={photo.id}
                layout
                style={{ breakInside: "avoid" }}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={() => openLightbox(index, "around")}
                className="mb-4 group relative w-full overflow-hidden rounded-xl border border-white/10 bg-black/50 shadow-md"
              >
                <div className="relative w-full overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-auto object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.15))",
                    }}
                  />
                </div>
                <div className="absolute bottom-3 left-3">
                  <p className="text-sm font-medium">{photo.name}</p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </section>
      </main>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox.open && currentPhoto && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className="absolute top-5 right-5 p-2" onClick={closeLightbox}>
              <X className="h-6 w-6 text-white" />
            </button>

            <button className="absolute left-5 top-1/2 -translate-y-1/2 p-2" onClick={goPrev}>
              <ChevronLeft className="h-8 w-8 text-white" />
            </button>

            <button className="absolute right-5 top-1/2 -translate-y-1/2 p-2" onClick={goNext}>
              <ChevronRight className="h-8 w-8 text-white" />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="max-w-4xl px-6"
            >
              <img
                src={currentPhoto.src}
                alt={currentPhoto.alt}
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
