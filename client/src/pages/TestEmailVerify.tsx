import React, { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const TestEmailVerify = () => {
  const location = useLocation();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  useEffect(() => {
    const token = searchParams.get("token");
    // console.log("Token: ", token);
    const handleOnload = () => {
      console.log("Message Client: ", token);
      const verifyEmail = async (mailToken: string) => {
        try {
          const response = await fetch(
            `http://localhost:8000/api/verify-email?token=${encodeURIComponent(
              mailToken
            )}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );
          console.log("RESPONSE: ", response);
          if (!response.ok) {
            console.log("Email verification failed!");
            toast("Email verification failed!");
            // return;
          }

          const {
            message,
            success,
            credential_access_token,
            credential_refresh_token,
          } = await response.json();
          console.log(
            "Message: ",
            credential_access_token,
            " : ",
            credential_refresh_token,
            " : ",
            success
          );

          // console.log("Data: ", data);
          if (success) {
            console.log("From success-------");
            // alert(message);
            window.localStorage.setItem(
              "credential_access_token",
              credential_access_token
            );
            window.localStorage.setItem(
              "credential_refresh_token",
              credential_refresh_token
            );
            window.location.href = `http://localhost:3000/verification-success/?verification_msg=${message}`;
          } else {
            window.location.href = `http://localhost:3000/verification-error/?verification_msg=${message}`;
          }
          // alert(message);
          // toast(success);
        } catch (error) {
          // console.log("Something went wrong verifying email error");
          // toast("Something went wrong verifying email error");
          window.location.href = "http://localhost:3000/verification-error";
        }
      };

      if (token) {
        verifyEmail(token);
      } else {
        // console.log("Email verification token not found!");
        window.location.href = "http://localhost:3000/verification-error";
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

export default TestEmailVerify;
