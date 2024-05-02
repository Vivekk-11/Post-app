import { Dispatch } from "redux";
import Cookies from "js-cookie";
import {
  setAskForEmail,
  setAskForEmailError,
  setAskForEmailLoading,
  setDeleteAccount,
  setDeleteAccountError,
  setDeleteAccountLoading,
  setIsDeleteAccount,
  setIsResetPassword,
  setLogin,
  setLoginError,
  setLoginLoading,
  setLogout,
  setPasswordReset,
  setPasswordResetError,
  setPasswordResetLoading,
  setRegister,
  setRegisterError,
  setRegisterLoading,
  setResetPassword,
  setResetPasswordError,
  setResetPasswordLoading,
  setUpdateProfile,
  setUpdateProfileError,
  setUpdateProfileLoading,
} from "../slices/authSlices";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-hot-toast";

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
      toast.success("Welcome to PostIT");
    } catch (error: unknown) {
      //@ts-expect-error ignore typescript
      const err = error?.response?.data || "Something went wrong!";
      toast.error(err);
      dispatch(setRegisterError(err));
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
      toast.success("Welcome to PostIT");
    } catch (error: unknown) {
      //@ts-expect-error ignore typescript
      const err = error?.response?.data || "Something went wrong!";
      toast.error(err);
      dispatch(setLoginError(err));
    }
  };

export const isDeleteAccountAction =
  (value: boolean) => (dispatch: Dispatch) => {
    dispatch(setIsDeleteAccount(value));
  };

export const logoutAction =
  (navigate: NavigateFunction) => (dispatch: Dispatch) => {
    dispatch(setLogout());
    toast.success("Logout successful!");
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
      toast.success("You deleted your account!");
    } catch (error) {
      //@ts-expect-error ignore typescript
      const err = error?.response?.data || "Something went wrong!";
      toast.error(err);
      dispatch(setDeleteAccountError(err));
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
      toast.success("Profile picture updated!");
      dispatch(setUpdateProfile(data));
    } catch (error) {
      //@ts-expect-error ignore typescript
      const err = error?.response?.data || "Something went wrong!";
      toast.error(err);
      dispatch(setUpdateProfileError(err));
    }
  };

export const isResetPasswordAction =
  (value: boolean) => (dispatch: Dispatch) => {
    dispatch(setIsResetPassword(value));
  };

export const resetPasswordAction =
  (password: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(setResetPasswordLoading());
      const user = Cookies.get("postIT-user");
      if (!user) return;
      const { token } = JSON.parse(user);
      await axios.put(
        `${import.meta.env.VITE_APP_BACKEND_ROUTE}/user/reset-password`,
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("You successfully reset your password!");
      dispatch(setResetPassword());
    } catch (error) {
      //@ts-expect-error ignore typescript
      const err = error?.response?.data || "Something went wrong!";
      toast.error(err);
      dispatch(setResetPasswordError(err));
    }
  };

export const askForEmailAction =
  (email: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(setAskForEmailLoading());
      await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_ROUTE}/user/reset-password`,
        {
          email,
        }
      );
      toast.success("We've sent you an email!");
      dispatch(setAskForEmail());
    } catch (error) {
      //@ts-expect-error ignore typescript
      const err = error?.response?.data || "Something went wrong!";
      toast.error(err);
      dispatch(setAskForEmailError(err));
    }
  };

export const passwordResetAction =
  (
    { password, token }: { password: string; token: string },
    navigate: NavigateFunction
  ) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setPasswordResetLoading());
      await axios.post(
        `${
          import.meta.env.VITE_APP_BACKEND_ROUTE
        }/user/reset-password-from-email`,
        {
          password,
          token,
        }
      );
      dispatch(setPasswordReset());
      toast.success("You successfully changed your password!");
      navigate("/login");
    } catch (error) {
      //@ts-expect-error ignore typescript
      const err = error?.response?.data || "Something went wrong!";
      toast.error(err);
      dispatch(setPasswordResetError(err));
    }
  };
