import React, { useCallback, useEffect, useRef, useState } from "react";
import formattedDataForMap from "./data/hostelLocations";

import {
  Map,
  InfoWindow,
  AdvancedMarker,
  useMap,
} from "@vis.gl/react-google-maps";
import knustLogoDark from "../../../assets/images/knust-logo.jpeg";
import knustLogoLight from "../../../assets/images/KnustLogo.png";

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

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  });
  const setMarkerRef = useCallback(
    (marker: Marker | null, key: string) => {
      if (marker && markers[key]) return;
      if (!marker && !markers[key]) return;

      setMarkers((prev) => {
        if (marker) {
          return { ...prev, [key]: marker };
        } else {
          const newMarker = { ...prev };
          delete newMarker[key];
          return newMarker;
        }
      });
    },
    [markers]
  );

  return (
    <>
      {points.map((point, index) => (
        <AdvancedMarker
          position={point}
          onClick={() => setOpen(true)}
          key={point.key}
          ref={(marker) => setMarkerRef(marker, point.key)}
        ></AdvancedMarker>
      ))}

      <AdvancedMarker position={position} onClick={() => setOpen(true)}>
        <img
          src={knustLogoDark}
          alt="logo"
          height={70}
          width={30}
          style={{
            borderRadius: "10px 10px 50% 50%",
          }}
        />
      </AdvancedMarker>
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
            <img src={knustLogoLight} alt="logo" height={30} width={30} />
          </div>
        </InfoWindow>
      )}
    </>
  );
};
export default HostelMap;
