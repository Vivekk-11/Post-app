import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { AuthSlice, User } from "../../types/user";
const userFromCookie = Cookies.get("postIT-user");
const user: User | null = userFromCookie ? JSON.parse(userFromCookie) : null;

const initialState: AuthSlice = {
  registerLoading: false,
  user,
  registerError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRegisterLoading: (state) => {
      state.registerLoading = true;
      state.registerError = null;
    },
    setRegister: (state, { payload }: { payload: User }) => {
      state.registerLoading = false;
      state.registerError = null;
      state.user = payload;
      Cookies.set("postIT-user", JSON.stringify(payload));
    },
    setRegisterError: (state, { payload }: { payload: string }) => {
      state.registerLoading = false;
      state.registerError = payload;
    },
  },
});

export const { setRegisterLoading, setRegister, setRegisterError } =
  authSlice.actions;

export default authSlice.reducer;
