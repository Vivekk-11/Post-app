export interface User {
  userId: string;
  fullName: string;
  username: string;
  email: string;
  picture: string;
  token: string;
}

export interface AuthSlice {
  user: User | null;
  registerLoading: boolean;
  registerError: string | null;
  loginLoading: boolean;
  loginError: string | null;
  isDeleteAccount: boolean;
  deleteAccountLoading: boolean;
  deleteAccountError: null | string;
  updateProfileLoading: boolean;
  updateProfileError: null | string;
  isAccountSettings: boolean;
  isResetPassword: boolean;
}
