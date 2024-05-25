import React, { useRef, useState } from "react";
import "./HomeNewLook.css";
import { Link } from "react-router-dom";
import { SideBar } from "../../components";
import { IoCall } from "react-icons/io5";
import { GrSend } from "react-icons/gr";
import NavBar from "../../layouts/NavBar";
import { DisplayHostels } from "../../components";
import { StarType, RemarkType, RateType } from "../../components";
import useInViewport from "../../hooks/useInViewport";
import { TbArrowsUpDown } from "react-icons/tb";
import { CiFilter } from "react-icons/ci";

const HomeNewLook = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const isInView = useInViewport(elementRef, { threshold: 0.0 });
  const [location, setLocation] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [rooms, setRooms] = useState<string>("");

  const imgFormats = [
    "webp",
    "webp",
    "webp",
    "avif",
    "avif",
    "avif",
    "avif",
    "avif",
    "webp",
    "avif",
  ];
  let name = "the prince hostel";
  let star: StarType = 5;
  let street = "Ayeduase gate road block 8884";
  let distance = 2;
  let remark: RemarkType = "Good";
  let description = `Nestled amidst the serene hills, our hostel is a tranquil
  retreat for travelers seeking solace and adventure. Located just
  a stone's throw away from the bustling city center, our hostel
  offers the perfect blend of convenience and escapism. Surrounded
  by lush greenery and panoramic views, guests can unwind in our
  cozy accommodations after a day of exploring nearby attractions.
  `;
  let reviews = 12345;
  let rate: RateType = 4.5;
  let locationRate = 9.7;
  return (
    <>
      <main className="main-wrapper">
        <section className="left">
          <div className="site-icon--wrapper">
            <img
              src={require("../../assets/images/app-logo.jpg")}
              alt="app logo"
              height={50}
              width={50}
              style={{ borderRadius: "50%" }}
            />
            <p>HostelBook</p>
          </div>
          <Link className="list-property--container" to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              color="#000000"
              fill="none"
            >
              <path
                d="M12 8V16M16 12L8 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            <p>List your property</p>
          </Link>

          <div className="side-bar-wrapper" ref={elementRef}>
            <SideBar />
            <div className="contacts-btns">
              <button title="Call available hostels managers">
                <IoCall />
              </button>
              <button title="Real time chat with hostels managers">
                <GrSend />
              </button>
            </div>
          </div>
          {!isInView && (
            <div className="side-bar-wrapper--sticky">
              <SideBar />
              <div className="contacts-btns">
                <button title="Call available hostels managers">
                  <IoCall />
                </button>
                <button title="Real time chat with hostels managers">
                  <GrSend />
                </button>
              </div>
            </div>
          )}
        </section>
        <section className="right">
          <NavBar />
          <div className="hostel-name-count">
            <p>Hostel name</p>
            <p>369 properties</p>
          </div>
          <div className="display-wrapper">
            {imgFormats.map((imgFormat, i) => (
              <DisplayHostels
                imgUrl={require(`../../assets/images/hostel-${
                  i + 1
                }.${imgFormat}`)}
                name={name}
                stars={star}
                street={street}
                distance={distance}
                remark={remark}
                description={description}
                reviews={reviews}
                rate={rate}
                locationRate={locationRate}
                key={i}
              />
            ))}
          </div>
          <div className="sort-filter-bar">
            <button className="sort-icon--wrapper">
              <TbArrowsUpDown />
              <p>Sort</p>
            </button>
            <button className="filter-icon--wrapper">
              <CiFilter />
              <p>Filter</p>
            </button>
            <div className="filter-options">
              <select
                className="location-selection"
                value={location}
                onChange={({ target }) => setLocation(target?.value)}
              >
                <option value="" disabled>
                  Location
                </option>
                <option value="priceLow">Price (Low-High)</option>
                <option value="priceHigh">Price (High-Low)</option>
                <option value="RatingHigh">Rating (High-Low)</option>
                <option value="RatingLow">Rating (Low-High)</option>
                <option value="alphabeticalOrder">Alphabetical order</option>
              </select>

              <select
                className="price-selection"
                value={price}
                onChange={({ target }) => setPrice(target?.value)}
              >
                <option value="" disabled>
                  Price range
                </option>
                <option value="price13">&cent;1,000-&cent;3,000</option>
                <option value="price35">&cent;3,000-&cent;5,000</option>
                <option value="price57">&cent;5,000-&cent;7,000</option>
                <option value="price79">&cent;7,000-&cent;9,000</option>
                <option value="price910">&cent;9,000-&cent;11,000</option>
                <option value="price1012">&cent;11,000-&cent;13,000</option>
                <option value="price1215">&cent;13,000-&cent;15,000</option>
              </select>

              <select
                className="area-selection"
                value={area}
                onChange={({ target }) => setArea(target?.value)}
              >
                <option value="" disabled>
                  Area,km
                </option>
                <option value="area13">1 - 3</option>
                <option value="area35">3 - 5</option>
                <option value="area57">5 - 7</option>
                <option value="area79">7 - 9</option>
                <option value="area97">9 - 11</option>
                <option value="area1113">11 - 13</option>
                <option value="area1315">13 - 15</option>
              </select>

              <select
                className="rooms-selection"
                value={rooms}
                onChange={({ target }) => setRooms(target?.value)}
              >
                <option value="" disabled>
                  Rooms
                </option>
                <option value="room1">1 in a room</option>
                <option value="room2">2 in a room</option>
                <option value="room3">3 in a room</option>
                <option value="room4">4 in a room</option>
                <option value="room5">5 in a room</option>
                <option value="room6">6 in a room</option>
                <option value="room7">7 in a room</option>
                <option value="room8">8 in a room</option>
              </select>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomeNewLook;
