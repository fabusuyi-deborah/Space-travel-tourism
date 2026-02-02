"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type DestinationData = {
  name: string;
  description: string;
  distance: string;
  travelTime: string;
  image: string;
};

const destinations: Record<string, DestinationData> = {
  moon: {
    name: "MOON",
    description: "See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.",
    distance: "384,400 KM",
    travelTime: "3 DAYS",
    image: "/images/destination/image-moon.png",
  },
  mars: {
    name: "MARS",
    description: "Don’t forget to pack your hiking boots. You’ll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. It’s two and a half times the size of Everest!",
    distance: "225 MIL. KM",
    travelTime: "9 MONTHS",
    image: "/images/destination/image-mars.png",
  },
  europa: {
    name: "EUROPA",
    description: "The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover’s dream. With an icy surface, it’s perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.",
    distance: "628 MIL. KM",
    travelTime: "3 YEARS",
    image: "/images/destination/image-europa.png",
  },
  titan: {
    name: "TITAN",
    description: "The only moon known to have a dense atmosphere other than Earth, Titan is a home away from home (just a few hundred degrees colder!). As a bonus, you get striking views of the Rings of Saturn.",
    distance: "1.6 BIL. KM",
    travelTime: "7 YEARS",
    image: "/images/destination/image-titan.png",
  },
};

export default function Destination() {
  const [active, setActive] = useState<keyof typeof destinations>("moon");
  const d = destinations[active];

  return (
    // Section Container
    <section className="relative w-screen min-h-screen flex flex-col pt-32 md:pt-40 lg:pt-44 pb-12 px-8 lg:px-24 overflow-x-hidden">
      
      {/* 01 Title */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-base md:text-xl lg:text-2xl tracking-[4.75px] uppercase text-center md:text-left font-[Barlow_Condensed] mb-8 lg:mb-16 max-w-[1440px] mx-auto w-full"
      >
        <span className="opacity-25 font-bold mr-4">02</span> Pick your destination
      </motion.h1>

      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12 lg:gap-20 max-w-[1440px] mx-auto w-full">
        
        {/* Left Side: Planet */}
        <div className="relative flex justify-center items-center lg:flex-1 w-full">
          {/* Constant Spin Wrapper  */}

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >

              {/* Continuous rotation */}
              <motion.img
                src={d.image}
                alt={d.name}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",

                }}

                className="w-42 h-48 md:w-72 md:h-72 lg:w-[445px] lg:h-[445px] object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]"

              />

            </motion.div>

          </AnimatePresence>
        </div>

        {/* Right Side: Info Column */}
        <div className="flex flex-col items-center lg:items-start lg:flex-1 text-center lg:text-left max-w-lg z-10">
          
          {/* Nav Tabs */}
          <div className="flex gap-8 text-sm md:text-base uppercase tracking-[2.7px] font-[Barlow_Condensed] text-[#D0D6F9] mb-8">
            {(Object.keys(destinations) as Array<keyof typeof destinations>).map((key) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`relative pb-3 transition-colors hover:text-white ${
                  active === key ? "text-white" : ""
                }`}
              >
                {key}
                {active === key && (
                  <motion.div 
                    layoutId="destinationUnderline"
                    className="absolute bottom-0 left-0 w-full h-[3px] bg-white"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Text Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <h2 className="text-6xl md:text-8xl lg:text-[100px] font-[Bellefair] uppercase leading-none">
                {d.name}
              </h2>
              <p className="font-[Barlow] text-[#D0D6F9] mt-6 leading-relaxed text-base md:text-lg min-h-[140px] md:min-h-[120px]">
                {d.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <hr className="w-full border-white/10 my-8" />

          {/* Stats Footer */}
          <div className="flex flex-col md:flex-row w-full gap-8 md:gap-16 md:justify-center">
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-[2.35px] font-[Barlow_Condensed] text-[#D0D6F9]">
                Avg. Distance
              </span>
              <AnimatePresence mode="wait">
                <motion.span 
                  key={active}
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="text-3xl font-[Bellefair] uppercase"
                >
                  {d.distance}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-[2.35px] font-[Barlow_Condensed] text-[#D0D6F9]">
                Est. Travel Time
              </span>
              <AnimatePresence mode="wait">
                <motion.span 
                  key={active}
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="text-3xl font-[Bellefair] uppercase"
                >
                  {d.travelTime}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}