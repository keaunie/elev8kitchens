import React, { useEffect } from "react";
import { FileText, ShieldCheck, Mail } from "lucide-react";

export default function TermsOfServicePage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="relative min-h-screen bg-[#050506] text-slate-50 overflow-hidden">
            {/* Scattered pulsing gold background */}
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

                {/* Accent 3 – Left lower, behind sections 10–15 */}
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


            {/* Main content wrapper stays on top of glow */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                {/* Header */}
                <header className="mb-10">
                    <p className="text-xs font-semibold tracking-[0.32em] text-slate-400 uppercase mb-3">
                        Terms of Service
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                            ELEV8 Crafted Kitchens — Legal & Warranty
                        </h1>
                        <FileText className="h-6 w-6 text-[#C1A88B]" />
                    </div>
                    <p className="text-sm sm:text-base text-slate-200 max-w-2xl">
                        Please review this Warranty and Terms of Service carefully. By using
                        our website or purchasing from ELEV8 Crafted Kitchens, you agree to
                        the terms outlined below.
                    </p>
                </header>

                {/* WARRANTY */}
                <section className="mb-10 rounded-2xl border border-[#C1A88B55] bg-[#111111]/95 px-5 sm:px-7 py-6 sm:py-7">
                    <div className="flex items-center gap-2 mb-4">
                        <ShieldCheck className="h-5 w-5 text-[#C1A88B]" />
                        <h2 className="text-xl sm:text-2xl font-semibold">
                            Warranty — ELEV8 Crafted Kitchens
                        </h2>
                    </div>

                    <p className="text-sm sm:text-[0.95rem] text-slate-100 mb-3">
                        ELEV8 Crafted Kitchens are backed by a{" "}
                        <strong>1-year warranty</strong> against manufacturing defects and
                        faulty craftsmanship.
                    </p>

                    <div className="space-y-3 text-sm sm:text-[0.95rem] text-slate-100">
                        <div>
                            <h3 className="font-semibold mb-1.5">This warranty covers:</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>BBQ and Exhaust Hood</li>
                                <li>Structural elements</li>
                                <li>Electrical components</li>
                            </ul>
                            <p className="mt-2 text-slate-200">
                                Electrical appliances carry the{" "}
                                <strong>manufacturer&apos;s warranty</strong>. For any issues
                                with an appliance, please contact the manufacturer directly.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-1.5">
                                Exclusions (not covered):
                            </h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Floor models (sold AS-IS, no warranty).</li>
                                <li>
                                    Damage caused by improper installation, misuse, or lack of
                                    regular maintenance.
                                </li>
                                <li>
                                    Wear and tear from normal use or environmental conditions.
                                </li>
                                <li>Non-level surfaces where the unit has been installed.</li>
                                <li>
                                    Freezing of lines due to not winterizing plumbing systems.
                                </li>
                                <li>Any improper connection of gas.</li>
                            </ul>
                        </div>

                        <div className="pt-3 border-t border-white/10 mt-2">
                            <h3 className="font-semibold mb-1.5">
                                Warranty service & replacement parts
                            </h3>
                            <p className="text-slate-200 mb-1.5">
                                For warranty service or to request a replacement part, please
                                contact:
                            </p>
                            <p className="text-sm">
                                Email:{" "}
                                <a
                                    className="text-[#C1A88B] hover:text-[#e2c89f] underline underline-offset-4"
                                    href="mailto:customerservice.elev8@habitat28.com"
                                >
                                    customerservice.elev8@habitat28.com
                                </a>
                            </p>
                        </div>
                    </div>
                </section>

                {/* TERMS BODY */}
                <section className="space-y-8 rounded-2xl border border-white/15 bg-[#111111]/95 px-5 sm:px-7 py-6 sm:py-8 text-sm sm:text-[0.95rem] leading-relaxed text-slate-100">
                    {/* OVERVIEW */}
                    <div id="overview">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-3">
                            Overview
                        </h2>
                        <p className="mb-3">
                            This website is operated by{" "}
                            <strong>ELEV8 CRAFTED KITCHENS</strong>. Throughout the site, the
                            terms “we”, “us” and “our” refer to ELEV8 CRAFTED KITCHENS. ELEV8
                            CRAFTED KITCHENS offers this website, including all information,
                            tools and Services available from this site to you, the user,
                            conditioned upon your acceptance of all terms, conditions,
                            policies and notices stated here.
                        </p>
                        <p className="mb-3">
                            By visiting our site and/or purchasing something from us, you
                            engage in our “Service” and agree to be bound by the following
                            terms and conditions (“Terms of Service”, “Terms”), including those
                            additional terms and conditions and policies referenced herein
                            and/or available by hyperlink. These Terms of Service apply to all
                            users of the site, including without limitation users who are
                            browsers, vendors, customers, merchants, and/or contributors of
                            content.
                        </p>
                        <p className="mb-3">
                            Please read these Terms of Service carefully before accessing or
                            using our website. By accessing or using any part of the site, you
                            agree to be bound by these Terms of Service. If you do not agree
                            to all the terms and conditions of this agreement, then you may
                            not access the website or use any Services. If these Terms of
                            Service are considered an offer, acceptance is expressly limited
                            to these Terms of Service.
                        </p>
                        <p className="mb-3">
                            Any new features or tools which are added to the current store
                            shall also be subject to the Terms of Service. You can review the
                            most current version of the Terms of Service at any time on this
                            page. We reserve the right to update, change or replace any part
                            of these Terms of Service by posting updates and/or changes to our
                            website. It is your responsibility to check this page periodically
                            for changes. Your continued use of or access to the website
                            following the posting of any changes constitutes acceptance of
                            those changes.
                        </p>
                        <p>
                            Our store is hosted on Shopify Inc. They provide us with the
                            online e-commerce platform that allows us to sell our products and
                            Services to you.
                        </p>
                    </div>

                    {/* SECTION 1 */}
                    <div id="store-terms">
                        <h3 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-300 mb-1">
                            Section 1 — Online Store Terms
                        </h3>
                        <p className="mb-3">
                            By agreeing to these Terms of Service, you represent that you are
                            at least the age of majority in your state or province of
                            residence, or that you are the age of majority in your state or
                            province of residence and you have given us your consent to allow
                            any of your minor dependents to use this site.
                        </p>
                        <p className="mb-3">
                            You may not use our products for any illegal or unauthorized
                            purpose nor may you, in the use of the Service, violate any laws
                            in your jurisdiction (including but not limited to copyright
                            laws).
                        </p>
                        <p className="mb-3">
                            You must not transmit any worms or viruses or any code of a
                            destructive nature.
                        </p>
                        <p>
                            A breach or violation of any of the Terms will result in an
                            immediate termination of your Services.
                        </p>
                    </div>

                    {/* SECTION 2 */}
                    <div id="general-conditions">
                        <h3 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-300 mb-1">
                            Section 2 — General Conditions
                        </h3>
                        <p className="mb-3">
                            We reserve the right to refuse Service to anyone for any reason at
                            any time.
                        </p>
                        <p className="mb-3">
                            You understand that your content (not including credit card
                            information), may be transferred unencrypted and involve (a)
                            transmissions over various networks; and (b) changes to conform
                            and adapt to technical requirements of connecting networks or
                            devices. Credit card information is always encrypted during
                            transfer over networks.
                        </p>
                        <p className="mb-3">
                            You agree not to reproduce, duplicate, copy, sell, resell or
                            exploit any portion of the Service, use of the Service, or access
                            to the Service or any contact on the website through which the
                            Service is provided, without express written permission by us.
                        </p>
                        <p>
                            The headings used in this agreement are included for convenience
                            only and will not limit or otherwise affect these Terms.
                        </p>
                    </div>

                    {/* SECTION 3 */}
                    <div id="accuracy-info">
                        <h3 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-300 mb-1">
                            Section 3 — Accuracy, Completeness and Timeliness of Information
                        </h3>
                        <p className="mb-3">
                            We are not responsible if information made available on this site
                            is not accurate, complete or current. The material on this site is
                            provided for general information only and should not be relied
                            upon or used as the sole basis for making decisions without
                            consulting primary, more accurate, more complete or more timely
                            sources of information. Any reliance on the material on this site
                            is at your own risk.
                        </p>
                        <p>
                            This site may contain certain historical information. Historical
                            information, necessarily, is not current and is provided for your
                            reference only. We reserve the right to modify the contents of
                            this site at any time, but we have no obligation to update any
                            information on our site. You agree that it is your responsibility
                            to monitor changes to our site.
                        </p>
                    </div>

                    {/* SECTION 4 */}
                    <div id="mods-service">
                        <h3 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-300 mb-1">
                            Section 4 — Modifications to the Service and Prices
                        </h3>
                        <p className="mb-3">
                            Prices for our products are subject to change without notice.
                        </p>
                        <p className="mb-3">
                            We reserve the right at any time to modify or discontinue the
                            Service (or any part or content thereof) without notice at any
                            time.
                        </p>
                        <p>
                            We shall not be liable to you or to any third-party for any
                            modification, price change, suspension or discontinuance of the
                            Service.
                        </p>
                    </div>

                    {/* SECTION 5 */}
                    <div id="products-services">
                        <h3 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-300 mb-1">
                            Section 5 — Products or Services
                        </h3>
                        <p className="mb-3">
                            Certain products or Services may be available exclusively online
                            through the website. These products or Services may have limited
                            quantities and are subject to return or exchange only according to
                            our Refund Policy: [LINK TO REFUND POLICY]
                        </p>
                        <p className="mb-3">
                            We have made every effort to display as accurately as possible the
                            colors and images of our products that appear at the store. We
                            cannot guarantee that your computer monitor&apos;s display of any
                            color will be accurate.
                        </p>
                        <p className="mb-3">
                            We reserve the right, but are not obligated, to limit the sales of
                            our products or Services to any person, geographic region or
                            jurisdiction. We may exercise this right on a case-by-case basis.
                            We reserve the right to limit the quantities of any products or
                            Services that we offer. All descriptions of products or product
                            pricing are subject to change at anytime without notice, at the
                            sole discretion of us. We reserve the right to discontinue any
                            product at any time. Any offer for any product or Service made on
                            this site is void where prohibited.
                        </p>
                        <p>
                            We do not warrant that the quality of any products, Services,
                            information, or other material purchased or obtained by you will
                            meet your expectations, or that any errors in the Service will be
                            corrected.
                        </p>
                    </div>

                    {/* SECTION 6 */}
                    <div id="billing">
                        <h3 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-300 mb-1">
                            Section 6 — Accuracy of Billing and Account Information
                        </h3>
                        <p className="mb-3">
                            We reserve the right to refuse any order you place with us. We
                            may, in our sole discretion, limit or cancel quantities purchased
                            per person, per household or per order. These restrictions may
                            include orders placed by or under the same customer account, the
                            same credit card, and/or orders that use the same billing and/or
                            shipping address. In the event that we make a change to or cancel
                            an order, we may attempt to notify you by contacting the e-mail
                            and/or billing address/phone number provided at the time the order
                            was made. We reserve the right to limit or prohibit orders that,
                            in our sole judgment, appear to be placed by dealers, resellers or
                            distributors.
                        </p>
                        <p className="mb-3">
                            You agree to provide current, complete and accurate purchase and
                            account information for all purchases made at our store. You agree
                            to promptly update your account and other information, including
                            your email address and credit card numbers and expiration dates,
                            so that we can complete your transactions and contact you as
                            needed.
                        </p>
                        <p>
                            For more details, please review our Refund Policy: [LINK TO REFUND
                            POLICY]
                        </p>
                    </div>

                    {/* SECTION 7 */}
                    <div id="optional-tools">
                        <h3 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-300 mb-1">
                            Section 7 — Optional Tools
                        </h3>
                        <p className="mb-3">
                            We may provide you with access to third-party tools over which we
                            neither monitor nor have any control nor input.
                        </p>
                        <p className="mb-3">
                            You acknowledge and agree that we provide access to such tools ”as
                            is” and “as available” without any warranties, representations or
                            conditions of any kind and without any endorsement. We shall have
                            no liability whatsoever arising from or relating to your use of
                            optional third-party tools.
                        </p>
                        <p className="mb-3">
                            Any use by you of the optional tools offered through the site is
                            entirely at your own risk and discretion and you should ensure
                            that you are familiar with and approve of the terms on which tools
                            are provided by the relevant third-party provider(s).
                        </p>
                        <p>
                            We may also, in the future, offer new Services and/or features
                            through the website (including the release of new tools and
                            resources). Such new features and/or Services shall also be
                            subject to these Terms of Service.
                        </p>
                    </div>

                    {/* SECTION 8 */}
                    <div id="third-party-links">
                        <h3 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-300 mb-1">
                            Section 8 — Third-Party Links
                        </h3>
                        <p className="mb-3">
                            Certain content, products and Services available via our Service
                            may include materials from third-parties.
                        </p>
                        <p className="mb-3">
                            Third-party links on this site may direct you to third-party
                            websites that are not affiliated with us. We are not responsible
                            for examining or evaluating the content or accuracy and we do not
                            warrant and will not have any liability or responsibility for any
                            third-party materials or websites, or for any other materials,
                            products, or Services of third-parties.
                        </p>
                        <p>
                            We are not liable for any harm or damages related to the purchase
                            or use of goods, Services, resources, content, or any other
                            transactions made in connection with any third-party websites.
                        </p>
                    </div>

                    {/* SECTION 9 */}
                    <div id="user-comments">
                        <h3 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-300 mb-1">
                            Section 9 — User Comments, Feedback and Other Submissions
                        </h3>
                        <p className="mb-3">
                            If, at our request, you send certain specific submissions (for
                            example contest entries) or without a request from us, you send
                            creative ideas, suggestions, proposals, plans, or other materials,
                            whether online, by email, by postal mail, or otherwise
                            (collectively, &apos;comments&apos;), you agree that we may, at
                            any time, without restriction, edit, copy, publish, distribute,
                            translate and otherwise use in any medium any comments that you
                            forward to us.
                        </p>
                        <p className="mb-3">
                            We may, but have no obligation to, monitor, edit or remove content
                            that we determine in our sole discretion to be unlawful,
                            offensive, threatening, libelous, defamatory, pornographic,
                            obscene or otherwise objectionable or violates any party’s
                            intellectual property or these Terms of Service.
                        </p>
                        <p className="mb-3">
                            You agree that your comments will not violate any right of any
                            third-party, including copyright, trademark, privacy, personality
                            or other personal or proprietary right.
                        </p>
                        <p>
                            You are solely responsible for any comments you make and their
                            accuracy. We take no responsibility and assume no liability for
                            any comments posted by you or any third-party.
                        </p>
                    </div>

                    {/* SECTION 10 */}
                    <div id="personal-info">
                        <h3 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-300 mb-1">
                            Section 10 — Personal Information
                        </h3>
                        <p>
                            Your submission of personal information through the store is
                            governed by our Privacy Policy, which can be viewed here: [LINK TO
                            PRIVACY POLICY]
                        </p>
                    </div>

                    {/* SECTION 11 */}
                    <div id="errors">
                        <h3 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-300 mb-1">
                            Section 11 — Errors, Inaccuracies and Omissions
                        </h3>
                        <p className="mb-3">
                            Occasionally there may be information on our site or in the
                            Service that contains typographical errors, inaccuracies or
                            omissions that may relate to product descriptions, pricing,
                            promotions, offers, product shipping charges, transit times and
                            availability. We reserve the right to correct any errors,
                            inaccuracies or omissions, and to change or update information or
                            cancel orders if any information in the Service or on any related
                            website is inaccurate at any time without prior notice (including
                            after you have submitted your order).
                        </p>
                        <p>
                            We undertake no obligation to update, amend or clarify information
                            in the Service or on any related website, including without
                            limitation, pricing information, except as required by law.
                        </p>
                    </div>

                    {/* SECTION 12 */}
                    <div id="prohibited-uses">
                        <h3 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-300 mb-1">
                            Section 12 — Prohibited Uses
                        </h3>
                        <p className="mb-3">
                            In addition to other prohibitions as set forth in the Terms of
                            Service, you are prohibited from using the site or its content:
                        </p>
                        <ul className="list-[lower-alpha] pl-6 space-y-1.5 mb-3">
                            <li>for any unlawful purpose;</li>
                            <li>
                                to solicit others to perform or participate in any unlawful
                                acts;
                            </li>
                            <li>
                                to violate any international, federal, provincial or state
                                regulations, rules, laws, or local ordinances;
                            </li>
                            <li>
                                to infringe upon or violate our intellectual property rights or
                                the intellectual property rights of others;
                            </li>
                            <li>
                                to harass, abuse, insult, harm, defame, slander, disparage,
                                intimidate, or discriminate based on gender, sexual orientation,
                                religion, ethnicity, race, age, national origin, or disability;
                            </li>
                            <li>to submit false or misleading information;</li>
                            <li>
                                to upload or transmit viruses or any other type of malicious
                                code;
                            </li>
                            <li>to collect or track the personal information of others;</li>
                            <li>to spam, phish, pharm, pretext, spider, crawl, or scrape;</li>
                            <li>for any obscene or immoral purpose; or</li>
                            <li>
                                to interfere with or circumvent the security features of the
                                Service or any related website, other websites, or the
                                Internet.
                            </li>
                        </ul>
                        <p>
                            We reserve the right to terminate your use of the Service or any
                            related website for violating any of the prohibited uses.
                        </p>
                    </div>

                    {/* SECTION 13 */}
                    <div id="disclaimer">
                        <h3 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-300 mb-1">
                            Section 13 — Disclaimer of Warranties; Limitation of Liability
                        </h3>
                        <p className="mb-3">
                            We do not guarantee, represent or warrant that your use of our
                            Service will be uninterrupted, timely, secure or error-free.
                        </p>
                        <p className="mb-3">
                            We do not warrant that the results that may be obtained from the
                            use of the Service will be accurate or reliable.
                        </p>
                        <p className="mb-3">
                            You expressly agree that your use of, or inability to use, the
                            Service is at your sole risk. The Service and all products and
                            Services delivered to you through the Service are (except as
                            expressly stated by us) provided &apos;as is&apos; and &apos;as
                            available&apos; for your use, without any representation,
                            warranties or conditions of any kind.
                        </p>
                        <p>
                            In no case shall ELEV8 CRAFTED KITCHENS, our directors, officers,
                            employees, affiliates, agents, contractors, interns, suppliers,
                            Service providers or licensors be liable for any injury, loss,
                            claim, or any direct, indirect, incidental, punitive, special, or
                            consequential damages of any kind.
                        </p>
                    </div>

                    {/* SECTION 14 */}
                    <div id="indemnification">
                        <h3 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-300 mb-1">
                            Section 14 — Indemnification
                        </h3>
                        <p>
                            You agree to indemnify, defend and hold harmless ELEV8 CRAFTED
                            KITCHENS and our parent, subsidiaries, affiliates, partners,
                            officers, directors, agents, contractors, licensors, Service
                            providers, subcontractors, suppliers, interns and employees,
                            harmless from any claim or demand, including reasonable attorneys’
                            fees, made by any third-party due to or arising out of your breach
                            of these Terms of Service or your violation of any law or the
                            rights of a third-party.
                        </p>
                    </div>

                    {/* SECTION 15 */}
                    <div id="severability">
                        <h3 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-300 mb-1">
                            Section 15 — Severability
                        </h3>
                        <p>
                            If any provision of these Terms of Service is determined to be
                            unlawful, void or unenforceable, that provision shall nonetheless
                            be enforceable to the fullest extent permitted by applicable law,
                            and the unenforceable portion shall be deemed to be severed from
                            these Terms of Service.
                        </p>
                    </div>

                    {/* SECTION 16 */}
                    <div id="termination">
                        <h3 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-300 mb-1">
                            Section 16 — Termination
                        </h3>
                        <p className="mb-3">
                            The obligations and liabilities of the parties incurred prior to
                            the termination date shall survive the termination of this
                            agreement for all purposes.
                        </p>
                        <p className="mb-3">
                            These Terms of Service are effective unless and until terminated
                            by either you or us. You may terminate these Terms of Service at
                            any time by notifying us that you no longer wish to use our
                            Services, or when you cease using our site.
                        </p>
                        <p>
                            If in our sole judgment you fail, or we suspect that you have
                            failed, to comply with any term or provision of these Terms of
                            Service, we may terminate this agreement at any time without
                            notice and you will remain liable for all amounts due up to and
                            including the date of termination.
                        </p>
                    </div>

                    {/* SECTION 17 */}
                    <div id="entire-agreement">
                        <h3 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-300 mb-1">
                            Section 17 — Entire Agreement
                        </h3>
                        <p className="mb-3">
                            These Terms of Service and any policies or operating rules posted
                            by us on this site or in respect to the Service constitutes the
                            entire agreement and understanding between you and us and governs
                            your use of the Service, superseding any prior agreements between
                            you and us.
                        </p>
                        <p>
                            Any ambiguities in the interpretation of these Terms of Service
                            shall not be construed against the drafting party.
                        </p>
                    </div>

                    {/* SECTION 18 */}
                    <div id="governing-law">
                        <h3 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-300 mb-1">
                            Section 18 — Governing Law
                        </h3>
                        <p>
                            These Terms of Service and any separate agreements whereby we
                            provide you Services shall be governed by and construed in
                            accordance with the laws of Canada.
                        </p>
                    </div>

                    {/* SECTION 19 */}
                    <div id="changes">
                        <h3 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-300 mb-1">
                            Section 19 — Changes to Terms of Service
                        </h3>
                        <p className="mb-3">
                            You can review the most current version of the Terms of Service at
                            any time at this page.
                        </p>
                        <p>
                            We reserve the right, at our sole discretion, to update, change or
                            replace any part of these Terms of Service by posting updates and
                            changes to our website. Your continued use of or access to our
                            website or the Service following the posting of any changes
                            constitutes acceptance of those changes.
                        </p>
                    </div>

                    {/* SECTION 20 */}
                    <div id="contact">
                        <h3 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-300 mb-1 flex items-center gap-2">
                            Section 20 — Contact Information
                            <Mail className="h-4 w-4 text-[#C1A88B]" />
                        </h3>
                        <p className="mb-3">
                            Questions about the Terms of Service should be sent to us at{" "}
                            <a
                                href="mailto:sales.elev8@habitat28.com"
                                className="text-[#C1A88B] hover:text-[#e2c89f] underline underline-offset-4"
                            >
                                sales.elev8@habitat28.com
                            </a>
                            .
                        </p>
                        <div className="text-sm text-slate-200">
                            <p className="font-semibold">Our contact information:</p>
                            <p>Email: sales.elev8@habitat28.com</p>
                            <p>Address: 125 W 4th St, Unit 106</p>
                            <p>Los Angeles CA 90013</p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
