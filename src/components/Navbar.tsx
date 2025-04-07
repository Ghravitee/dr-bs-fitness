import { useState, useEffect } from "react";

const Navbar = () => {
  const [navBg, setNavBg] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= 90) {
        setNavBg(true);
      } else {
        setNavBg(false);
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        className={`py-2 px-6 md:px-[79px] ${
          navBg ? "bg-black/60" : "bg-transparent"
        } fixed w-full top-0 left-0 z-50 shadow-lg transition-all duration-300`}
      >
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="font-bold text-2xl font-raleway z-50">
            <img
              src="/logo.PNG"
              alt="Abyss Logo"
              width={80}
              height={80}
              className=""
            />
          </a>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
