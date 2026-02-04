"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import Destination from "./pages/Destination";
import Crew from "./pages/Crew";
import Technology from "./pages/Technology";
import Preloader from "./components/Preloader";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { id: "home", label: "01 HOME" },
  { id: "destination", label: "02 DESTINATION" },
  { id: "crew", label: "03 CREW" },
  { id: "technology", label: "04 TECHNOLOGY" },
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.5,
      }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [loading]);

  // Vertical scroll to horizontal navigation
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Prevent default vertical scrolling
      e.preventDefault();

      // Debounce to prevent over-scrolling
      if (isScrollingRef.current) return;

      const delta = e.deltaY;
      const currentSectionIndex = navItems.findIndex(
        (item) => item.id === activeSection
      );

      // Determine direction and navigate
      if (delta > 0 && currentSectionIndex < navItems.length - 1) {
        // Scroll down = next section
        isScrollingRef.current = true;
        handleScroll(navItems[currentSectionIndex + 1].id);
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 1000); // Debounce for 1 second
      } else if (delta < 0 && currentSectionIndex > 0) {
        // Scroll up = previous section
        isScrollingRef.current = true;
        handleScroll(navItems[currentSectionIndex - 1].id);
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 1000);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [activeSection]);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        inline: "start",
      });
    }
  };

  return (
    <div className="relative bg-[#0B0D17] text-white min-h-screen overflow-x-hidden">
      {loading && <Preloader />}

      {/* BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          />
        </AnimatePresence>

        {/* STARFIELD */}
        <motion.div
          animate={{
            x:
              activeSection === "home"
                ? 0
                : activeSection === "destination"
                ? -50
                : activeSection === "crew"
                ? -100
                : -150,
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            x: { type: "spring", stiffness: 20, damping: 30 },
            opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute inset-0 w-[120%] h-full"
          style={{
            backgroundImage: `
              radial-gradient(white, rgba(255,255,255,0.2) 2px, transparent 40px),
              radial-gradient(white, rgba(255,255,255,0.15) 1px, transparent 30px),
              radial-gradient(white, rgba(255,255,255,0.1) 2px, transparent 40px)
            `,
            backgroundSize: "550px 550px, 350px 350px, 250px 250px",
            backgroundPosition: "0 0, 40px 60px, 130px 270px",
          }}
        />
      </div>

      {/* CONTENT LAYER */}
      <div
        className={`relative z-10 transition-opacity duration-1000 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Navbar activeSection={activeSection} onScrollTo={handleScroll} />

        {/* VERTICAL NAV DOTS */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[60] hidden md:flex flex-col items-center gap-8">
          <div className="flex flex-col gap-5 bg-white/5 backdrop-blur-xl p-4 rounded-full border border-white/10 shadow-2xl">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className="group relative flex items-center justify-center"
              >
                <span className="absolute right-10 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white text-black text-[10px] px-3 py-1 rounded-sm tracking-[2px] uppercase pointer-events-none whitespace-nowrap">
                  {item.id}
                </span>
                <div
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                    activeSection === item.id
                      ? "bg-white scale-[1.8] shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                      : "bg-white/20"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* MOBILE SWIPE INDICATOR */}
        <div className="md:hidden fixed bottom-10 right-6 z-[60] pointer-events-none flex flex-col items-center gap-3">
          <div className="w-[1px] h-12 bg-gradient-to-t from-white/60 to-transparent animate-pulse" />
          <p className="text-white/40 text-[9px] tracking-[3px] uppercase [writing-mode:vertical-lr] rotate-180 font-bold">
            Swipe
          </p>
        </div>

        {/* HORIZONTAL SCROLL CONTAINER */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
        >
          <section
            id="home"
            className="flex-shrink-0 w-screen min-h-screen snap-start"
          >
            <Home onExplore={() => handleScroll("destination")} />
          </section>

          <section
            id="destination"
            className="flex-shrink-0 w-screen min-h-screen snap-start"
          >
            <Destination />
          </section>

          <section
            id="crew"
            className="flex-shrink-0 w-screen min-h-screen snap-start"
          >
            <Crew />
          </section>

          <section
            id="technology"
            className="flex-shrink-0 w-screen min-h-screen snap-start"
          >
            <Technology />
          </section>
        </div>
      </div>
    </div>
  );
}