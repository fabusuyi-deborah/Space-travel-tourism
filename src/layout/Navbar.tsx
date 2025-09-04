"use client"

import type React from "react"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import Logo from "../space-tourism-website-main/starter-code/assets/shared/logo.svg"

const NavBar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const links = [
    { to: "/", label: "Home", number: "00" },
    { to: "/destination", label: "Destination", number: "01" },
    { to: "/crew", label: "Crew", number: "02" },
    { to: "/technology", label: "Technology", number: "03" },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:fixed md:flex top-0 left-0 w-full justify-between items-center p-6 lg:px-16 z-50">
        <div className="flex items-center gap-4">
          <img src={Logo || "/placeholder.svg"} alt="Logo" className="h-8 w-8" />
          <hr className="hidden lg:block w-100 border-t border-gray-400 opacity-50" />
        </div>

        <nav className="bg-black/30 backdrop-blur-80 px-6 py-6 rounded-lg">
          <ul className="flex gap-6 text-white text-sm uppercase tracking-widest">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end
                  className={({ isActive }) =>
                    `pb-2 transition-colors ${
                      isActive
                        ? "border-b-2 border-white"
                        : "border-b-2 border-transparent hover:border-gray-400"
                    }`
                  }
                >
                  <span className="mr-2 font-bold">{link.number}</span>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Top bar (z-50) */}
        <div className="fixed top-0 right-0 w-full flex justify-between items-center p-6 z-50">
          <img src={Logo || "/placeholder.svg"} alt="Logo" className="h-8 w-8" />
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
              className="w-12 h-12 flex items-center justify-center  text-white text-xl "
              aria-label="Close menu"
            >
              &times;
            </button>
          </div>

          {/* Links */}
          <div className="px-8 pt-4">
            <ul className="space-y-8">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block text-white text-base uppercase tracking-widest transition-colors ${
                        isActive
                          ? "border-r-4 border-white pr-4"
                          : "border-r-4 border-transparent pr-4 hover:border-gray-400"
                      }`
                    }
                  >
                    <span className="mr-4 font-bold">{link.number}</span>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Overlay (below menu) */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </div>
    </>
  )
}

export default NavBar
