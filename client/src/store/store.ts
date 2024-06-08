import { configureStore } from "@reduxjs/toolkit";
import mapRoutes from "./features/mapRoutesSlice";
import mapRoutesIndex from "./features/mapRoutesIndexSlice";
import mapCollegeNames from "./features/mapCollegeNamesSlice";
import mapCollegeLocations from "./features/mapCollegeLocationsSlice";
import mapDestinationName from "./features/mapDestinationNameSlice";
import mapTraveModes from "./features/mapTraveModesSlice";

export const store = configureStore({
  reducer: {
    routes: mapRoutes,
    routesIndex: mapRoutesIndex,
    collegeNames: mapCollegeNames,
    collegePosition: mapCollegeLocations,
    collegeDestination: mapDestinationName,
    travelMode: mapTraveModes,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [
  //         // "routes/setRoute",
  //         // "collegeDestination/setDestination",
  //         "hostel/setRoute",
  //       ],
  //       ignoredActionPaths: [
  //         // "payload.routes.legs.start_location",
  //         // "payload.routes.legs.end_location",
  //         "routes.routes.0.bounds",
  //         // "payload.routes.0.bounds",
  //       ],
  //       // ignoredPaths: ['items.dates'],
  //     },
  //   }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
