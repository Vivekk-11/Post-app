import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "./slices/authSlices";
import post from "./slices/postSlices";

const reducer = combineReducers({ auth, post });

const store = configureStore({ reducer });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
