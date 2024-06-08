import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  SetStateAction,
  useMemo,
} from "react";
import formattedDataForMap from "./data/hostelLocations";
import StarRate from "../../../utils/starRate";
import {
  Map,
  InfoWindow,
  AdvancedMarker,
  useMap,
  useMapsLibrary,
  MapCameraProps,
  MapCameraChangedEvent,
  MapControl,
  ControlPosition,
  CollisionBehavior,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

import knustLogoDark from "../../../assets/images/knust-logo.jpeg";
import knustLogoLight from "../../../assets/images/KnustLogo.png";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Marker } from "@googlemaps/markerclusterer";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";
import { setRoute } from "../../../store/features/mapRoutesSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setDestination } from "../../../store/features/mapDestinationNameSlice";

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
  const INITIAL_CAMERA = useMemo(
    () => ({ center: { lat: 6.6745, lng: -1.5716 }, zoom: 8 }),
    []
  );
  const [cameraProp, setCameraProp] = useState<MapCameraProps>(INITIAL_CAMERA);
  const handleCameraChange = (ev: MapCameraChangedEvent) => {
    return setCameraProp(ev.detail);
  };

  const [currentDestinationPosition, setCurrentDestinationPosition] =
    useState<google.maps.LatLngLiteral>(INITIAL_CAMERA.center);
  const [destinationName, setDestinationName] = useState<string>(
    "KNUST administration building"
  );

  return (
    <div style={{ height: "100vh", width: "80%" }}>
      <Map
        mapId={process.env.REACT_APP_GOOGLE_MAP_ID}
        {...cameraProp}
        onCameraChanged={handleCameraChange}
        reuseMaps={true}
      >
        <MapControl position={ControlPosition.BOTTOM_LEFT}>
          <div
            className="site-icon--wrapper"
            style={{ backgroundColor: "#f4f2f3", borderRadius: "20%" }}
          >
            <img
              src={require("../../../assets/images/app-logo.jpg")}
              alt="app logo"
              height={40}
              width={40}
              style={{ borderRadius: "50%" }}
            />
            <p style={{ fontWeight: "bold", fontSize: "1rem" }}>Duplex</p>
          </div>
        </MapControl>
        <CurrentDestinationPositionContext.Provider
          value={{ currentDestinationPosition, setCurrentDestinationPosition }}
        >
          <DestinationNameContext.Provider
            value={{ destinationName, setDestinationName }}
          >
            <Markers points={formattedDataForMap} />
            <Directions />
            <Places />
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
  const position: google.maps.LatLngLiteral = useMemo(
    () => ({ lat: 6.6747, lng: -1.5712 }),
    []
  );
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const [openHostel, setOpenHostel] = useState<boolean>(false);
  const [openHostelPosition, setOpenHostelPosition] =
    useState<google.maps.LatLngLiteral>();
  const [openHostelDetails, setOpenHostelDetails] =
    useState<HostelDetailsProp>();
  const clusterer = useRef<MarkerClusterer | null>(null);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoWindowShowKnust, setInfoWindowShowKnust] =
    useState<boolean>(false);

  const handleMarkerClickKnust = useCallback(
    () => setInfoWindowShowKnust((isShown) => !isShown),
    []
  );
  const handleMarkerCloseKnust = useCallback(
    () => setInfoWindowShowKnust(false),
    []
  );

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
            title={"Duplex"}
            position={point}
            key={point.key}
            ref={(marker) => {
              setMarkerRef(marker, point.key);
            }}
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
          >
            <div className="site-icon--wrapper">
              <img
                src={require("../../../assets/images/app-logo.jpg")}
                alt="app logo"
                height={30}
                width={30}
                style={{ borderRadius: "50%" }}
              />
            </div>
          </AdvancedMarker>
        ))}

        {openHostel && (
          <InfoWindow
            position={openHostelPosition}
            onCloseClick={() => setOpenHostel(false)}
            shouldFocus={false}
            headerContent={"Duplex ©2024"}
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
                  ? (openHostelDetails?.rating).toFixed(1)
                  : "Not available 😞"}
              </code>
            </div>
          </InfoWindow>
        )}
      </>

      <AdvancedMarker
        ref={markerRef}
        collisionBehavior={CollisionBehavior.REQUIRED_AND_HIDES_OPTIONAL}
        draggable={true}
        title={"KNUST Administration building"}
        position={position}
        onClick={handleMarkerClickKnust}
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
      {infoWindowShowKnust && (
        <InfoWindow
          position={position}
          anchor={marker}
          onClose={handleMarkerCloseKnust}
        >
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

  const map = useMap();
  const routeLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionRenderer, setDirectionRenderer] =
    useState<google.maps.DirectionsRenderer>();

  const mapRoutesIndex = useSelector(
    (state: RootState) => state.routesIndex.setRouteIndex
  );

  const mapCollegePositions = useSelector(
    (state: RootState) => state.collegePosition.position
  );

  const mapTravelMode = useSelector(
    (state: RootState) => state.travelMode.travelMode
  );
  const dispatch = useDispatch<AppDispatch>();

  const { destinationName } = useContext(DestinationNameContext)!;
  dispatch(setDestination(destinationName));

  useEffect(() => {
    if (!map || !routeLibrary) return;

    setDirectionsService(new routeLibrary.DirectionsService());
    setDirectionRenderer(new routeLibrary.DirectionsRenderer({ map }));
  }, [map, routeLibrary]);

  useEffect(() => {
    if (!directionsService || !directionRenderer) return;

    directionsService
      .route({
        origin: mapCollegePositions,
        destination: currentDestinationPosition,
        travelMode: mapTravelMode,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionRenderer.setDirections(response);

        const responseRoute = response.routes.map(({ legs, summary }) => ({
          legs,
          summary,
        }));
        dispatch(setRoute({ routes: responseRoute }));
      });
  }, [
    directionRenderer,
    directionsService,
    mapCollegePositions,
    mapTravelMode,
    currentDestinationPosition,
    dispatch,
  ]);

  useEffect(() => {
    if (!directionRenderer) return;

    directionRenderer.setRouteIndex(mapRoutesIndex);
  }, [directionRenderer, mapRoutesIndex]);

  return <></>;
};

