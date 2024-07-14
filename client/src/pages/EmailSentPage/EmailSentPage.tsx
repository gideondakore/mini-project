import React from "react";
import "./EmailSentPage.css"; // We will create this CSS file

const EmailSentPage: React.FC = () => {
  return (
    <div className="email-sent-container">
      <div className="email-sent-box">
        <h1>Email Sent</h1>
        <p>
          We have sent a verification email to your email address. Please check
          your inbox and follow the instructions to verify your email.
        </p>
        <p>If you did not receive the email, please check your spam folder.</p>
      </div>
    </div>
  );
};

export default EmailSentPage;
