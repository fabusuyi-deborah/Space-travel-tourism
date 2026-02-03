"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { techSpecs } from "../data/technologyData";
import TechModal from "./../components/TechnologyModal";

const Technology = () => {
  const techArray = Object.values(techSpecs);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const activeTech = techArray[activeIndex];

  // Auto-cycle effect
  useEffect(() => {
    if (showModal) return; // Pause when modal is open
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % techArray.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [showModal, techArray.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left - rect.width / 2) / 30,
      y: (e.clientY - rect.top - rect.height / 2) / 30,
    });
  };

  const handleTechChange = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="relative w-screen h-screen flex flex-col pt-12 md:pt-16 lg:pt-20 px-4 sm:px-6 md:px-8 lg:px-12 bg-transparent overflow-hidden">
      
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-xs sm:text-sm md:text-base lg:text-lg tracking-[3px] md:tracking-[4px] uppercase font-[Barlow_Condensed] mb-6 md:mb-8 lg:mb-10 text-center lg:text-left"
      >
        <span className="opacity-25 font-bold mr-3 md:mr-4">04</span>
        Space Launch 101
      </motion.h1>

      {/* Main Content Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center max-w-[1600px] mx-auto w-full">
        
        {/* Left Section: Numbers and Info */}
        <div className="lg:col-span-7 flex flex-col lg:flex-row items-center lg:items-center gap-6 md:gap-8 lg:gap-10 order-2 lg:order-1">
          
          {/* Step Navigation Numbers */}
          <div className="flex flex-row lg:flex-col gap-4 md:gap-6 z-20">
            {techArray.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handleTechChange(index)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full border transition-all duration-500 font-[Bellefair] text-base sm:text-lg md:text-xl lg:text-2xl flex items-center justify-center ${
                  activeIndex === index 
                    ? "bg-white text-[#0B0D17] border-white shadow-[0_0_30px_rgba(255,255,255,0.4)]" 
                    : "bg-transparent text-white border-white/20 hover:border-white"
                }`}
              >
                {index + 1}
              </motion.button>
            ))}
          </div>

          {/* Technology Info */}
          <div className="flex-1 text-center lg:text-left max-w-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Terminology Label */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-[#D0D6F9] text-xs sm:text-sm md:text-base font-[Barlow_Condensed] uppercase tracking-[0.15em] mb-2 md:mb-3"
                >
                  The Terminology...
                </motion.p>

                {/* Technology Name */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-[Bellefair] uppercase text-white mb-3 md:mb-4 lg:mb-6 leading-tight">
                  {activeTech.name}
                </h2>

                {/* Description */}
                <p className="text-[#D0D6F9] font-[Barlow] text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-4 md:mb-6">
                  {activeTech.description}
                </p>

                {/* Explore Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowModal(true)}
                  className="px-6 md:px-8 py-2.5 md:py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-white font-[Barlow_Condensed] uppercase tracking-wider text-xs md:text-sm transition-all duration-300"
                >
                  View Specifications
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Section: Technology Image */}
        <div className="lg:col-span-5 h-full flex items-center justify-center order-1 lg:order-2">
          <div 
            className="relative w-full h-[35vh] sm:h-[40vh] md:h-[50vh] lg:h-full cursor-pointer"
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
                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                animate={{ 
                  opacity: 1,
                  scale: isHovered ? 1.03 : 1,
                  rotate: 0,
                  x: isHovered ? mousePosition.x : 0,
                  y: isHovered ? mousePosition.y : 0
                }}
                exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
                transition={{ 
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="relative w-full h-full group"
              >
                <picture className="w-full h-full block">
                  <source media="(min-width: 1024px)" srcSet={activeTech.imagePortrait} />
                  <img
                    src={activeTech.imageLandscape}
                    alt={activeTech.name}
                    className="w-full h-full object-contain object-center lg:object-right drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                    style={{
                      filter: isHovered ? "brightness(1.1)" : "brightness(1)"
                    }}
                  />
                </picture>

                {/* Glow Overlay on Hover */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-2xl pointer-events-none"
                />

                {/* Tech Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="absolute top-4 right-4 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full"
                >
                  <span className="text-white text-[9px] md:text-[10px] font-[Barlow_Condensed] uppercase tracking-wider">
                    Tech {activeIndex + 1}/{techArray.length}
                  </span>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <TechModal showModal={showModal} setShowModal={setShowModal} tech={activeTech} />
    </section>
  );
};

export default Technology;