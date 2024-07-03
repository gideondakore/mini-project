import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Route {
  legs: Array<google.maps.DirectionsLeg>;
  summary: string;
}

interface Routes {
  routes: Array<Route>;
}
const initialState: Routes = {
  routes: [],
};

const mapRoutes = createSlice({
  name: "hostel",
  initialState,
  reducers: {
    setRoute: (state, action: PayloadAction<Routes>) => {
      state.routes = action.payload.routes;
    },
  },
});

export const { setRoute } = mapRoutes.actions;
export default mapRoutes.reducer;
