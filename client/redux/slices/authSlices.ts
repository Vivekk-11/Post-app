import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { AuthSlice, User } from "../../types/user";
const userFromCookie = Cookies.get("postIT-user");
const user: User | null = !userFromCookie ? null : JSON.parse(userFromCookie);

const initialState: AuthSlice = {
  user,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  isDeleteAccount: false,
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
      Cookies.set("postIT-user", JSON.stringify(payload), {
        secure: true,
        sameSite: "strict",
        expires: 30,
      });
    },
    setRegisterError: (state, { payload }: { payload: string }) => {
      state.registerLoading = false;
      state.registerError = payload;
    },
    setLoginLoading: (state) => {
      state.loginLoading = true;
      state.loginError = null;
    },
    setLogin: (state, { payload }: { payload: User }) => {
      state.loginLoading = false;
      state.loginError = null;
      state.user = payload;
      Cookies.set("postIT-user", JSON.stringify(payload), {
        secure: true,
        sameSite: "strict",
        expires: 30,
      });
    },
    setLoginError: (state, { payload }: { payload: string }) => {
      state.loginLoading = false;
      state.loginError = payload;
    },
    setIsDeleteAccount: (state, { payload }: { payload: boolean }) => {
      state.isDeleteAccount = payload;
    },
    setLogout: (state) => {
      state.user = null;
      Cookies.remove("postIT-user");
    },
  },
});

export const {
  setRegisterLoading,
  setRegister,
  setRegisterError,
  setLogin,
  setLoginError,
  setLoginLoading,
  setIsDeleteAccount,
  setLogout,
} = authSlice.actions;

export default authSlice.reducer;
