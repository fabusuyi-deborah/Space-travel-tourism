import React from "react";
import Logo from "../space-tourism-website-main/starter-code/assets/shared/logo.svg";

const NavBar: React.FC = () => {
  return ( 
  <div className="fixed top-0 left-0 w-full flex justify-between items-center p-6 lg:px-16 z-50">
      {/* Left side - Logo */}
      <div className="flex items-center gap-4">
        <img src={Logo} alt="Logo" className="h-8 w-8" />
        <hr className="hidden lg:block w-40 border-t border-gray-400 opacity-50" />
      </div>

      {/* Right side - Navigation */}
      <nav className="bg-black/30 backdrop-blur-md px-6 py-2 rounded-lg">
        <ul className="flex gap-6 text-white text-sm uppercase tracking-widest">
          <li className="border-b-2 border-white">00 Home</li>
          <li>01 Destination</li>
          <li>02 Crew</li>
          <li>03 Technology</li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
