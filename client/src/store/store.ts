import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import mapRoutes from "./features/mapRoutesSlice";
import mapRoutesIndex from "./features/mapRoutesIndexSlice";
import mapCollegeNames from "./features/mapCollegeNamesSlice";
import mapCollegeLocations from "./features/mapCollegeLocationsSlice";
import mapDestinationName from "./features/mapDestinationNameSlice";
import mapTraveModes from "./features/mapTraveModesSlice";
import hostelsDetailData from "./features/hostelDetailDataSlice";
import chatUserName from "./features/chatUserNameSlice";
import rememberUserInput from "./features/rememberUserInputSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["hostelsDetailData", "chatUserName", "rememberUserInput"],
};

const rootReducers = combineReducers({
  routes: mapRoutes,
  routesIndex: mapRoutesIndex,
  collegeNames: mapCollegeNames,
  collegePosition: mapCollegeLocations,
  collegeDestination: mapDestinationName,
  travelMode: mapTraveModes,
  hostelsDetailData: hostelsDetailData,
  chatUserName: chatUserName,
  rememberUserInput: rememberUserInput,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
