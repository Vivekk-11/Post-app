import { createSlice } from "@reduxjs/toolkit";
import { Post, PostSlice } from "../../types/post";

const initialState: PostSlice = {
  isCreatePost: false,
  createPostLoading: false,
  createPostError: null,
  getPostsLoading: false,
  getPostsError: null,
  posts: [],
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
    setPostsLoading: (state) => {
      state.getPostsLoading = true;
      state.getPostsError = null;
    },
    setPosts: (state, { payload }: { payload: Post[] }) => {
      state.getPostsLoading = false;
      state.posts = payload;
      state.getPostsError = null;
    },
    setPostsError: (state, { payload }: { payload: string }) => {
      state.getPostsLoading = false;
      state.getPostsError = payload;
    },
  },
});

export const {
  setIsCreatePost,
  setCreatePostError,
  setCreatePost,
  setCreatePostLoading,
  setPosts,
  setPostsError,
  setPostsLoading,
} = postSlice.actions;
export default postSlice.reducer;
