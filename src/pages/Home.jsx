import React from "react";
import DragBox from "../components/DropBox";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <div className="mb-16 md:mb-8">
        <Header />
        <main className="mx-auto sm:px-16 px-6 my-16">
          <DragBox />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Home;
