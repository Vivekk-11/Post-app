import { createSlice } from "@reduxjs/toolkit";
import { Post, PostSlice } from "../../types/post";

const initialState: PostSlice = {
  isCreatePost: false,
  createPostLoading: false,
  createPostError: null,
  getPostsLoading: false,
  getPostsError: null,
  posts: [],
  postsCount: 0,
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
    setCreatePost: (state, { payload }: { payload: Post }) => {
      state.createPostLoading = false;
      state.createPostError = null;
      state.isCreatePost = false;
      state.posts = [payload, ...state.posts];
    },
    setCreatePostError: (state, { payload }: { payload: string }) => {
      state.createPostLoading = false;
      state.createPostError = payload;
    },
    setPostsLoading: (state) => {
      state.getPostsLoading = true;
      state.getPostsError = null;
    },
    setPosts: (
      state,
      {
        payload: { posts, postsCount },
      }: { payload: { posts: Post[]; postsCount: number } }
    ) => {
      state.getPostsLoading = false;
      state.posts = posts;
      state.postsCount = postsCount;
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
