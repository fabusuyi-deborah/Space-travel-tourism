"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../index.css"
import { destinations } from "../data/destinationData";
import Modal from "../components/DestinationModal";   


export default function Destination() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const destinationKeys = Object.keys(destinations) as Array<keyof typeof destinations>;
  const activeKey = destinationKeys[activeIndex];
  const activeDestination = destinations[activeKey];

  // Get hovered destination for preview
  const hoveredKey = hoveredIndex !== null ? destinationKeys[hoveredIndex] : null;
  const hoveredDestination = hoveredKey ? destinations[hoveredKey] : null;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showModal]);

  const handleDestinationClick = (index: number) => {
    setActiveIndex(index);
    setShowModal(true);
  };

  return (
    <>
      <section className="relative w-full h-screen flex flex-col pt-16 items-center justify-center px-4 sm:px-6 md:px-10 lg:px-12 overflow-hidden bg-transparent">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-8 md:top-12 lg:top-20 left-4 md:left-8 lg:left-12 right-4 z-10"
        >
          <h1 className="text-white/40 mt-4 text-xs sm:text-sm md:text-base font-[Barlow_Condensed] uppercase tracking-[0.3em] md:tracking-[0.4em] text-center lg:text-left">
            <span className="text-white/20 mr-4 font-bold ">02</span>
            Pick Your Destination
          </h1>
        </motion.div>

        {/* Planet Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative mb-8 md:mb-12"
        >
          <div className="relative w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[340px] md:h-[320px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeKey}
                src={activeDestination.image}
                alt={activeDestination.name}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ 
                  opacity: 1, 
                  scale: hoveredIndex === activeIndex ? 1.05 : hoveredIndex !== null && hoveredIndex !== activeIndex ? 0.95 : 1,
                  filter: hoveredIndex !== null && hoveredIndex !== activeIndex 
                    ? "brightness(0.6) blur(2px)" 
                    : hoveredIndex === activeIndex
                    ? "brightness(1.2) blur(0px) drop-shadow(0 0 40px rgba(255,255,255,0.4))"
                    : "brightness(1) blur(0px)"
                }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ 
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="w-full h-full object-contain drop-shadow-[0_0_60px_rgba(255,255,255,0.15)]"
                style={{
                  animation: "spin 200s linear infinite"
                }}
              />
            </AnimatePresence>

            {/* Hover Preview Planet */}
            <AnimatePresence>
              {hoveredIndex !== null && hoveredIndex !== activeIndex && hoveredDestination && (
                <motion.img
                  key={`hover-${hoveredKey}`}
                  src={hoveredDestination.image}
                  alt={hoveredDestination.name}
                  initial={{ opacity: 0, scale: 0.7, rotate: -30 }}
                  animate={{ 
                    opacity: 0.8, 
                    scale: 0.85,
                    rotate: 0
                  }}
                  exit={{ opacity: 0, scale: 0.7, rotate: 30 }}
                  transition={{ 
                    duration: 0.4,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_0_80px_rgba(255,255,255,0.3)] pointer-events-none"
                  style={{
                    animation: "spin 200s linear infinite"
                  }}
                />
              )}
            </AnimatePresence>

            {/* Orbital Stats System */}
            <AnimatePresence mode="wait">
              <motion.div key={`stats-${activeKey}`}>
                {/* Distance Stat - Top Right Orbit */}
                <motion.div
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{ 
                    opacity: hoveredIndex !== null ? 1 : 0.5,
                    scale: 1,
                    x: 120,
                    y: -80
                  }}
                  exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  transition={{ 
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <motion.div
                    animate={{ 
                      rotate: 360,
                    }}
                    transition={{ 
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="relative"
                  >
                    <motion.div
                      animate={{
                        scale: hoveredIndex !== null ? 1.1 : 1
                      }}
                      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 shadow-xl"
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[#D0D6F9] text-[9px] font-[Barlow_Condensed] uppercase tracking-wider">Distance</span>
                        <span className="text-white text-sm font-[Bellefair]">{activeDestination.distance}</span>
                      </div>
                    </motion.div>
                    {/* Connecting line/orbit path */}
                    <div className={`absolute top-1/2 right-full w-20 h-px bg-gradient-to-l transition-opacity duration-500 ${
                      hoveredIndex !== null ? 'from-white/40 opacity-100' : 'from-white/20 opacity-50'
                    } to-transparent`} />
                  </motion.div>
                </motion.div>

                {/* Travel Time Stat - Bottom Left Orbit */}
                <motion.div
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{ 
                    opacity: hoveredIndex !== null ? 1 : 0.5,
                    scale: 1,
                    x: -120,
                    y: 80
                  }}
                  exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  transition={{ 
                    duration: 0.8,
                    delay: 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <motion.div
                    animate={{ 
                      rotate: -360,
                    }}
                    transition={{ 
                      duration: 25,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="relative"
                  >
                    <motion.div
                      animate={{
                        scale: hoveredIndex !== null ? 1.1 : 1
                      }}
                      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 shadow-xl"
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[#D0D6F9] text-[9px] font-[Barlow_Condensed] uppercase tracking-wider">Travel Time</span>
                        <span className="text-white text-sm font-[Bellefair]">{activeDestination.travelTime}</span>
                      </div>
                    </motion.div>
                    {/* Connecting line/orbit path */}
                    <div className={`absolute top-1/2 left-full w-20 h-px bg-gradient-to-r transition-opacity duration-500 ${
                      hoveredIndex !== null ? 'from-white/40 opacity-100' : 'from-white/20 opacity-50'
                    } to-transparent`} />
                  </motion.div>
                </motion.div>

                {/* Orbital ring effect */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: hoveredIndex !== null ? 0.4 : 0.15,
                    scale: 1 
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 border-2 border-white/20 rounded-full pointer-events-none"
                  style={{
                    width: '160%',
                    height: '160%',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Navigation Buttons - Bottom Center */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 items-center z-10"
        >
          {destinationKeys.map((key, index) => (
            <button
              key={key}
              onClick={() => handleDestinationClick(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
            >
              <motion.span 
                className={`
                  block text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                  font-[Bellefair] uppercase
                  transition-all duration-500 ease-out
                  ${activeIndex === index 
                    ? 'text-white tracking-wider' 
                    : hoveredIndex === index
                    ? 'text-white/80'
                    : 'text-white/30 hover:text-white/60'
                  }
                `}
                animate={{
                  scale: hoveredIndex === index ? 1.05 : 1,
                  textShadow: hoveredIndex === index 
                    ? "0 0 30px rgba(255,255,255,0.5)" 
                    : "0 0 0px rgba(255,255,255,0)"
                }}
                transition={{ duration: 0.3 }}
              >
                {key}
              </motion.span>
              
              {/* Active indicator */}
              {activeIndex === index && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white/60"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Hover glow effect */}
              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 bg-white/5 blur-2xl rounded-full -z-10"
                />
              )}

              {/* "Click to explore" - Appears above each name on hover */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute -top-6 md:-top-8 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
                  >
                    <p className="text-white/60 font-[Barlow_Condensed] text-[10px] md:text-xs uppercase tracking-[0.2em]">
                      {hoveredIndex === activeIndex ? `Viewing` : `Click to explore`}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          ))}
        </motion.div>

        <Modal showModal={showModal} setShowModal={setShowModal} activeDestination={activeDestination} />
      </section>
    </>
  );
}