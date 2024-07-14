// "use client";
// import {
// 	APIProvider,
// 	Map,
// 	useMap,
// 	useMapsLibrary,
// 	InfoWindow,
// 	MapControl,
// 	AdvancedMarker,
// 	MapCameraProps,
// 	MapCameraChangedEvent,
// } from "@vis.gl/react-google-maps";
// import { useMemo, useState, useEffect, createContext, useContext, SetStateAction } from "react";
// import Image from "next/image";
// import { shuttles } from "@/app/data/buses";
// import { Driver, Coordinates } from "@/app/types";

// interface GoogleMapComponentProps {
// 	drivers: Driver[];
// 	pickup: Coordinates;
// 	dropoff: Coordinates;
// }

// const CurrentOriginContext = createContext<{
// 	userLocation: {lat:number, lng:number};
// 	setUserLocation: React.Dispatch<SetStateAction<{lat: number, lng: number}>>;
// }>(null);

// const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
// 	drivers,
// 	pickup,
// 	dropoff,
// }) => {
// 	// const [origin, setOrigin] =
// 	const [userLocation, setUserLocation] = useState<{lat: number, lng: number}>({lat: 6.68275, lng: -1.57699});
// 	// const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
// 	// const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
// 	// const [directionService, setDirectionService] = useState<google.maps.DirectionsService | null>(null);

// 	// const map = useMap();
// 	// const routeLibrary = useMapsLibrary('routes');
// 	// console.log("Map from useMap:0 ", map);
// 	// console.log("routeLibrary from useMapsLibrary:0 ", routeLibrary);
// 	// //use effect for directions
// 	// useEffect(() => {
// 	// 	if (!map || !routeLibrary) return;
// 	// 	console.log("Map from useMap:1 ", map);
// 	// 	console.log("routeLibrary from useMapsLibrary:1 ", routeLibrary);
// 	// 	setDirectionService(new routeLibrary.DirectionsService());
// 	// 	setDirectionsRenderer(new routeLibrary.DirectionsRenderer({map}));
// 	// }, [map, routeLibrary])

// 	// useEffect(() => {
// 	// 	if(!directionService || !directionsRenderer) return;
// 	// 	console.log("Map from useMap: 2", map);
// 	// 	console.log("routeLibrary from useMapsLibrary:2 ", routeLibrary);
// 	// 	directionService.route({
// 	// 		origin: userLocation,
// 	// 		destination: pickup,
// 	// 		travelMode: google.maps.TravelMode.WALKING,
// 	// 	})
// 	// 		.then((result) => {
// 	// 			console.log("Directions from user to pickup: ", result);
// 	// 			directionsRenderer.setDirections(result);
// 	// 			const route = result.routes.map(({legs, summary}) => ({
// 	// 				legs: legs.map(({distance, duration, end_address, start_address}) => ({
// 	// 					distance: distance.text,
// 	// 					duration: duration.text,
// 	// 					end_address,
// 	// 					start_address,
// 	// 				})),
// 	// 				summary,
// 	// 			}))[0];
// 	// 			console.log("routes from directions: ",route);
// 	// 			}).catch((er)=> {
// 	// 				console.log("Error from Directions: ", er)
// 	// 				console.error(er)
// 	// 			});
// 	// 		}, [directionService, directionsRenderer, pickup, userLocation]);
// 	// 	;

// 	const getShuttleImage = (shuttle_number: string) => {
// 		const shuttle = shuttles.find(
// 			(shuttle) => shuttle.shuttle_number === shuttle_number
// 		);
// 		return shuttle ? shuttle.shuttle_image_url : '/Rides/shuttle-green.png';
// 	};

// 	// const getUserLocation = () => {
// 	// 	if (navigator.geolocation) {
// 	// 		const watchId = navigator.geolocation.watchPosition(
// 	// 			(position) => {
// 	// 				const userLoc = {
// 	// 					lat: position.coords.latitude,
// 	// 					lng: position.coords.longitude,
// 	// 				};
// 	// 				setUserLocation(userLoc);
// 	// 			},
// 	// 			(error) => {
// 	// 				console.error("Error getting the user location:", error);
// 	// 				// Fallback location
// 	// 				setUserLocation({ lat: 6.68275, lng: -1.57699 });
// 	// 			},
// 	// 			{ enableHighAccuracy: true, maximumAge: 0, timeout: 30000 }
// 	// 		);

// 	// 		return () => navigator.geolocation.clearWatch(watchId);
// 	// 	} else {
// 	// 		console.error("Geolocation is not supported by this browser.");
// 	// 		// Fallback location
// 	// 		setUserLocation({ lat: 6.67456, lng: -1.56756 });
// 	// 	}
// 	// };

// //
// 	// useEffect(() => {
// 	// 	getUserLocation();
// 	// }, [pickup]);

