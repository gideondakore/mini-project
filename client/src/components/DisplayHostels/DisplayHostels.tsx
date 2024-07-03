import React, { useState, useRef, useEffect } from "react";
import "./DisplayHostels.css";
import { RiHeartAdd2Line } from "react-icons/ri";
import starRate from "../../utils/starRate";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sparkles,
  BedSingle,
  Coffee,
  Soup,
  Utensils,
  ShoppingBag,
  Home,
  Wifi,
  LocateFixed,
} from "lucide-react";

import { FaPersonWalking } from "react-icons/fa6";
import { IoIosTimer } from "react-icons/io";
import hostelsDetailData from "../../pages/MapWorks/hostelMap/data/HostelsDetailData.json";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { setHostelsDetailData } from "../../store/features/hostelDetailDataSlice";

interface hostelDetailsProp {
  imgUrl: string;
  name: string;
  full_address: string;
  remark: string;
  reviews: number;
  rate: number;
  icon: string;
  categories: string[];
  user_review: { author_name: string; profile_photo_url: string; text: string };
  distance: string;
  duration: string;
  lat: string;
  lng: string;
}

const DisplayHostels = ({
  imgUrl,
  name,
  full_address,
  remark,
  reviews,
  rate,
  icon,
  categories,
  user_review,
  distance,
  duration,
  lat,
  lng,
}: hostelDetailsProp) => {
  const [isSave, setIsSave] = useState<boolean>(false);
  const iconRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    (iconRef.current as HTMLButtonElement).addEventListener("click", (e) => {
      e.preventDefault();
      setIsSave(!isSave);
    });
  }, [isSave]);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = icon;
  };

  // const handleUserProfile = (
  //   event: React.SyntheticEvent<HTMLImageElement, Event>
  // ) => {
  //   event.currentTarget.src = require(`../../assets/images/altHostel-1.jpg`);
  // };

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const handleShowMap = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    event.stopPropagation();

    navigate(`${location.pathname}map?lat=${lat}&lng=${lng}&name=${name}`);
  };

  const handleDisplayContainer = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const targetName = name;

    type FormattedHostelsData = {
      name: string;
      fulladdr: string;
      categories: string[];
      photos?: string[] | undefined;
      distance: { text: string; value: number };
      duration: { text: string; value: number };
      lat: number;
      lng: number;
      rating: number | null;
      reviews: number | null;
      reviews_by_person?: Array<{ [key: string]: string | number }>;
      user_ratings_total?: number;
      vicinity: string;
      formatted_address: string;
      icons: string;
    };

    const hostel = hostelsDetailData.find(
      (hostel) => hostel.name === targetName
    );

    if (hostel) {
      const hostelsData: FormattedHostelsData = {
        name: hostel.name,
        fulladdr: hostel.fulladdr,
        categories: hostel.categories,
        photos: hostel.photos as string[],
        distance: hostel.distance,
        duration: hostel.duration,
        lat: hostel.lat,
        lng: hostel.lng,
        rating: hostel.rating,
        reviews: hostel.reviews,
        reviews_by_person: hostel.reviews_by_person as Array<{
          [key: string]: string | number;
        }>,
        user_ratings_total: hostel.user_ratings_total,
        vicinity: hostel.vicinity,
        formatted_address: hostel.formatted_address,
        icons: hostel.icon,
      };

      dispatch(setHostelsDetailData(hostelsData));
    } else {
      console.error("Hostel not found");
    }

    window.location.href = "http://localhost:3000/hostel-details";
  };

  return (
    <>
      <div className="displayHostelContainer">
        <div className="hostelInfoWrapper" onClick={handleDisplayContainer}>
          <div className="imageContainer">
            <a href="/" className="imageBody">
              <img
                src={imgUrl}
                alt="hostel pic"
                className="hostelImage"
                onError={handleImageError}
              />
              <button
                type="button"
                className="save-btn"
                title="save"
                ref={iconRef}
              >
                <RiHeartAdd2Line
                  size={40}
                  color="black"
                  style={{
                    position: "absolute",
                    top: "5%",
                    left: "75%",
                    backgroundColor: isSave ? "#eb34e1" : "#ffff",
                    padding: "5px",
                    borderRadius: "50%",
                    zIndex: "1000",
                  }}
                />
              </button>
            </a>
          </div>
          <div className="hostelInfo">
            <div className="hostelInfo-info">
              <p className="hostel-name">{name}</p>
              {/*  */}

              <div className="hostel-ratings-reviews">
                <p className="hostel-ratings">{starRate({ rating: rate })}</p>
                <div className="ratingsReviews">
                  <div className="sparkleRating">
                    <Sparkles size={35} />
                    <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                      {rate ? rate.toFixed(1) : 1.0}/5
                    </p>
                  </div>
                  <div className="remarkRate">
                    <p style={{ fontWeight: "bold" }}>
                      {remark ? remark : "Good"}
                    </p>
                    <p>({reviews ? reviews.toLocaleString() : 0} reviews)</p>
                  </div>
                </div>
              </div>
              <p className="hostel-address">
                <a href="/">{full_address}</a>
              </p>

              <div className="distace-duration">
                <div className="distanceContainer">
                  <FaPersonWalking size={30} />
                  <p>Distance: {distance}</p>
                </div>
                <div className="durationContainer">
                  <IoIosTimer size={30} />
                  <p>Duration: {duration}</p>
                </div>
              </div>
              <div className="showOnMap">
                <LocateFixed size={35} color="#64766a" />
                <Link
                  className="show-location"
                  to={`http://locahost:3000/map/?lat=${lat}&lng=${lng}`}
                  onClick={handleShowMap}
                >
                  Show on map
                </Link>
              </div>
              <div className="userReview">
                <div className="testimony">
                  <div className="userPic">
                    <img
                      src={
                        user_review.profile_photo_url
                        // ? user_review.profile_photo_url
                        // : `../../assets/images/altHostel-${Math.floor(
                        //     Math.random() * (7 - 1) + 1
                        //   )}.jpg`
                      }
                      alt="user profile"
                      className="userProfile"
                      // onError={handleUserProfile}
                    />
                  </div>
                  <div className="userInfo">
                    <p className="userText">{user_review.text}</p>
                    <p className="userName">{user_review.author_name}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hostelInfo-review">
              <div className="hostelInfo-review--rate">
                <h2 style={{ height: "10%" }}>Services Include</h2>
                <ul className="serviceInclude">
                  {categories.map((category, index) => {
                    return (
                      <li key={index}>
                        {category.toLowerCase().includes("hostel") && (
                          <div>
                            <BedSingle size={30} />
                            <p>{category}</p>
                          </div>
                        )}
                        {category.toLowerCase().includes("coffee") && (
                          <div>
                            <Coffee size={30} />
                            <p>{category}</p>
                          </div>
                        )}
                        {category
                          .toLowerCase()
                          .includes("lunch restaurant") && (
                          <div>
                            <Soup size={30} />
                            <p>{category}</p>
                          </div>
                        )}
                        {category.toLowerCase() === "restaurant" && (
                          <div>
                            <Utensils size={30} />
                            <p>{category}</p>
                          </div>
                        )}
                        {category.toLowerCase().includes("store") && (
                          <div>
                            <ShoppingBag size={30} />
                            <p>{category}</p>
                          </div>
                        )}
                        {category.toLowerCase().includes("boarding") && (
                          <div>
                            <Home size={30} />
                            <p>{category}</p>
                          </div>
                        )}
                        {category.toLowerCase().includes("wi-fi") && (
                          <div>
                            <Wifi size={30} />
                            <p>{category}</p>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <button type="button" className="show-price--btn">
                Show price &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayHostels;
