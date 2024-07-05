import React from "react";
import HostelDetail from "../../components/HostelDetail.tsx/HostelDetail";

import "./HostelDetails.css";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

const HostelDetails = () => {
  return (
    <div className="hostel-details--container">
      <NavBar />
      <HostelDetail />
      <Footer />
    </div>
  );
};

export default HostelDetails;
