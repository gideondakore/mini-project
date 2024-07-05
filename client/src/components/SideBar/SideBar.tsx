import React, { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { RiArrowRightSLine, RiArrowDownSLine } from "react-icons/ri";
import "./SideBar.css";

const SideBar = ({
  Filter,
  handlePaymentCash,
  handleCardMomo,
}: {
  Filter: (newData: string, serviceName: string, serviceText: string) => void;
  handlePaymentCash: (cash: string) => void;
  handleCardMomo: (card_momo: string) => void;
}) => {
  const [isArrowDownHomeType, setIsArrowDownHomeType] =
    useState<boolean>(false);
  const [isArrowDownServiceType, setIsArrowDownServiceType] =
    useState<boolean>(false);
  const [isArrowDownPaymentType, setIsArrowDownPaymentType] =
    useState<boolean>(false);

  const [card, setCard] = useState<string>("");
  const [, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const location = useLocation();

  const handleClicks = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const currentTarget = event.currentTarget;
    const target = event.target as HTMLElement;
    const hostelType = currentTarget.dataset.type;

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

  const handleMouseClick = () => {
    navigate(`${location.pathname}map/?lat=6.6745&lng=-1.5716`);
  };

  const handleLinkClick = (
    serviceType: string,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    setSearchParams(
      { search_type: serviceType, service_name: event.currentTarget.innerText },
      { replace: true }
    );
    Filter(serviceType, event.currentTarget.innerText, "");
  };

  const handlePayment = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    handlePaymentCash(e.currentTarget.innerText);
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
              <Link to="/" onClick={(e) => handleLinkClick("top_picks", e)}>
                Our top picks
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={(e) => handleLinkClick("boarding_apartment", e)}
              >
                Boarding & apartment
              </Link>
            </li>
            <li>
              <Link to="/" onClick={(e) => handleLinkClick("high_low", e)}>
                Property rating (high to low)
              </Link>
            </li>
            <li>
              <Link to="/" onClick={(e) => handleLinkClick("low_high", e)}>
                Property rating (low to high)
              </Link>
            </li>
            <li>
              <Link to="/" onClick={(e) => handleLinkClick("distance", e)}>
                Distance from KNUST main campus
              </Link>
            </li>
            <li>
              <Link to="/" onClick={(e) => handleLinkClick("top_reviewed", e)}>
                Top reviewed
              </Link>
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
              <Link
                to="/"
                onClick={(e) => handleLinkClick("service_hostel", e)}
              >
                Hostel
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={(e) => handleLinkClick("service_boarding", e)}
              >
                Boarding
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={(e) => handleLinkClick("service_coffee", e)}
              >
                Coffee Shop
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={(e) => handleLinkClick("service_lunch_restaurant", e)}
              >
                Lunch Restaurant
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={(e) => handleLinkClick("service_restaurant", e)}
              >
                Restaurant
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={(e) => handleLinkClick("service_souvenir", e)}
              >
                Souvenir Store
              </Link>
            </li>
            <li>
              <Link to="/" onClick={(e) => handleLinkClick("service_wifi", e)}>
                Wi-Fi Spot
              </Link>
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
              <Link to="/" onClick={handlePayment}>
                Cash
              </Link>
            </li>
            <li>
              <div className="sortedByContainer">
                <span className="card-span">Card:</span>
                <select
                  value={card}
                  onChange={({ target }) => {
                    setCard(target?.value);
                    handleCardMomo(target?.selectedOptions[0]?.text);
                  }}
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
                  onChange={({ target }) => {
                    setCard(target?.value);
                    handleCardMomo(target?.selectedOptions[0]?.text);
                  }}
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
          <button
            title="Show all available hostel on map"
            onClick={handleMouseClick}
            type="button"
          >
            Show on map
          </button>
        </div>
      </div>
      <div style={{ paddingLeft: "2rem" }}>
        <Link to="http://localhost:3000/about" className="about">
          About
        </Link>
      </div>
      <div style={{ paddingLeft: "2rem", paddingRight: "10px" }}>
        <Link to="/contact" className="contacts">
          Contacts
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
