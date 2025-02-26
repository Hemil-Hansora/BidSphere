import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideDrawer from "./layouts/SideDrawer.jsx";
import Home from "./pages/Home.jsx";
import { ToastContainer} from 'react-toastify';

const App = () => {
  return (
    <Router>
      <SideDrawer/>
      <Routes>
        <Route path="/" element = {<Home/>} />
      </Routes>
      <ToastContainer position="top-right" />
    </Router>
  );
};

export default App;
