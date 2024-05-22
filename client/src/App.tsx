import React from "react";
import "./App.css";
import { Home, Register } from "./pages";
import { Routes, Route } from "react-router-dom";
import NavBar from "./layouts/NavBar";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
        </Route>
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </div>
  );
};

export default App;
