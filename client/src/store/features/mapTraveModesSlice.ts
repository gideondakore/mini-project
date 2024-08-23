import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TravelMode {
  travelMode: "DRIVING" | "WALKING";
}

const initialState: TravelMode = {
  travelMode: "DRIVING",
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
