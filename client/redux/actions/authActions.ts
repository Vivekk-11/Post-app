import { Dispatch } from "redux";
import Cookies from "js-cookie";
import {
  setDeleteAccount,
  setDeleteAccountError,
  setDeleteAccountLoading,
  setIsAccountSettings,
  setIsDeleteAccount,
  setIsResetPassword,
  setLogin,
  setLoginError,
  setLoginLoading,
  setLogout,
  setRegister,
  setRegisterError,
  setRegisterLoading,
  setUpdateProfile,
  setUpdateProfileError,
  setUpdateProfileLoading,
} from "../slices/authSlices";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";

export const registerAction =
  (registerData: FormData, navigate: NavigateFunction) =>
  async (dispatch: Dispatch) => {
    dispatch(setRegisterLoading());
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_ROUTE!}/user/register`,
        registerData
      );
      dispatch(setRegister(data));
      navigate("/");
    } catch (error: unknown) {
      dispatch(setRegisterError("Something went wrong!"));
    }
  };

export const loginAction =
  (
    loginData: { email: string; password: string },
    navigate: NavigateFunction
  ) =>
  async (dispatch: Dispatch) => {
    dispatch(setLoginLoading());
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_ROUTE!}/user/login`,
        loginData
      );
      dispatch(setLogin({ ...data, userId: data.id }));
      navigate("/");
    } catch (error: unknown) {
      dispatch(setLoginError("Something went wrong!"));
    }
  };

export const isDeleteAccountAction =
  (value: boolean) => (dispatch: Dispatch) => {
    dispatch(setIsDeleteAccount(value));
  };

export const logoutAction =
  (navigate: NavigateFunction) => (dispatch: Dispatch) => {
    dispatch(setLogout());
    navigate("/login");
  };

export const deleteAccountAction =
  (navigate: NavigateFunction) => async (dispatch: Dispatch) => {
    try {
      dispatch(setDeleteAccountLoading());
      const user = Cookies.get("postIT-user");
      if (!user) return;
      const { userId, token } = JSON.parse(user);
      await axios.delete(
        `${
          import.meta.env.VITE_APP_BACKEND_ROUTE
        }/user/delete-account/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/register");
      dispatch(setDeleteAccount());
    } catch (error) {
      dispatch(setDeleteAccountError("Something went wrong!"));
    }
  };

export const updateProfileAction =
  (values: FormData) => async (dispatch: Dispatch) => {
    try {
      dispatch(setUpdateProfileLoading());
      const user = Cookies.get("postIT-user");
      if (!user) return;
      const { token } = JSON.parse(user);
      const { data } = await axios.put(
        `${import.meta.env.VITE_APP_BACKEND_ROUTE}/user/update-profile`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setUpdateProfile(data));
    } catch (error) {
      dispatch(setUpdateProfileError("Something went wrong!"));
    }
  };

export const isAccountSettingsAction =
  (value: boolean) => (dispatch: Dispatch) => {
    dispatch(setIsAccountSettings(value));
  };

export const isResetPasswordAction =
  (value: boolean) => (dispatch: Dispatch) => {
    dispatch(setIsResetPassword(value));
  };
