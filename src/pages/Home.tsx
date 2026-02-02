"use client";
import { motion, type Variants } from "framer-motion";

type HomeProps = {
  onExplore: () => void;
};

export default function Home({ onExplore }: HomeProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.3, 
        delayChildren: 0.8, 
        ease: "easeInOut"
      },
    },
  };

  const itemsVariants: Variants = {
    hidden: { opacity: 0, x: -50 }, 
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: "easeInOut" } 
    },
  };

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden bg-no-repeat bg-center ">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible" 
        viewport={{ once: false, amount: 0.3 }} 
        className="flex flex-col items-center justify-center h-full w-full px-6 pt-24 pb-12 text-center gap-12 md:gap-12 lg:flex-row lg:items-center lg:justify-between lg:text-left lg:px-24 max-w-[1440px] mx-auto"
      >
        {/* Left Section (Text) */}
        <div className="max-w-md lg:max-w-xl z-10">
          <motion.h2
            variants={itemsVariants}
            className="uppercase text-base tracking-[2.7px] text-[#D0D6F9] mb-4 md:text-xl lg:text-2xl font-[Barlow_Condensed]"
          >
            So, you want to travel to
          </motion.h2>

          <motion.h1
            variants={itemsVariants}
            className="uppercase text-7xl mb-6 sm:text-8xl md:text-9xl lg:text-[10rem] leading-none text-white font-[Bellefair]"
          >
            Space
          </motion.h1>
          
          <motion.p
            variants={itemsVariants}
            className="text-[#D0D6F9] leading-relaxed text-base max-w-sm lg:max-w-md mx-auto lg:mx-0 font-[Barlow]"
          >
            Let's face it; if you want to go to space, you might as well
            genuinely go to outer space and not hover kind of on the edge of it.
            Well sit back, and relax because we'll give you a truly out of this
            world experience!
          </motion.p>
        </div>

        {/* Right Section (Explore Button) */}
        <div className="relative flex items-center justify-center lg:mb-12 ">
          <motion.div 
            variants={{
              hidden: { opacity: 0, scale: 0.5 },
              visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "backOut" } }
            }}
            className="relative group flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-full bg-white/5 scale-125 animate-pulse group-hover:bg-white/10 transition-all duration-700" />
            <div className="absolute inset-0 rounded-full bg-white/5 scale-150 animate-ping opacity-20 pointer-events-none" />

            <button
              onClick={onExplore}
              className="relative z-10 w-45 h-45 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-full bg-white text-black uppercase text-xl sm:text-2xl lg:text-3xl tracking-[2px] font-[Bellefair] flex items-center justify-center transition-all duration-500 ease-out hover:shadow-[0_0_0_50px_rgba(255,255,255,0.1)] active:scale-90 focus:outline-none"
            >
              Explore
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}