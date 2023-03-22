import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
const Private = ({ children }) => {
  return (
    <React.Fragment>
      <ToastContainer />
      <Navbar />
      {children}
      <Outlet />
      <Footer />
    </React.Fragment>
  );
};
export default Private;
