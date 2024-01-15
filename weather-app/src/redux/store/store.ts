import { configureStore, combineReducers } from "@reduxjs/toolkit";
import chatSlice from "../slice/chatSlice";
import authReducer from "../slice/authSlice";

const rootReducer = combineReducers({
  chat: chatSlice,
  auth: authReducer, 
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: rootReducer,
});
