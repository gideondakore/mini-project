import React, { useEffect, useRef, useState } from "react";
import formattedDataForMap from "./data/hostelLocations";

import {
  Map,
  InfoWindow,
  AdvancedMarker,
  useMap,
} from "@vis.gl/react-google-maps";
import knustLogo from "../../../assets/images/KnustLogo.png";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Marker } from "@googlemaps/markerclusterer";

const HostelMap = () => {
  const position: google.maps.LatLngLiteral = { lat: 6.6745, lng: -1.5716 };
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Map
        mapId={process.env.REACT_APP_GOOGLE_MAP_ID}
        defaultZoom={14}
        center={position}
      >
        <Markers points={formattedDataForMap} />
      </Map>
    </div>
  );
};

type Point = google.maps.LatLngLiteral & { key: string };
type Prop = { points: Point[] };

const Markers = ({ points }: Prop) => {
  const [open, setOpen] = useState<boolean>(false);
  const position: google.maps.LatLngLiteral = { lat: 6.6745, lng: -1.5716 };
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  return (
    <>
      <div>
        <AdvancedMarker
          position={position}
          onClick={() => setOpen(true)}
        ></AdvancedMarker>
        {open && (
          <InfoWindow onCloseClick={() => setOpen(false)} position={position}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "15rem",
              }}
            >
              <h3>Kwame Nkrumah University of Science and Technology</h3>
              <p>Kumasi</p>
              <p>Ghana</p>
              <code>The Best University in Ghana</code>
              <img src={knustLogo} alt="logo" height={30} width={30} />
            </div>
          </InfoWindow>
        )}
      </div>
    </>
  );
};
export default HostelMap;
