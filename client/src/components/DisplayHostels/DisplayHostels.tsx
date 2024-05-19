import React, { useState, useRef, useEffect } from "react";
import "./DisplayHostels.css";
import { RiHeartAdd2Line } from "react-icons/ri";
import { IoMdStar } from "react-icons/io";

type HostelDetailsTypes =
  | { stars: 1 | 2 | 3 | 4 | 5 }
  | { remarks: "Fair" | "Good" | "Very good" | "Excellent" | "Superb" }
  | {
      rates:
        | 1.0
        | 1.1
        | 1.2
        | 1.3
        | 1.4
        | 1.5
        | 1.6
        | 1.7
        | 1.8
        | 1.9
        | 2.0
        | 2.1
        | 2.2
        | 2.3
        | 2.4
        | 2.5
        | 2.6
        | 2.7
        | 2.8
        | 2.9
        | 3.0
        | 3.1
        | 3.2
        | 3.3
        | 3.4
        | 3.5
        | 3.6
        | 3.7
        | 3.8
        | 3.9
        | 4.0
        | 4.1
        | 4.2
        | 4.3
        | 4.4
        | 4.5
        | 4.6
        | 4.7
        | 4.8
        | 4.9
        | 5.0
        | 5.1
        | 5.2
        | 5.3
        | 5.4
        | 5.5
        | 5.6
        | 5.7
        | 5.8
        | 5.9
        | 6.0
        | 6.1
        | 6.2
        | 6.3
        | 6.4
        | 6.5
        | 6.6
        | 6.7
        | 6.8
        | 6.9
        | 7.0
        | 7.1
        | 7.2
        | 7.3
        | 7.4
        | 7.5
        | 7.6
        | 7.7
        | 7.8
        | 7.9
        | 8.0
        | 8.1
        | 8.2
        | 8.3
        | 8.4
        | 8.5
        | 8.6
        | 8.7
        | 8.8
        | 8.9
        | 9.0
        | 9.1
        | 9.2
        | 9.3
        | 9.4
        | 9.5
        | 9.6
        | 9.7
        | 9.8
        | 9.9
        | 10.0;
    };

type ExtractStar<T> = T extends { stars: infer S } ? S : never;
export type StarType = ExtractStar<HostelDetailsTypes>;

type ExtractRemark<T> = T extends { remarks: infer R } ? R : never;
export type RemarkType = ExtractRemark<HostelDetailsTypes>;

type ExtractRate<T> = T extends { rates: infer R } ? R : never;
export type RateType = ExtractRate<HostelDetailsTypes>;

interface hostelDetailsProp {
  imgUrl: string;
  name: string;
  stars: StarType;
  street: string;
  distance: number;
  remark: RemarkType;
  description: string;
  reviews: number;
  rate: RateType;
  locationRate?: number;
}

const DisplayHostels = ({
  imgUrl,
  name,
  stars,
  street,
  distance,
  remark,
  description,
  reviews,
  rate,
  locationRate,
}: hostelDetailsProp) => {
  const [isSave, setIsSave] = useState<boolean>(false);
  const iconRef = useRef<HTMLButtonElement>(null);

  const star = (count: number) =>
    Array.from({ length: count }, (_, i) => (
      <IoMdStar key={i} size={25} color="orange" />
    ));

  useEffect(() => {
    (iconRef.current as HTMLButtonElement).addEventListener("click", (e) => {
      e.preventDefault();
      setIsSave(!isSave);

      console.log(e.target);
    });
  }, [isSave]);

  return (
    <>
      <div className="displayHostelContainer">
        <div className="hostelInfoWrapper">
          <div className="imageContainer">
            <a href="/" className="imageBody">
              <img
                src={imgUrl}
                alt="hostel pic"
                height={250}
                width={230}
                className="hostelImage"
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
              <p>
                {name}
                {star(stars)}
              </p>
              <p>
                <a href="/">{street}</a>
                <a href="/">Show on map</a>
                <span className="distance">
                  {distance} km from KNUST campus
                </span>
              </p>
              <p>{description}</p>
            </div>
            <div className="hostelInfo-review">
              <div className="hostelInfo-review--rate">
                <div>
                  <p style={{ fontWeight: "bold" }}> {remark} </p>
                  <pre>{reviews} reviews</pre>
                </div>
                <p
                  style={{
                    backgroundColor: "blue",
                    width: "20%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "10px 10px 10px 0px",
                    color: "white",
                  }}
                >
                  {rate}
                </p>
              </div>
              <a className="location-rate" href="/">
                Location {locationRate}
              </a>
              <button type="button" className="show-price--btn">
                Show price
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayHostels;
