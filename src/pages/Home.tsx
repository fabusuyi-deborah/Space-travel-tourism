const Home = () => {
  return (
    <div
      className="
        min-h-screen bg-no-repeat bg-cover bg-center
        bg-[url('/images/background-home-mobile.jpg')]
        sm:bg-[url('/images/background-home-tablet.jpg')]
        lg:bg-[url('/images/background-home-desktop.jpg')]
      "
    >
      <div
        className="
          flex flex-col items-center justify-center
          h-screen px-4 py-6 text-center
          gap-8 md:gap-16 md:pt-32
          lg:flex-row lg:items-end lg:justify-between lg:text-left lg:gap-0 lg:px-8
        "
      >
        {/* Left Section (Text) */}
        <div className="md:max-w-lg lg:max-w-xl xl:max-w-2xl">
          <h2
            className="uppercase text-md text-[#D0D6F9] mb-3
                         font-[Barlow_Condensed]"
          >
            So, you want to travel to
          </h2>
          <h1
            className="uppercase text-6xl mb-4
                         text-white
                         font-[Bellefair]"
          >
            Space
          </h1>
          <p
            className=" text-[#D0D6F9] leading text-sm
                        text-balance
                        font-[Barlow]"
          >
            Let's face it; if you want to go to space, you might as well genuinely go to outer space and not hover kind
            of on the edge of it. Well sit back, and relax because we'll give you a truly out of this world experience!
          </p>
        </div>

        {/* Right Section (Explore Button) */}
        <div className="flex items-center justify-center lg:flex-shrink-0">
          <button
            className="
              w-32 h-32 rounded-full bg-white text-black uppercase 
              text-lg font-light flex items-center justify-center 
              font-[Bellefair]
              transition-all duration-500 ease-out
              hover:scale-105 hover:shadow-[0_0_0_20px_rgba(255,255,255,0.1)]
              active:scale-95
              sm:w-40 sm:h-40 sm:text-xl sm:hover:shadow-[0_0_0_30px_rgba(255,255,255,0.15)]
              md:w-48 md:h-48 md:text-2xl md:hover:shadow-[0_0_0_35px_rgba(255,255,255,0.2)]
              lg:w-56 lg:h-56 lg:text-3xl lg:hover:shadow-[0_0_0_40px_rgba(255,255,255,0.2)]
              xl:w-64 xl:h-64 xl:text-4xl xl:hover:shadow-[0_0_0_50px_rgba(255,255,255,0.25)]
              focus:outline-none focus:ring-4 focus:ring-white/30
            "
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
