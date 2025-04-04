import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import LoadingScreen from "./components/LoadingScreen"; // Import the loader
import Navbar from "./components/Navbar";
import { div } from "framer-motion/client";

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
        <div>
          {" "}
          <Hero />{" "}
        </div>
      )}
    </div>
  );
};

export default App;
