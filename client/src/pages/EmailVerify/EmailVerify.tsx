import React, { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const EmailVerify = () => {
  const location = useLocation();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  useEffect(() => {
    const token = searchParams.get("token");
    // console.log("Token: ", token);
    const handleOnload = () => {
      // console.log("Message Client: ", token);
      const verifyEmail = async (mailToken: string) => {
        try {
          const response = await fetch(
            `${
              process.env.REACT_APP_LOCAL_HOST_SERVER
            }/api/verify-email?token=${encodeURIComponent(mailToken)}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );
          if (!response.ok) {
            console.log("Email verification failed!");
          }

          const {
            message,
            success,
            credential_access_token,
            credential_refresh_token,
          } = await response.json();
          if (success) {
            window.localStorage.setItem(
              "credential_access_token",
              credential_access_token
            );
            window.localStorage.setItem(
              "credential_refresh_token",
              credential_refresh_token
            );
            window.location.href = `${process.env.REACT_APP_LOCAL_HOST_CLIENT}/verification-success/?verification_msg=${message}`;
          } else {
            window.location.href = `${process.env.REACT_APP_LOCAL_HOST_CLIENT}/verification-error/?verification_msg=${message}`;
          }
        } catch (error) {
          window.location.href = `${process.env.REACT_APP_LOCAL_HOST_CLIENT}/verification-error`;
        }
      };

      if (token) {
        verifyEmail(token);
      } else {
        // console.log("Email verification token not found!");
        window.location.href = `${process.env.REACT_APP_LOCAL_HOST_CLIENT}/verification-error`;
      }
    };
    window.addEventListener("load", handleOnload);
    return () => window.removeEventListener("load", handleOnload);
  }, [searchParams]);
  return (
    <div>
      <ToastContainer />
      <div>Loading...</div>
    </div>
  );
};

export default EmailVerify;
