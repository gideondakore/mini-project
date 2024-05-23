import React from "react";
import "./App.css";
import { Home, Register } from "./pages";
import { Routes, Route } from "react-router-dom";
import NavBar from "./layouts/NavBar";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
