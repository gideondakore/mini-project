import React from "react";
import "./App.css";
import { Home } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./layouts/NavBar";
import Footer from "./layouts/Footer";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Home />
      <Footer />
    </div>
  );
};

export default App;
