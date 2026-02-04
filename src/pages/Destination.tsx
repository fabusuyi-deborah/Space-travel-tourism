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


  useEffect(() => {
    setIsVisible(true);
  }, []);

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

        {/* Planet Image - Now clickable and holds the "Click to explore" tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative mb-8 md:mb-12 group"
        >
          <button 
            onClick={() => setShowModal(true)}
            onMouseEnter={() => setHoveredIndex(activeIndex)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[340px] md:h-[320px] cursor-pointer outline-none"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeKey}
                src={activeDestination.image}
                alt={activeDestination.name}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ 
                  opacity: 1, 
                  scale: hoveredIndex === activeIndex ? 1.05 : 1,
                  filter: hoveredIndex === activeIndex
                    ? "brightness(1.1) drop-shadow(0 0 50px rgba(255,255,255,0.3))"
                    : "brightness(1) blur(0px)"
                }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-full h-full object-contain"
                style={{ animation: "spin 200s linear infinite" }}
              />
            </AnimatePresence>

            {/* "Click to explore" - Floating Overlay on Planet */}
            <AnimatePresence>
              {hoveredIndex === activeIndex && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 flex items-center justify-center z-20"
                >
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full shadow-2xl">
                    <p className="text-white font-[Barlow_Condensed] text-xs uppercase tracking-[0.3em]">
                      Explore {activeKey}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Orbital Stats System */}
            <AnimatePresence mode="wait">
              <motion.div key={`stats-${activeKey}`}>
                {/* Distance Stat */}
                <motion.div
                  animate={{ opacity: hoveredIndex !== null ? 1 : 0.5, scale: 1, x: 120, y: -80 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="relative">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[#D0D6F9] text-[9px] font-[Barlow_Condensed] uppercase tracking-wider">Distance</span>
                        <span className="text-white text-sm font-[Bellefair]">{activeDestination.distance}</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Travel Time Stat */}
                <motion.div
                  animate={{ opacity: hoveredIndex !== null ? 1 : 0.5, scale: 1, x: -120, y: 80 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="relative">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[#D0D6F9] text-[9px] font-[Barlow_Condensed] uppercase tracking-wider">Travel Time</span>
                        <span className="text-white text-sm font-[Bellefair]">{activeDestination.travelTime}</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </button>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 items-center z-10"
        >
          {destinationKeys.map((key, index) => (
            <button
              key={key}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
            >
              <motion.span 
                className={`
                  block text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                  font-[Bellefair] uppercase transition-all duration-500
                  ${activeIndex === index ? 'text-white' : 'text-white/30 hover:text-white/60'}
                `}
              >
                {key}
              </motion.span>
              
              {activeIndex === index && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white/60"
                />
              )}
            </button>
          ))}
        </motion.div>

        <Modal showModal={showModal} setShowModal={setShowModal} activeDestination={activeDestination} />
      </section>
    </>
  );
}