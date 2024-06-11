import React, { useRef } from "react";
import { CiSearch } from "react-icons/ci";
import "./SearchAreaInput.css";
import formattedDataForMap from "../../pages/MapWorks/hostelMap/data/hostelLocations";
import { useHostelSearchInput } from "../../context/HostelSearchInputContext";
const SearchAreaInput = () => {
  const inputRef = useRef<HTMLInputElement>(null!);

  const { setSearchInput } = useHostelSearchInput();

  return (
    <>
      <div className="hostelFilterByAreaNameContainer">
        <CiSearch
          style={{
            fontSize: "2rem",
            color: "#050315",
          }}
        />
        <input
          ref={inputRef}
          className="hostelFilterByAreaName"
          type="text"
          placeholder="Search Duplex"
          onChange={({ target }) => setSearchInput(target?.value)}
          list="hostel-available"
        />
      </div>
      <datalist id="hostel-available">
        {formattedDataForMap.map((hostel, index) => (
          <option key={index} value={hostel.name}></option>
        ))}
      </datalist>
    </>
  );
};

export default SearchAreaInput;
