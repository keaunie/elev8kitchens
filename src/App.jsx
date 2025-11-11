import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

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

// NEW: import your Story page
import Story from "./pages/Story.jsx";

const slides = [
  {
    image: "https://res.cloudinary.com/dczzibbkw/image/upload/v1762285478/hero1_pbo5gx.webp",
    alt: "Outdoor kitchen with bar seating",
    kicker: "ELEV8 CRAFTED KITCHENS",
    title: "Luxury Modular Outdoor Kitchens",
    subtitle:
      "Premium materials, precision engineering, and timeless design for your backyard oasis.",
    cta: "Explore Products",
    href: "/products",
  },
  {
    image: "https://res.cloudinary.com/dczzibbkw/image/upload/v1762285478/hero2_rzdzke.webp",
    alt: "Close-up of premium finishes",
    kicker: "SAFETY • DESIGN • DURABILITY",
    title: "Engineered for Real Life",
    subtitle: "Weather-resistant, easy to install, and built to last.",
    cta: "See Features",
    href: "/features",
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
  return (
    <>
      <HeroCarousel slides={slides} interval={6000} />
      <FeaturesSection
        kicker="What we offer"
        title="Next-Level Outdoor Kitchen Features"
        cta={{ label: "Explore All Products", href: "/products" }}
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
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />          {/* "/" */}
          <Route path="/story" element={<Story />} /> {/* "/story" */}
          <Route path="/Elev8Kitchens" element={<ProductPage />} /> {/* "/Elev8Kitchens" */}
          <Route path="/FAQ" element={<FaqPage />} /> {/* "/FAQs" */}
          <Route path="/consultation" element={<Consultation />} /> {/* "/consultation" */}
        </Route>
      </Routes>
      <Elev8ChatWidget endpoint="/api/chat" />
    </BrowserRouter>
  );
}
