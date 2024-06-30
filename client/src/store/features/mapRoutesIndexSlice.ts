import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RoutesIndex {
  setRouteIndex: number;
}

const initialState: RoutesIndex = {
  setRouteIndex: 0,
};

const routesIndex = createSlice({
  name: "routeIndex",
  initialState,
  reducers: {
    setRoutesIndex: (state: RoutesIndex, action: PayloadAction<number>) => {
      state.setRouteIndex = action.payload;
    },
  },
});

export const { setRoutesIndex } = routesIndex.actions;
export default routesIndex.reducer;
