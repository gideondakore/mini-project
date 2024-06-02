import React from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import MapDisplay from "./MapDisplay";

const MapContainer = () => {
  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}>
      <MapDisplay />
    </APIProvider>
  );
};

export default MapContainer;
