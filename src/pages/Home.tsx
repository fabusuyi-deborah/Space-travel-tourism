const Home = () => {
  return (
    <div
      className="
        min-h-screen bg-no-repeat bg-cover 
        bg-[url('/images/background-home-mobile.jpg')]
        sm:bg-[url('/images/background-home-tablet.jpg')]
        lg:bg-[url('/images/background-home-desktop.jpg')]
      "
    >
      <div
        className="
          flex flex-col items-center justify-center
          min-h-screen px-6 pt-24 pb-12 text-center
          gap-16
          lg:pt-48 lg:pb-24 lg:flex-row lg:items-end lg:justify-between lg:text-left lg:gap-0
        "
      >
        {/* Left Section (Text) */}
        <div className="max-w-md text-white lg:max-w-lg">
          <h2 className="uppercase tracking-[2px] text-base sm:text-lg lg:text-xl text-gray-300 mb-4">
            So, you want to travel to
          </h2>
          <h1 className="uppercase text-7xl sm:text-8xl lg:text-[9rem] font-serif mb-6">
            Space
          </h1>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
            Let’s face it; if you want to go to space, you might as well
            genuinely go to outer space and not hover kind of on the edge of it.
            Well sit back, and relax because we’ll give you a truly out of this
            world experience!
          </p>
        </div>

        {/* Right Section (Explore Button) */}
        <div className="flex items-center justify-center">
          <button
            className="
              w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 
              rounded-full bg-white text-black uppercase 
              text-xl sm:text-2xl lg:text-3xl font-light 
              flex items-center justify-center 
              transition-all duration-300 hover:shadow-[0_0_0_40px_rgba(255,255,255,0.2)]
            "
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
