import { AnimatePresence, motion } from "framer-motion";

type ModalProps = {
  showModal: boolean;
  setShowModal: (value: boolean) => void; 
  activeDestination: {
    name: string;
    description: string;
    distance: string;
    travelTime: string;
  };
};

export default function Modal({ showModal, setShowModal, activeDestination }: ModalProps ) {
  return (
    <>
      {/* Modal Portal - Rendered Outside Section */}
      <div id="modal-root" />
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9998]"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ 
                type: "spring",
                damping: 30,
                stiffness: 300
              }}
              className="fixed inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center z-[9999] p-4  pointer-events-none"
            >
              <div className="relative bg-[#0B0D17]/95 backdrop-blur-xl border border-white/10 rounded-t-3xl md:rounded-3xl p-4 sm:p-8 md:p-10 lg:p-12 max-w-2xl w-full max-h-[85vh] md:max-h-[80vh] overflow-y-auto pointer-events-auto shadow-2xl">
                
                {/* Close Button */}
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Modal Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[Bellefair] uppercase text-white mb-4 leading-none pr-12">
                    {activeDestination.name}
                  </h2>
                </motion.div>

                {/* Modal Body */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6 md:space-y-8"
                >
                  {/* Description */}
                  <p className="text-[#D0D6F9] font-[Barlow] text-sm sm:text-base md:text-lg leading-relaxed">
                    {activeDestination.description}
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-white/10" />

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-2">
                      <p className="text-[#D0D6F9] font-[Barlow_Condensed] text-xs uppercase tracking-[0.15em]">
                        Avg. Distance
                      </p>
                      <p className="text-white font-[Bellefair] text-2xl md:text-3xl lg:text-4xl uppercase">
                        {activeDestination.distance}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-[#D0D6F9] font-[Barlow_Condensed] text-xs uppercase tracking-[0.15em]">
                        Est. Travel Time
                      </p>
                      <p className="text-white font-[Bellefair] text-2xl md:text-3xl lg:text-4xl uppercase">
                        {activeDestination.travelTime}
                      </p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-white font-[Barlow_Condensed] uppercase tracking-[0.15em] text-sm transition-all duration-300"
                  >
                    Book Your Journey
                  </motion.button>
                </motion.div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
} 