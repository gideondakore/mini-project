import React from "react";
import "./App.css";
import { HomeNewLook, Register } from "./pages";
import { Routes, Route } from "react-router-dom";
import { UserInfo, SignIn } from "./pages";
import ToastifyTest from "./pages/ToastifyTest";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeNewLook />} />
      <Route path="/register">
        <Route index element={<Register />} />
        <Route path=":id" element={<Register />} />
      </Route>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/user" element={<UserInfo />} />
      <Route path="/toast" element={<ToastifyTest />} />
    </Routes>
  );
};

export default App;
