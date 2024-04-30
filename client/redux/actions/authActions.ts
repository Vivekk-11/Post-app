import { Dispatch } from "redux";
import {
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
      const { data } = await axios.post(process.env.BACKEND_ROUTE!, {
        registerData,
      });
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
      const { data } = await axios.post(process.env.BACKEND_ROUTE!, {
        loginData,
      });
      dispatch(setLogin(data));
      navigate("/");
    } catch (error: unknown) {
      dispatch(setLoginError("Something went wrong!"));
    }
  };
