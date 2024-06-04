import React, { ReactNode, useEffect, useState } from "react";
import { Map, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

const Direction = () => {
  const position = { lat: 43.6532, lng: -79.3832 };
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Map
        mapId={process.env.REACT_APP_GOOGLE_MAP_ID}
        center={position}
        defaultZoom={9}
        // zoom={}
        fullscreenControl={false}
      >
        <Directions />
      </Map>
    </div>
  );
};

const Directions = () => {
  const map = useMap();
  const routeLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionRenderer, setDirectionRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState<number>(0);
  const selected = routes.at(routeIndex);
  const leg = selected?.legs.at(0);

  useEffect(() => {
    if (!map || !routeLibrary) return;

    setDirectionsService(new routeLibrary.DirectionsService());
    setDirectionRenderer(new routeLibrary.DirectionsRenderer({ map }));
  }, [map, routeLibrary]);

  useEffect(() => {
    if (!directionRenderer) return;

    directionRenderer.setRouteIndex(routeIndex);
  }, [directionRenderer, routeIndex]);

  useEffect(() => {
    if (!directionsService || !directionRenderer) return;

    directionsService
      .route({
        origin: "100 Front St, Toronto ON",
        destination: "500 College St, Toronto ON",
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionRenderer.setDirections(response);
        // console.log("Routes: ", response.routes);

        setRoutes(response.routes);
      });

    return () => directionRenderer.setMap(null);
  }, [directionsService, directionRenderer]);

  if (routes) console.log("Summary: ", routes.at(0)?.legs.at(0)?.distance);

  if (!leg) return null;

  return (
    <div
      style={{
        position: "absolute",
        height: "25rem",
        width: "20rem",
        backgroundColor: "#04125c",
        right: "1rem",
        top: "2rem",
        display: "flex",
        flexDirection: "column",
        color: "white",
        alignItems: "flex-start",
        padding: "10px",
        borderRadius: "10px",
        gap: "5px",
      }}
    >
      <h4>{selected?.summary}</h4>
      <p>Distance: {leg?.distance?.text}</p>
      <p>Duration: {leg?.duration?.text}</p>
      <h2>Other routes:</h2>
      <menu
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "5px",
          marginTop: "1rem",
        }}
      >
        {routes.map((route, index) => (
          <button
            style={{ cursor: "pointer" }}
            onClick={() => setRouteIndex(index)}
            key={index}
          >
            <li key={route?.summary}>{route?.summary}</li>
          </button>
        ))}
      </menu>
    </div>
  );
};

export default Direction;
