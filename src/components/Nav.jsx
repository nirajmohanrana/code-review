import React, { useState } from "react";
import AppLogo from "../assets/logo.png";
import { AiOutlineAlignRight, AiOutlineClose } from "react-icons/ai";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full relative flex items-center mx-auto sm:px-16 px-6 shadow-sm shadow-accent2/50 hover:shadow-accent duration-500 transition-all">
      <div className="flex items-center gap-4 grow">
        <img
          src={AppLogo}
          alt="Code Review"
          draggable="false"
          className="w-16 h-16 object-contain"
        />
        <h1 className="text-primaryText font-bold tracking-tighter leading-3 select-none">
          <p className="text-2xl -mb-3">Code</p>
          <p className="text-3xl">Review</p>
        </h1>
      </div>
      <div className="hidden md:flex justify-center items-center gap-4 text-primaryText font-medium">
        <p className="">About Us</p>
        <p>History</p>
        <button className="bg-primaryText text-primary px-3 py-1 rounded-md hover:bg-hover hover:text-primaryText shadow-md shadow-accent hover:shadow-accent2 duration-300 transition-all">
          Sign In
        </button>
      </div>

      <button
        className="p-1 rounded-lg border sm:hidden"
        onClick={() => {
          toggleMenu();
        }}
      >
        {isMenuOpen ? (
          <AiOutlineClose className="text-primaryText text-2xl" />
        ) : (
          <AiOutlineAlignRight className="text-primaryText text-2xl" />
        )}
      </button>
      {isMenuOpen ? (
        <div className="absolute top-16 right-0 mt-2 mx-2 px-4 py-2 w-1/2 bg-primaryText rounded-md shadow-lg z-10 animate-swing-in-top-fwd">
          <p className="">About Us</p>
          <p>History</p>
          <button className="border border-primary rounded px-2 py-1 mt-3">
            Sign In
          </button>
        </div>
      ) : (
        <></>
      )}
    </nav>
  );
};

export default Nav;
