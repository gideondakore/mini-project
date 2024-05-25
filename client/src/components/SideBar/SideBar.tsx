import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiArrowRightSLine, RiArrowDownSLine } from "react-icons/ri";
import "./SideBar.css";

const SideBar = () => {
  const [isArrowDownHomeType, setIsArrowDownHomeType] =
    useState<boolean>(false);
  const [isArrowDownServiceType, setIsArrowDownServiceType] =
    useState<boolean>(false);
  const [isArrowDownPaymentType, setIsArrowDownPaymentType] =
    useState<boolean>(false);

  const [card, setCard] = useState<string>("");

  const handleClicks = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const currentTarget = event.currentTarget;
    const target = event.target as HTMLElement;
    const hostelType = currentTarget.dataset.type;

    console.log(currentTarget, target);

    if (
      hostelType === "hostel" &&
      (target?.tagName.toLowerCase() === "p" ||
        target?.tagName.toLowerCase() === "path" ||
        target?.tagName.toLowerCase() === "svg")
    ) {
      setIsArrowDownHomeType(!isArrowDownHomeType);
    } else if (
      hostelType === "service" &&
      (target?.tagName.toLowerCase() === "p" ||
        target?.tagName.toLowerCase() === "path" ||
        target?.tagName.toLowerCase() === "svg")
    ) {
      setIsArrowDownServiceType(!isArrowDownServiceType);
    } else if (
      hostelType === "payment" &&
      (target?.tagName.toLowerCase() === "path" ||
        target?.tagName.toLowerCase() === "p" ||
        target?.tagName.toLowerCase() === "svg")
    ) {
      setIsArrowDownPaymentType(!isArrowDownPaymentType);
    }
  };

  return (
    <div className="nav-details">
      <div className="hostel-types" onClick={handleClicks} data-type="hostel">
        <div style={{ display: "flex" }}>
          <span className="arrows">
            {!isArrowDownHomeType ? (
              <RiArrowRightSLine size={28} />
            ) : (
              <RiArrowDownSLine size={28} />
            )}
          </span>
          <p>Hostel Type</p>
        </div>
        {isArrowDownHomeType && (
          <ul className="hostel-types--list">
            <li>
              <Link to="/">Our top picks</Link>
            </li>
            <li>
              <Link to="/">Hostels & apartment first</Link>
            </li>
            <li>
              <Link to="/">Property rating (high to low)</Link>
            </li>
            <li>
              <Link to="/">Property rating (low to high)</Link>
            </li>
            <li>
              <Link to="/">Distance from KNUST main campus</Link>
            </li>
            <li>
              <Link to="/">Top reviewed</Link>
            </li>
          </ul>
        )}
      </div>

      <div className="service-types" onClick={handleClicks} data-type="service">
        <div style={{ display: "flex" }}>
          <span className="arrows">
            {!isArrowDownServiceType ? (
              <RiArrowRightSLine size={28} />
            ) : (
              <RiArrowDownSLine size={28} />
            )}
          </span>
          <p>Services</p>
        </div>

        {isArrowDownServiceType && (
          <ul className="service-types--list">
            <li>
              <Link to="/">Luggage storage</Link>
            </li>
            <li>
              <Link to="/">Laundry</Link>
            </li>
            <li>
              <Link to="/">Game room & recreational</Link>
            </li>
            <li>
              <Link to="/">Book exchange & libraries</Link>
            </li>
            <li>
              <Link to="/">Security cameras</Link>
            </li>
            <li>
              <Link to="/">Key card access</Link>
            </li>
          </ul>
        )}
      </div>

      <div className="payment-types" onClick={handleClicks} data-type="payment">
        <div style={{ display: "flex" }}>
          <span className="arrows">
            {!isArrowDownPaymentType ? (
              <RiArrowRightSLine size={28} />
            ) : (
              <RiArrowDownSLine size={28} />
            )}
          </span>
          <p>Payment</p>
        </div>

        {isArrowDownPaymentType && (
          <ul className="payment-types--list">
            <li>
              <Link to="/">Cash</Link>
            </li>
            <li>
              <div className="sortedByContainer">
                <span className="card-span">Card:</span>
                <select
                  value={card}
                  onChange={({ target }) => setCard(target?.value)}
                >
                  <option value="" disabled>
                    You can select the type of card
                  </option>
                  <option value="visa">Visa card</option>
                  <option value="master">Master card</option>
                </select>
              </div>
            </li>
            <li>
              <div className="sortedByContainer">
                <span className="momo-span">Momo:</span>
                <select
                  value={card}
                  onChange={({ target }) => setCard(target?.value)}
                >
                  <option value="" disabled>
                    Mobile money
                  </option>
                  <option value="mtn">MTN Mobile Money</option>
                  <option value="telecel">Telecel Cash</option>
                  <option value="airteltigo">AirtelTigo Cash</option>
                </select>
              </div>
            </li>
          </ul>
        )}
      </div>
      <div style={{ paddingLeft: "2rem", paddingRight: "10px" }}>
        <p className="smart-map">Smart map</p>
        <div className="showMap">
          <button title="Show all available hostel on map">Show on map</button>
        </div>
      </div>
      <div style={{ paddingLeft: "2rem" }}>
        <Link to="/" className="about">
          About
        </Link>
      </div>
      <div style={{ paddingLeft: "2rem", paddingRight: "10px" }}>
        <Link to="/" className="contacts">
          Contacts
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
