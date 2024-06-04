import React, { useEffect, useRef, useState, useCallback } from "react";
import { Map, AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Marker } from "@googlemaps/markerclusterer";
import trees from "../data/trees";

const Intro = () => {
  const position: google.maps.LatLngLiteral = { lat: 43.64, lng: -79.41 };
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Map
        // zoom={10}
        defaultZoom={10}
        center={position}
        mapId={process.env.REACT_APP_GOOGLE_MAP_ID}
      >
        <Markers points={trees} />
      </Map>
    </div>
  );
};

type Point = google.maps.LatLngLiteral & { key: string };
type Prop = { points: Point[] };

const Markers = ({ points }: Prop) => {
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
  }, [markers]);

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
      {points.map((point) => (
        <AdvancedMarker
          position={point}
          key={point.key}
          ref={(marker) => setMarkerRef(marker, point.key)}
        >
          <span style={{ fontSize: "2rem" }}>🌳</span>
        </AdvancedMarker>
      ))}
    </>
  );
};
export default Intro;
