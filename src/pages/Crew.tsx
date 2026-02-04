"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { crew, crewStats } from "../data/crewData";
import CrewModal from "../components/CrewModal";

const Crew = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [autoPlay, setAutoPlay] = useState(true);

  const member = crew[activeIndex];
  const stats = crewStats[activeIndex];

  // Auto-cycle logic
  useEffect(() => {
    if (!autoPlay || showModal) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % crew.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [autoPlay, showModal]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left - rect.width / 2) / 25,
      y: (e.clientY - rect.top - rect.height / 2) / 25,
    });
  };

  const handleCrewChange = (index: number) => {
    setActiveIndex(index);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 15000);
  };

  return (
    <section className="relative w-screen h-screen flex flex-col pt-24 md:pt-32 lg:pt-40 px-6 md:px-12 lg:px-24 bg-transparent overflow-hidden">
      {/* 03 Title */}
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-base md:text-xl lg:text-2xl tracking-[4.75px] uppercase text-center md:text-left font-[Barlow_Condensed] z-10"
      >
        <span className="opacity-25 font-bold mr-4">03</span>
        Meet your crew
      </motion.h1>

      <div className="flex-1 flex flex-col items-center justify-center relative">
        {/* Navigation Dots - Centered and elegant */}
        <div className="absolute left-0 lg:left-0 bottom-10 lg:bottom-1/2 lg:-translate-y-1/2 flex lg:flex-col gap-6 z-20">
          {crew.map((_, index) => (
            <button
              key={index}
              onClick={() => handleCrewChange(index)}
              className={`w-3 h-3 lg:w-4 lg:h-4 rounded-full transition-all duration-500 ${
                activeIndex === index
                  ? "bg-white scale-125 shadow-[0_0_20px_white]"
                  : "bg-white/20 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Character Image Display */}
        <div
          className="relative w-full h-full flex items-end justify-center perspective-1000"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setMousePosition({ x: 0, y: 0 });
          }}
          onClick={() => setShowModal(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: isHovered ? 1.05 : 1,
                x: isHovered ? mousePosition.x : 0,
                rotateY: isHovered ? mousePosition.x / 2 : 0,
              }}
              exit={{ opacity: 0, y: -50, scale: 1.05 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative cursor-pointer h-[70vh] lg:h-[85vh] flex items-end"
            >
              {/* Glow Behind Character */}
              <div className="absolute inset-0 bg-white/5 blur-[120px] rounded-full scale-75 -z-10" />

              <img
                src={member.image}
                alt={member.name}
                className="h-full w-auto object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black 80%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 80%, transparent 100%)",
                }}
              />

              {/* View Profile Indicator */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute top-1/4 -right-12 hidden lg:flex flex-col items-center gap-4"
              >
                <div className="w-px h-20 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
                <span className="text-white/40 text-[10px] uppercase tracking-[0.5em] rotate-90 whitespace-nowrap">
                  View Profile
                </span>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: !showModal ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-6 md:bottom-4"
        >
          <p className="text-white/40 font-[Barlow_Condensed] text-sm uppercase tracking-[0.2em] ">
            Click on image to explore
          </p>
        </motion.div>
      </div>

      {/* Crew Modal */}
      <CrewModal
        showModal={showModal}
        setShowModal={setShowModal}
        member={member}
        stats={stats}
      />
    </section>
  );
};

export default Crew;
