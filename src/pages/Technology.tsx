"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Technology = {
  terminology: string;
  name: string;
  description: string;
  imagePortrait: string;
  imageLandscape: string;
};

const technologies: Record<string, Technology> = {
  launchVehicle: {
    terminology: "THE TERMINOLOGY...",
    name: "LAUNCH VEHICLE",
    description:
      "A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth's surface to space, usually to Earth orbit or beyond. Our WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall, it's quite an awe-inspiring sight on the launch pad!",
    imagePortrait: "/images/technology/image-launch-vehicle-portrait.jpg",
    imageLandscape: "/images/technology/image-launch-vehicle-landscape.jpg",
  },
  spaceport: {
    terminology: "THE TERMINOLOGY...",
    name: "SPACEPORT",
    description:
      "A spaceport or cosmodrome is a site for launching (or receiving) spacecraft, by analogy to the seaport for ships or airport for aircraft. Based in the famous Cape Canaveral, our spaceport is ideally situated to take advantage of the Earth's rotation for launch.",
    imagePortrait: "/images/technology/image-spaceport-portrait.jpg",
    imageLandscape: "/images/technology/image-spaceport-landscape.jpg",
  },
  spaceCapsule: {
    terminology: "THE TERMINOLOGY...",
    name: "SPACE CAPSULE",
    description:
      "A space capsule is an often-crewed spacecraft that uses a blunt-body reentry capsule to reenter the Earth's atmosphere without wings. Our capsule is where you'll spend your time during the flight. It includes a space gym, cinema, and plenty of other activities to keep you entertained.",
    imagePortrait: "/images/technology/image-space-capsule-portrait.jpg",
    imageLandscape: "/images/technology/image-space-capsule-landscape.jpg",
  },
};

export default function Technology() {
  const techKeys = Object.keys(
    technologies
  ) as Array<keyof typeof technologies>;

  const [selectedKey, setSelectedKey] =
    useState<keyof typeof technologies>("launchVehicle");

  const currentTech = technologies[selectedKey];

  return (
    <section className="relative w-screen min-h-screen flex flex-col pt-12 lg:pt-24 overflow-hidden">
      {/* Title */}
      <div className="px-6 md:px-12 lg:px-24 w-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-base md:text-xl tracking-[4.75px] uppercase text-center md:text-left font-[Barlow_Condensed]"
        >
          <span className="opacity-25 font-bold mr-4">04</span>
          Space launch 101
        </motion.h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row-reverse items-center justify-between mt-8 lg:mt-0 lg:pl-24">
        {/* Image */}
        <div className="w-full lg:w-[35%] flex-shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="
                w-full
                aspect-[16/9]
                md:aspect-[16/8]
                lg:aspect-[3/4]
                overflow-hidden
              "
            >
              <picture>
                <source
                  media="(min-width: 1024px)"
                  srcSet={currentTech.imagePortrait}
                />
                <img
                  src={currentTech.imageLandscape}
                  alt={currentTech.name}
                  className="w-full h-full object-cover"
                />
              </picture>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Text + Navigation */}
        <div className="flex-1 flex flex-col lg:flex-row items-center gap-6 lg:gap-12 px-6 lg:px-0 py-6 lg:py-0">
          {/* Navigation */}
          <div className="flex lg:flex-col gap-4 md:gap-6">
            {techKeys.map((key, index) => (
              <button
                key={key}
                onClick={() => setSelectedKey(key)}
                className={`w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full border flex items-center justify-center font-[Bellefair] text-lg md:text-2xl transition-all ${
                  selectedKey === key
                    ? "bg-white text-[#0B0D17] border-white"
                    : "bg-transparent text-white border-white/25 hover:border-white"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Description */}
          <div className="text-center lg:text-left max-w-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-[Barlow_Condensed] text-sm md:text-base tracking-[2.7px] text-[#D0D6F9] uppercase mb-2">
                  {currentTech.terminology}
                </p>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-[Bellefair] uppercase mb-4">
                  {currentTech.name}
                </h2>
                <p className="font-[Barlow] text-[#D0D6F9] leading-relaxed text-sm md:text-base lg:text-lg">
                  {currentTech.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
