import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import Destination from "./pages/Destination";
import Crew from "./pages/Crew";
import Technology from "./pages/Technology";


const App = () => {
  return (
    <div className="relative">
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

      {/*Scroll Indicator */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
          <p className="text-white/70 text-xs text-center ">
          Swipe to navigate
        </p>
        </div>
        
      </div>
    </div>
  );
};

export default App;
