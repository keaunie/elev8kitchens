import { useState, useEffect } from "react";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  Instagram,
  Facebook,
  MessageCircle, // using for WhatsApp-style icon
} from "lucide-react";
import CartButton from "./CartButton";
// If you prefer <Link> from react-router, swap <a> with <Link to=...>

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
    { label: "About Us", href: "/story" },
    { label: "Shop", href: "/Elev8Kitchens" },
    { label: "Book a Consultation", href: "/consultation" },
  ];

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full transition-shadow duration-300",
        scrolled ? "shadow-[0_1px_0_0_rgba(193,168,139,0.22)]" : "",
      ].join(" ")}
    >
      <div
        className={[
          // background + blur
          "w-full backdrop-blur supports-[backdrop-filter]:bg-black/75",
          scrolled ? "bg-black/90" : "bg-black/95",
          // height + spacing animate
          "transition-[padding,background-color] duration-300 ease-out",
          scrolled ? "py-2" : "py-4 md:py-6",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6">
          {/* Left: Logo */}
          <a href="/" className="flex items-center gap-3">
            <img
              src="https://elev8kitchens.com/cdn/shop/files/ELEV8-Crafted-Kitchens-Logo.png?v=1748394896&width=480"
              alt="ELEV8 Crafted Kitchens logo"
              className={[
                "w-auto transition-all duration-300 ease-out will-change-transform",
                scrolled ? "h-10 md:h-12" : "h-12 md:h-14",
              ].join(" ")}
              loading="lazy"
              decoding="async"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:block">
            <ul
              className={[
                "flex items-center transition-[gap] duration-300 ease-out",
                scrolled ? "gap-7" : "gap-9",
              ].join(" ")}
            >
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={[
                      "tracking-widest transition-colors focus:outline-none",
                      "text-[#C1A88B] hover:text-white",
                      "focus-visible:ring-2 focus-visible:ring-[#C1A88B]/40",
                      // font size compress slightly when scrolled
                      scrolled ? "text-[0.78rem]" : "text-sm",
                    ].join(" ")}
                  >
                    {item.label.toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Cart button (always visible) */}
          <IconButton ariaLabel="Cart" compact={scrolled}>
            <CartButton />
          </IconButton>
          
          {/* Right icons (desktop) */}
          <div
            className={[
              "hidden lg:flex items-center text-[#C1A88B] transition-[gap,opacity,transform] duration-300 ease-out",
              scrolled ? "gap-0 opacity-0 translate-y-[-6px] pointer-events-none" : "gap-6 opacity-100 translate-y-0",
            ].join(" ")}
          >

            {/* Socials – Instagram */}
            <a
              href="https://instagram.com/elev8kitchens"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Instagram"
              className="grid place-items-center rounded-full h-9 w-9 md:h-10 md:w-10 transition-all duration-300 hover:bg-[#C1A88B]/10 hover:text-white"
            >
              <Instagram className="h-5 w-5" />
            </a>

            {/* Socials – Facebook */}
            <a
              href="https://facebook.com/elev8kitchens"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Facebook"
              className="grid place-items-center rounded-full h-9 w-9 md:h-10 md:w-10 transition-all duration-300 hover:bg-[#C1A88B]/10 hover:text-white"
            >
              <Facebook className="h-5 w-5" />
            </a>

            {/* Socials – WhatsApp */}
            <a
              href="https://wa.me/19056930028?text=Hello%2C%20I%27m%20interested%20in%20your%20products"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
              className="grid place-items-center rounded-full h-9 w-9 md:h-10 md:w-10 transition-all duration-300 hover:bg-[#25D366]/10 hover:text-[#25D366]"
            >
              <MessageCircle className="h-5 w-5" />
            </a>


          </div>


          {/* Mobile menu button */}
          <button
            className={[
              "lg:hidden inline-flex items-center justify-center rounded-md border p-2 text-[#C1A88B]",
              "transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1A88B]/50",
              "border-[#C1A88B]/40 hover:bg-[#C1A88B]/10",
              scrolled ? "scale-95" : "scale-100",
            ].join(" ")}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile panel */}
        <div
          className={[
            "lg:hidden overflow-hidden transition-[max-height] duration-300",
            open ? "max-h-96" : "max-h-0",
          ].join(" ")}
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

            {/* Mobile actions */}
            <div className="mt-3 flex flex-col gap-3 border-t border-[#C1A88B]/20 pt-3 text-[#C1A88B]">
              <div className="flex items-center gap-5">
                <a href="#" className="inline-flex items-center gap-2">
                  <Search size={20} />
                  Search
                </a>
                <a href="#" className="inline-flex items-center gap-2">
                  <User size={20} />
                  Account
                </a>
                <a href="#" className="inline-flex items-center gap-2">
                  <ShoppingBag size={20} />
                  Cart
                </a>
              </div>

              {/* Mobile socials */}
              <div className="flex items-center gap-4 pt-2">
                <span className="text-xs tracking-[0.2em] text-[#C1A88B]/70">
                  FOLLOW&nbsp;US
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://instagram.com/elev8kitchens"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit our Instagram"
                    className="grid h-9 w-9 place-items-center rounded-full bg-[#C1A88B]/5 text-[#C1A88B] hover:bg-[#C1A88B]/15 transition-all duration-300"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://facebook.com/elev8kitchens"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit our Facebook"
                    className="grid h-9 w-9 place-items-center rounded-full bg-[#C1A88B]/5 text-[#C1A88B] hover:bg-[#C1A88B]/15 transition-all duration-300"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="https://wa.me/19056930028?text=Hello%2C%20I%27m%20interested%20in%20your%20products"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat with us on WhatsApp"
                    className="grid h-9 w-9 place-items-center rounded-full bg-[#25D366]/5 text-[#25D366] hover:bg-[#25D366]/15 transition-all duration-300"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function IconButton({ children, ariaLabel, compact = false }) {
  return (
    <button
      aria-label={ariaLabel}
      className={[
        "grid place-items-center rounded-full transition-all duration-300 ease-out",
        "hover:bg-[#C1A88B]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1A88B]/50",
        compact ? "h-8 w-8" : "h-9 w-9",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
