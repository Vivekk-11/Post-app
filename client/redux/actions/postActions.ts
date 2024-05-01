import Cookies from "js-cookie";
import { Dispatch } from "redux";
import {
  setCreatePost,
  setCreatePostError,
  setCreatePostLoading,
  setIsCreatePost,
  setPosts,
  setPostsError,
  setPostsLoading,
  setSearchPosts,
  setSearchPostsError,
  setSearchPostsLoading,
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
      dispatch(setCreatePost(data));
    } catch (error) {
      dispatch(setCreatePostError("Something went wrong!"));
    }
  };

export const getPostsAction =
  (pageNo: number, limit: number) => async (dispatch: Dispatch) => {
    try {
      const user = Cookies.get("postIT-user");
      if (!user) return;
      const { token } = JSON.parse(user);
      dispatch(setPostsLoading());
      const { data } = await axios.get(
        `${import.meta.env
          .VITE_APP_BACKEND_ROUTE!}/post/get-posts?pageNo=${pageNo}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setPosts({ posts: data.posts, postsCount: data.postsCount }));
    } catch (error) {
      dispatch(setPostsError("Something went wrong!"));
    }
  };

export const searchPostsAction =
  (searchTerm: string) => async (dispatch: Dispatch) => {
    try {
      const user = Cookies.get("postIT-user");
      if (!user) return;
      const { token } = JSON.parse(user);
      dispatch(setSearchPostsLoading());
      console.log(searchTerm, "TERM");
      const { data } = await axios.get(
        `${import.meta.env
          .VITE_APP_BACKEND_ROUTE!}/post/search?title=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setSearchPosts(data));
    } catch (error) {
      dispatch(setSearchPostsError("Something went wrong!"));
    }
  };
