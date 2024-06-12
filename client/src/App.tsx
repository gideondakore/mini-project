import React from "react";
import "./App.css";
import { Home, Register } from "./pages";
import { Routes, Route } from "react-router-dom";
import { UserInfo, SignIn, About, Contact } from "./pages";
import MapContainer from "./pages/MapWorks/MapContainer";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register">
        <Route index element={<Register />} />
        <Route path=":id" element={<Register />} />
      </Route>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/user" element={<UserInfo />} />
      <Route path="/map" element={<MapContainer />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default App;
