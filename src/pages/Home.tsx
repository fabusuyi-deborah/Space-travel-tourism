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
      transition: { staggerChildren: 0.3, delayChildren: 0.5, ease: "easeInOut" },
    },
  };

  const itemsVariants: Variants = {
    hidden: { opacity: 0, y: 20 }, 
    visible: { 
      opacity: 1, y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    },
  };

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden bg-[#0B0D17]">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/assets/home/background-home-desktop.jpg')] bg-cover bg-center opacity-40" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute -bottom-[30%] -right-[10%] w-[800px] h-[800px] rounded-full bg-blue-400/20 blur-[120px]"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible" 
        viewport={{ once: true }}
        className="relative flex flex-col items-center justify-center h-full w-full px-6 pt-24 pb-12 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left lg:px-24 max-w-[1440px] mx-auto z-10"
      >
        {/* Text Section */}
        <div className="max-w-md lg:max-w-xl mb-12 lg:mb-0">
          <motion.h2 variants={itemsVariants} className="uppercase text-base tracking-[4.75px] text-[#D0D6F9] mb-4 md:text-xl lg:text-2xl font-[Barlow_Condensed]">
            So, you want to travel to
          </motion.h2>
          <motion.h1 variants={itemsVariants} className="uppercase text-7xl mb-6 sm:text-8xl md:text-9xl lg:text-[10rem] leading-none text-white font-[Bellefair]">
            Space
          </motion.h1>
          <motion.p variants={itemsVariants} className="text-[#D0D6F9] leading-relaxed text-base max-w-sm lg:max-w-md mx-auto lg:mx-0 font-[Barlow]">
            Let’s face it; if you want to go to space, you might as well genuinely go to outer space and not hover kind of on the edge of it. Well sit back, and relax because we’ll give you a truly out of this world experience!
          </motion.p>
        </div>

        {/* Explore Button Section */}
        <div className="relative flex items-center justify-center lg:pt-24">
          <motion.div 
            variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1 } }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-full bg-white/5 scale-150 sm:group-hover:bg-white/10 sm:group-hover:scale-[1.8] transition-all duration-700 ease-out pointer-events-none" />
            
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent event bubbling
                onExplore();
              }}
              className="relative z-20 w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-full bg-white text-black uppercase text-xl sm:text-2xl lg:text-3xl tracking-[2px] font-[Bellefair] flex items-center justify-center transition-all duration-500 ease-out hover:shadow-[0_0_0_50px_rgba(255,255,255,0.1)] active:scale-90 cursor-pointer touch-manipulation"
            >
              Explore
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}