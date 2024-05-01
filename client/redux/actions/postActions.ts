import Cookies from "js-cookie";
import { Dispatch } from "redux";
import {
  setCreatePost,
  setCreatePostError,
  setCreatePostLoading,
  setIsCreatePost,
} from "../slices/postSlices";
import axios from "axios";

export const isCreatePostAction = (value: boolean) => (dispatch: Dispatch) => {
  dispatch(setIsCreatePost(value));
};

export const createPostAction =
  (values: FormData) => async (dispatch: Dispatch) => {
    try {
      dispatch(setCreatePostLoading());
      const user = Cookies.get("postIT-user");
      if (!user) return;
      const { token } = JSON.parse(user);
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_ROUTE!}/post/create-post`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setCreatePost());
    } catch (error) {
      dispatch(setCreatePostError("Something went wrong!"));
    }
  };