const Places = () => {
  const map = useMap();
  const placeLibrary = useMapsLibrary("places");
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  //////////////////////////////////////////////////
  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService>();

  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[] | null
  >(null);

  const [predictionSelected, setPredictionSelected] =
    useState<google.maps.places.AutocompletePrediction | null>(null);

  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const [showPredictions, setShowPredictions] = useState<boolean>(false);

  useEffect(() => {
    if (!map || !placeLibrary) return;

    setPlacesService(new placeLibrary.PlacesService(map));
  }, [placeLibrary, map]);

  // useEffect(() => {
  //   if (!placesService) return;

  //   const request: google.maps.places.FindPlaceFromQueryRequest = {
  //     query: "Wagyingo hostel",
  //     fields: ["ALL"],
  //   };

  //   placesService.findPlaceFromQuery(
  //     request,
  //     (
  //       results: google.maps.places.PlaceResult[] | null,
  //       status: google.maps.places.PlacesServiceStatus
  //     ) => {
  //       if (status === google.maps.places.PlacesServiceStatus.OK && results) {
  //         results.map((result, index) => console.log("RESULT: ", result));

  //         // console.log("RESULTS: ", results);
  //         setSearchResults(results);
  //       }
  //     }
  //   );
  // }, [placesService]);

  useEffect(() => {
    if (!predictionSelected || !placesService) return;
    const request: google.maps.places.PlaceDetailsRequest = {
      placeId: predictionSelected.place_id!,
      fields: ["ALL"],
    };
    placesService.getDetails(
      request,
      (
        result: google.maps.places.PlaceResult | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && result) {
          console.log("RESULTS: ", result);
          setSelectedPlace(result);
          ////////

          // map?.panTo();
        }
      }
    );
  }, [placesService, predictionSelected, map, selectedPlace]);

  useEffect(() => {
    if (!placeLibrary || !placesService) return;

    const sw = new google.maps.LatLng(6.600071, -1.730783);
    const ne = new google.maps.LatLng(6.800071, -1.530783);
    const bounds = new google.maps.LatLngBounds(sw, ne);

    const request: google.maps.places.AutocompletionRequest = {
      input: inputValue,
      region: "gh",
      types: ["establishment"],
      componentRestrictions: { country: ["GH"] },
      locationRestriction: bounds,
    };

    const autoComplete = new placeLibrary.AutocompleteService();

    autoComplete.getPlacePredictions(
      request,
      (
        results: google.maps.places.AutocompletePrediction[] | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          setPredictions(results);
        }
      }
    );
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target?.value);
    setShowPredictions(true);
  };

  useEffect(() => {}, [showPredictions]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = inputValue;
    }
  }, [inputValue]);

  const handleButtonClick = (
    prediction: google.maps.places.AutocompletePrediction
  ) => {
    // console.log("Prediction: ", prediction);
    setInputValue(prediction?.description);
    setShowPredictions(false);
    setPredictionSelected(prediction);
  };

  return (
    <div
      style={{
        height: "auto",
        width: "20rem",
        // backgroundColor: "red",
        zIndex: "100",
        position: "absolute",
        top: "10px",
        right: "60px",
      }}
    >
      <input
        id="autocomplete"
        type="text"
        placeholder="search duplex"
        style={{ width: "100%", height: "2rem" }}
        onChange={handleChange}
        ref={inputRef}
      />
      {showPredictions && (
        <ul
          className="searchBox"
          style={{
            display: "flex",
            flexDirection: "column",
            // gap: "10px",
            alignItems: "flex-start",
            backgroundColor: "#64766a",
            width: "100%",
            color: "white",
          }}
        >
          {inputValue.length > 2 &&
            predictions &&
            predictions?.map((prediction) => (
              <li
                style={{ width: "100%", height: "4rem" }}
                key={prediction.description}
              >
                <button
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    border: "none",
                    cursor: "pointer",
                    width: "100%",
                    borderRadius: "0px",
                    fontSize: "1.2rem",
                  }}
                  onClick={() => handleButtonClick(prediction)}
                >
                  {prediction.description}
                </button>
              </li>
            ))}
        </ul>
      )}

      <AdvancedMarker
        position={selectedPlace?.geometry?.location}
        title={"Duplex Testing"}
      ></AdvancedMarker>
    </div>
  );
};
export default HostelMap;
