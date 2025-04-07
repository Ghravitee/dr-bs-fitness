import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import LoadingScreen from "./components/LoadingScreen"; // Import the loader
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 3 seconds
    const timer = setTimeout(() => setIsLoading(false), 5000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <div>
      {isLoading && <LoadingScreen isLoading={isLoading} />}
      {!isLoading && (
        <div className="relative">
          <Navbar /> <Intro />
          <Hero />{" "}
        </div>
      )}
    </div>
  );
};

export default App;
