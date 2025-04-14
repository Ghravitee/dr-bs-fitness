import { useState, useEffect } from "react";
import i18n from "i18next";

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
              src="/logo.webp"
              alt="This is the logo of the website"
              width={80}
              height={80}
              className=""
            />
          </a>

          <select
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="text-white text-xl border border-white p-1 rounded-md cursor-pointer"
          >
            <option value="en" className="text-black">
              English
            </option>
            <option value="fr" className="text-black">
              Français
            </option>
            <option value="it" className="text-black">
              Italiano
            </option>
            <option value="es" className="text-black">
              Español
            </option>
            <option value="ar" className="text-black">
              العربية
            </option>
          </select>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
