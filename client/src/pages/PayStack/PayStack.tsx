import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import "./PayStack.css";
import { ToastContainer, toast } from "react-toastify";
const PayStack = () => {
  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY as string;
  const [email, setEmail] = useState("armstrongspycon27@gmail.com"); //
  const [firstname, setFirstName] = useState("gideon");
  const [surname, setSurname] = useState("dakore");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("5");

  const resetForm = () => {
    setEmail("");
    setFirstName("");
    setSurname("");
    setPhone("");
    setAmount("");
  };

  const componentProps = {
    email,
    amount: Number(amount) * 100,
    // metadata: {
    //   name,
    //   phone,
    // },
    // metadata: {

    // },
    firstname,
    surname,
    phone,
    publicKey,
    currency: "GHS",
    text: "Reserve a bed",
    onSuccess: ({ reference }: { reference: unknown }) => {
      toast(
        `A bed has been reserved for you successful! Transaction reference: ${reference}`,
        {
          type: "success",
          theme: "dark",
        }
      );
      resetForm();
    },
    onClose: () =>
      toast("Are you sure, you want to close?", {
        type: "info",
        theme: "dark",
      }),
  };

  const isFormValid = email && firstname && surname && phone && amount;
  return (
    <form className="paystack-app">
      <ToastContainer />
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
            <h1 className="checkout-info">payment info.</h1>
            <div className="checkout-field">
              <label>First name</label>
              <input
                type="text"
                id="firstname"
                value={firstname.toUpperCase()}
                onChange={({ target }) => setFirstName(target?.value)}
                placeholder="John"
              />
            </div>
            <div className="checkout-field">
              <label>Surname</label>
              <input
                type="text"
                id="name"
                value={surname.toUpperCase()}
                onChange={({ target }) => setSurname(target?.value)}
              />
            </div>
            <div className="checkout-field">
              <label>Email</label>
              <input
                type="text"
                id="email"
                value={email.toUpperCase()}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="checkout-field">
              <label>Amount</label>
              <input
                type="text"
                id="amount"
                value={amount}
                onChange={({ target }) => setAmount(target?.value)}
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
            {isFormValid ? (
              <PaystackButton className="paystack-button" {...componentProps} />
            ) : (
              <button
                className="paystack-button"
                disabled
                style={{
                  opacity: "0.8",
                  cursor: "not-allowed",
                }}
              >
                Reserve a bed
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default PayStack;
