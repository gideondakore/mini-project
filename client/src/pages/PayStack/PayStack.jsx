import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import "./PayStack.css";

const PayStack = () => {
  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState();

  const resetForm = () => {
    setEmail("");
    setName("");
    setPhone("");
  };

  const componentProps = {
    email,
    amount: amount * 100,
    metadata: {
      name,
      phone,
    },
    publicKey,
    currency: "GHS",
    text: "Reserve a bed",
    onSuccess: ({ reference }) => {
      alert(
        `A bed has been for you successful! Transaction reference: ${reference}`
      );
      resetForm();
    },
    onClose: () => alert("Are you sure, you want to close?"),
  };

  return (
    <div className="paystack-app">
      <div className="paystack-container">
        <div className="item">
          <div className="overlay-effect"></div>
          <img
            className="item-image"
            src={require("../../assets/images/app-logo.jpg")}
            alt="product"
          />
        </div>
        <div className="checkout">
          <div className="checkout-form">
            <div className="checkout-field">
              <label>Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="checkout-field">
              <label>Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="checkout-field">
              <label>Amount</label>
              <input
                type="text"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="checkout-field">
              <label>Phone</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <PaystackButton className="paystack-button" {...componentProps} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayStack;
