import React, { SetStateAction, useState } from "react";
import { TbArrowsUpDown } from "react-icons/tb";
import { CiFilter } from "react-icons/ci";
import "./ComprehensiveSearch.css";
// import { useSearchParams } from "react-router-dom";
import type { ComprehensiveSearchprop } from "../../pages/Home/Home";

const ComprehensiveSearch = ({
  Filter,
  handleComprehensiveSearch,
  setComprehensiveSearchArray,
}: {
  Filter: (newData: string, serviceName: string, serviceText: string) => void;
  handleComprehensiveSearch: (isClicked: string) => void;
  setComprehensiveSearchArray: React.Dispatch<
    SetStateAction<Array<ComprehensiveSearchprop>>
  >;
}) => {
  const [location, setLocation] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [rooms, setRooms] = useState<string>("");

  const handleSelectionClick = (
    e: React.ChangeEvent<HTMLSelectElement>,
    kind: string
  ) => {
    // setSearchParams(
    //   {
    //     search_type: kind,
    //     service_name: e?.target.value,
    //     service_name_text: e?.currentTarget.selectedOptions[0]?.text,
    //   },
    //   { replace: true }
    // );

    const service_type = kind;
    const service_name = e?.target.value;
    const service_name_text = e?.currentTarget.selectedOptions[0]?.text;
    Filter(service_type, service_name, service_name_text);
    setComprehensiveSearchArray((prev) => {
      if (service_name.includes("price")) return prev;
      const updatedArray = prev.filter(
        (service) => service.service_type !== service_type
      );

      return [
        ...updatedArray,
        { service_type, service_name, service_name_text },
      ];
    });
  };

  return (
    <div className="sort-filter-bar">
      <button
        className="sort-icon--wrapper"
        type="button"
        onClick={() => handleComprehensiveSearch("sort")}
      >
        <TbArrowsUpDown />
        <p>Sort</p>
      </button>
      <button
        className="filter-icon--wrapper"
        type="button"
        onClick={() => handleComprehensiveSearch("filter")}
      >
        <CiFilter />
        <p>Filter</p>
      </button>
      <div className="filter-options">
        <select
          className="location-selection"
          value={location}
          onChange={(e) => {
            setLocation(e.target?.value);
            handleSelectionClick(e, "location");
          }}
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
          onChange={(e) => {
            setPrice(e.target?.value);
            handleSelectionClick(e, "price");
          }}
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
          onChange={(e) => {
            setArea(e.target?.value);
            handleSelectionClick(e, "distance_multi");
          }}
        >
          <option value="" disabled>
            Area,km
          </option>
          <option value="area01">0-1</option>
          <option value="area13">1-3</option>
          <option value="area35">3-5</option>
          <option value="area57">5-7</option>
          <option value="area79">7-9</option>
          <option value="area97">9-11</option>
        </select>

        <select
          className="rooms-selection"
          value={rooms}
          onChange={(e) => {
            setRooms(e.target?.value);
            handleSelectionClick(e, "room");
          }}
        >
          <option value="" disabled>
            Rooms
          </option>
          <option value="room1">1 in a room</option>
          <option value="room2">2 in a room</option>
          <option value="room3">3 in a room</option>
          <option value="room4">4 in a room</option>
        </select>
      </div>
    </div>
  );
};

export default ComprehensiveSearch;
