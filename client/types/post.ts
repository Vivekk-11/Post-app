export interface Post {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  creator: {
    picture: string;
    name: string;
    email: string;
    _id: string;
  };
}

export interface PostSlice {
  isCreatePost: boolean;
  createPostLoading: boolean;
  createPostError: null | string;
  getPostsLoading: boolean;
  getPostsError: null | string;
  posts: Post[] | [];
  postsCount: number;
  searchPostsLoading: boolean;
  searchPosts: Post[] | [];
  searchPostsError: null | string;
}
