import React, { useState } from "react";
import {
  Map,
  Pin,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";

function MapDisplay() {
  const position: google.maps.LatLngLiteral = {
    lat: 6.6745,
    lng: -1.5716,
  };

  const [open, setOpen] = useState<boolean>(false);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Map
        mapId={process.env.REACT_APP_GOOGLE_MAP_ID}
        // zoom={9}
        defaultZoom={14}
        center={position}
      >
        <AdvancedMarker position={position} onClick={() => setOpen(true)}>
          <Pin
            background={"grey"}
            borderColor={"green"}
            glyphColor={"purple"}
          />
        </AdvancedMarker>
        {open && (
          <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
            <p>Welcome to KNUST main Campus </p>
          </InfoWindow>
        )}
      </Map>
    </div>
  );
}

export default MapDisplay;

// defaultCenter={coordinates}
// defaultZoom={14}
// gestureHandling={"greedy"}
// disableDefaultUI={false}
//style={{ width: "100vw", height: "100vh" }}
