"use client";
import '../index.css'
import { useState, useEffect } from "react";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Trigger entrance animations
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Track mouse position for parallax effect on button
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToDestination = () => {
    const element = document.getElementById("destination");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }
  };

  return (
    <div
      className="
        min-h-screen h-full bg-no-repeat bg-cover bg-center
        bg-[url('/images/background-home-tablet.jpg')]
        sm:bg-[url('/images/background-home-tablet.jpg')]
        lg:bg-[url('/images/background-home-desktop.jpg')]
        overflow-hidden
      "
    >
      <div
        className="
          flex flex-col items-center justify-center
          min-h-screen px-4 pt-10 pb-6 text-center
          gap-8
          sm:px-6 sm:pt-24 sm:pb-12 sm:gap-12
          md:gap-16 md:pt-32
          lg:pt-30 lg:pb-16 lg:flex-row lg:items-end lg:justify-between lg:text-left lg:gap-0 lg:px-8
        "
      >
        {/* Left Section (Text) */}
        <div
          className={`
            max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl
            transition-all duration-1000 ease-out
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
          `}
        >
          {/* Subheading with staggered animation */}
          <h2
            className={`
              uppercase text-md text-[#D0D6F9] mb-3
              md:text-lg md:mb-5
              lg:text-xl lg:mb-6
              font-[Barlow_Condensed]
              tracking-[0.3em]
              transition-all duration-700 ease-out delay-100
              ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"}
            `}
          >
            So, you want to travel to
          </h2>

          {/* Main title with dramatic entrance */}
          <h1
            className={`
              uppercase text-6xl mb-4
              sm:text-7xl sm:mb-5
              md:text-8xl md:mb-6
              lg:text-[8rem] lg:mb-7
              xl:text-[10rem] xl:mb-8
              leading-none
              text-white
              font-[Bellefair]
              transition-all duration-1000 ease-out delay-300
              `}
            style={{
              textShadow: isVisible
                ? "0 0 40px rgba(255, 255, 255, 0.1)"
                : "none",
            }}
          >
            Space
          </h1>

          {/* Description with fade-in */}
          <p
            className={`
              text-[#D0D6F9] leading-relaxed text-sm
              sm:text-base sm:leading-7
              md:text-lg md:leading-8
              lg:leading-8
              xl:leading-9
              text-balance
              font-[Barlow]
              transition-all duration-1000 ease-out delay-500
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
            `}
          >
            Let's face it; if you want to go to space, you might as well
            genuinely go to outer space and not hover kind of on the edge of it.
            Well sit back, and relax because we'll give you a truly out of this
            world experience!
          </p>
        </div>

        {/* Right Section (Explore Button) */}
        <div
          className={`
            flex items-center justify-center lg:flex-shrink-0
            transition-all duration-1200 ease-out delay-700
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
          `}
        >
          <div className="relative group">
            {/* Rotating orbital ring effect */}
            <div
              className={`
                absolute inset-0 rounded-full
                transition-all duration-700 ease-out
                ${isHovering ? "animate-spin-slow opacity-30" : "opacity-0"}
              `}
              style={{
                width: "calc(100% + 80px)",
                height: "calc(100% + 80px)",
                top: "-40px",
                left: "-40px",
                background:
                  "conic-gradient(from 0deg, transparent, rgba(255,255,255,0.3), transparent)",
              }}
            />

            {/* Pulsing outer glow */}
            <div
              className={`
                absolute inset-0 rounded-full
                transition-all duration-1000 ease-out
                ${isHovering ? "scale-150 opacity-0" : "scale-100 opacity-20"}
              `}
              style={{
                width: "calc(100% + 40px)",
                height: "calc(100% + 40px)",
                top: "-20px",
                left: "-20px",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
                animation: isHovering ? "pulse-glow 2s ease-out infinite" : "none",
              }}
            />

            {/* Main button */}
            <button
              onClick={scrollToDestination}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="
                relative z-10
                w-32 h-32 rounded-full bg-white text-black uppercase
                text-lg font-light flex items-center justify-center
                font-[Bellefair]
                transition-all duration-500 ease-out
                hover:scale-110
                active:scale-95
                sm:w-40 sm:h-40 sm:text-xl
                md:w-48 md:h-48 md:text-2xl
                lg:w-56 lg:h-56 lg:text-3xl
                xl:w-64 xl:h-64 xl:text-4xl
                focus:outline-none focus:ring-4 focus:ring-white/30
                shadow-[0_0_60px_rgba(255,255,255,0.3)]
                hover:shadow-[0_0_80px_rgba(255,255,255,0.5)]
                group
              "
              style={{
                transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`,
              }}
            >
              {/* Animated gradient overlay on hover */}
              <div
                className={`
                  absolute inset-0 rounded-full opacity-0 group-hover:opacity-100
                  transition-opacity duration-500
                  bg-gradient-to-br from-white via-blue-50 to-white
                `}
              />

              {/* Button text with letter spacing animation */}
              <span
                className="
                  relative z-10 
                  transition-all duration-300
                  group-hover:tracking-wider
                  group-hover:text-shadow-lg
                "
              >
                Explore
              </span>

              {/* Ripple effect on click */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div
                  className="
                    absolute inset-0 rounded-full
                    bg-white/20
                    scale-0 group-active:scale-150
                    opacity-50 group-active:opacity-0
                    transition-all duration-700 ease-out
                  "
                />
              </div>
            </button>

            {/* Hover hint text */}
            <div
              className={`
                absolute -bottom-10 left-1/2 -translate-x-1/2
                text-white/60 text-xs uppercase tracking-widest
                transition-all duration-500
                ${isHovering ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
              `}
            >
              Click to begin
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;