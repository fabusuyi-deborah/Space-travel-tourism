"use client";
import { useEffect, useState } from 'react';

const Preloader = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0B0D17]">
      {/* Abstract Space Animation */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Pulsing Outer Ring */}
        <div className="absolute w-32 h-32 border border-blue-500/20 rounded-full animate-ping" />
        <div className="absolute w-24 h-24 border-2 border-white/10 rounded-full animate-pulse" />
        
        {/* The Percentage */}
        <span className="text-white font-serif text-3xl tracking-widest uppercase">
          {percentage}%
        </span>
      </div>

      {/* Loading Text */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-[#D0D6F9] font-sans-condensed tracking-[4.75px] uppercase text-sm animate-pulse">
          Initializing Systems...
        </p>
        {/* Progress Bar */}
        <div className="w-48 h-[1px] bg-white/10 overflow-hidden mt-4">
          <div 
            className="h-full bg-white transition-all duration-300 ease-out" 
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;