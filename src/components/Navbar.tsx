import React from "react";
import logo from "../assets/logo.PNG";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-start">
      <div>
        <img
          src={logo}
          alt="This is the logo of the website"
          width={70}
          height={70}
        />
      </div>
    </nav>
  );
};

export default Navbar;
