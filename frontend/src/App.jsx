import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideDrawer from "./layouts/SideDrawer.jsx";
import Home from "./pages/Home.jsx";
import { ToastContainer} from 'react-toastify';
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";

const App = () => {
  return (
    <Router>
      <SideDrawer/>
      <Routes>
        <Route path="/" element = {<Home/>} />
        <Route path="/sign-up" element= {<SignUp/>} />
        <Route path="/login" element = {<Login/>}/>
      </Routes>
      <ToastContainer position="top-right" />
    </Router>
  );
};

export default App;
