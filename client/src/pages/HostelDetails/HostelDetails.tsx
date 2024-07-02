import React from "react";
import HostelDetail from "../../components/HostelDetail.tsx/HostelDetail";
import MinimalNavBar from "../../components/MinimalNavBar/MinimalNavBar";

import "./HostelDetails.css";

const HostelDetails = () => {
  return (
    <div className="hostel-details--container">
      <MinimalNavBar />
      <HostelDetail />
    </div>
  );
};

export default HostelDetails;
