import { useState, useEffect } from "react";
import logo from "../assets/logo.png";

interface LoadingScreenProps {
  isLoading: boolean;
}

function LoadingScreen({ isLoading }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let interval: number;

    if (isLoading) {
      const duration = 3000;
      const intervalTime = 50;
      const increment = (intervalTime / duration) * 95;
      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + increment, 95));
      }, intervalTime);
    } else {
      setProgress(100);
      setTimeout(() => setFadeOut(true), 500); // Delay fade out effect
    }

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center bg-gray-800 z-50 transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center">
        <img
          src={logo}
          alt="This is the logo of the website"
          width={150}
          height={150}
        />
        {/* <p className="text-center text-white text-3xl font-bold mt-6">
          Loading {Math.round(progress)}%
        </p> */}
        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-300 mt-4 rounded-full">
          <div
            className="h-full bg-gray-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
