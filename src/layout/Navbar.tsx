"use client";

import React, { useState, useEffect, useMemo } from "react";

const NavBar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const links = useMemo(
    () => [
      { id: "home", label: "Home", number: "01" },
      { id: "destination", label: "Destination", number: "02" },
      { id: "crew", label: "Crew", number: "03" },
      { id: "technology", label: "Technology", number: "04" },
    ],
    []
  );

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: window.innerWidth < 768 ? "auto" : "smooth",
        block: "start",
        inline: "start",
      });
    }
    setIsMobileMenuOpen(false);
  };

  //Intersection Observer to update active section
  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null, // viewport
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    links.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [links]);

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:fixed md:flex top-0 left-0 w-full justify-between items-center p-6 lg:px-16 z-50">
        <div className="flex items-center gap-4">
          <img src="/images/shared/logo.svg" alt="Logo" className="h-8 w-8" />
          <hr className="hidden lg:block w-100 border-t border-gray-400 opacity-50" />
        </div>

        <nav className="bg-black/30 backdrop-blur-80 px-6 py-6 rounded-lg">
          <ul className="flex gap-6 text-white text-sm uppercase tracking-widest">
            {links.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollToSection(link.id)}
                  className={`pb-2 transition-colors ${
                    activeSection === link.id
                      ? "border-b-2 border-white"
                      : "border-b-2 border-transparent hover:border-gray-400"
                  }`}
                >
                  <span className="mr-2 font-bold">{link.number}</span>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Top bar */}
        <div className="fixed top-0 right-0 w-full flex justify-between items-center p-6 z-50">
          <img src="/images/shared/logo.svg" alt="Logo" className="h-8 w-8" />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="w-6 h-0.5 bg-white mb-1"></div>
            <div className="w-6 h-0.5 bg-white mb-1"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </button>
        </div>

        <nav
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className={`fixed top-0 right-0 h-full w-64 bg-black/90 backdrop-blur-md transform transition-transform duration-300 z-[60] ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Close button */}
          <div className="flex justify-end p-6">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-12 h-12 flex items-center justify-center text-white text-xl"
              aria-label="Close menu"
            >
              &times;
            </button>
          </div>

          {/* Links */}
          <div className="px-8 pt-4">
            <ul className="space-y-8">
              {links.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className={`block text-white text-base uppercase tracking-widest transition-colors ${
                      activeSection === link.id
                        ? "border-r-4 border-white pr-4"
                        : "border-r-4 border-transparent pr-4 hover:border-gray-400"
                    }`}
                  >
                    <span className="mr-4 font-bold">{link.number}</span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default NavBar;
