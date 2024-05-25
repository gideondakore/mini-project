import React, { useState } from "react";
import { TbArrowsUpDown } from "react-icons/tb";
import { CiFilter } from "react-icons/ci";
import "./ComprehensiveSearch.css";

const ComprehensiveSearch = () => {
  const [location, setLocation] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [rooms, setRooms] = useState<string>("");

  return (
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
  );
};

export default ComprehensiveSearch;
