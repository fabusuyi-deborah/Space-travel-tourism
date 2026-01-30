import { useState } from "react";

type Destination = {
  name: string;
  description: string;
  distance: string;
  travelTime: string;
  image: string;
};

const destinations: Record<string, Destination> = {
  moon: {
    name: "MOON",
    description:
      "See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites..",
    distance: "384,400 KM",
    travelTime: "3 DAYS",
    image: "/images/destination/image-moon.png",
  },
  mars: {
    name: "MARS",
    description:
      "Don’t forget to pack your hiking boots. You’ll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. It’s two and a half times the size of Everest!",
    distance: "225 MIL. KM",
    travelTime: "9 MONTHS",
    image: "/images/destination/image-mars.png",
  },
  europa: {
    name: "EUROPA",
    description:
      "The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover’s dream. With an icy surface, it’s perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.",
    distance: "628 MIL. KM",
    travelTime: "3 YEARS",
    image: "/images/destination/image-europa.png",
  },
  titan: {
    name: "TITAN",
    description:
      "The only moon known to have a dense atmosphere other than Earth, Titan is a home away from home (just a few hundred degrees colder!). As a bonus, you get striking views of the Rings of Saturn.",
    distance: "1.6 BIL. KM",
    travelTime: "7 YEARS",
    image: "/images/destination/image-titan.png",
  },
};

const Destination = () => {
  const [active, setActive] = useState<keyof typeof destinations>("moon");
  const destination = destinations[active];

  return (
    <div
      className="min-h-dvh text-white px-8 lg:px-24 py-20 bg-no-repeat bg-cover bg-center
      bg-[url('/images/destination/background-destination-mobile.jpg')]
      sm:bg-[url('/images/destination/background-destination-tablet.jpg')]
      lg:bg-[url('/images/destination/background-destination-desktop.jpg')]"
    >
      {/* Title */}
      <h1 className="text-xl tracking-widest uppercase text-center lg:text-left">
        <span className="opacity-50 font-bold  mt-4  font-[Barlow_Condensed]">
          02
        </span>{" "}
        Pick your destination
      </h1>

      {/* Main content */}
      <div className="mt-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-16">
        {/* Left side - Image */}
        <div className="flex justify-center lg:flex-1">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-72 h-72 lg:w-[445px] lg:h-[445px] object-contain"
          />
        </div>

        {/* Right side - Info */}
        <div className="flex flex-col items-center lg:items-start lg:flex-1 text-center lg:text-left">
          {/* Tabs */}
          <div className="flex gap-6 text-lg uppercase tracking-wide font-[Barlow_Condensed] text-[#D0D6F9]">
            {(
              Object.keys(destinations) as Array<keyof typeof destinations>
            ).map((key) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`pb-2 border-b-2 ${
                  active === key ? "border-white" : "border-transparent"
                } hover:border-gray-500`}
              >
                {destinations[key].name}
              </button>
            ))}
          </div>

          {/* Content */}
          <h2 className="text-6xl mt-6 font-[Bellefair]">{destination.name}</h2>
          <p className="max-w-lg font-[Barlow] text-[#D0D6F9] mt-4">
            {destination.description}
          </p>

          {/* Divider */}
          <hr className="w-full border-gray-700 my-8" />

          {/* Stats */}
          <div className="flex flex-column md:flex-row gap-8 lg:gap-16">
            <div>
              <p className="text-sm uppercase tracking-widest font-[Barlow_Condensed] text-[#D0D6F9]">
                Avg. Distance
              </p>
              <p className="text-2xl font-[Bellefair]">
                {destination.distance}
              </p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-widest font-[Barlow_Condensed] text-[#D0D6F9]">
                Est. Travel Time
              </p>
              <p className="text-2xl font-[Bellefair]">
                {destination.travelTime}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destination;
