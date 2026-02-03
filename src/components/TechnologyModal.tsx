"use client";

import { AnimatePresence, motion } from "framer-motion";

type TechModalProps = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  tech: {
    terminology: string;
    name: string;
    description: string;
  };
};

export default function TechModal({ showModal, setShowModal, tech }: TechModalProps) {
  return (
    <AnimatePresence>
      {showModal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9998]"
          />

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed inset-0 flex items-center justify-center z-[9999] p-4 pointer-events-none"
          >
            <div className="relative bg-[#0B0D17]/95 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 md:p-12 max-w-2xl w-full pointer-events-auto shadow-2xl">
              
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="relative z-10">
                <header className="mb-8">
                  <span className="text-[#D0D6F9] font-[Barlow_Condensed] uppercase tracking-[0.3em] text-sm mb-2 block opacity-60">
                    {tech.terminology}
                  </span>
                  <h2 className="text-4xl md:text-6xl font-[Bellefair] uppercase text-white leading-tight">
                    {tech.name}
                  </h2>
                </header>

                <div className="h-px bg-white/10 mb-8 w-1/4" />

                <p className="text-[#D0D6F9] font-[Barlow] text-base md:text-lg leading-relaxed">
                  {tech.description}
                </p>
                
                {/* Decorative Tech Detail */}
                <footer className="mt-12 flex items-center gap-4 opacity-30">
                   <div className="h-[2px] flex-1 bg-gradient-to-r from-white to-transparent" />
                   <span className="text-[10px] font-[Barlow_Condensed] uppercase tracking-[0.5em]">Classified Tech Data</span>
                </footer>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}