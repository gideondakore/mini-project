import React from "react";
import "./App.css";
import { Home, Register } from "./pages";
import { Routes, Route } from "react-router-dom";
import { UserInfo, SignIn, About, Contact, HostelDetails } from "./pages";
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

      <Route path="/map">
        <Route index element={<MapContainer />} />
        <Route path=":id" />
      </Route>

      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/hostel-details" element={<HostelDetails />} />
    </Routes>
  );
};

export default App;
