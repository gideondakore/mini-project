import React from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import HostelMap from "./hostelMap/HostelMap";

const MapContainer = () => {
  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}>
      <HostelMap />
    </APIProvider>
  );
};

export default MapContainer;
