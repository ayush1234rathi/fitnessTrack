import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const NavFooter = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="flex slex-col justify-center items-center p-5">
      {children}
      </div>
      <Footer />
    </div>
  );
};

export default NavFooter;
