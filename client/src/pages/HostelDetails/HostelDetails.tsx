import React from "react";
import HostelDetail from "../../components/HostelDetail.tsx/HostelDetail";
import MinimalNavBar from "../../components/MinimalNavBar/MinimalNavBar";

import "./HostelDetails.css";
import Footer from "../../components/Footer/Footer";

const HostelDetails = () => {
  return (
    <div className="hostel-details--container">
      <MinimalNavBar />
      <HostelDetail />
      <Footer />
    </div>
  );
};

export default HostelDetails;
