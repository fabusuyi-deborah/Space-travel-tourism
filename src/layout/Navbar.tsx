"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavItemProps {
  item: { id: string; label: string };
  activeSection: string;
  onClick: (id: string) => void;
  isMobile: boolean;
}

const navItems = [
  { id: "home", label: "01 HOME" },
  { id: "destination", label: "02 DESTINATION" },
  { id: "crew", label: "03 CREW" },
  { id: "technology", label: "04 TECHNOLOGY" },
];

const Navbar = ({ activeSection }: { activeSection: string; onScrollTo: (id: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center p-4 md:p-0 md:top-4 lg:top-4">
      {/* Logo */}
      <div className="md:ml-12 shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><g fill="none" fillRule="evenodd"><circle fill="#FFF" cx="24" cy="24" r="24"/><path d="M24 0c0 13.255-10.745 24-24 24 13.255 0 24 10.745 24 24 0-13.255 10.745-24 24-24-13.255 0-24-10.745-24-24z" fill="#0B0D17"/></g></svg>
      </div>

      <div className="hidden lg:block h-[1px] bg-white/20 w-[35%] translate-x-8 z-20"></div>

      {/* Hamburger Toggle */}
      <button onClick={() => setIsOpen(!isOpen)} className="flex flex-col gap-1.5 md:hidden z-[60]">
        <motion.span 
          animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          className="w-6 h-[2px] bg-[#D0D6F9] block"
        />
        <motion.span 
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          className="w-6 h-[2px] bg-[#D0D6F9] block"
        />
        <motion.span 
          animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          className="w-6 h-[2px] bg-[#D0D6F9] block"
        />
      </button>

      {/* DESKTOP MENU (Always visible on md+) */}
      <ul className="hidden md:flex gap-12 bg-white/5 backdrop-blur-2xl px-8 lg:px-32 py-8 border-b border-white/10">
        {navItems.map((item) => (
          <NavItem key={item.id} item={item} activeSection={activeSection} onClick={handleScroll} isMobile={false} />
        ))}
      </ul>

      {/* MOBILE MENU (Animated Drawer) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Backdrop Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />
            
            <motion.ul
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="fixed top-0 right-0 h-screen w-[70%] bg-white/[0.05] backdrop-blur-[40px] flex flex-col gap-8 pt-32 pl-10 z-50 md:hidden shadow-2xl"
            >
              {navItems.map((item) => (
                <NavItem key={item.id} item={item} activeSection={activeSection} onClick={handleScroll} isMobile={true} />
              ))}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Reusable NavItem component
const NavItem = ({ item, activeSection, onClick, isMobile }: NavItemProps) => (
  <li className="relative group list-none">
    <button
      onClick={() => onClick(item.id)}
      className={`text-base md:text-sm tracking-[2.7px] uppercase font-sans-condensed flex gap-3 transition-all duration-300 ${
        activeSection === item.id ? "text-white" : "text-[#D0D6F9] hover:text-white"
      }`}
    >
      <span className="font-bold">{item.label.split(" ")[0]}</span>
      <span className="font-light">{item.label.split(" ")[1]}</span>
    </button>
    <div
      className={`absolute transition-all duration-500 bg-white
        ${isMobile 
          ? "right-0 top-0 h-full w-1" 
          : "bottom-[-34px] left-0 w-full h-[3px]"}
        ${activeSection === item.id ? "opacity-100" : "opacity-0"}
      `}
    />
  </li>
);

export default Navbar;