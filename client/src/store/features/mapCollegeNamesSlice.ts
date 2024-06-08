import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CollegeName {
  college: string;
}
const initialState: CollegeName = {
  college: "college of science",
};

const mapCollegeNames = createSlice({
  name: "collegeNames",
  initialState,
  reducers: {
    setCollegeNames: (state, action: PayloadAction<string>) => {
      state.college = action.payload;
    },
  },
});

export const { setCollegeNames } = mapCollegeNames.actions;
export default mapCollegeNames.reducer;
