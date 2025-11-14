import { useEffect, useState } from "react";

export default function FloatingSocials() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after user scrolls down a bit
      if (window.scrollY > 120) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={[
        "fixed bottom-6 right-6 z-50 flex flex-col gap-3",
        "transition-all duration-500 ease-out",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-6 pointer-events-none",
      ].join(" ")}
    >
      {/* WhatsApp */}
      <a
        href="https://wa.me/19056930028?text=Hello%2C%20I%27m%20interested%20in%20your%20products"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="
          w-14 h-14 md:w-16 md:h-16
          flex items-center justify-center
          rounded-full
          bg-[#25D366]
          shadow-[0_0_18px_rgba(37,211,102,0.65)]
          transition-transform transition-shadow duration-300 ease-out
          hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(37,211,102,0.9)]
          animate-pulse
        "
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="w-8 h-8 md:w-9 md:h-9 drop-shadow-md"
        />
      </a>

      {/* Instagram */}
      <a
        href="https://instagram.com/yourprofile" // TODO: replace with your actual IG URL
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit our Instagram"
        className="
          w-14 h-14 md:w-16 md:h-16
          flex items-center justify-center
          rounded-full
          bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-400
          shadow-[0_0_18px_rgba(244,114,182,0.65)]
          transition-transform transition-shadow duration-300 ease-out
          hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(244,114,182,0.9)]
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 md:w-8 md:h-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <rect
            x="4"
            y="4"
            width="16"
            height="16"
            rx="5"
            ry="5"
          ></rect>
          <circle cx="12" cy="12" r="4"></circle>
          <circle cx="17" cy="7" r="1.2" fill="currentColor"></circle>
        </svg>
      </a>

      {/* Facebook */}
      <a
        href="https://facebook.com/yourpage" // TODO: replace with your actual FB URL
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit our Facebook"
        className="
          w-14 h-14 md:w-16 md:h-16
          flex items-center justify-center
          rounded-full
          bg-[#1877F2]
          shadow-[0_0_18px_rgba(24,119,242,0.65)]
          transition-transform transition-shadow duration-300 ease-out
          hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(24,119,242,0.9)]
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 md:w-8 md:h-8 text-white"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M13.5 22v-7h2.5l.5-3h-3V9.25C13.5 8.42 13.83 8 15 8h1.5V5.2C16.26 5.17 15.46 5.1 14.5 5.1 12.26 5.1 10.75 6.46 10.75 9v3h-2.5v3h2.5v7h2.75z"
          />
        </svg>
      </a>
    </div>
  );
}
