import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import Destination from "./pages/Destination";
import Crew from "./pages/Crew";
import Technology from "./pages/Technology";

const App = () => {
  return (
    <div className="relative">
      {/* Shared Navbar */}
      <Navbar />

      {/* Horizontal Scroll Container */}
      <div className="flex overflow-x-auto snap-x snap-proximity h-screen scrollbar-hide">
        <section
          id="home"
          className="flex-shrink-0 w-screen snap-start h-screen overflow-auto md:overflow-hidden"
        >
          <Home />
        </section>
        <section
          id="destination"
          className="flex-shrink-0 w-screen snap-start h-screen overflow-auto md:overflow-hidden"
        >
          <Destination />
        </section>
        <section
          id="crew"
          className="flex-shrink-0 w-screen snap-start h-screen overflow-auto md:overflow-hidden"
        >
          <Crew />
        </section>
        <section
          id="technology"
          className="flex-shrink-0 w-screen snap-start h-screen overflow-auto md:overflow-hidden"
        >
          <Technology />
        </section>
      </div>

      {/* Mobile Scroll Indicator */}
      <div className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
        <div className="flex space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
          <div className="w-2 h-2 rounded-full bg-white/50"></div>
          <div className="w-2 h-2 rounded-full bg-white/50"></div>
          <div className="w-2 h-2 rounded-full bg-white/50"></div>
          <div className="w-2 h-2 rounded-full bg-white/50"></div>
        </div>
        <p className="text-white/70 text-xs text-center mt-2">
          Swipe to navigate
        </p>
      </div>
    </div>
  );
};

export default App;
