"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { crew } from "../data/crewData";


const Crew = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const member = crew[activeIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % crew.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-screen min-h-screen flex flex-col pt-16 md:pt-20 px-6 md:px-12 lg:px-24 bg-transparent">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-base md:text-xl tracking-[4.75px] uppercase text-center md:text-left font-[Barlow_Condensed] mb-6"
      >
        <span className="opacity-25 font-bold mr-4">03</span>
        Meet your crew
      </motion.h1>

      <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-end justify-center lg:justify-between gap-10 max-w-[1440px] mx-auto w-full">
        {/* Info */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:flex-1 lg:pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <p className="uppercase text-white/50 text-base md:text-xl lg:text-2xl font-[Bellefair]">
                {member.role}
              </p>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-[Bellefair] uppercase mt-3">
                {member.name}
              </h2>
              <p className="max-w-md text-[#D0D6F9] font-[Barlow] mt-4 leading-relaxed text-sm md:text-base lg:text-lg">
                {member.bio}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex gap-4 mt-8 lg:mt-12">
            {crew.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 lg:w-4 lg:h-4 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-white"
                    : "bg-white/20 hover:bg-white/50"
                }`}
                aria-label={`Go to crew member ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="flex lg:flex-1 w-full justify-center lg:justify-end items-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="
                w-full
                max-w-[280px]
                md:max-w-[360px]
                lg:max-w-[440px]
                aspect-[3/4]
              "
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-contain"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black 85%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 85%, transparent 100%)",
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Crew;
