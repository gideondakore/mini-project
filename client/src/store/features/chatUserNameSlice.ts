import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatUserName {
  chat_user_name: string;
}

const initialState: ChatUserName = {
  chat_user_name: "",
};

const chatUserName = createSlice({
  name: "chat_user_name",
  initialState: initialState,
  reducers: {
    setChatUSerName: (state, action: PayloadAction<string>) => {
      state.chat_user_name = action.payload;
    },
  },
});

export const { setChatUSerName } = chatUserName.actions;
export default chatUserName.reducer;
