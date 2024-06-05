import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  SetStateAction,
} from "react";
import formattedDataForMap from "./data/hostelLocations";
import StarRate from "../../../utils/starRate";
import {
  Map,
  InfoWindow,
  AdvancedMarker,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import knustLogoDark from "../../../assets/images/knust-logo.jpeg";
import knustLogoLight from "../../../assets/images/KnustLogo.png";

import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Marker } from "@googlemaps/markerclusterer";

interface CurrentDestinationPositionProp {
  currentDestinationPosition: google.maps.LatLngLiteral;
  setCurrentDestinationPosition: React.Dispatch<
    React.SetStateAction<google.maps.LatLngLiteral>
  >;
}

const CurrentDestinationPositionContext =
  createContext<CurrentDestinationPositionProp | null>(null);

const DestinationNameContext = createContext<{
  destinationName: string;
  setDestinationName: React.Dispatch<SetStateAction<string>>;
} | null>(null);

const HostelMap = () => {
  const position: google.maps.LatLngLiteral = { lat: 6.6745, lng: -1.5716 };

  const [currentDestinationPosition, setCurrentDestinationPosition] =
    useState<google.maps.LatLngLiteral>(position);
  const [destinationName, setDestinationName] = useState<string>(
    "Main campus entrance"
  );
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Map
        mapId={process.env.REACT_APP_GOOGLE_MAP_ID}
        defaultZoom={14}
        center={position}
        fullscreenControl={false}
        // zoom={16}
      >
        <CurrentDestinationPositionContext.Provider
          value={{ currentDestinationPosition, setCurrentDestinationPosition }}
        >
          <DestinationNameContext.Provider
            value={{ destinationName, setDestinationName }}
          >
            <Markers points={formattedDataForMap} />
            <Directions />
          </DestinationNameContext.Provider>
        </CurrentDestinationPositionContext.Provider>
      </Map>
    </div>
  );
};

type Point = google.maps.LatLngLiteral & {
  key: string;
  name: string;
  thumbnail: string | null;
  fulladdr: string;
  rating: number | null;
};
type Prop = { points: Point[] };

type HostelDetailsProp = {
  name: string;
  thumbnail: string | null;
  address: string;
  rating: number | null;
};

const Markers = ({ points }: Prop) => {
  const { setCurrentDestinationPosition } = useContext(
    CurrentDestinationPositionContext
  )!;

  const { setDestinationName } = useContext(DestinationNameContext)!;

  const [open, setOpen] = useState<boolean>(false);
  const position: google.maps.LatLngLiteral = { lat: 6.6745, lng: -1.5716 };
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const [openHostel, setOpenHostel] = useState<boolean>(false);
  const [openHostelPosition, setOpenHostelPosition] =
    useState<google.maps.LatLngLiteral>();
  const [openHostelDetails, setOpenHostelDetails] =
    useState<HostelDetailsProp>();
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

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = require(`../../../assets/images/altHostel-${Math.floor(
      Math.random() * (8 - 1) + 1
    )}.jpg`);
  };
  return (
    <>
      <>
        {points.map((point, index) => (
          <AdvancedMarker
            position={point}
            key={point.key}
            ref={(marker) => setMarkerRef(marker, point.key)}
            onClick={(e) => {
              let position: google.maps.LatLngLiteral = {
                lat: point.lat,
                lng: point.lng,
              };
              let details: HostelDetailsProp = {
                name: point.name,
                thumbnail: point.thumbnail,
                address: point.fulladdr,
                rating: point.rating,
              };
              setOpenHostelPosition(position);
              setOpenHostel(true);
              setOpenHostelDetails(details);
              setCurrentDestinationPosition(position);
              setDestinationName(point?.name);
            }}
          ></AdvancedMarker>
        ))}

        {openHostel && (
          <InfoWindow
            position={openHostelPosition}
            onCloseClick={() => setOpenHostel(false)}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                backgroundColor: "#ffff",
                height: "10rem",
                width: "8rem",
              }}
            >
              <h3>{openHostelDetails?.name}</h3>
              <img
                src={`${openHostelDetails?.thumbnail}`}
                alt="logo"
                style={{ height: "5rem", width: "100%" }}
                onError={handleError}
              />

              <p>
                Address:
                {openHostelDetails?.address
                  ? openHostelDetails?.address
                  : `${openHostelDetails?.name} street`}
              </p>

              <StarRate rating={openHostelDetails?.rating} />
              <code>
                Rating:
                {openHostelDetails?.rating
                  ? openHostelDetails?.rating
                  : "Not available 😞"}
              </code>
            </div>
          </InfoWindow>
        )}
      </>

      <AdvancedMarker
        position={position}
        onClick={() => {
          setOpen(true);
        }}
      >
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

