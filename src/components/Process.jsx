import React from "react";
import Lottie from "lottie-react";
import planAnim from "../assets/lottie/plan.json";
import chooseAnim from "../assets/lottie/choose.json";
import buildAnim from "../assets/lottie/build.json";

export default function Process() {
  const steps = [
    {
      id: 1,
      title: "Vision & Planning",
      desc: "We start by understanding your space, needs, and goals — then map out a plan for the perfect outdoor setup.",
      animation: planAnim,
    },
    {
      id: 2,
      title: "Choose Your Style",
      desc: "Pick the size and finish — Anthracite, Titanium, or Platinum — for a premium look without the hassle of custom builds.",
      animation: chooseAnim,
    },
    {
      id: 3,
      title: "Build & Install",
      desc: "Our team delivers, and installation is a fast plug-and-play process.",
      animation: buildAnim,
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 text-center text-white">
      <h2 className="text-3xl font-light text-[#C1A88B] md:text-5xl">
        Our Process
      </h2>
      <p className="mt-2 text-white/80 text-lg">
        How We Bring Your Outdoor Kitchen to Life
      </p>

      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.id}
            className="group relative flex flex-col rounded-3xl bg-[#141414] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)] ring-1 ring-white/10 transition-transform duration-500 hover:-translate-y-2"
          >
            <div className="mx-auto h-36 w-36">
              <Lottie
                animationData={step.animation}
                loop
                autoplay
                className="h-full w-full"
              />
            </div>

            <div className="mt-4 text-[#C1A88B] text-2xl font-serif">
              Step {step.id}
            </div>
            <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
            <p className="mt-3 text-white/80 text-base leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <a
          href="/contact"
          className="inline-flex items-center rounded-full bg-[#C1A88B] px-8 py-3 text-sm font-medium text-black shadow-lg transition hover:scale-105 hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1A88B]/60"
        >
          Start Your Project
        </a>
      </div>
    </section>
  );
}
