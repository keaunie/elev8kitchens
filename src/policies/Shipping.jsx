// ShippingPolicyPage.jsx — ELEV8 Kitchens / Shipping Policy
// Matches the design of TermsOfServicePage (gold pulses + dark cards)

import React, { useEffect } from "react";
import {
    Truck,
    Package,
    Phone,
    Mail,
    CalendarDays,
    Clock3,
    PhoneCall,
} from "lucide-react";


export default function ShippingPolicyPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="relative min-h-screen bg-[#050506] text-slate-50 overflow-hidden">
            {/* Scattered pulsing gold background (same as TermsOfService) */}
            <style>{`
        @keyframes pulseGold {
          0%   { transform: scale(0.9); opacity: 0.35; }
          50%  { transform: scale(1.15); opacity: 0.9; }
          100% { transform: scale(0.9); opacity: 0.35; }
        }
      `}</style>

            <div className="pointer-events-none absolute inset-0 -z-0">
                {/* Large glows */}

                {/* Circle 1 – Top Center */}
                <div
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "8%",
                        width: "540px",
                        height: "540px",
                        marginLeft: "-270px",
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(193,168,139,0.70) 0%, rgba(193,168,139,0.40) 30%, transparent 70%)",
                        filter: "blur(40px)",
                        animation: "pulseGold 8s ease-in-out infinite",
                    }}
                />

                {/* Circle 2 – Left Middle */}
                <div
                    style={{
                        position: "absolute",
                        left: "-4%",
                        top: "32%",
                        width: "420px",
                        height: "420px",
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(193,168,139,0.55) 0%, rgba(193,168,139,0.30) 35%, transparent 70%)",
                        filter: "blur(34px)",
                        animation: "pulseGold 7s ease-in-out infinite",
                        animationDelay: "1.2s",
                    }}
                />

                {/* Circle 3 – Right Upper */}
                <div
                    style={{
                        position: "absolute",
                        right: "-6%",
                        top: "22%",
                        width: "500px",
                        height: "500px",
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(193,168,139,0.60) 0%, rgba(193,168,139,0.30) 30%, transparent 70%)",
                        filter: "blur(36px)",
                        animation: "pulseGold 9s ease-in-out infinite",
                        animationDelay: "0.6s",
                    }}
                />

                {/* Circle 4 – Bottom Center */}
                <div
                    style={{
                        position: "absolute",
                        left: "50%",
                        bottom: "-4%",
                        width: "460px",
                        height: "460px",
                        marginLeft: "-230px",
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(193,168,139,0.45) 0%, rgba(193,168,139,0.20) 35%, transparent 70%)",
                        filter: "blur(38px)",
                        animation: "pulseGold 10s ease-in-out infinite",
                        animationDelay: "1.8s",
                    }}
                />

                {/* Circle 5 – Bottom Right */}
                <div
                    style={{
                        position: "absolute",
                        right: "-2%",
                        bottom: "10%",
                        width: "360px",
                        height: "360px",
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(193,168,139,0.55) 0%, rgba(193,168,139,0.25) 30%, transparent 70%)",
                        filter: "blur(32px)",
                        animation: "pulseGold 7.5s ease-in-out infinite",
                        animationDelay: "2.5s",
                    }}
                />

                {/* Accent glows – smaller, scattered */}

                {/* Accent 1 – Behind header left */}
                <div
                    style={{
                        position: "absolute",
                        left: "12%",
                        top: "14%",
                        width: "220px",
                        height: "220px",
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(193,168,139,0.55) 0%, rgba(193,168,139,0.22) 40%, transparent 72%)",
                        filter: "blur(26px)",
                        animation: "pulseGold 6s ease-in-out infinite",
                        animationDelay: "0.4s",
                    }}
                />

                {/* Accent 2 – Mid-right behind body */}
                <div
                    style={{
                        position: "absolute",
                        right: "15%",
                        top: "48%",
                        width: "260px",
                        height: "260px",
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(193,168,139,0.5) 0%, rgba(193,168,139,0.2) 38%, transparent 70%)",
                        filter: "blur(28px)",
                        animation: "pulseGold 8s ease-in-out infinite",
                        animationDelay: "1.9s",
                    }}
                />

                {/* Accent 3 – Left lower, behind bottom sections */}
                <div
                    style={{
                        position: "absolute",
                        left: "5%",
                        bottom: "24%",
                        width: "240px",
                        height: "240px",
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(193,168,139,0.48) 0%, rgba(193,168,139,0.18) 38%, transparent 70%)",
                        filter: "blur(26px)",
                        animation: "pulseGold 7.2s ease-in-out infinite",
                        animationDelay: "3.1s",
                    }}
                />

                {/* Accent 4 – Small halo center-right */}
                <div
                    style={{
                        position: "absolute",
                        right: "30%",
                        top: "63%",
                        width: "180px",
                        height: "180px",
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(193,168,139,0.55) 0%, rgba(193,168,139,0.25) 45%, transparent 75%)",
                        filter: "blur(20px)",
                        animation: "pulseGold 5.5s ease-in-out infinite",
                        animationDelay: "0.9s",
                    }}
                />

                {/* Accent 5 – Tiny highlight near contact section */}
                <div
                    style={{
                        position: "absolute",
                        right: "18%",
                        bottom: "8%",
                        width: "160px",
                        height: "160px",
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(193,168,139,0.60) 0%, rgba(193,168,139,0.26) 45%, transparent 75%)",
                        filter: "blur(18px)",
                        animation: "pulseGold 6.8s ease-in-out infinite",
                        animationDelay: "4s",
                    }}
                />
            </div>

            {/* Main content */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                {/* Header */}
                <header className="mb-10">
                    <p className="text-xs font-semibold tracking-[0.32em] text-slate-300 uppercase mb-3">
                        Shipping Policy
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                            ELEV8 Crafted Kitchens — Shipping & Delivery
                        </h1>
                        <Truck className="h-7 w-7 text-[#C1A88B]" />
                    </div>
                    <p className="text-sm sm:text-base text-slate-200 max-w-2xl">
                        This Shipping Policy explains how and when your ELEV8 Crafted
                        Kitchens products are shipped, delivery methods, timelines, and
                        responsibilities at the time of delivery.
                    </p>
                </header>

                {/* Shipping Policy Body */}
                <section className="space-y-8 rounded-2xl border border-white/15 bg-[#111111]/95 px-5 sm:px-7 py-6 sm:py-8 text-sm sm:text-[0.95rem] leading-relaxed text-slate-100 shadow-[0_18px_60px_rgba(0,0,0,0.65)]">
                    {/* Standard Shipping */}
                    <div id="shipping-standard">
                        <div className="flex items-center gap-2 mb-2">
                            <Package className="h-5 w-5 text-[#C1A88B]" />
                            <h2 className="text-xl sm:text-2xl font-semibold">
                                Shipping — Standard
                            </h2>
                        </div>
                        <p className="mb-3">
                            Some of our items are shippable by common carrier and wherever
                            possible you will see a shipping cost displayed to you during the
                            checkout process. The rate is based on the{" "}
                            <strong>“Standard” service</strong> offered by common carrier.
                        </p>
                        <p className="mb-3">
                            A signature is required upon delivery. The carrier will call to
                            set up a delivery time. Extraordinary delivery requirements may
                            necessitate an additional fee to the carrier.
                        </p>
                        <p className="mb-3">
                            The estimated delivery time will be approximately{" "}
                            <strong>20 – 30 business days</strong> from the time of order.
                        </p>
                        <p>
                            If your order contains one or more items that{" "}
                            <strong>cannot</strong> be shipped via common carrier, then your
                            entire order will fall under the{" "}
                            <strong>“To be quoted” shipping process</strong> described below.
                        </p>
                    </div>

                    {/* Shipping To Be Quoted */}
                    <div id="shipping-quoted">
                        <h3 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-300 mb-1">
                            Shipping — To Be Quoted
                        </h3>
                        <p className="mb-3">
                            Some of our items are too large, bulky, heavy or do not meet the
                            common carrier shipping criteria. In these cases, we ship by
                            whichever carrier will provide the{" "}
                            <strong>best value and service</strong>.
                        </p>
                        <p className="mb-3">
                            For these items, we will always provide you with a{" "}
                            <strong>shipping cost quotation</strong> and obtain your agreement
                            on that amount <strong>before</strong> we finalize your order and
                            charge your credit card.
                        </p>
                        <p>
                            Products that fall into this scenario are clearly marked and you
                            will see <strong>“To be quoted”</strong> in the “Shipping” field
                            of your shopping cart during the checkout process.
                        </p>
                    </div>

                    {/* Curbside Delivery */}
                    <div id="curbside-delivery">
                        <h3 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-300 mb-1">
                            Curbside Delivery Service
                        </h3>
                        <p className="mb-3">
                            <strong>“Curbside” Delivery service</strong> provides delivery of
                            your item(s) to the curb at the end of your driveway. This service
                            does <strong>not</strong> include installation or assembly of
                            items or removal of packaging materials.
                        </p>

                        <h4 className="font-semibold text-slate-100 mb-2">
                            Curbside Delivery — How it works:
                        </h4>
                        <ol className="list-decimal pl-5 space-y-2 mb-3">
                            <li>
                                Your item will be shipped to a local delivery terminal.
                            </li>
                            <li>
                                Once your order arrives at the local delivery terminal, the
                                terminal will call you to schedule a delivery appointment.
                                Deliveries are typically made between{" "}
                                <strong>8:00 a.m. and 5:00 p.m., Monday through Friday</strong>{" "}
                                (may vary by region) and will be scheduled within a{" "}
                                <strong>4-hour window</strong>.
                            </li>
                            <li>
                                Your item will be delivered when possible on a{" "}
                                <strong>lift gate truck</strong> and will be taken off the truck
                                by the delivery driver to the curbside.
                            </li>
                            <li>
                                Upon delivery, please carefully{" "}
                                <strong>inspect your item(s)</strong>. You will be required to
                                sign a Proof of Delivery receipt. Please note any damage to the
                                item or packaging on the delivery receipt or, if refusing
                                delivery due to damage, clearly note{" "}
                                <em>“refused due to damage”</em> on this receipt.
                            </li>
                            <li>
                                A signature is required for all deliveries; the driver is unable
                                to complete delivery without a signed delivery receipt.
                            </li>
                            <li>
                                Please include a <strong>daytime phone number</strong> in the
                                shipping information at the time of checkout so the carrier can
                                contact you to arrange delivery.
                            </li>
                        </ol>

                        <p className="mb-3">
                            <strong>Extraordinary delivery conditions</strong> (e.g. remote
                            locations, restricted access, special equipment) may require an
                            additional fee to be paid to the carrier.
                        </p>
                    </div>

                    {/* Timing Your Delivery – diagram section */}
                    <div
                        id="timing-delivery"
                        className="rounded-2xl border border-white/10 bg-black/50 px-4 sm:px-6 py-6 sm:py-8"
                    >
                        <div className="max-w-2xl mx-auto text-center mb-8">
                            <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                                Timing your Delivery
                            </h3>
                            <p className="text-sm sm:text-[0.95rem] text-slate-200">
                                When choosing Curbside Delivery, you&apos;ll be notified when
                                your order is ready to ship. We&apos;ll call you to book a
                                delivery appointment <strong>approximately 1 week</strong> ahead
                                of delivery.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            {/* Card 1 */}
                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="flex items-center justify-center h-12 w-12 rounded-full border border-[#C1A88B66] bg-black/60 shadow-[0_0_25px_rgba(193,168,139,0.35)]">
                                    <CalendarDays className="h-6 w-6 text-[#C1A88B]" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-semibold text-sm sm:text-base">
                                        Scheduled Delivery
                                    </h4>
                                    <p className="text-xs sm:text-sm text-slate-200">
                                        Our carrier will contact you in advance to schedule your
                                        delivery day and confirm the curbside drop-off details.
                                    </p>
                                    <p className="text-xs text-slate-400 italic">
                                        Deliveries are typically made Monday to Friday,
                                        approximately 8am–5pm (may vary by region).
                                    </p>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="flex items-center justify-center h-12 w-12 rounded-full border border-[#C1A88B66] bg-black/60 shadow-[0_0_25px_rgba(193,168,139,0.35)]">
                                    <Clock3 className="h-6 w-6 text-[#C1A88B]" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-semibold text-sm sm:text-base">
                                        4h Delivery Window
                                    </h4>
                                    <p className="text-xs sm:text-sm text-slate-200">
                                        You&apos;ll be given a <strong>4-hour delivery window</strong>{" "}
                                        so you can conveniently plan your day and ensure someone is
                                        available to receive the order.
                                    </p>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="flex items-center justify-center h-12 w-12 rounded-full border border-[#C1A88B66] bg-black/60 shadow-[0_0_25px_rgba(193,168,139,0.35)]">
                                    <PhoneCall className="h-6 w-6 text-[#C1A88B]" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-semibold text-sm sm:text-base">
                                        Pre-delivery Confirmation
                                    </h4>
                                    <p className="text-xs sm:text-sm text-slate-200">
                                        The driver will call in advance on the day of delivery to
                                        confirm timing and ensure someone will be home to sign the
                                        Proof of Delivery.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Delivery Restrictions */}
                    <div id="delivery-restrictions">
                        <h3 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-300 mb-1">
                            Delivery Restrictions
                        </h3>
                        <p className="mb-3">
                            Certain items may be subject to{" "}
                            <strong>delivery restrictions</strong> based on your location or
                            carrier limitations.
                        </p>
                        <p>
                            Please proceed to checkout to verify if delivery is available to
                            your postal code. If delivery is not available, we will notify you
                            and discuss alternative options where possible.
                        </p>
                    </div>

                    {/* Contact for Shipping Questions */}
                    <div
                        id="shipping-contact"
                        className="mt-4 rounded-xl border border-[#C1A88B55] bg-black/60 px-4 sm:px-5 py-4"
                    >
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                                <Phone className="h-5 w-5 text-[#C1A88B]" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-xs font-semibold tracking-[0.22em] uppercase text-slate-300 flex items-center gap-2">
                                    Shipping Questions
                                    <Mail className="h-4 w-4 text-[#C1A88B]" />
                                </h4>
                                <p className="text-slate-200 text-sm">
                                    If you have any questions about shipping methods, timelines,
                                    curbside delivery, or special delivery requirements, please
                                    contact us:
                                </p>
                                <p className="text-sm">
                                    Email:{" "}
                                    <a
                                        href="mailto:sales.elev8@habitat28.com"
                                        className="text-[#C1A88B] hover:text-[#e2c89f] underline underline-offset-4"
                                    >
                                        sales.elev8@habitat28.com
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
