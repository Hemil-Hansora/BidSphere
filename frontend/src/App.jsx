import React, { use, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideDrawer from "./layouts/SideDrawer.jsx";
import Home from "./pages/Home.jsx";
import { ToastContainer } from "react-toastify";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import SubmitCommission from "./pages/SubmitCommission.jsx";
import { useDispatch } from "react-redux";
import { fetchUser } from "./store/slices/userSlice.js";
import HowItWorks from "./pages/HowItWorks.jsx";
import About from "./pages/About.jsx";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  return (
    <Router>
      <SideDrawer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sumbit-commission" element={<SubmitCommission />} />
        <Route path="/how-it-works" element = {<HowItWorks/>} />
        <Route path="/about-us" element = {<About/>} />

      </Routes>
      <ToastContainer position="top-right" />
    </Router>
  );
};

export default App;
