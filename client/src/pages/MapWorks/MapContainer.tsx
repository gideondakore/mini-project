import React from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import HostelMap from "./hostelMap/HostelMap";
import MapController from "../../components/MapController/MapController";

const MapContainer = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100dvh",
        width: "100%",
      }}
    >
      <MapController />
      <APIProvider
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}
        region="GH"
      >
        <HostelMap />
      </APIProvider>
    </div>
  );
};

export default MapContainer;
