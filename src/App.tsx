import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import LoadingScreen from "./components/LoadingScreen";
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import i18n from "./i18n";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <div className="relative font-[Patrick_Hand] overflow-x-hidden">
      {/* 🔹 Fixed Background Layer */}
      <div className="fixed top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-top bg-[url('./assets/dr-bs-1.JPEG')] -z-10">
        {/* Optional overlay for better readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* 🔹 Main App Content */}
      {isLoading ? (
        <LoadingScreen isLoading={isLoading} />
      ) : (
        <div className="relative z-10 min-h-screen">
          <Toaster position="top-right" reverseOrder={false} />
          <Navbar />
          <Intro />
          <Hero />
        </div>
      )}
    </div>
  );
};

export default App;
