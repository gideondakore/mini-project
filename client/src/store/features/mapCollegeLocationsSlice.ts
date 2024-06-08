import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CollegeLocations {
  position: google.maps.LatLngLiteral;
}

const initialState = {
  position: { lat: 6.6732, lng: -1.5674 },
};

const mapCollegePositions = createSlice({
  name: "collegePosition",
  initialState,
  reducers: {
    setCollegePosition: (state, action: PayloadAction<CollegeLocations>) => {
      state.position = action.payload.position;
    },
  },
});

export const { setCollegePosition } = mapCollegePositions.actions;
export default mapCollegePositions.reducer;
