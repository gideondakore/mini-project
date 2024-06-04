import { AdvancedMarker, Map, useMap } from "@vis.gl/react-google-maps";
import React, { useCallback, useEffect, useRef, useState } from "react";
import trees from "../data/trees";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Marker } from "@googlemaps/markerclusterer";

const MarkersSecond = () => {
  const position: google.maps.LatLngLiteral = { lat: 43.64, lng: -79.41 };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Map
        mapId={process.env.REACT_APP_GOOGLE_MAP_ID}
        defaultZoom={14}
        center={position}
      >
        <Markers points={trees} />
      </Map>
    </div>
  );
};

type Tree = google.maps.LatLngLiteral & { key: string };
type Prop = {
  points: Tree[];
};

const Markers = ({ points }: Prop) => {
  const map = useMap();
  const clusterer = useRef<MarkerClusterer | null>(null);
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  });

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
      {points.map((point) => (
        <AdvancedMarker
          position={point}
          ref={(marker) => setMarkerRef(marker, point.key)}
          key={point.key}
        ></AdvancedMarker>
      ))}
    </>
  );
};
export default MarkersSecond;
