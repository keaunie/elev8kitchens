import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar.jsx";
import HeroCarousel from "./components/HeroCarousel.jsx";
import FeaturesSection from "./components/Features.jsx";
import About from "./components/About.jsx";
import Reviews from "./components/Reviews.jsx";
import Payment from "./components/Payment.jsx";
import Process from "./components/Process.jsx";
import HabitatSection from "./components/HabitatSection.jsx";
import CTABanner from "./components/CTABanner.jsx";
import Footer from "./components/Footer.jsx";
import Elev8ChatWidget from "./components/BrandChatWidget.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import FaqPage from "./pages/FaqPage.jsx";
import Consultation from "./pages/Consultation.jsx";
import CartPage from "./pages/CartPage.jsx";
import ContactPage from "./pages/ContactUs.jsx";

// NEW: import your Story page
import Story from "./pages/Story.jsx";
import FloatingSocials from "./components/FloatingSocials.jsx";
import TermsOfServicePage from "./policies/TermsofService.jsx";
import ShippingPolicyPage from "./policies/Shipping.jsx";
import PrivacyPolicyPage from "./policies/PrivacyPolicy.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import ScrollToHash from "./components/ScrollToHash.jsx";
import OrderComplete from "./pages/OrderComplete.jsx";
import { NewsletterModal } from "./pages/ProductPage.jsx";


const slides = [
  {
    image: "https://res.cloudinary.com/dczzibbkw/image/upload/v1762285478/hero1_pbo5gx.webp",
    alt: "Outdoor kitchen with bar seating",
    kicker: "ELEV8 CRAFTED KITCHENS",
    title: "Luxury Modular Outdoor Kitchens",
    subtitle:
      "Premium materials, precision engineering, and timeless design for your backyard oasis.",
    cta: "Explore Products",
    href: "/Elev8Kitchens",
  },
  {
    image: "https://res.cloudinary.com/dczzibbkw/image/upload/v1762285478/hero2_rzdzke.webp",
    alt: "Close-up of premium finishes",
    kicker: "SAFETY • DESIGN • DURABILITY",
    title: "Engineered for Real Life",
    subtitle: "Weather-resistant, easy to install, and built to last.",
    cta: "See Features",
    href: "/Elev8Kitchens#why-elev8",
  },
  {
    image: "https://res.cloudinary.com/dczzibbkw/image/upload/v1762285483/hero3_djf8cr.webp",
    alt: "Cozy evening entertainment setup",
    kicker: "BOOK A CONSULTATION",
    title: "Design Your Dream Setup",
    subtitle:
      "Our team helps you plan the perfect layout for your space.",
    cta: "Book Now",
    href: "/consultation",
  },
];

// -------- Layout (Navbar + Footer on all pages) --------
function Layout() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

