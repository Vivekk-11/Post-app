import { Dispatch } from "redux";
import { setIsCreatePost } from "../slices/postSlices";

export const isCreatePostAction = (value: boolean) => (dispatch: Dispatch) => {
  dispatch(setIsCreatePost(value));
};
