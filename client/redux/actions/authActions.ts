import { Dispatch } from "redux";
import {
  setIsDeleteAccount,
  setLogin,
  setLoginError,
  setLoginLoading,
  setRegister,
  setRegisterError,
  setRegisterLoading,
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
      dispatch(setLogin(data));
      navigate("/");
    } catch (error: unknown) {
      dispatch(setLoginError("Something went wrong!"));
    }
  };

export const isDeleteAccountAction =
  (value: boolean) => (dispatch: Dispatch) => {
    dispatch(setIsDeleteAccount(value));
  };
