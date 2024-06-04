import React from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
// import MapDisplay from "./MapDisplay";
// import Intro from "./markers/Markers";
// import MarkersSecond from "./markers/MarkersSecond";
// import Direction from "./directions/Direction";
import HostelMap from "./hostelMap/HostelMap";

const MapContainer = () => {
  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}>
      <HostelMap />
    </APIProvider>
  );
};

export default MapContainer;
