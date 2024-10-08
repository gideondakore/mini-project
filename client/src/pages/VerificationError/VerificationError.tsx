import React from "react";
import "./VerificationError.css";

const VerificationError: React.FC = () => {
  const handleGoBack = () => {
    window.location.href = `${process.env.REACT_APP_LOCAL_HOST_CLIENT}/register`;
  };
  return (
    <div className="error-container">
      <div className="error-box">
        <h1>Verification Failed</h1>
        <p>
          There was an error verifying your email or registering your account.
        </p>
        <button className="error-button" onClick={handleGoBack}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default VerificationError;
