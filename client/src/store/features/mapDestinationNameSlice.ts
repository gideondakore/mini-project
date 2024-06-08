import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CollegeDestinationName {
  destination: string;
}

const initialState: CollegeDestinationName = {
  destination: "KNUST administration building",
};

const mapCollegeDestination = createSlice({
  name: "collegeDestination",
  initialState,
  reducers: {
    setDestination: (state, action: PayloadAction<string>) => {
      state.destination = action.payload;
    },
  },
});

export const { setDestination } = mapCollegeDestination.actions;
export default mapCollegeDestination.reducer;
