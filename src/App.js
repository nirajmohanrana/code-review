import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import History from "./pages/History";
import About from "./pages/About";

export default function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/sign-in" ? <></> : <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="history" element={<History />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="about" element={<About />} />
      </Routes>
    </>
  );
}
