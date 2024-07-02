import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import mapRoutes from "./features/mapRoutesSlice";
import mapRoutesIndex from "./features/mapRoutesIndexSlice";
import mapCollegeNames from "./features/mapCollegeNamesSlice";
import mapCollegeLocations from "./features/mapCollegeLocationsSlice";
import mapDestinationName from "./features/mapDestinationNameSlice";
import mapTraveModes from "./features/mapTraveModesSlice";
import hostelsDetailData from "./features/hostelDetailDataSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, hostelsDetailData);

export const store = configureStore({
  reducer: {
    routes: mapRoutes,
    routesIndex: mapRoutesIndex,
    collegeNames: mapCollegeNames,
    collegePosition: mapCollegeLocations,
    collegeDestination: mapDestinationName,
    travelMode: mapTraveModes,
    hostelsDetailData: persistedReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
