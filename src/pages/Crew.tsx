"use client";

import { useState } from "react";
import { crew as crewData } from "../Data/CrewData";

const crew = crewData;  


const Crew = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const member = crew[activeIndex];

  return (
    <div
      className="min-h-dvh text-white px-6 lg:px-24 py-20 flex flex-col bg-cover bg-center bg-no-repeat
      bg-[url('/images/crew/background-crew-desktop.jpg')]
      sm:bg-[url('/images/crew/background-crew-tablet.jpg')]
      lg:bg-[url('/images/crew/background-crew-desktop.jpg')]"
    >
      {/* Title */}
      <h1 className="text-xl tracking-widest uppercase text-center lg:text-left">
        <span className="opacity-50 font-bold">03</span> Meet your crew
      </h1>

      {/* Main content */}
      <div className="mt-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-16 flex-1">
        {/* Left side - Info */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:flex-1">
          <p className="uppercase text-gray-400 text-lg">{member.role}</p>
          <h2 className="text-4xl lg:text-5xl font-serif mt-2">
            {member.name}
          </h2>
          <p className="max-w-md text-gray-300 mt-6">{member.bio}</p>

          {/* Navigation dots */}
          <div className="flex gap-4 mt-20">
            {crew.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full ${activeIndex === index ? "bg-white" : "bg-gray-600"}`}
              />
            ))}
          </div>
        </div>

        {/* Right side - Image */}
        <div className="flex justify-center lg:flex-1">
          <img
            src={member.image || "/placeholder.svg"}
            alt={member.name}
            className="block object-contain h-[400px] sm:h-[500px] lg:h-[600px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Crew;
