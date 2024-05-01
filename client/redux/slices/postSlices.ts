import { createSlice } from "@reduxjs/toolkit";
import { PostSlice } from "../../types/post";

const initialState: PostSlice = {
  isCreatePost: false,
  createPostLoading: false,
  createPostError: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setIsCreatePost: (state, { payload }: { payload: boolean }) => {
      state.isCreatePost = payload;
    },
    setCreatePostLoading: (state) => {
      state.createPostLoading = true;
      state.createPostError = null;
    },
    setCreatePost: (state) => {
      state.createPostLoading = false;
      state.createPostError = null;
      state.isCreatePost = false;
    },
    setCreatePostError: (state, { payload }: { payload: string }) => {
      state.createPostLoading = false;
      state.createPostError = payload;
    },
  },
});

export const {
  setIsCreatePost,
  setCreatePostError,
  setCreatePost,
  setCreatePostLoading,
} = postSlice.actions;
export default postSlice.reducer;
