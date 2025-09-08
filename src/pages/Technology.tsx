import { useState } from "react";

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

const Technology = () => {
  const [selectedTechnology, setSelectedTechnology] = useState<string>("spaceport");
  const techKeys = Object.keys(technologies);
  const currentTech = technologies[selectedTechnology];

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat
      bg-[url('/images/technology/background-technology-mobile.jpg')]
      sm:bg-[url('/images/technology/background-technology-tablet.jpg')]
      lg:bg-[url('/images/technology/background-technology-desktop.jpg')] text-white">
      {/* Background with overlay */}
      
      <div className="relative z-10 px-6 lg:px-24 py-12 lg:py-20">
        {/* Title */}
        <h1 className="text-lg lg:text-xl tracking-[0.2em] uppercase text-center lg:text-left mb-12 lg:mb-20 font-light">
          <span className="opacity-50 font-bold mr-6 text-2xl">03</span> 
          <span className="font-light">Space launch 101</span>
        </h1>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">
          {/* Left Content - Text and Navigation */}
          <div className="flex-1 lg:max-w-xl order-2 lg:order-1">
            {/* Mobile/Tablet Navigation - Horizontal dots */}
            <div className="flex justify-center gap-4 mb-8 lg:hidden">
              {techKeys.map((key, index) => (
                <button
                  key={key}
                  onClick={() => setSelectedTechnology(key)}
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    selectedTechnology === key
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-white border-white/25 hover:border-white/50"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <div className="flex flex-col lg:flex-row lg:items-start lg:gap-20">
              {/* Desktop Navigation - Vertical numbers */}
              <div className="hidden lg:flex flex-col gap-4 lg:mt-8">
                {techKeys.map((key, index) => (
                  <button
                    key={key}
                    onClick={() => setSelectedTechnology(key)}
                    className={`w-20 h-20 rounded-full border-2 flex items-center justify-center text-2xl font-bold transition-all duration-300 ${
                      selectedTechnology === key
                        ? "bg-white text-black border-white"
                        : "bg-transparent text-white border-white/25 hover:border-white/50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              {/* Technology Details */}
              <div className="text-center lg:text-left lg:flex-1">
                <p className="text-white font-[Bellefair] uppercase tracking-wider text-xl mb-2 opacity-75">
                  {currentTech.terminology}
                </p>
                <h2 className="text-3xl  font-[Bellefair] lg:text-5xl xl:text-6xl font-light uppercase mb-6 lg:mb-8 tracking-wide">
                  {currentTech.name}
                </h2>
                <p className="text-[#D0D6F9] font-[Barlow] leading-relaxed lg:leading-loose text-base lg:text-lg max-w-md lg:max-w-none mx-auto lg:mx-0 opacity-90">
                  {currentTech.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="flex-1 lg:max-w-lg xl:max-w-xl order-1 lg:order-2 w-full">
            <div className="relative w-full h-64 lg:h-96 xl:h-[500px] overflow-hidden">
              <img
                src={currentTech.imageLandscape}
                alt={currentTech.name}
                className="w-full h-full object-cover"
              />
              <img
                src={currentTech.imagePortrait}
                alt={currentTech.name}
                className="hidden lg:block absolute top-0 left-1/2 transform -translate-x-1/2 w-auto h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technology;