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


export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
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
      <Footer />
      {/* <main className="flex flex-col items-center justify-center py-32 text-center">
        <h1 className="text-4xl font-light tracking-wide text-[#C1A88B]">
          Welcome to Elev8 Crafted Kitchens
        </h1>
        <p className="mt-4 max-w-xl text-sm text-[#C1A88B]/80">
          Explore our luxury modular outdoor kitchen collection built for design, functionality, and timeless style.
        </p>
      </main> */}
    </div>


  );
}
