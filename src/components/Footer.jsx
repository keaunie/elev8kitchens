import React from "react";
import { Mail, MapPin } from "lucide-react";

const links = [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Terms of Service", href: "/policies/terms" },
    { label: "Shipping Policy", href: "/policies/shipping" },
    { label: "Privacy Policy", href: "/policies/privacy" },
    { label: "Return & Refund Policy", href: "/policies/refund" },
    { label: "Track Your Order", href: "/orders/lookup" },
];

export default function Footer() {
    return (
        <footer className="relative isolate bg-[#0B0B0B] text-white text-[13px] leading-relaxed">
            {/* Soft vignette + gold wash */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#C1A88B]/10 blur-3xl" />
                <div className="absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#C1A88B]/10 blur-3xl" />
            </div>

            <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
                <div className="grid gap-10 md:grid-cols-12 md:gap-8">
                    {/* Brand + pitch */}
                    <div className="md:col-span-4">
                        <img
                            src="https://elev8kitchens.com/cdn/shop/files/ELEV8-Crafted-Kitchens-Logo.png?v=1748394896&width=240"
                            alt="ELEV8 Crafted Kitchens"
                            className="h-8 w-auto"
                        />
                        <h3 className="mt-5 font-serif text-[15px] text-[#C1A88B]">
                            Create Your Backyard Oasis Today!
                        </h3>
                        <p className="mt-2 max-w-md text-white/85 text-[12px] leading-snug">
                            Enjoy premium materials, cutting-edge safety tech, and sleek design — all in
                            one modular setup.
                        </p>
                    </div>

                    {/* Contact info */}
                    <div className="md:col-span-4">
                        <h4 className="font-serif text-[15px] text-[#C1A88B]">Contact Info</h4>
                        <p className="mt-1 font-semibold text-[13px]">Serving: U.S. &amp; Canada</p>

                        <div className="mt-3 space-y-3 text-white/90">
                            <address className="not-italic">
                                <div className="font-semibold text-[13px]">California</div>
                                <div className="mt-1 flex items-start gap-2 text-[12px]">
                                    <MapPin className="mt-1 h-3.5 w-3.5 text-[#C1A88B]" />
                                    <span>
                                        125 W 4th St, Unit 106
                                        <br />
                                        Los Angeles CA 90013
                                    </span>
                                </div>
                            </address>

                            <address className="not-italic">
                                <div className="font-semibold text-[13px]">Canada</div>
                                <div className="mt-1 flex items-start gap-2 text-[12px]">
                                    <MapPin className="mt-1 h-3.5 w-3.5 text-[#C1A88B]" />
                                    <span>
                                        47 Morton Avenue East, Unit 3
                                        <br />
                                        Brantford ON N3R 7J5
                                    </span>
                                </div>
                            </address>

                            <div className="flex items-center gap-2 text-[12px]">
                                <Mail className="h-3.5 w-3.5 text-[#C1A88B]" />
                                <a
                                    href="mailto:sales.elev8@habitat28.com"
                                    className="hover:text-[#C1A88B] transition"
                                >
                                    sales.elev8@habitat28.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Quick Links (left) + Partner Card (right) */}
                    <div className="md:col-span-4">
                        <div className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
                            {/* Quick Links (left) */}
                            <div>
                                <h4 className="font-serif text-[15px] text-[#C1A88B]">Quick Links</h4>
                                <ul className="mt-3 grid gap-2 text-[12px]">
                                    {links.map((l) => (
                                        <li key={l.label}>
                                            <a
                                                href={l.href}
                                                className="inline-block text-white/85 hover:text-[#C1A88B] transition"
                                            >
                                                {l.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Partner Card (right) */}
                            <a
                                href="https://habitat28.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <div
                                    className="
                    rounded-2xl ring-1 ring-black/10 shadow-[0_8px_25px_rgba(0,0,0,0.4)]
                    p-5 sm:p-6 text-neutral-900
                    min-h-[220px]
                    bg-[linear-gradient(90deg,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.55)_10%,rgba(255,255,255,0.98)_25%,rgba(255,255,255,0.98)_100%)]
                  "
                                >
                                    <div className="flex h-full flex-col items-center justify-end text-center gap-3">
                                        <img
                                            src="https://cdn.shopify.com/s/files/1/0692/3147/6903/files/Habitat28.png?v=1746069947"
                                            alt="Habitat28"
                                            className="h-10 w-auto"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                        <p className="font-serif text-[15px] leading-tight">
                                            Redefining Modular Space
                                        </p>
                                        <p className="text-[12px] md:text-[13px]">info@habitat28.com</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="mt-10 h-px w-full bg-white/10" />

                {/* Bottom bar */}
                <div className="mt-6 flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <p className="text-[12px] text-white/70">
                        © {new Date().getFullYear()}, ELEV8 CRAFTED KITCHENS
                    </p>

                    {/* Payment rail */}
                    <div className="flex flex-wrap items-center gap-3 opacity-85">
                        {[
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/120px-American_Express_logo_%282018%29.svg.png?20191022102801",
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Apple_Pay_Acceptance_Mark.svg/640px-Apple_Pay_Acceptance_Mark.svg.png",
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Font_Awesome_5_brands_cc-discover.svg/640px-Font_Awesome_5_brands_cc-discover.svg.png",
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/640px-Google_Pay_Logo.svg.png",
                            "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png",
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/PayPal_Logo2014.svg/640px-PayPal_Logo2014.svg.png",
                            "https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg",
                        ].map((src, i) => (
                            <div
                                key={i}
                                className="grid h-6 w-10 place-items-center rounded-md bg-white"
                                title="Payment method"
                            >
                                <img
                                    src={src}
                                    alt=""
                                    className="max-h-3.5 w-auto"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
