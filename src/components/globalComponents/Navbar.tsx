import React from "react";
import SearchBar from "../homePage/SearchBar";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="navbar-container w-full flex justify-center items-center bg-teal-50">
      <div className="navbar-section w-full max-width flex justify-between items-center px-6 md:px-20 py-6 flex-col md:flex-row">
        <div className="logo-container flex justify-start items-center mb-4 md:mb-0">
          <h1 className="text-lg italic">STOCK BROKER</h1>
          <Image
            src="/logo.png"
            alt="logo"
            height={24}
            width={26}
            className="ml-2 lg:h-10 lg:w-auto"
          />
        </div>
        <SearchBar />
      </div>
    </div>
  );
};

export default Navbar;
