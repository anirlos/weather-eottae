import { configureStore, combineReducers } from "@reduxjs/toolkit";
import heartReducer from "../slice/heartSlice";

const rootReducer = combineReducers({
  likes: heartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: rootReducer,
});
