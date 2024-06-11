import React, { useState, useRef, useEffect } from "react";
import "./DisplayHostels.css";
import { RiHeartAdd2Line } from "react-icons/ri";
import starRate from "../../utils/starRate";
import { Sparkles } from "lucide-react";
import { BedSingle } from "lucide-react";
import { Coffee } from "lucide-react";
import { Soup } from "lucide-react";
import { Utensils } from "lucide-react";
import { ShoppingBag } from "lucide-react";
import { Wifi } from "lucide-react";
import { LocateFixed } from "lucide-react";

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
}: hostelDetailsProp) => {
  const [isSave, setIsSave] = useState<boolean>(false);
  const iconRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    (iconRef.current as HTMLButtonElement).addEventListener("click", (e) => {
      e.preventDefault();
      setIsSave(!isSave);

      console.log(e.target);
    });
  }, [isSave]);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = icon;
  };

  const handleUserProfile = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = require(`../../assets/images/altHostel-1.jpg`);
  };

  return (
    <>
      <div className="displayHostelContainer">
        <div className="hostelInfoWrapper">
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
              <p className="hostel-ratings">{starRate({ rating: rate })}</p>
              <p
                style={{ marginTop: "10px", marginBottom: "10px" }}
                className="hostel-address"
              >
                <a href="/">{full_address}</a>
              </p>

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
              <div className="showOnMap">
                <LocateFixed size={35} color="#64766a" />
                <a className="show-location" href="/">
                  Show on map
                </a>
              </div>
              <div className="userReview">
                <div className="testimony">
                  <div className="userPic">
                    <img
                      src={
                        user_review.profile_photo_url
                          ? user_review.profile_photo_url
                          : `../../assets/images/altHostel-${Math.floor(
                              Math.random() * (7 - 1) + 1
                            )}.jpg`
                      }
                      alt="user profile"
                      className="userProfile"
                      onError={handleUserProfile}
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
