import React from "react";
import "./VerificationSuccess.css";

const VerificationSuccess = () => {
  const handleGoToDashboard = () => {
    window.location.href = "http://localhost:3000";
  };

  return (
    <div className="confirmation-container">
      <div className="confirmation-box">
        <h1>Congratulations!</h1>
        <p>
          Your email has been successfully verified and your account is now
          registered.
        </p>
        <button className="confirmation-button" onClick={handleGoToDashboard}>
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default VerificationSuccess;
