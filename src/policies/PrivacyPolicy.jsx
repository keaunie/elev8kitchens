// PrivacyPolicyPage.jsx — ELEV8 Kitchens / Privacy Policy
// Matches TermsOfServicePage & ShippingPolicyPage styling

import React, { useEffect } from "react";
import {
    Shield,
    Lock,
    Globe2,
    UserRound,
    Mail,
    Phone,
    FileText,
    Trash2,
    BellOff,
} from "lucide-react";


export default function PrivacyPolicyPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="relative min-h-screen bg-[#050506] text-slate-50 overflow-hidden">
            {/* Scattered pulsing gold background (same as other legal pages) */}
            <style>{`
        @keyframes pulseGold {
          0%   { transform: scale(0.9); opacity: 0.35; }
          50%  { transform: scale(1.15); opacity: 0.9; }
          100% { transform: scale(0.9); opacity: 0.35; }
        }
      `}</style>

            <div className="pointer-events-none absolute inset-0 -z-0">
                {/* Large glows */}
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
                {/* Accent glows */}
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
                        Privacy Policy
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                            ELEV8 Crafted Kitchens — Privacy & Data Protection
                        </h1>
                        <Shield className="h-7 w-7 text-[#C1A88B]" />
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-300">
                        <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/40 px-3 py-1">
                            <Lock className="h-3.5 w-3.5 text-[#C1A88B]" />
                            Last updated: <span className="font-medium">May 27, 2025</span>
                        </span>
                    </div>
                </header>

                {/* Body */}
                <section className="space-y-8 rounded-2xl border border-white/15 bg-[#111111]/95 px-5 sm:px-7 py-6 sm:py-8 text-sm sm:text-[0.95rem] leading-relaxed text-slate-100 shadow-[0_18px_60px_rgba(0,0,0,0.65)]">
                    {/* Intro */}
                    <div id="privacy-intro">
                        <p className="mb-3">
                            This Privacy Policy describes how{" "}
                            <strong>ELEV8 CRAFTED KITCHENS</strong> (the &quot;Site&quot;,
                            &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects,
                            uses, and discloses your personal information when you visit, use
                            our services, or make a purchase from{" "}
                            <strong>elev8kitchens.com</strong> (the &quot;Site&quot;) or
                            otherwise communicate with us regarding the Site (collectively,
                            the &quot;Services&quot;). For purposes of this Privacy Policy,
                            &quot;you&quot; and &quot;your&quot; means you as the user of the
                            Services, whether you are a customer, website visitor, or another
                            individual whose information we have collected pursuant to this
                            Privacy Policy.
                        </p>
                        <p className="mb-3">
                            Please read this Privacy Policy carefully. By using and accessing
                            any of the Services, you agree to the collection, use, and
                            disclosure of your information as described in this Privacy
                            Policy. If you do not agree to this Privacy Policy, please do not
                            use or access any of the Services.
                        </p>
                    </div>

                    {/* Changes */}
                    <div id="changes-policy">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                            Changes to This Privacy Policy
                        </h2>
                        <p>
                            We may update this Privacy Policy from time to time, including to
                            reflect changes to our practices or for other operational, legal,
                            or regulatory reasons. We will post the revised Privacy Policy on
                            the Site, update the &quot;Last updated&quot; date and take any
                            other steps required by applicable law.
                        </p>
                    </div>

                    {/* How we collect & use */}
                    <div id="collection-use">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                            How We Collect and Use Your Personal Information
                        </h2>
                        <p className="mb-3">
                            To provide the Services, we collect personal information about you
                            from a variety of sources, as set out below. The information that
                            we collect and use varies depending on how you interact with us.
                        </p>
                        <p>
                            In addition to the specific uses set out below, we may use
                            information we collect about you to communicate with you, provide
                            or improve the Services, comply with any applicable legal
                            obligations, enforce any applicable terms of service, and to
                            protect or defend the Services, our rights, and the rights of our
                            users or others.
                        </p>
                    </div>

                    {/* What personal info we collect */}
                    <div id="what-we-collect">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                            What Personal Information We Collect
                        </h2>
                        <p className="mb-3">
                            The types of personal information we obtain about you depends on
                            how you interact with our Site and use our Services. When we use
                            the term &quot;personal information&quot;, we are referring to
                            information that identifies, relates to, describes or can be
                            associated with you.
                        </p>
                        <p className="mb-3">
                            The following sections describe the categories and specific types
                            of personal information we collect.
                        </p>

                        {/* Direct info */}
                        <h3 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-300 mb-1">
                            Information We Collect Directly From You
                        </h3>
                        <p className="mb-2">
                            Information that you directly submit to us through our Services
                            may include:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 mb-3">
                            <li>
                                <strong>Contact details</strong> including your name, address,
                                phone number, and email.
                            </li>
                            <li>
                                <strong>Order information</strong> including your name, billing
                                address, shipping address, payment confirmation, email address,
                                and phone number.
                            </li>
                            <li>
                                <strong>Account information</strong> including your username,
                                password, security questions and other information used for
                                account security purposes.
                            </li>
                            <li>
                                <strong>Customer support information</strong> including the
                                information you choose to include in communications with us, for
                                example, when sending a message through the Services.
                            </li>
                        </ul>
                        <p className="mb-4">
                            Some features of the Services may require you to directly provide
                            us with certain information about yourself. You may elect not to
                            provide this information, but doing so may prevent you from using
                            or accessing these features.
                        </p>

                        {/* Usage data */}
                        <h3 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-300 mb-1">
                            Information We Collect About Your Usage
                        </h3>
                        <p className="mb-3">
                            We may also automatically collect certain information about your
                            interaction with the Services (&quot;Usage Data&quot;). To do
                            this, we may use cookies, pixels and similar technologies
                            (&quot;Cookies&quot;). Usage Data may include information about
                            how you access and use our Site and your account, including device
                            information, browser information, information about your network
                            connection, your IP address and other information regarding your
                            interaction with the Services.
                        </p>

                        {/* Third parties */}
                        <h3 className="text-sm font-semibold tracking-[0.22em] uppercase text-slate-300 mb-1">
                            Information We Obtain From Third Parties
                        </h3>
                        <p className="mb-3">
                            We may obtain information about you from third parties, including
                            from vendors and service providers who may collect information on
                            our behalf, such as:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 mb-3">
                            <li>
                                Companies who support our Site and Services, such as Shopify.
                            </li>
                            <li>
                                Our payment processors, who collect payment information (e.g.,
                                bank account, credit or debit card information, billing address)
                                to process your payment in order to fulfill your orders and
                                provide you with products or services you have requested.
                            </li>
                            <li>
                                Third parties that use online tracking technologies (pixels,
                                web beacons, SDKs, third-party libraries, cookies) when you
                                visit our Site, open or click on emails we send you, or interact
                                with our Services or advertisements.
                            </li>
                        </ul>
                        <p>
                            Any information we obtain from third parties will be treated in
                            accordance with this Privacy Policy. Also see the section below,
                            <strong> Third Party Websites and Links</strong>.
                        </p>
                    </div>

                    {/* How we use info */}
                    <div id="how-we-use">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                            How We Use Your Personal Information
                        </h2>

                        <h3 className="font-semibold mb-1">Providing Products and Services</h3>
                        <p className="mb-3">
                            We use your personal information to provide you with the Services
                            in order to perform our contract with you, including to process
                            your payments, fulfill your orders, to send notifications related
                            to your account, purchases, returns, exchanges or other
                            transactions, to create, maintain and otherwise manage your
                            account, to arrange for shipping, facilitate any returns and
                            exchanges and other features and functionalities related to your
                            account.
                        </p>
                        <p className="mb-3">
                            We may also enhance your shopping experience by enabling Shopify
                            to match your account with other Shopify services that you may
                            choose to use. In this case, Shopify will process your information
                            as set forth in its Privacy Policy and Consumer Privacy Policy.
                        </p>

                        <h3 className="font-semibold mb-1">Marketing and Advertising</h3>
                        <p className="mb-3">
                            We may use your personal information for marketing and promotional
                            purposes, such as to send marketing, advertising and promotional
                            communications by email, text message or postal mail, and to show
                            you advertisements for products or services. This may include
                            using your personal information to better tailor the Services and
                            advertising on our Site and other websites.
                        </p>

                        <h3 className="font-semibold mb-1">
                            Security and Fraud Prevention
                        </h3>
                        <p className="mb-3">
                            We use your personal information to detect, investigate or take
                            action regarding possible fraudulent, illegal or malicious
                            activity. If you choose to use the Services and register an
                            account, you are responsible for keeping your account credentials
                            safe. We highly recommend that you do not share your username,
                            password, or other access details with anyone else. If you believe
                            your account has been compromised, please contact us immediately.
                        </p>

                        <h3 className="font-semibold mb-1">
                            Communicating With You and Service Improvement
                        </h3>
                        <p>
                            We use your personal information to provide you with customer
                            support and improve our Services. This is in our legitimate
                            interests in order to be responsive to you, to provide effective
                            services to you, and to maintain our business relationship with
                            you.
                        </p>
                    </div>

                    {/* Cookies */}
                    <div id="cookies">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-2">Cookies</h2>
                        <p className="mb-3">
                            Like many websites, we use Cookies on our Site. For specific
                            information about the Cookies that we use related to powering our
                            store with Shopify, see{" "}
                            <a
                                href="https://www.shopify.com/legal/cookies"
                                target="_blank"
                                rel="noreferrer"
                                className="text-[#C1A88B] underline underline-offset-4"
                            >
                                Shopify&apos;s Cookies Policy
                            </a>
                            .
                        </p>
                        <p className="mb-3">
                            We use Cookies to power and improve our Site and our Services
                            (including to remember your actions and preferences), to run
                            analytics and better understand user interaction with the
                            Services. We may also permit third parties and services providers
                            to use Cookies on our Site to better tailor the services, products
                            and advertising on our Site and other websites.
                        </p>
                        <p>
                            Most browsers automatically accept Cookies by default, but you can
                            choose to set your browser to remove or reject Cookies through
                            your browser controls. Removing or blocking Cookies can negatively
                            impact your user experience and may cause some of the Services to
                            work incorrectly or no longer be available. Additionally, blocking
                            Cookies may not completely prevent how we share information with
                            third parties such as our advertising partners.
                        </p>
                    </div>

                    {/* How we disclose */}
                    <div id="disclosure">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                            How We Disclose Personal Information
                        </h2>
                        <p className="mb-3">
                            In certain circumstances, we may disclose your personal
                            information to third parties for contract fulfillment purposes,
                            legitimate purposes and other reasons subject to this Privacy
                            Policy, including:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 mb-3">
                            <li>
                                With vendors or other third parties who perform services on our
                                behalf (e.g., IT management, payment processing, data analytics,
                                customer support, cloud storage, fulfillment and shipping).
                            </li>
                            <li>
                                With business and marketing partners to provide services and
                                advertise to you.
                            </li>
                            <li>
                                When you direct, request us or otherwise consent to our
                                disclosure of certain information to third parties, such as to
                                ship you products or through your use of social media widgets or
                                login integrations.
                            </li>
                            <li>
                                With our affiliates or otherwise within our corporate group, in
                                our legitimate interests to run a successful business.
                            </li>
                            <li>
                                In connection with a business transaction such as a merger or
                                bankruptcy, to comply with any applicable legal obligations, to
                                enforce any applicable terms of service, and to protect or
                                defend the Services, our rights, and the rights of our users or
                                others.
                            </li>
                        </ul>

                        <p className="mb-3">
                            We disclose the following categories of personal information and
                            sensitive personal information about users for the purposes set
                            out above in &quot;How We Collect and Use Your Personal
                            Information&quot; and &quot;How We Disclose Personal
                            Information&quot;:
                        </p>

                        <div className="overflow-x-auto text-xs sm:text-sm">
                            <table className="min-w-full border border-white/10 rounded-lg overflow-hidden">
                                <thead className="bg-black/40">
                                    <tr>
                                        <th className="px-3 py-2 text-left font-semibold">
                                            Category
                                        </th>
                                        <th className="px-3 py-2 text-left font-semibold">
                                            Categories of Recipients
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    <tr>
                                        <td className="px-3 py-2 align-top">
                                            Identifiers such as basic contact details and certain
                                            order and account information.
                                            <br />
                                            Commercial information such as order information, shopping
                                            information and customer support information.
                                            <br />
                                            Internet or other similar network activity, such as Usage
                                            Data.
                                            <br />
                                            Geolocation data such as locations determined by an IP
                                            address or other technical measures.
                                        </td>
                                        <td className="px-3 py-2 align-top">
                                            Vendors and third parties who perform services on our
                                            behalf (such as internet service providers, payment
                                            processors, fulfillment partners, customer support
                                            partners and data analytics providers).
                                            <br />
                                            Business and marketing partners.
                                            <br />
                                            Affiliates.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p className="mt-3">
                            We do not use or disclose sensitive personal information without
                            your consent or for the purposes of inferring characteristics
                            about you.
                        </p>
                    </div>

                    {/* Third party links */}
                    <div id="third-party-links">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                            Third Party Websites and Links
                        </h2>
                        <p className="mb-3">
                            Our Site may provide links to websites or other online platforms
                            operated by third parties. If you follow links to sites not
                            affiliated or controlled by us, you should review their privacy
                            and security policies and other terms and conditions.
                        </p>
                        <p className="mb-3">
                            We do not guarantee and are not responsible for the privacy or
                            security of such sites, including the accuracy, completeness, or
                            reliability of information found on these sites. Information you
                            provide on public or semi-public venues, including information you
                            share on third-party social networking platforms may also be
                            viewable by other users of the Services and/or users of those
                            third-party platforms.
                        </p>
                        <p>
                            Our inclusion of such links does not, by itself, imply any
                            endorsement of the content on such platforms or of their owners or
                            operators, except as disclosed on the Services.
                        </p>
                    </div>

                    {/* Children */}
                    <div id="children">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                            Children&apos;s Data
                        </h2>
                        <p className="mb-3">
                            The Services are not intended to be used by children, and we do
                            not knowingly collect any personal information about children. If
                            you are the parent or guardian of a child who has provided us with
                            their personal information, you may contact us using the contact
                            details set out below to request that it be deleted.
                        </p>
                        <p>
                            As of the effective date of this Privacy Policy, we do not have
                            actual knowledge that we &quot;share&quot; or &quot;sell&quot;
                            (as those terms are defined in applicable law) personal
                            information of individuals under 16 years of age.
                        </p>
                    </div>

                    {/* Security & Retention */}
                    <div id="security-retention">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                            Security and Retention of Your Information
                        </h2>
                        <p className="mb-3">
                            Please be aware that no security measures are perfect or
                            impenetrable, and we cannot guarantee &quot;perfect security.&quot;
                            In addition, any information you send to us may not be secure
                            while in transit. We recommend that you do not use insecure
                            channels to communicate sensitive or confidential information to
                            us.
                        </p>
                        <p>
                            How long we retain your personal information depends on different
                            factors, such as whether we need the information to maintain your
                            account, to provide the Services, comply with legal obligations,
                            resolve disputes or enforce other applicable contracts and
                            policies.
                        </p>
                    </div>

                    {/* Your rights */}
                    <div id="your-rights">
                        <div className="flex items-center gap-2 mb-2">
                            <UserRound className="h-5 w-5 text-[#C1A88B]" />
                            <h2 className="text-xl sm:text-2xl font-semibold">
                                Your Rights
                            </h2>
                        </div>
                        <p className="mb-3">
                            Depending on where you live, you may have some or all of the
                            rights listed below in relation to your personal information. The
                            availability of these rights and the way you can exercise them may
                            vary by jurisdiction.
                        </p>

                        {/* Data Rights Summary – visual strip */}
                        <div className="mb-5 rounded-2xl border border-white/10 bg-black/50 px-4 sm:px-6 py-5">
                            <div className="grid gap-5 md:grid-cols-3">
                                {/* Card 1 – Access / Know */}
                                <div className="flex flex-col items-center text-center gap-3">
                                    <div className="flex items-center justify-center h-11 w-11 rounded-full border border-[#C1A88B66] bg-black/60 shadow-[0_0_22px_rgba(193,168,139,0.35)]">
                                        <FileText className="h-5 w-5 text-[#C1A88B]" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-semibold text-sm sm:text-base">
                                            Access &amp; Know
                                        </h4>
                                        <p className="text-xs sm:text-sm text-slate-200">
                                            Request a copy of the personal information we hold about
                                            you and learn how we use and share it.
                                        </p>
                                    </div>
                                </div>

                                {/* Card 2 – Delete / Correct */}
                                <div className="flex flex-col items-center text-center gap-3">
                                    <div className="flex items-center justify-center h-11 w-11 rounded-full border border-[#C1A88B66] bg-black/60 shadow-[0_0_22px_rgba(193,168,139,0.35)]">
                                        <Trash2 className="h-5 w-5 text-[#C1A88B]" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-semibold text-sm sm:text-base">
                                            Delete &amp; Correct
                                        </h4>
                                        <p className="text-xs sm:text-sm text-slate-200">
                                            Ask us to delete certain data or correct inaccurate
                                            information we maintain about you.
                                        </p>
                                    </div>
                                </div>

                                {/* Card 3 – Preferences / Opt-out */}
                                <div className="flex flex-col items-center text-center gap-3">
                                    <div className="flex items-center justify-center h-11 w-11 rounded-full border border-[#C1A88B66] bg-black/60 shadow-[0_0_22px_rgba(193,168,139,0.35)]">
                                        <BellOff className="h-5 w-5 text-[#C1A88B]" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-semibold text-sm sm:text-base">
                                            Control Preferences
                                        </h4>
                                        <p className="text-xs sm:text-sm text-slate-200">
                                            Manage marketing communications or withdraw consent where
                                            we rely on it to process your data.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ul className="list-disc pl-5 space-y-1.5 mb-3">
                            <li>
                                <strong>Right to Access / Know:</strong> You may request access
                                to personal information that we hold about you.
                            </li>
                            <li>
                                <strong>Right to Delete:</strong> You may request that we delete
                                personal information we maintain about you.
                            </li>
                            <li>
                                <strong>Right to Correct:</strong> You may request that we
                                correct inaccurate personal information we maintain about you.
                            </li>
                            <li>
                                <strong>Right of Portability:</strong> You may request a copy of
                                the personal information we hold about you and, in some cases,
                                request that we transfer it to a third party.
                            </li>
                            <li>
                                <strong>Restriction of Processing:</strong> You may ask us to
                                stop or restrict our processing of personal information.
                            </li>
                            <li>
                                <strong>Withdrawal of Consent:</strong> Where we rely on consent
                                to process your information, you may withdraw that consent at
                                any time.
                            </li>
                            <li>
                                <strong>Appeal:</strong> You may have a right to appeal our
                                decision if we decline to process your request.
                            </li>
                            <li>
                                <strong>Managing Communication Preferences:</strong> You may opt
                                out of promotional emails at any time using the unsubscribe
                                option in our emails. We may still send you non-promotional
                                emails relating to your account or orders.
                            </li>
                        </ul>

                        <p className="mb-3">
                            You may exercise any of these rights where indicated on our Site
                            or by contacting us using the contact details provided below.
                        </p>
                        <p className="mb-3">
                            We will not discriminate against you for exercising any of these
                            rights. We may need to collect information from you to verify your
                            identity, such as your email address or account information,
                            before providing a substantive response. In accordance with
                            applicable laws, you may designate an authorized agent to make
                            requests on your behalf, subject to verification.
                        </p>
                        <p>
                            We will respond to your request in a timely manner as required
                            under applicable law.
                        </p>
                    </div>

                    {/* Complaints */}
                    <div id="complaints">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                            Complaints
                        </h2>
                        <p className="mb-3">
                            If you have complaints about how we process your personal
                            information, please contact us using the contact details provided
                            below. If you are not satisfied with our response, depending on
                            where you live you may have the right to appeal our decision or
                            lodge a complaint with your local data protection authority.
                        </p>
                    </div>

                    {/* International users */}
                    <div id="international">
                        <div className="flex items-center gap-2 mb-2">
                            <Globe2 className="h-5 w-5 text-[#C1A88B]" />
                            <h2 className="text-xl sm:text-2xl font-semibold">
                                International Users
                            </h2>
                        </div>
                        <p className="mb-3">
                            Please note that we may transfer, store and process your personal
                            information outside the country you live in. Your personal
                            information may be processed by staff and third party service
                            providers and partners in these countries.
                        </p>
                        <p>
                            If we transfer your personal information out of Europe, we will
                            rely on recognized transfer mechanisms like the European
                            Commission&apos;s Standard Contractual Clauses, or any equivalent
                            contracts issued by the relevant competent authority of the UK, as
                            relevant, unless the data transfer is to a country that has been
                            determined to provide an adequate level of protection.
                        </p>
                    </div>

                    {/* Contact */}
                    <div
                        id="contact"
                        className="mt-4 rounded-xl border border-[#C1A88B55] bg-black/60 px-4 sm:px-5 py-4"
                    >
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex flex-col gap-2">
                                <Mail className="h-5 w-5 text-[#C1A88B]" />
                                <Phone className="h-5 w-5 text-[#C1A88B]" />
                            </div>
                        </div>
                        <div className="mt-1 space-y-2">
                            <h3 className="text-xs font-semibold tracking-[0.22em] uppercase text-slate-300">
                                Contact
                            </h3>
                            <p className="text-sm text-slate-200">
                                Should you have any questions about our privacy practices or
                                this Privacy Policy, or if you would like to exercise any of the
                                rights available to you, please contact us:
                            </p>
                            <p className="text-sm">
                                Email:{" "}
                                <a
                                    href="mailto:customerservice.elev8@habitat28.com"
                                    className="text-[#C1A88B] hover:text-[#e2c89f] underline underline-offset-4"
                                >
                                    customerservice.elev8@habitat28.com
                                </a>
                            </p>
                            <p className="text-sm">
                                Address: 47 Morton Avenue East, UNIT 3, Brantford, ON, N3R 7J5,
                                Canada
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
