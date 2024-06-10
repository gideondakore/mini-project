import React, { useRef } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import {
  SideBar,
  DisplayHostels,
  // StarType,
  // RemarkType,
  // RateType,
  ComprehensiveSearch,
} from "../../components";
import { IoCall } from "react-icons/io5";
import { GrSend } from "react-icons/gr";
import NavBar from "../../layouts/NavBar";
import useInViewport from "../../hooks/useInViewport";
// import MainHostelDisplay from "../../components/MainHostelDisplay/MainHostelDisplay";

import formattedDataForMap from "../../pages/MapWorks/hostelMap/data/hostelLocations";
import hostelDetailsJson from "../../pages/MapWorks/hostelMap/data/detailMapData.json";

const Home = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const isInView = useInViewport(elementRef, { threshold: 0.0 });

  const Remarks = ["Fair", "Good", "Very good", "Excellent", "Superb"] as const;

  const remarks = (index: number) => {
    switch (true) {
      case index <= 1 && index >= 0:
        return Remarks.at(1);
      case index <= 2 && index >= 1:
        return Remarks.at(2);
      case index <= 3 && index >= 2:
        return Remarks.at(3);
      case index <= 4 && index >= 3:
        return Remarks.at(4);
      case index <= 5 && index >= 4:
        return Remarks.at(5);
      default:
        return Remarks.at(1);
    }
  };

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
            <p>Duplex</p>
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
            <p>Duplex</p>
            <p>{hostelDetailsJson.length} properties</p>
          </div>
          <div className="display-wrapper">
            {hostelDetailsJson.map((hostel, index) => {
              return (
                <DisplayHostels
                  key={index}
                  imgUrl={formattedDataForMap.at(index)?.thumbnail as string}
                  name={hostel.name}
                  full_address={
                    formattedDataForMap.at(index)?.fulladdr as string
                  }
                  remark={remarks(hostel.rating as number) as string}
                  reviews={hostel.user_ratings_total as number}
                  rate={hostel.rating as number}
                  icon={hostel.icon}
                />
              );
            })}
          </div>
          <ComprehensiveSearch />
        </section>
        {/* <MainHostelDisplay /> */}
      </main>
    </>
  );
};

export default Home;
