import { createSlice } from "@reduxjs/toolkit";
import { PostSlice } from "../../types/post";

const initialState: PostSlice = {
  isCreatePost: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setIsCreatePost: (state, { payload }: { payload: boolean }) => {
      state.isCreatePost = payload;
    },
  },
});

export const { setIsCreatePost } = postSlice.actions;
export default postSlice.reducer;
