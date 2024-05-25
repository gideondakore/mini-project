import React, { useRef } from "react";
import "./CheckBoxFilters.css";
import useInViewport from "../../hooks/useInViewport";

const CheckBoxFilters = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const isInView = useInViewport(elementRef, { threshold: 0.0 });

  return (
    <div className="filtersWrapper" ref={elementRef}>
      <div className="showMap">
        <button>Show on map</button>
      </div>
      <div className="filterBy">
        <p>Filter by:</p>
      </div>

      <div className="filterContainer">
        <p>Popular filter</p>
        <p>
          <input
            type="checkbox"
            id="apartment"
            name="apartment"
            value="apartment"
          />
          <label className="filterLabel" htmlFor="apartment">
            Apartment
          </label>
        </p>
        <p>
          <input
            type="checkbox"
            id="free-wifi"
            name="free-wifi"
            value="free-wifi"
          />
          <label className="filterLabel" htmlFor="free-wifi">
            Free WiFi
          </label>
        </p>
        <p>
          <input type="checkbox" id="ac" name="ac" value="ac" />
          <label className="filterLabel" htmlFor="ac">
            Air conditioning
          </label>
        </p>
        <p>
          <input
            type="checkbox"
            id="five-star"
            name="five-star"
            value="five-star"
          />
          <label className="filterLabel" htmlFor="five-star">
            5 star
          </label>
        </p>
      </div>

      <div className="filterContainer">
        <p>Facilities</p>
        <p>
          <input type="checkbox" id="parking" name="parking" value="parking" />
          <label className="filterLabel" htmlFor="parking">
            Parking
          </label>
        </p>
        <p>
          <input
            type="checkbox"
            id="free-wifi"
            name="free-wifi"
            value="free-wifi"
          />
          <label className="filterLabel" htmlFor="free-wifi">
            Free WiFi
          </label>
        </p>
        <p>
          <input type="checkbox" id="ac" name="ac" value="ac" />
          <label className="filterLabel" htmlFor="ac">
            Air conditioning
          </label>
        </p>
        <p>
          <input
            type="checkbox"
            id="room-service"
            name="room-service"
            value="room-service"
          />
          <label className="filterLabel" htmlFor="room-service">
            Room service
          </label>
        </p>
        <p>
          <input
            type="checkbox"
            id="fitness-center"
            name="fitness-center"
            value="fitness-center"
          />
          <label className="filterLabel" htmlFor="fitness-center">
            Fitness centre
          </label>
        </p>

        <p>
          <input
            type="checkbox"
            id="wheelchair"
            name="wheelchair"
            value="wheelchair"
          />
          <label className="filterLabel" htmlFor="wheelchair">
            Wheelchair accessible
          </label>
        </p>
      </div>

      <div className="filterContainer">
        <p>Property type</p>
        <p>
          <input
            type="checkbox"
            id="apartment"
            name="apartment"
            value="apartment"
          />
          <label className="filterLabel" htmlFor="apartment">
            Apartment
          </label>
        </p>
        <p>
          <input
            type="checkbox"
            id="homestel"
            name="homestel"
            value="homestel"
          />
          <label className="filterLabel" htmlFor="homestel">
            Homestel
          </label>
        </p>
        <p>
          <input type="checkbox" id="hostel" name="hostel" value="hostel" />
          <label className="filterLabel" htmlFor="ac">
            Hostel
          </label>
        </p>
      </div>

      <div className="filterContainer">
        <p>Propert rating</p>
        <p style={{ fontSize: "0.9rem", fontWeight: "normal" }}>
          Find high-quality hostel
        </p>
        <p>
          <input
            type="checkbox"
            id="one-star"
            name="one-star"
            value="one-star"
          />
          <label className="filterLabel" htmlFor="one-star">
            1 star
          </label>
        </p>
        <p>
          <input
            type="checkbox"
            id="two-star"
            name="two-star"
            value="two-star"
          />
          <label className="filterLabel" htmlFor="two-star">
            2 star
          </label>
        </p>
        <p>
          <input
            type="checkbox"
            id="three-star"
            name="three-star"
            value="three-star"
          />
          <label className="filterLabel" htmlFor="three-star">
            3 star
          </label>
        </p>
        <p>
          <input
            type="checkbox"
            id="four-star"
            name="four-star"
            value="four-star"
          />
          <label className="filterLabel" htmlFor="four-star">
            4 star
          </label>
        </p>
        <p>
          <input
            type="checkbox"
            id="five-star"
            name="five-star"
            value="five-star"
          />
          <label className="filterLabel" htmlFor="five-star">
            5 star
          </label>
        </p>
        <p>
          <input type="checkbox" id="unrated" name="unrated" value="unrated" />
          <label className="filterLabel" htmlFor="unrated">
            Unrated
          </label>
        </p>
      </div>

      <div className="filterContainer">
        <p>Room facilities</p>
        <p>
          <input
            type="checkbox"
            id="private-bathroom"
            name="private-bathroom"
            value="private-bathroom"
          />
          <label className="filterLabel" htmlFor="private-bathroom">
            Private bathroom
          </label>
        </p>
        <p>
          <input type="checkbox" id="ac" name="ac" value="ac" />
          <label className="filterLabel" htmlFor="ac">
            Air Conditioning
          </label>
        </p>
        <p>
          <input type="checkbox" id="kitchen" name="kitchen" value="kitchen" />
          <label className="filterLabel" htmlFor="kitchen">
            Kitchen/Kitchenette
          </label>
        </p>
        <p>
          <input type="checkbox" id="shower" name="shower" value="shower" />
          <label className="filterLabel" htmlFor="shower">
            Shower
          </label>
        </p>
        <p>
          <input type="checkbox" id="kitchen" name="kitchen" value="kitchen" />
          <label className="filterLabel" htmlFor="kitchen">
            Kitchen/Kitchenette
          </label>
        </p>
        <p>
          <input type="checkbox" id="balcony" name="balcony" value="balcony" />
          <label className="filterLabel" htmlFor="balcony">
            Balcony
          </label>
        </p>
        <p>
          <input type="checkbox" id="kitchen" name="kitchen" value="kitchen" />
          <label className="filterLabel" htmlFor="kitchen">
            Kitchen/Kitchenette
          </label>
        </p>
        <p>
          <input
            type="checkbox"
            id="refrigerator"
            name="refrigerator"
            value="refrigerator"
          />
          <label className="filterLabel" htmlFor="refrigerator">
            Refrigerator
          </label>
        </p>
        <p>
          <input type="checkbox" id="kitchen" name="kitchen" value="kitchen" />
          <label className="filterLabel" htmlFor="kitchen">
            Kitchen/Kitchenette
          </label>
        </p>
        <p>
          <input type="checkbox" id="toilet" name="toilet" value="toilet" />
          <label className="filterLabel" htmlFor="toilet">
            Toilet
          </label>
        </p>
        <p>
          <input
            type="checkbox"
            id="accessible-room"
            name="accessible-room"
            value="accessible-room"
          />
          <label className="filterLabel" htmlFor="accessible-room">
            Accessible room
          </label>
        </p>
        <p>
          <input type="checkbox" id="tv" name="tv" value="tv" />
          <label className="filterLabel" htmlFor="tv">
            TV
          </label>
        </p>
        <p>
          <input type="checkbox" id="hot-tub" name="hot-tub" value="hot-tub" />
          <label className="filterLabel" htmlFor="hot-tub">
            Hot tub
          </label>
        </p>
        <p>
          <input type="checkbox" id="terrace" name="terrace" value="terrace" />
          <label className="filterLabel" htmlFor="terrace">
            Terrace
          </label>
        </p>
        <p>
          <input
            type="checkbox"
            id="toilet-paper"
            name="toilet-paper"
            value="toilet-paper"
          />
          <label className="filterLabel" htmlFor="toilet-paper">
            Toilet paper
          </label>
        </p>
        <p>
          <input type="checkbox" id="bath" name="bath" value="bath" />
          <label className="filterLabel" htmlFor="bath">
            Bath
          </label>
        </p>
      </div>

      <div className="filterContainer">
        <p>Distance from KNUST campus</p>
        <p>
          <input
            type="checkbox"
            id="less-one"
            name="less-one"
            value="less-one"
          />
          <label className="filterLabel" htmlFor="less-one">
            Less than 1 km
          </label>
        </p>
        <p>
          <input
            type="checkbox"
            id="less-three"
            name="less-three"
            value="less-three"
          />
          <label className="filterLabel" htmlFor="less-three">
            Less than 3 km
          </label>
        </p>
        <p>
          <input
            type="checkbox"
            id="less-five"
            name="less-five"
            value="less-five"
          />
          <label className="filterLabel" htmlFor="less-five">
            Less than 5 km
          </label>
        </p>
      </div>

      <div className="filterContainer">
        <p>Fun things to do</p>
        <p>
          <input
            type="checkbox"
            id="fitness-centre"
            name="fitness-centre"
            value="fitness-centre"
          />
          <label className="filterLabel" htmlFor="fitness-centre">
            Fitness centre
          </label>
        </p>
        <p>
          <input
            type="checkbox"
            id="table-tennis"
            name="table-tennis"
            value="table-tennis"
          />
          <label className="filterLabel" htmlFor="table-tennis">
            Table tennis
          </label>
        </p>
        <p>
          <input type="checkbox" id="snooker" name="snooker" value="snooker" />
          <label className="filterLabel" htmlFor="snooker">
            Snooker/pool
          </label>
        </p>
        <p>
          <input
            type="checkbox"
            id="video-game"
            name="video-game"
            value="video-game"
          />
          <label className="filterLabel" htmlFor="video-game">
            Video game
          </label>
        </p>
        <p>
          <input type="checkbox" id="ludo" name="ludo" value="ludo" />
          <label className="filterLabel" htmlFor="ludo">
            Ludo & Snake game
          </label>
        </p>
        <p>
          <input type="checkbox" id="checker" name="checker" value="checker" />
          <label className="filterLabel" htmlFor="checker">
            Checker
          </label>
        </p>
        <p>
          <input type="checkbox" id="chess" name="chess" value="chess" />
          <label className="filterLabel" htmlFor="chess">
            Chess
          </label>
        </p>
      </div>

      <div className="filterContainer">
        <p>Room accessibility</p>
        <p>
          <input
            type="checkbox"
            id="ground-floor"
            name="ground-floor"
            value="ground-floor"
          />
          <label className="filterLabel" htmlFor="ground-floor">
            Entire unit located on ground floor
          </label>
        </p>
        <p>
          <input
            type="checkbox"
            id="elevator"
            name="elevator"
            value="elevator"
          />
          <label className="filterLabel" htmlFor="elevator">
            Upper floors accessible by elevator
          </label>
        </p>
        <p>
          <input
            type="checkbox"
            id="wheelchair"
            name="wheelchair"
            value="wheelchair"
          />
          <label className="filterLabel" htmlFor="wheelchair">
            Entire unit wheelchair accessible
          </label>
        </p>
        <p>
          <input
            type="checkbox"
            id="showerchair"
            name="showerchair"
            value="showerchair"
          />
          <label className="filterLabel" htmlFor="showerchair">
            Shower chair
          </label>
        </p>
        <p>
          <input
            type="checkbox"
            id="emergency-cord"
            name="emergency-cord"
            value="emergency-cord"
          />
          <label className="filterLabel" htmlFor="emergency-cord">
            Emergency cord in bathroom
          </label>
        </p>
      </div>

      {!isInView && (
        <div className="filterContainer-sticky">
          <p>Popular filter</p>
          <p>
            <input
              type="checkbox"
              id="apartment"
              name="apartment"
              value="apartment"
            />
            <label className="filterLabel" htmlFor="apartment">
              Apartment
            </label>
          </p>
          <p>
            <input
              type="checkbox"
              id="free-wifi"
              name="free-wifi"
              value="free-wifi"
            />
            <label className="filterLabel" htmlFor="free-wifi">
              Free WiFi
            </label>
          </p>
          <p>
            <input type="checkbox" id="ac" name="ac" value="ac" />
            <label className="filterLabel" htmlFor="ac">
              Air conditioning
            </label>
          </p>
          <p>
            <input
              type="checkbox"
              id="five-star"
              name="five-star"
              value="five-star"
            />
            <label className="filterLabel" htmlFor="five-star">
              5 star
            </label>
          </p>
        </div>
      )}
    </div>
  );
};

export { CheckBoxFilters };
