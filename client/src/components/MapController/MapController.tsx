import React from "react";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { setRoutesIndex } from "../../store/features/mapRoutesIndexSlice";
import { setCollegeNames } from "../../store/features/mapCollegeNamesSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setCollegePosition } from "../../store/features/mapCollegeLocationsSlice";
import { setTravelModes } from "../../store/features/mapTraveModesSlice";

const MapController = () => {
  const mapRoutes = useSelector((state: RootState) => state.routes.routes);
  const mapRoutesIndex = useSelector(
    (state: RootState) => state.routesIndex.setRouteIndex
  );
  const mapCollegeNames = useSelector(
    (state: RootState) => state.collegeNames.college
  );
  const mapCollegePositions = useSelector(
    (state: RootState) => state.collegePosition.position
  );
  const mapCollegeDestination = useSelector(
    (state: RootState) => state.collegeDestination.destination
  );
  const mapTravelMode = useSelector(
    (state: RootState) => state.travelMode.travelMode
  );
  const dispatch = useDispatch<AppDispatch>();

  const selected = mapRoutes.at(mapRoutesIndex);
  const leg = selected?.legs.at(0);

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [lat, lng] = e.target.value.split(",").map(Number);
    const position = {
      lat,
      lng,
    };

    dispatch(setCollegePosition({ position }));
    dispatch(setCollegeNames(e.target?.selectedOptions[0]?.text));
  };

  return (
    <div
      style={{
        height: "100%",
        width: "20%",
        backgroundColor: "#04125c",
        display: "flex",
        flexDirection: "column",
        color: "white",
        alignItems: "flex-start",
        padding: "10px",
        borderRadius: "0px 60px 25px 0px",
        gap: "5px",
      }}
    >
      <h4>{selected?.summary}</h4>
      <p>
        Distance:{" "}
        {leg?.distance?.text ? leg?.distance?.text : "Not available 😞"}
      </p>
      <p>
        Duration:{" "}
        {leg?.duration?.text ? leg?.duration?.text : "Not available 😞"}
      </p>
      <h2>Other routes:</h2>
      <menu
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "5px",
          marginTop: "1rem",
        }}
      >
        {mapRoutes.map((route, index) => (
          <button
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(setRoutesIndex(index))}
            key={index}
          >
            <li key={route?.summary}>
              {route?.summary
                ? route?.summary
                : `Alternative route ${index + 1}`}
            </li>
          </button>
        ))}
      </menu>

      <h2 style={{ marginTop: "1rem" }}>Select college:</h2>
      <select
        value={`${mapCollegePositions.lat},${mapCollegePositions.lng}`}
        onChange={handleLocationChange}
      >
        <option value="6.6732,-1.5674">college of science</option>
        <option value="6.673175,-1.565423">college of engineering</option>
        <option value="6.6774,-1.5647">
          college of agriculture and natural resources
        </option>
        <option value="6.6743,-1.5648">
          college of art and built environment
        </option>
        <option value="6.6665,-1.5687">
          college of humanities and social sciences
        </option>
        <option value="6.6722,-1.5685">college of health sciences</option>
      </select>

      <h2 style={{ marginTop: "1rem" }}>Mode of Transport:</h2>
      <select
        value={mapTravelMode}
        onChange={({ target }) => {
          dispatch(
            setTravelModes({
              travelMode:
                target?.value.trim().toLowerCase() === "driving"
                  ? "DRIVING"
                  : "WALKING",
            })
          );
        }}
      >
        <option value="DRIVING">Driving</option>
        <option value="WALKING">Walking</option>
      </select>

      <h2 style={{ marginTop: "2rem" }}>Origin - Destination:</h2>
      <p
        style={{
          textTransform: "capitalize",
          fontWeight: "bold",
        }}
      >
        {`From "${mapCollegeNames}"`} &mdash; {`"${mapCollegeDestination}"`}
      </p>
    </div>
  );
};
export default MapController;
