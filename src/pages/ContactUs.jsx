import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MessageCircle, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleQuickSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");

    if (!name || !email || !phone) {
      alert("Please complete the required fields.");
      return;
    }

    const payload = {
      access_key: "7eb54f95-3ec0-46ee-9c0b-5463a7fad524",
      name,
      email,
      phone,
      comment: formData.get("comment") || "",
      subject: "Quick message from Elev8 Kitchens contact widget",
      from_name: "Contact Page Right Widget",
      page: "Contact Page",
    };

    try {
      setLoading(true);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        e.target.reset();
        setSent(true);
      } else {
        console.error(result);
        alert("Something went wrong sending your request. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#050505] text-white">
      {/* ========= MAIN SECTION ========= */}
      <section className="relative isolate overflow-hidden bg-[#0c0c0c] py-16 sm:py-20">
        {/* Ambient brand glows */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-[#C1A88B]/10 blur-3xl" />
          <div className="absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[#C1A88B]/10 blur-3xl" />
          <div className="absolute -bottom-20 left-1/2 h-96 w-[36rem] -translate-x-1/2 rounded-[999px] bg-gradient-to-r from-[#C1A88B]/20 via-transparent to-[#C1A88B]/20 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-6">
          {/* Title */}
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <h2 className="font-serif text-4xl leading-tight text-[#E8D6BF] sm:text-5xl">
              Have questions?
            </h2>
            <p className="mt-3 text-white/70 max-w-xl mx-auto text-sm sm:text-base">
              Get in touch with our team and speak directly with a real outdoor
              kitchen specialist—no bots, just expert support.
            </p>
          </motion.div>

          {/* Two cards side-by-side */}
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr,1fr] items-start">
            {/* RIGHT BLOCK ONLY – using full width of the right column */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Contact / Specialist CTA */}
              <div className="rounded-2xl bg-gradient-to-br from-[#0b0b0b] to-[#121212] p-6 ring-1 ring-white/10">
                <h3 className="font-heading text-2xl text-[#C1A88B]">
                  Still have questions?
                </h3>
                <p className="mt-2 text-white/80 text-sm">
                  Speak with a real specialist. We’ll help you choose size,
                  color, and installation options—no pressure.
                </p>
                <div className="mt-4 grid gap-2 text-sm">
                  <a
                    href="mailto:sales.elev8@habitat28.com"
                    className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-white ring-1 ring-white/10 hover:bg-white/10"
                  >
                    <Mail size={16} /> sales.elev8@habitat28.com
                  </a>
                  <a
                    href="https://wa.me/19056930028?text=Hello%2C%20I%27m%20interested%20in%20your%20products"
                    className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-white ring-1 ring-white/10 hover:bg-white/10"
                  >
                    <MessageCircle size={16} /> WhatsApp Specialist
                  </a>
                </div>

                {/* Social Icons — Centered */}
                <div className="mt-6 w-full flex items-center justify-center gap-5">
                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/profile.php?id=61582925968352"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="group grid h-11 w-11 place-items-center rounded-full 
                      ring-1 ring-[#C1A88B]/50 bg-black/40
                      transition-all duration-300 hover:scale-110 hover:ring-[#C1A88B] hover:bg-black/60"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#C1A88B"
                      className="h-5 w-5 transition duration-300 group-hover:brightness-125"
                    >
                      <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22c4.78-.75 8.44-4.91 8.44-9.93z" />
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/habitat28modular/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="group grid h-11 w-11 place-items-center rounded-full 
                      ring-1 ring-[#C1A88B]/50 bg-black/40
                      transition-all duration-300 hover:scale-110 hover:ring-[#C1A88B] hover:bg-black/60"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#C1A88B"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 transition duration-300 group-hover:brightness-125"
                    >
                      <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10zm-5 3c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 2c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3zm4.5-.25c-.69 0-1.25.56-1.25 1.25S15.81 9 16.5 9s1.25-.56 1.25-1.25S17.19 6.75 16.5 6.75z" />
                    </svg>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/19056930028?text=Hello%2C%20I%27m%20interested%20in%20your%20products"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="group grid h-11 w-11 place-items-center rounded-full 
                      ring-1 ring-[#C1A88B]/50 bg-black/40
                      transition-all duration-300 hover:scale-110 hover:ring-[#C1A88B] hover:bg-black/60"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      fill="#C1A88B"
                      className="h-5 w-5 transition duration-300 group-hover:brightness-125"
                    >
                      <path d="M16.04 3C9.402 3 4 8.403 4 15.04c0 2.658.803 5.108 2.177 7.155L4 29l7.037-2.147A12.9 12.9 0 0 0 16.04 27c6.636 0 12.04-5.402 12.04-12.04C28.08 8.403 22.676 3 16.04 3zm0 22.04c-2.22 0-4.293-.687-6.01-1.983l-.43-.31-4.176 1.276 1.316-4.07-.28-.42A9.92 9.92 0 0 1 6.12 15.04c0-5.477 4.443-9.92 9.92-9.92 5.476 0 9.92 4.443 9.92 9.92 0 5.477-4.444 9.92-9.92 9.92z" />
                      <path d="M22.247 18.596c-.338-.169-2.003-.99-2.313-1.102-.31-.113-.536-.17-.763.17-.226.338-.875 1.102-1.073 1.328-.199.226-.397.254-.735.085-.338-.169-1.426-.526-2.717-1.68-.999-.89-1.673-1.987-1.872-2.325-.199-.339-.021-.522.148-.69.152-.151.338-.397.508-.596.17-.198.226-.339.338-.564.113-.226.057-.423-.028-.596-.085-.169-.763-1.84-1.045-2.516-.275-.66-.556-.573-.763-.573-.198 0-.423-.028-.65-.028s-.596.085-.907.423c-.31.338-1.19 1.159-1.19 2.825s1.219 3.276 1.39 3.504c.169.226 2.373 3.626 5.856 5.07.818.352 1.456.564 1.953.725.821.26 1.57.223 2.162.135.66-.099 2.003-.816 2.287-1.606.283-.79.283-1.474.197-1.605-.085-.141-.31-.226-.65-.395z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quick message form / success state */}
              <AnimatePresence mode="wait" initial={false}>
                {!sent ? (
                  <motion.form
                    key="form"
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-2xl bg-gradient-to-br from-[#0b0b0b] to-[#121212] p-6 ring-1 ring-white/10"
                    onSubmit={handleQuickSubmit}
                  >
                    <h3 className="font-heading text-2xl text-[#C1A88B]">
                      Send a message
                    </h3>
                    <div className="mt-4 grid gap-3">
                      <input
                        name="name"
                        className="rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-white/50 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-[#C1A88B]/60"
                        placeholder="Name *"
                        required
                      />
                      <input
                        name="email"
                        type="email"
                        className="rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-white/50 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-[#C1A88B]/60"
                        placeholder="Email *"
                        required
                      />
                      <input
                        name="phone"
                        className="rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-white/50 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-[#C1A88B]/60"
                        placeholder="Phone number *"
                        required
                      />
                      <textarea
                        name="comment"
                        rows={4}
                        className="rounded-xl bg-white/5 px-4 py-3 text-sm text-white placeholder-white/50 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-[#C1A88B]/60"
                        placeholder="Comment"
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C1A88B] px-6 py-3 font-medium text-black text-sm shadow hover:brightness-95 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <MessageSquare size={16} />
                        {loading ? "Sending..." : "Send"}
                      </button>
                    </div>
                    <p className="mt-3 text-xs text-white/60">
                      By sending, you agree to our Terms &amp; Privacy Policy.
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-0 rounded-3xl border border-emerald-400/30 bg-emerald-500/10 p-8 text-center backdrop-blur-md"
                  >
                    <div className="mx-auto h-12 w-12 rounded-full bg-emerald-500/20 ring-1 ring-emerald-400/40 grid place-items-center">
                      <svg viewBox="0 0 24 24" className="h-6 w-6 text-emerald-300">
                        <path
                          fill="currentColor"
                          d="m9.6 16.2-3.8-3.9L4 14.1l5.6 5.7L20 9.4l-1.8-1.8z"
                        />
                      </svg>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-emerald-200">
                      Message sent!
                    </h3>
                    <p className="mt-2 text-sm text-emerald-100/80">
                      Thanks for reaching out. We’ll contact you shortly.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="mt-6 text-sm text-[#C1A88B] underline underline-offset-4 hover:text-[#ddbfa3]"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
