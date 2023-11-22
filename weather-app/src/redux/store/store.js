import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "../slice/chatSlice";

export const store = configureStore({
  reducer: {
    chat: chatSlice,
  },
});
