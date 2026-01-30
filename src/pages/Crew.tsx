"use client";

import { useState } from "react";

type CrewMember = {
  role: string;
  name: string;
  bio: string;
  image: string;
};

const crew: CrewMember[] = [
  {
    role: "Commander",
    name: "Douglas Hurley",
    bio: "Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.",
    image: "/images/crew/image-douglas-hurley.png",
  },
  {
    role: "Mission Specialist",
    name: "Mark Shuttleworth",
    bio: "Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind the Linux-based Ubuntu operating system. Shuttleworth became the first South African to travel to space as a space tourist.",
    image: "/images/crew/image-mark-shuttleworth.png",
  },
  {
    role: "Pilot",
    name: "Victor Glover",
    bio: "Pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station. Glover is a commander in the U.S. Navy where he pilots an F/A-18. He was a crew member of Expedition 64, and served as a station systems flight engineer.",
    image: "/images/crew/image-victor-glover.png",
  },
  {
    role: "Flight Engineer",
    name: "Anousheh Ansari",
    bio: "Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems. Ansari was the fourth self-funded space tourist, the first self-funded woman to fly to the ISS, and the first Iranian in space.",
    image: "/images/crew/image-anousheh-ansari.png",
  },
];

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
