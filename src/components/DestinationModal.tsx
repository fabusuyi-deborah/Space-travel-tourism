import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

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
  const [isBooked, setIsBooked] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const handleBooking = () => {
    setIsBooked(true);
    setShowConfetti(true);
    
    // Hide confetti after animation
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => {
      setIsBooked(false);
      setShowConfetti(false);
    }, 300);
  };

  // Prevent page scroll when modal is open
  useEffect(() => {
    if (!showModal || !modalContentRef.current) return;

    const modalElement = modalContentRef.current;

    const handleWheel = (e: WheelEvent) => {
      // Stop propagation to prevent page navigation
      e.stopPropagation();
      
      const { scrollTop, scrollHeight, clientHeight } = modalElement;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

      // Only prevent default if we're not at boundaries or scrolling away from boundary
      if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
        e.preventDefault();
      }
    };

    modalElement.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      modalElement.removeEventListener('wheel', handleWheel);
    };
  }, [showModal]);

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
              onClick={handleClose}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9998]"
            />

            {/* Confetti Animation */}
            <AnimatePresence>
              {showConfetti && (
                <div className="fixed inset-0 z-[10000] pointer-events-none">
                  {[...Array(50)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{
                        x: "50vw",
                        y: "50vh",
                        opacity: 1,
                        scale: 0
                      }}
                      animate={{
                        x: `${Math.random() * 100}vw`,
                        y: `${Math.random() * 100}vh`,
                        opacity: 0,
                        scale: [0, 1, 0.5],
                        rotate: Math.random() * 360
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        ease: "easeOut"
                      }}
                      className="absolute w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: [
                          "#FFD700",
                          "#FF6B6B",
                          "#4ECDC4",
                          "#45B7D1",
                          "#FFA07A",
                          "#98D8C8",
                          "#F7DC6F",
                          "#BB8FCE"
                        ][i % 8]
                      }}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>

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
              className="fixed inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center z-[9999] p-4 pointer-events-none"
            >
              <div 
                ref={modalContentRef}
                className="relative bg-[#0B0D17]/95 backdrop-blur-xl border border-white/10 rounded-t-3xl md:rounded-3xl p-4 sm:p-8 md:p-10 lg:p-12 max-w-2xl w-full max-h-[85vh] md:max-h-[80vh] overflow-y-auto pointer-events-auto shadow-2xl"
              >
                
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <AnimatePresence mode="wait">
                  {!isBooked ? (
                    <motion.div
                      key="booking-info"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
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
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleBooking}
                          className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-white font-[Barlow_Condensed] uppercase tracking-[0.15em] text-sm transition-all duration-300"
                        >
                          Book Your Journey
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  ) : (
                    // Confirmation Screen
                    <motion.div
                      key="confirmation"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", damping: 20, stiffness: 300 }}
                      className="flex flex-col items-center justify-center py-8 md:py-12"
                    >
                      {/* Success Icon */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          type: "spring",
                          damping: 10,
                          stiffness: 200,
                          delay: 0.2
                        }}
                        className="relative mb-6"
                      >
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-2xl">
                          <motion.svg
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="w-12 h-12 md:w-16 md:h-16 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <motion.path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </motion.svg>
                        </div>
                        {/* Pulse ring */}
                        <motion.div
                          initial={{ scale: 1, opacity: 0.6 }}
                          animate={{ scale: 1.5, opacity: 0 }}
                          transition={{ duration: 1, repeat: 2 }}
                          className="absolute inset-0 rounded-full bg-green-400"
                        />
                      </motion.div>

                      {/* Success Message */}
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-[Bellefair] uppercase text-white mb-4 text-center"
                      >
                        Journey Booked!
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="text-[#D0D6F9] font-[Barlow] text-base md:text-lg text-center mb-2"
                      >
                        Your adventure to <span className="text-white font-bold">{activeDestination.name}</span> awaits!
                      </motion.p>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="text-[#D0D6F9]/60 font-[Barlow] text-sm text-center mb-8"
                      >
                        Confirmation sent to your email
                      </motion.p>

                      {/* Booking Details */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                        className="w-full bg-white/5 rounded-2xl p-6 border border-white/10 space-y-3"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[#D0D6F9] text-sm font-[Barlow_Condensed] uppercase">Booking ID</span>
                          <span className="text-white font-[Barlow] ">SPC-{Math.floor(Math.random() * 10000)}</span>
                        </div>
                        <div className="h-px bg-white/10" />
                        <div className="flex justify-between items-center">
                          <span className="text-[#D0D6F9] text-sm font-[Barlow_Condensed] uppercase">Departure</span>
                          <span className="text-white font-[Barlow]">Earth Station Alpha</span>
                        </div>
                        <div className="h-px bg-white/10" />
                        <div className="flex justify-between items-center">
                          <span className="text-[#D0D6F9] text-sm font-[Barlow_Condensed] uppercase">Travel Time</span>
                          <span className="text-white font-[Barlow]">{activeDestination.travelTime}</span>
                        </div>
                      </motion.div>

                      {/* Close Button */}
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleClose}
                        className="mt-8 px-8 py-3 bg-white text-black rounded-full font-[Barlow_Condensed] uppercase tracking-[0.15em] text-sm transition-all duration-300 hover:bg-white/90"
                      >
                        Done
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}