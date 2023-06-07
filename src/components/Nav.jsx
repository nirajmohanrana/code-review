import React, { useEffect, useState } from "react";
import AppLogo from "../assets/logo.png";
import {
  AiOutlineAlignRight,
  AiOutlineClose,
  AiOutlineLogout,
} from "react-icons/ai";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const activeLink = "p-2 border-b border-primaryText text-primaryText";
  const nonActiveLink = "p-2 text-primaryText";

  useEffect(() => {
    const authChange = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
      }
    });

    return authChange;
  }, []);

  return (
    <nav className="w-full relative flex items-center mx-auto sm:px-16 px-6 shadow-sm shadow-accent2/50 hover:shadow-accent duration-500 transition-all">
      <Link to="/" className="flex items-center gap-4 grow cursor-pointer">
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
      </Link>

      <div className="hidden md:flex justify-center items-center gap-4 text-primaryText font-medium">
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? activeLink : nonActiveLink)}
        >
          About Us
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) => (isActive ? activeLink : nonActiveLink)}
        >
          History
        </NavLink>
        {user ? (
          <div className="flex justify-center items-center gap-4">
            <img
              src={user.photoURL}
              className="w-10 h-10 rounded-full"
              alt=""
            />
            <AiOutlineLogout
              className="text-primaryText text-3xl cursor-pointer"
              onClick={() => {
                signOut(auth).then(() => {
                  navigate("/");
                });
              }}
            />
          </div>
        ) : (
          <NavLink
            to="/sign-in"
            className="bg-primaryText text-primary px-3 py-1 rounded-md hover:bg-hover hover:text-primaryText shadow-md shadow-accent hover:shadow-accent2 duration-300 transition-all"
          >
            Sign In
          </NavLink>
        )}
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
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/history">History</NavLink>
          {user ? (
            ""
          ) : (
            <NavLink
              to="/sign-in"
              className="border border-primary rounded px-2 py-1 mt-3"
            >
              Sign In
            </NavLink>
          )}
        </div>
      ) : (
        <></>
      )}
    </nav>
  );
};

export default Nav;
