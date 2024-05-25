import React, { useRef } from "react";
import { CiSearch } from "react-icons/ci";
import "./SearchAreaInput.css";

const SearchAreaInput = () => {
  const inputRef = useRef<HTMLInputElement>(null!);

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
          placeholder="Filter hostel by area name"
          list="areas-available"
        />
      </div>
      <datalist id="areas-available">
        <option value="Bomso"></option>
        <option value="Ayeduase"></option>
        <option value="Kotei"></option>
        <option value="Ayeduase New Site"></option>
        <option value="Boadi"></option>
        <option value="Boadi New Site"></option>
      </datalist>
    </>
  );
};

export default SearchAreaInput;
