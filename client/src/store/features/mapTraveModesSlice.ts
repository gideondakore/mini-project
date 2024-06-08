import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TravelMode {
  travelMode: google.maps.TravelMode;
}

const initialState: TravelMode = {
  travelMode: google.maps.TravelMode.DRIVING,
};

const mapTravelMode = createSlice({
  name: "travelMode",
  initialState,
  reducers: {
    setTravelModes: (state, action: PayloadAction<TravelMode>) => {
      state.travelMode = action.payload.travelMode;
    },
  },
});

export const { setTravelModes } = mapTravelMode.actions;
export default mapTravelMode.reducer;
