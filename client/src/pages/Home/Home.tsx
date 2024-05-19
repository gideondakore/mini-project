import React from "react";
import "./Home.css";
import { CheckBoxFilters } from "../../components";
import { DisplayHostels } from "../../components";
import { StarType, RemarkType, RateType } from "../../components";
// import hostelTwo from "../../assets/images/hostel-2.webp";

const Home = () => {
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
    <main className="home">
      <section className="left">
        <CheckBoxFilters />
      </section>
      <section className="right">
        <p className="hostel-total">Total: 30 hostels found</p>
        <div className="sortedByContainer">
          <span>Sorted by:</span>
          <select>
            <option value="top-picks">Our top picks</option>
            <option value="hostel-apartment">Hostels & apartment first</option>
            <option value="rating-high">Property rating (high to low)</option>
            <option value="rating-low">Property rating (low to high)</option>
            <option value="distance">Distance from KNUST campus</option>
            <option value="reviewed">Top reviewed</option>
          </select>
        </div>
        {imgFormats.map((imgFormat, i) => (
          <DisplayHostels
            imgUrl={require(`../../assets/images/hostel-${i + 1}.${imgFormat}`)}
            name={name}
            stars={star}
            street={street}
            distance={distance}
            remark={remark}
            description={description}
            reviews={reviews}
            rate={rate}
            locationRate={locationRate}
          />
        ))}
      </section>
    </main>
  );
};

export default Home;