// 	const INITIAL_CAMERA = useMemo(
// 		() => ({
// 			center: { lat: 6.68275, lng: -1.57699 },
// 			zoom: 15,
// 		}),
// 		[]
// 	);

// 	const [cameraProp, setCameraProp] = useState<MapCameraProps>(INITIAL_CAMERA);
// 	const handleCameraChange = (camera: MapCameraChangedEvent) => {
// 		setCameraProp(camera.detail);
// 	};

// 	return (
// 		<div style={{ display: "flex", height: "100dvh", width: "100%" }}>
// 			<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
// 				<Map
// 					{...cameraProp}
// 					onCameraChanged={handleCameraChange}
// 					mapId="33570c96c3587029"
// 				>
// 					{drivers.map((driver, index) => (
// 						<AdvancedMarker key={index} position={driver.location}>
// 							<Image
// 								src={ getShuttleImage(driver.shuttle_number) }
// 								alt="shuttle"
// 								width={50}
// 								height={50}
// 							/>
// 						</AdvancedMarker>
// 					))}

// 					{pickup && (
// 						<AdvancedMarker position={pickup}>
// 							<Image src="/shuttle_stop.png" alt="pickup" width={50} height={50} />
// 						</AdvancedMarker>
// 					)}

// 					{dropoff && (
// 						<AdvancedMarker position={dropoff}>
// 							<Image src="/shuttle_stop.png" alt="dropoff" width={50} height={50} />
// 						</AdvancedMarker>
// 					)}

// 					{userLocation && (
// 						<AdvancedMarker position={userLocation}>
// 							<Image src="/user-female.png" alt="user" width={40} height={40} />
// 						</AdvancedMarker>
// 					)}
// 					<CurrentOriginContext.Provider value={{userLocation, setUserLocation}}>
// 					<Directions destination={pickup}/>
// 					</CurrentOriginContext.Provider>
// 				</Map>
// 			</APIProvider>
// 		</div>
// 	);
// };

// export default GoogleMapComponent;

// //////////DIRECTION/////////////

// const Directions = ({destination}) => {

// 	const map = useMap();
// 	const routeLibrary = useMapsLibrary('routes');
// 	const {userLocation, setUserLocation} = useContext(CurrentOriginContext);

// 	// const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
// 	const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
// 	const [directionService, setDirectionService] = useState<google.maps.DirectionsService | null>(null);
// 	//use effect for directions

// 	useEffect(() => {

// 		( () => {
// 			if (navigator.geolocation) {
// 				const watchId = navigator.geolocation.watchPosition(
// 					(position) => {
// 						console.log("User Location: ", position.coords.latitude, position.coords.longitude);
// 						const userLoc = {
// 							lat: position.coords.latitude,
// 							lng: position.coords.longitude,
// 						};

// 						console.log("User Location: ", userLoc);
// 						setUserLocation(userLoc);
// 					},
// 					(error) => {
// 						console.error("Error getting the user location:", error);
// 						// Fallback location
// 						// setUserLocation({ lat: 6.68275, lng: -1.57699 });
// 					},
// 					{ enableHighAccuracy: true, maximumAge: 0, timeout: 30000 }
// 				);

// 				return () => navigator.geolocation.clearWatch(watchId);
// 			} else {
// 				console.error("Geolocation is not supported by this browser.");
// 				// Fallback location
// 				// setUserLocation({ lat: 6.67456, lng: -1.56756 });
// 			}
// 		})()

// 	}, [userLocation, setUserLocation, navigator.geolocation]);

// 	useEffect(() => {
// 		if (!map || !routeLibrary) return;
// 		setDirectionService(new routeLibrary.DirectionsService());
// 		setDirectionsRenderer(new routeLibrary.DirectionsRenderer({map}));
// 	}, [map, routeLibrary])

// 	useEffect(() => {
// 		if(!directionService || !directionsRenderer) return;
// 		console.log("Origin", userLocation);
// 		console.log("Destination", destination);

// 		directionService.route({
// 			origin: userLocation,
// 			destination: destination,
// 			travelMode: google.maps.TravelMode.WALKING,
// 		})
// 			.then((result) => {
// 				console.log("Directions from user to pickup: ", result);
// 				directionsRenderer.setDirections(result);
// 				const route = result.routes.map(({legs, summary}) => ({
// 					legs: legs.map(({distance, duration, end_address, start_address}) => ({
// 						distance: distance.text,
// 						duration: duration.text,
// 						end_address,
// 						start_address,
// 					})),
// 					summary,
// 				}))[0];
// 				console.log("routes from directions: ",route);
// 				}).catch((er)=> {
// 					console.log("Error from Directions: ", er)
// 					console.error(er)
// 				});
// 			}, [directionService, directionsRenderer, userLocation, destination]);
// 		;

// 	return <></>
// }

export {};
