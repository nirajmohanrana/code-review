import React from "react";
import AppLogo from "../assets/logo.png";

const Header = () => {
  return (
    <>
      <header className="mx-auto sm:px-16 px-6 my-4 mt-10">
        <div className="flex flex-col md:items-center">
          <h2 className="animate-text bg-gradient-to-r from-accent via-hover to-accent3 bg-clip-text text-transparent text-2xl lg:text-4xl font-black">
            Review Your Code Easily with Code Review
          </h2>
          <p className="ml-2 sm:ml-0 font-bold text-sm text-primaryText">
            with
          </p>
          <div className="flex items-center gap-1 md:-mt-2">
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
        </div>
      </header>
    </>
  );
};

export default Header;
