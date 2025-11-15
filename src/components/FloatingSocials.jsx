import { useEffect, useState } from "react";

export default function FloatingSocials() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 120);
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
    </div>
  );
}
