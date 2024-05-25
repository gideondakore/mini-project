import React from "react";
import "./App.css";
import { HomeNewLook, Register } from "./pages";
import { Routes, Route } from "react-router-dom";
// import NavBar from "./layouts/NavBar";

const App = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<NavBar />}>
        <Route index element={<Home />} />
      </Route> */}
      <Route path="/" element={<HomeNewLook />} />
      <Route path="/register">
        <Route index element={<Register />} />
        <Route path=":id" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default App;
