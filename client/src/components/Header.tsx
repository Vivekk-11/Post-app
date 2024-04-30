import { Link, useNavigate } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { useAppSelector } from "../../hooks/reduxHooks";
import { ChangeEvent, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import useClickOutside from "../../hooks/useClickOutside";

export const Header = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const [profilePicture, setProfilePicture] = useState<Blob | null>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  useClickOutside(divRef, () => setIsProfileClicked(false));
  const navigate = useNavigate();
  const addPost = () => {
    // TODO: add Post
  };
  const changeProfileHandler = () => {
    fileRef?.current?.click();
    setIsProfileClicked(false);
  };

  const changeImageHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setProfilePicture(event.target.files[0]);
    }
  };

  const logoutHandler = () => {};

  const deleteAccountHandler = () => {};

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
      {user ? (
        <div className="flex items-center gap-x-10">
          <IoIosAdd onClick={addPost} className="cursor-pointer" size={60} />
          <div
            ref={divRef}
            className="flex flex-col items-center justify-center relative cursor-pointer"
          >
            <img
              onClick={() => {
                setIsProfileClicked(!isProfileClicked);
              }}
              src={
                profilePicture
                  ? URL.createObjectURL(profilePicture)
                  : user?.picture
              }
              alt=""
              className={`h-10 w-10 mobile:h-8 mobile:w-8 object-cover rounded-full `}
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
                  onClick={logoutHandler}
                  className="flex items-center gap-2 w-full hover:bg-gray-600 hover:text-gray-100 hover:rounded-lg cursor-pointer p-1 px-2"
                >
                  <CiLogout /> Logout
                </p>
                <p
                  onClick={() => {
                    setIsProfileClicked(false);
                    deleteAccountHandler();
                  }}
                  className="flex items-center gap-2 w-full hover:bg-gray-600 hover:text-gray-100 hover:rounded-lg cursor-pointer p-1 px-2"
                >
                  <MdDelete /> Delete Account
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-x-5">
          <button
            onClick={() => navigate("/login")}
            className="text-[#1a1a1a] bg-[#f9f9f9] hover:bg-[#213547] hover:text-[#ffffff]"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-[#213547] text-[#ffffff] hover:text-[#1a1a1a] hover:bg-[#f9f9f9]"
          >
            Sign up
          </button>
        </div>
      )}
    </header>
  );
};
