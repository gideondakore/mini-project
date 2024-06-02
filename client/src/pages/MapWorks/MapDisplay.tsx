import React, { useEffect } from "react";
import { Map, useMap } from "@vis.gl/react-google-maps";

function MapDisplay() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    console.log(map);
  }, [map]);
  return (
    <div>
      <Map
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={{ lat: 6.6666, lng: 1.6163 }}
        defaultZoom={8}
        gestureHandling={"greedy"}
        disableDefaultUI={false}
      />
    </div>
  );
}

export default MapDisplay;
