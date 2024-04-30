import { Dispatch } from "redux";
import {
  setRegister,
  setRegisterError,
  setRegisterLoading,
} from "../slices/authSlices";
import axios from "axios";

export const registerAction =
  (registerData: FormData) => async (dispatch: Dispatch) => {
    dispatch(setRegisterLoading());
    try {
      const { data } = await axios.post(process.env.BACKEND_ROUTE!, {
        registerData,
      });
      dispatch(setRegister(data));
    } catch (error: unknown) {
      dispatch(setRegisterError("Something went wrong!"));
    }
  };
