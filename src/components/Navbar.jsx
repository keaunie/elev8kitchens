import { useState, useEffect } from "react";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";

/**
 * Navbar — React + Tailwind (Vite)
 * - Sticky, dark navbar with brand gold accents
 * - Desktop: logo • links • icons
 * - Mobile: logo • menu button → slide-down panel
 *
 * Tailwind color notes:
 *   Brand gold: #C1A88B (used via arbitrary value text-[#C1A88B]/border-[#C1A88B])
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Product", href: "/products" },
    { label: "Product Features", href: "/features" },
    { label: "FAQ", href: "/faq" },
    { label: "Book a Consultation", href: "/consultation" },
  ];

  return (
    <header
      className={
        `sticky top-0 z-50 w-full transition-shadow ${
          scrolled ? "shadow-[0_1px_0_0_rgba(193,168,139,0.2)]" : ""
        }`
      }
    >
      <div className="w-full bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          {/* Left: Logo */}
          <a href="/" className="flex items-center gap-3">
            <img
              src="https://elev8kitchens.com/cdn/shop/files/ELEV8-Crafted-Kitchens-Logo.png?v=1748394896&width=240"
              alt="ELEV8 Crafted Kitchens logo"
              className="h-7 w-auto md:h-8"
              loading="lazy"
              decoding="async"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm tracking-widest text-[#C1A88B] transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1A88B]/40"
                  >
                    {item.label.toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right icons (desktop) */}
          <div className="hidden lg:flex items-center gap-6 text-[#C1A88B]">
            <IconButton ariaLabel="Search"><Search size={22} /></IconButton>
            <IconButton ariaLabel="Account"><User size={22} /></IconButton>
            <IconButton ariaLabel="Cart"><ShoppingBag size={22} /></IconButton>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden inline-flex items-center justify-center rounded-md border border-[#C1A88B]/40 p-2 text-[#C1A88B] hover:bg-[#C1A88B]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1A88B]/50"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile panel */}
        <div
          className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ${
            open ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 pb-4 md:px-6">
            <nav>
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="block rounded-md px-3 py-3 text-sm tracking-widest text-[#C1A88B] hover:bg-[#C1A88B]/10"
                      onClick={() => setOpen(false)}
                    >
                      {item.label.toUpperCase()}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-3 flex items-center gap-5 border-t border-[#C1A88B]/20 pt-3 text-[#C1A88B]">
              <a href="#" className="inline-flex items-center gap-2"><Search size={20}/>Search</a>
              <a href="#" className="inline-flex items-center gap-2"><User size={20}/>Account</a>
              <a href="#" className="inline-flex items-center gap-2"><ShoppingBag size={20}/>Cart</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function IconButton({ children, ariaLabel }) {
  return (
    <button
      aria-label={ariaLabel}
      className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-[#C1A88B]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1A88B]/50"
    >
      {children}
    </button>
  );
}