const Directions = () => {
  const { currentDestinationPosition } = useContext(
    CurrentDestinationPositionContext
  )!;

  const { destinationName } = useContext(DestinationNameContext)!;

  const map = useMap();
  const routeLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionRenderer, setDirectionRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [collegePosition, setCollegeLocation] =
    useState<google.maps.LatLngLiteral>({ lat: 6.6732, lng: -1.5674 });
  const [travelMode, setTravelMode] = useState<google.maps.TravelMode>(
    google.maps.TravelMode.DRIVING
  );
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState<number>(0);
  const selected = routes.at(routeIndex);
  const leg = selected?.legs.at(0);

  const [collegeName, setCollegeName] = useState<string>("college of science");
  const handleLocationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const [lat, lng] = e.target?.value.split(",").map(Number);

    setCollegeLocation({ lat, lng });

    setCollegeName(e.target?.selectedOptions[0]?.text);
  };
  useEffect(() => {
    if (!map || !routeLibrary) return;

    setDirectionsService(new google.maps.DirectionsService());
    setDirectionRenderer(new google.maps.DirectionsRenderer({ map }));
  }, [map, routeLibrary]);

  useEffect(() => {
    if (!directionsService || !directionRenderer || !travelMode) return;

    directionsService
      .route({
        origin: collegePosition,
        destination: currentDestinationPosition,
        travelMode: travelMode,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionRenderer.setDirections(response);
        setRoutes(response.routes);
      });
  }, [
    directionRenderer,
    directionsService,
    collegePosition,
    travelMode,
    currentDestinationPosition,
  ]);

  useEffect(() => {
    if (!directionRenderer) return;

    directionRenderer.setRouteIndex(routeIndex);
  }, [directionRenderer, routeIndex]);

  return (
    <div
      style={{
        position: "absolute",
        minHeight: "25rem",
        width: "20rem",
        backgroundColor: "#04125c",
        left: "1rem",
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
      <p>
        Distance:{" "}
        {leg?.distance?.text ? leg?.distance?.text : "Not available 😞"}
      </p>
      <p>
        Duration:{" "}
        {leg?.duration?.text ? leg?.duration?.text : "Not available 😞"}
      </p>
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
            <li key={route?.summary}>
              {route?.summary
                ? route?.summary
                : `Alternative route ${index + 1}`}
            </li>
          </button>
        ))}
      </menu>

      <h2 style={{ marginTop: "1rem" }}>Select college:</h2>
      <select
        value={`${collegePosition.lat},${collegePosition.lng}`}
        onChange={handleLocationChange}
      >
        <option value="6.6732,-1.5674">college of science</option>
        <option value="6.673175,-1.565423">college of engineering</option>
        <option value="6.6774,-1.5647">
          college of agriculture and natural resources
        </option>
        <option value="6.6743,-1.5648">
          college of art and built environment
        </option>
        <option value="6.6665,-1.5687">
          college of humanities and social sciences
        </option>
        <option value="6.6722,-1.5685">college of health sciences</option>
      </select>

      <h2 style={{ marginTop: "1rem" }}>Mode of Transport:</h2>
      <select
        value={travelMode}
        onChange={({ target }) =>
          setTravelMode(target?.value as google.maps.TravelMode)
        }
      >
        <option value={google.maps.TravelMode.DRIVING}>Driving</option>
        <option value={google.maps.TravelMode.WALKING}>Walking</option>
      </select>

      <h2 style={{ marginTop: "1rem" }}>Origin - Destination:</h2>
      <p>
        From {collegeName} to {destinationName}
      </p>
    </div>
  );
};
export default HostelMap;
