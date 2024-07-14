import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RememberUserInput {
  remember_user: {
    name?: string;
    email?: string;
    birth_day?: string;
    password?: string;
  };
}

const initialState: RememberUserInput = {
  remember_user: {
    name: "",
    email: "",
    birth_day: "",
    password: "",
  },
};

const rememberUser = createSlice({
  name: "remember_user",
  initialState: initialState,
  reducers: {
    setRememberUser: (state, action: PayloadAction<RememberUserInput>) => {
      state.remember_user = action.payload.remember_user;
    },
  },
});

export const { setRememberUser } = rememberUser.actions;
export default rememberUser.reducer;
