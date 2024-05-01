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
  deleteAccountLoading: false,
  deleteAccountError: null,
  updateProfileLoading: false,
  updateProfileError: null,
  isResetPassword: false,
  resetPasswordLoading: false,
  resetPasswordError: null,
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
    setDeleteAccountLoading: (state) => {
      state.deleteAccountLoading = true;
      state.deleteAccountError = null;
    },
    setDeleteAccount: (state) => {
      state.user = null;
      state.deleteAccountLoading = false;
      state.deleteAccountError = null;
      state.isDeleteAccount = false;
      Cookies.remove("postIT-user");
    },
    setDeleteAccountError: (state, { payload }: { payload: string }) => {
      state.deleteAccountLoading = false;
      state.deleteAccountError = payload;
    },
    setUpdateProfileLoading: (state) => {
      state.updateProfileLoading = true;
      state.updateProfileError = null;
    },
    setUpdateProfile: (state, { payload }: { payload: string }) => {
      state.updateProfileLoading = false;
      state.updateProfileError = null;
      if (state.user) {
        const newUser = { ...state.user, picture: payload };
        state.user = newUser;
        Cookies.remove("postIT-user");
        Cookies.set("postIT-user", JSON.stringify(newUser), {
          secure: true,
          sameSite: "strict",
          expires: 30,
        });
      }
    },
    setUpdateProfileError: (state, { payload }: { payload: string }) => {
      state.updateProfileLoading = false;
      state.updateProfileError = payload;
    },
    setIsResetPassword: (state, { payload }: { payload: boolean }) => {
      state.isResetPassword = payload;
    },
    setResetPasswordLoading: (state) => {
      state.resetPasswordLoading = true;
      state.resetPasswordError = null;
    },
    setResetPassword: (state) => {
      state.resetPasswordLoading = false;
      state.isResetPassword = false;
      state.resetPasswordError = null;
    },
    setResetPasswordError: (state, { payload }: { payload: string }) => {
      state.resetPasswordLoading = false;
      state.resetPasswordError = payload;
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
  setDeleteAccount,
  setDeleteAccountError,
  setDeleteAccountLoading,
  setUpdateProfile,
  setUpdateProfileError,
  setUpdateProfileLoading,
  setIsResetPassword,
  setResetPassword,
  setResetPasswordError,
  setResetPasswordLoading,
} = authSlice.actions;

export default authSlice.reducer;
