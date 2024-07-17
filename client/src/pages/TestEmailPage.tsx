import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_LOCAL_HOST_SERVER}/api/send-verification-email`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (!response.ok) {
        toast("Error sending request to email");
        return;
      }

      const { message, success } = await response.json();
      if (success) {
        toast(message.join(" "));
        return;
      }
      toast(message.join(" "));
    } catch (error) {
      toast("Error sending request to email");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer />
      {error && <p className="error-message">{error}</p>}
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={handleChange}
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
