import { Link, useNavigate } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { ChangeEvent, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import useClickOutside from "../../hooks/useClickOutside";
import {
  isDeleteAccountAction,
  isResetPasswordAction,
  logoutAction,
  updateProfileAction,
} from "../../redux/actions/authActions";
import { isCreatePostAction } from "../../redux/actions/postActions";
import { MdDelete, MdLockReset, MdLogout } from "react-icons/md";

export const Header = () => {
  const { user, updateProfileLoading } = useAppSelector((state) => state.auth);
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const divRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  useClickOutside(divRef, () => setIsProfileClicked(false));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeProfileHandler = () => {
    fileRef?.current?.click();
  };

  const changeImageHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setIsProfileClicked(false);
    if (event?.target?.files?.[0]) {
      //@ts-expect-error ignore typescript
      setProfilePicture(event.target.files[0]);
      const value = new FormData();
      value.append("profileImage", event.target.files[0]);
      dispatch(updateProfileAction(value));
    }
  };

  const addPost = () => {
    dispatch(isCreatePostAction(true));
  };

  const resetPasswordHandler = () => {
    if (!user) return;
    setIsProfileClicked(false);
    dispatch(isResetPasswordAction(true));
  };

  const logoutHandler = () => {
    dispatch(logoutAction(navigate));
  };

  const deleteAccountHandler = () => {
    setIsProfileClicked(false);
    dispatch(isDeleteAccountAction(true));
  };

  return (
    <header className="h-[3rem] w-full flex items-center justify-between">
      <Link to="/" className="flex items-center text-black hover:text-black/85">
        <img
          src="/header-logo.webp"
          alt="LOGO"
          className="h-12 w-12 object-cover"
        />
        <h3 className="text-2xl font-extrabold">PostIT</h3>
      </Link>
      {user && (
        <div className="flex items-center gap-x-10">
          <IoIosAdd onClick={addPost} className="cursor-pointer" size={60} />
          <div
            ref={divRef}
            className={`flex flex-col items-center justify-center relative ${
              updateProfileLoading
                ? "cursor-default opacity-65"
                : "cursor-pointer opacity-100"
            }`}
          >
            <img
              onClick={() => {
                if (updateProfileLoading) return;
                setIsProfileClicked(!isProfileClicked);
              }}
              src={
                profilePicture
                  ? //@ts-expect-error ignore typescript
                    URL.createObjectURL(profilePicture)
                  : user?.picture
              }
              alt=""
              className={`h-10 w-10 mobile:h-8 mobile:w-8 object-cover rounded-full ${
                updateProfileLoading
                  ? "cursor-default opacity-65"
                  : "cursor-pointer opacity-100"
              }`}
            />
            {isProfileClicked && (
              <div className="bg-white w-44 shadow-lg px-2 py-2 z-20 absolute top-12 -left-3 flex flex-col items-start justify-start gap-1">
                <input
                  accept=".jpg, .jpeg, .png"
                  onChange={changeImageHandler}
                  ref={fileRef}
                  type="file"
                  hidden
                />
                <p
                  onClick={changeProfileHandler}
                  className="flex items-center gap-2 w-full hover:bg-gray-600 hover:text-gray-100 hover:rounded-lg cursor-pointer p-1 px-2"
                >
                  <CgProfile /> Change Profile
                </p>
                <p
                  onClick={resetPasswordHandler}
                  className="flex items-center gap-2 w-full hover:bg-gray-600 hover:text-gray-100 hover:rounded-lg cursor-pointer p-1 px-2"
                >
                  <MdLockReset /> Reset Password
                </p>
                <p
                  onClick={logoutHandler}
                  className="flex items-center gap-2 w-full hover:bg-gray-600 hover:text-gray-100 hover:rounded-lg cursor-pointer p-1 px-2"
                >
                  <MdLogout /> Logout
                </p>
                <p
                  onClick={deleteAccountHandler}
                  className="flex items-center gap-2 w-full hover:bg-gray-600 hover:text-gray-100 hover:rounded-lg cursor-pointer p-1 px-2"
                >
                  <MdDelete /> Delete Account
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
