import React from "react";
import "./App.css";
import { Home, Register } from "./pages";
import { Routes, Route } from "react-router-dom";
import {
  UserInfo,
  SignIn,
  About,
  Contacts,
  HostelDetails,
  PayStack,
  Chat,
  VerificationSuccess,
  VerificationError,
  EmailSentPage,
  EmailVerify,
} from "./pages";
import MapContainer from "./pages/MapWorks/MapContainer";
import LoginForm from "./pages/TestEmailPage";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  return (
    <>
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
        <Route path="/contact" element={<Contacts />} />
        <Route path="/hostel-details" element={<HostelDetails />} />
        <Route path="payment" element={<PayStack />} />
        <Route path="chat" element={<Chat />} />
        <Route path="email" element={<LoginForm />} />
        <Route path="verify-email" element={<EmailVerify />} />
        <Route path="verification-success" element={<VerificationSuccess />} />
        <Route path="verification-error" element={<VerificationError />} />
        <Route path="email-sent" element={<EmailSentPage />} />
      </Routes>
      <Analytics />
    </>
  );
};

export default App;
