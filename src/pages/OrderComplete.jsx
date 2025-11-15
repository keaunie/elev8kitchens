// OrderComplete.jsx — ELEV8 Kitchens
// Stack: React + Tailwind + Framer Motion + React Router

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OrderComplete() {
  const navigate = useNavigate();

  // Auto redirect after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/products"); // <— redirect to product catalog page
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center space-y-6 max-w-md"
      >
        {/* Check icon */}
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 140, damping: 10, delay: 0.2 }}
          className="flex justify-center"
        >
          <CheckCircle2 size={90} className="text-[#C1A88B]" />
        </motion.div>

        {/* Heading */}
        <h1 className="text-3xl font-semibold tracking-wide">
          Order Completed
        </h1>

        {/* Subtext */}
        <p className="text-gray-300 leading-relaxed">
          Thank you for your purchase!  
          Your order has been successfully processed.
          <br />
          You will be redirected shortly…
        </p>

        {/* Manual Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-8 py-3 rounded-xl bg-[#C1A88B] text-black font-semibold hover:bg-[#d6b99d] transition-all"
        >
          Back to Products
        </button>
      </motion.div>
    </div>
  );
}
