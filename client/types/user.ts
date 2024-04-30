export interface User {
  userId: string;
  fullName: string;
  username: string;
  email: string;
  profilePhoto: string;
  token: string;
}

export interface AuthSlice {
  user: User | null;
  registerLoading: boolean;
  registerError: string | null;
}
