import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface hostelDetailsProp {
  name: string;
  fulladdr: string;
  categories: string[];
  photos?: string[] | undefined;
  distance: { text: string; value: number };
  duration: { text: string; value: number };
  lat: number;
  lng: number;
  rating: number | null;
  reviews: number | null;
  reviews_by_person?: Array<{ [key: string]: string | number }> | undefined;
  user_ratings_total?: number | undefined;
  vicinity: string;
  formatted_address: string;
  icons: string;
}

interface State {
  hostelsDetailData: hostelDetailsProp;
}

const initialState: State = {
  hostelsDetailData: {
    name: "",
    fulladdr: "",
    categories: [""],
    photos: [""],
    distance: { text: "", value: 0 },
    duration: { text: "", value: 0 },
    lat: 6.6732,
    lng: -1.5674,
    rating: 0,
    reviews: 0,
    reviews_by_person: [],
    user_ratings_total: 0,
    vicinity: "",
    formatted_address: "",
    icons: "",
  },
};

const hostelsDetailData = createSlice({
  name: "hostelsDetailsData",
  initialState: initialState,
  reducers: {
    setHostelsDetailData: (state, action: PayloadAction<hostelDetailsProp>) => {
      state.hostelsDetailData = action.payload;
    },
  },
});

export const { setHostelsDetailData } = hostelsDetailData.actions;
export default hostelsDetailData.reducer;
