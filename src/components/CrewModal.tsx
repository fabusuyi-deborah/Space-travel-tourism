"use client";

import { AnimatePresence, motion } from "framer-motion";

type CrewModalProps = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  member: {
    name: string;
    role: string;
    bio: string;
    image: string;
  };
  stats: {
    missions: number;
    experience: string;
    specialty: string;
  };
};

export default function CrewModal({ showModal, setShowModal, member, stats }: CrewModalProps) {
  return (
    <AnimatePresence>
      {showModal && (
        <>
          {/* Backdrop - Smoothly blurs the background character */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9998]"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-[9999] p-4 pointer-events-none"
          >
            <div className="relative bg-[#0B0D17]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 max-w-2xl w-full pointer-events-auto shadow-2xl overflow-hidden">
              
              {/* Subtle radial glow inside the modal */}
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="relative z-10">
                {/* Crew Role */}
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-[#D0D6F9] font-[Barlow_Condensed] uppercase tracking-[0.2em] text-sm md:text-base mb-2 block opacity-50"
                >
                  {member.role}
                </motion.span>

                {/* Crew Name */}
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-6xl font-[Bellefair] uppercase text-white mb-6"
                >
                  {member.name}
                </motion.h2>

                {/* Bio */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-[#D0D6F9] font-[Barlow] text-base md:text-lg leading-relaxed mb-8"
                >
                  {member.bio}
                </motion.p>

                {/* Divider Line */}
                <div className="h-px bg-white/10 mb-8" />

                {/* Experience & Stats Grid */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                  <div className="space-y-1">
                    <p className="text-[#D0D6F9] font-[Barlow_Condensed] text-xs uppercase tracking-widest opacity-50">Missions</p>
                    <p className="text-white font-[Bellefair] text-2xl uppercase">{stats.missions}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-[#D0D6F9] font-[Barlow_Condensed] text-xs uppercase tracking-widest opacity-50">Experience</p>
                    <p className="text-white font-[Bellefair] text-2xl uppercase">{stats.experience}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[#D0D6F9] font-[Barlow_Condensed] text-xs uppercase tracking-widest opacity-50">Specialty</p>
                    <p className="text-white font-[Bellefair] text-xl uppercase leading-tight">{stats.specialty}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}