// -------- Home page content (what you already had) --------
function Home() {
  const [newsletterOpen, setNewsletterOpen] = useState(true);
  useEffect(() => {
    setNewsletterOpen(true);
  }, []);

  // Toggle Klaviyo popup; set to false to disable the auto modal
  const enableKlaviyoModal = false;

  // Ensure Klaviyo onsite script loads, then open the new form (RwT5WS)
  useEffect(() => {
    if (!enableKlaviyoModal) return;

    const formId = "RwT5WS";
    let retries = 0;

    const loadScriptIfNeeded = () => {
      const existing = document.querySelector("script[data-klaviyo-onsite]");
      if (existing) return;
      const s = document.createElement("script");
      s.setAttribute("data-klaviyo-onsite", "true");
      s.async = true;
      s.src = "https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=Twa6qJ";
      document.head.appendChild(s);
    };

    const openForm = () => {
      if (window?._klOnsite) {
        window._klOnsite.push(["openForm", formId]);
      } else if (retries < 12) {
        retries += 1;
        setTimeout(openForm, 400);
      }
    };

    loadScriptIfNeeded();
    openForm();
  }, [enableKlaviyoModal]);

  // Remove any Klaviyo teaser bars/buttons that still render
  useEffect(() => {
    const nukeTeasers = () => {
      const selectors = [
        '[data-testid*="teaser"]',
        '[id*="teaser"]',
        '[class*="teaser"]',
        ".klaviyo-form-trigger",
        ".kl-floating-trigger",
      ];
      document.querySelectorAll(selectors.join(",")).forEach((el) => {
        const text = (el.innerText || "").toLowerCase();
        if (text.includes("the future is here") || text.includes("future") || text.includes("teaser")) {
          el.remove();
        }
      });
    };

    nukeTeasers();
    const observer = new MutationObserver(nukeTeasers);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  // Post-show appreciation modal (once per session)
  const [thanksOpen, setThanksOpen] = useState(false);
  const thanksKey = "elev8_fs_thanks_seen";

  useEffect(() => {
    const seen = sessionStorage.getItem(thanksKey);
    if (!seen) {
      const t = setTimeout(() => setThanksOpen(true), 800);
      return () => clearTimeout(t);
    }
    return undefined;
  }, []);

  const handleThanksClose = () => {
    sessionStorage.setItem(thanksKey, "true");
    setThanksOpen(false);
  };

  // Placeholder carousel images — replace with provided assets when ready
  const thanksImages = [
    "https://raw.githubusercontent.com/keaunie/elev8kitchens/refs/heads/main/src/assets/showcase1.jpg",
    "https://raw.githubusercontent.com/keaunie/elev8kitchens/refs/heads/main/src/assets/showcase2.jpg",
    "https://raw.githubusercontent.com/keaunie/elev8kitchens/refs/heads/main/src/assets/showcase3.jpg",
  ];

  return (
    <>
      {/* <NewsletterModal
        open={newsletterOpen}
        onClose={() => setNewsletterOpen(false)}
      /> */}

      <ThanksModal
        open={thanksOpen}
        onClose={handleThanksClose}
        images={thanksImages}
      />
      <HeroCarousel slides={slides} interval={6000} />
      <FeaturesSection
        kicker="What we offer"
        title="Next-Level Outdoor Kitchen Features"
        cta={{ label: "Explore All Products", href: "/Elev8Kitchens" }}
      />
      <About />
      <Reviews />
      <Payment />
      <Process />
      <HabitatSection />
      <CTABanner />
    </>
  );
}

// -------- Router --------
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />          {/* "/" */}
          <Route path="/story" element={<Story />} /> {/* "/story" */}
          <Route path="/Elev8Kitchens" element={<ProductPage />} /> {/* "/Elev8Kitchens" */}
          <Route path="/FAQ" element={<FaqPage />} /> {/* "/FAQs" */}
          <Route path="/consultation" element={<Consultation />} /> {/* "/consultation" */}
          <Route path="/cart" element={<CartPage />} /> {/* "/cart" */}
          <Route path="/contact" element={<ContactPage />} /> {/* "/Contact" */}
          <Route path="/terms-of-service" element={<TermsOfServicePage />} /> {/* "/TOS" */}
          <Route path="/shipping" element={<ShippingPolicyPage />} /> {/* "/Shipping" */}
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} /> {/* "/PrivacyPolicy" */}
          <Route path="/gallery" element={<GalleryPage />} /> {/* "/Gallery" */}
          <Route path="/order-complete" element={<OrderComplete />} />
        </Route>
      </Routes>

      {/* <a
        href="https://wa.me/19056930028?text=Hello%2C%20I%27m%20interested%20in%20your%20products"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="
                          fixed bottom-6 right-6 z-50
                          w-16 h-16
                          flex items-center justify-center
                          rounded-full
                          bg-[#25D366]
                          shadow-xl
                          transition-all duration-300 ease-out
                          hover:scale-110 hover:shadow-2xl
                          animate-pulse
                        "
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="w-10 h-10 drop-shadow-md"
        />
      </a> */}

      <FloatingSocials />
      {/* <Elev8ChatWidget endpoint="/api/chat" /> */}
    </BrowserRouter>
  );
}

function ThanksModal({ open, onClose, images = [] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!open || images.length === 0) return undefined;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 2800);
    return () => clearInterval(id);
  }, [open, images.length]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 backdrop-blur-sm px-3 sm:px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-[#0a0a0a] p-4 sm:p-6 md:p-7 ring-1 ring-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.65)]"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 text-lg text-white/60 transition hover:text-white sm:right-4 sm:top-4"
            >
              ×
            </button>

            <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
              <div className="flex-1 space-y-3 text-center md:text-left md:justify-center md:flex md:flex-col">
                <img
                  src="https://elev8kitchens.com/cdn/shop/files/ELEV8-Crafted-Kitchens-Logo.png?v=1748394896&width=480"
                  alt="Elev8 Crafted Kitchens"
                  className="mx-auto h-auto w-auto max-w-[200px] opacity-85 md:mx-0 object-contain"
                />
                <h3 className="font-heading text-xl text-[#C1A88B] sm:text-2xl md:text-3xl">
                  Thank You, FutureScape USA
                </h3>
                <p className="text-sm leading-relaxed text-white/80 sm:text-base">
                  We had a great show and sincerely thank everyone who visited Elev8 Crafted Kitchens.
                  We look forward to seeing you again at our next exhibition.
                </p>
                <p className="text-xs text-white/60">— Team Elev8</p>
                <div className="hidden text-left text-xs text-white/50 md:block">
                  <p className="font-semibold text-white/70">Highlights</p>
                  <p className="mt-1">Showcase | Live demos | Outdoor luxury craft</p>
                </div>
              </div>

              {images.length > 0 && (
                <div className="relative hidden flex-1 overflow-hidden rounded-2xl ring-1 ring-white/10 md:block aspect-[4/3]">
                  <motion.img
                    key={index}
                    src={images[index]}
                    alt="Elev8 showcase"
                    className="h-full w-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  />
                  <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/70">
                    FutureScape Recap
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
