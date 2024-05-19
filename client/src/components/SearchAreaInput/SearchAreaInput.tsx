import React, { useState, useRef } from "react";
import { FaSearchLocation } from "react-icons/fa";
import "./SearchAreaInput.css";

const SearchAreaInput = () => {
  const [focus, setFocus] = useState<boolean>(false);
  const [searchString, setSearchString] = useState<string>("");
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null!);

  const arr: string[] = ["Bomso", "Ayeduase", "Kotei", "New Site", "New City"];

  const handleFocus = () => {
    setFocus(true);
    (inputRef.current as HTMLElement).focus();
  };
  const handleBlur = () => {
    if (mouseOver) {
      setFocus(true);
    } else {
      setFocus(false);
    }
  };

  return (
    <>
      <div className="hostelFilterByAreaNameContainer">
        <FaSearchLocation
          style={{
            fontSize: "2rem",
            color: "#222f36",
          }}
        />
        <input
          ref={inputRef}
          className="hostelFilterByAreaName"
          type="text"
          placeholder="Filter hostel by area name"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
        />
      </div>
      <div
        className="availableAreasContainer"
        style={focus ? { display: "block" } : { display: "none" }}
        onMouseLeave={() => {
          setMouseOver(false);
          handleBlur();
        }}
      >
        <ul className="availableAreas">
          {arr.map(
            (el, index) =>
              el.toLocaleLowerCase().includes(searchString) && (
                <li
                  key={index}
                  className="area"
                  style={
                    index % 2 === 0
                      ? { backgroundColor: "#222f36", color: "#d9f1e1" }
                      : { backgroundColor: "#d9f1e1", color: "#222f36" }
                  }
                  onMouseOver={() => {
                    setMouseOver(true);
                  }}
                  onClick={({ target }) => {
                    if (mouseOver) {
                      setFocus(true);
                      handleFocus();
                      const searchStr = (target as HTMLElement).innerHTML;
                      (inputRef.current as HTMLInputElement).value = searchStr;
                    } else {
                      setFocus(false);
                      console.log(`Mouse Click Else Block Container ${focus}`);
                    }
                  }}
                >
                  {el}
                </li>
              )
          )}
        </ul>
      </div>
    </>
  );
};

export default SearchAreaInput;
