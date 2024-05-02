import Cookies from "js-cookie";
import { FormEvent, useRef, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { registerAction } from "../../redux/actions/authActions";
import { CgProfile } from "react-icons/cg";
import { MdCancel } from "react-icons/md";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { registerLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (registerLoading) return;
    setEmailError("");
    setPasswordError("");
    setNameError("");

    const isNameValid = name.trim() !== "";
    const isPasswordValid = password.trim().length >= 8;
    const isEmailValid =
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email) &&
      email.trim() !== "";
    const isConfirmPassword = password.trim() === confirmPassword.trim();
    if (!isNameValid) {
      setNameError("Enter Your Name!");
      return;
    }
    if (!isEmailValid) {
      setEmailError("Enter a valid Email Address!");
      return;
    }
    if (!isPasswordValid) {
      setPasswordError("Password should contain 8 characters!");
      return;
    }
    if (!isConfirmPassword) {
      setConfirmPasswordError("Passwords should match!");
      return;
    }
    const values = new FormData();
    values.append("name", name);
    values.append("email", email);
    values.append("password", password);
    if (profileImage && typeof profileImage === "string") {
      values.append("profileImage", profileImage);
    }
    dispatch(registerAction(values, navigate));
  };

  return (
    <div
      className={`h-screen w-screen flex flex-col items-center justify-center overflow-x-hidden`}
    >
      <div
        className={`p-8 shadow-lg gap-2 w-[25rem] ${
          registerLoading ? "opacity-65" : "opacity-100"
        }`}
      >
        <div className="flex items-center justify-center gap-x-1">
          <img src="/header-logo.webp" className="h-8 w-8 object-cover" />
          <h1 className="font-bold text-lg">Welcome To PostIT!</h1>
        </div>
        <p className="text-gray-500 font-semibold text-md">
          The Best Platform To Post Stuff.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-6 w-full"
        >
          <h1 className="text-2xl font-bold text-gray-600">Sign Up</h1>
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <div className="flex flex-col items-start gap-1 w-full">
              {nameError && (
                <p className="text-red-600 font-bold">{nameError}</p>
              )}
              <input
                className="w-full outline-none bg-gray-300 py-3 p-4 placeholder:text-gray-600 text-lg placeholder:font-bold rounded-lg"
                type="text"
                onChange={(event) => {
                  if (registerLoading) return;
                  setNameError("");
                  setName(event.target.value);
                }}
                value={name}
                placeholder="Name"
                required
              />
            </div>
            <div className="flex flex-col items-start gap-1 w-full">
              {emailError && (
                <p className="text-red-600 font-bold">{emailError}</p>
              )}
              <input
                className="outline-none w-full bg-gray-300 py-3 p-4 placeholder:text-gray-600 text-lg placeholder:font-bold rounded-lg"
                type="email"
                onChange={(event) => {
                  if (registerLoading) return;
                  setEmailError("");
                  setEmail(event.target.value);
                }}
                value={email}
                placeholder="Email"
                required
              />
            </div>
            <div className="flex flex-col items-start gap-1 w-full">
              <div className="w-full relative">
                <input
                  className="pr-9 outline-none w-full bg-gray-300 py-3 p-4 placeholder:text-gray-600 text-lg placeholder:font-bold rounded-lg"
                  type={showPassword ? "text" : "password"}
                  onChange={(event) => {
                    if (registerLoading) return;
                    setPasswordError("");
                    setPassword(event.target.value);
                  }}
                  value={password}
                  placeholder="Password"
                  required
                />
                {!showPassword ? (
                  <IoEye
                    onClick={() => {
                      if (registerLoading) return;
                      setShowPassword(true);
                    }}
                    className="cursor-pointer text-gray-600 text-2xl absolute right-2 top-1/2 -translate-y-[50%]"
                  />
                ) : (
                  <IoEyeOff
                    onClick={() => {
                      if (registerLoading) return;
                      setShowPassword(false);
                    }}
                    className="cursor-pointer text-gray-600 text-2xl absolute right-2 top-1/2 -translate-y-[50%]"
                  />
                )}
              </div>
              {passwordError && (
                <p className="text-red-500 font-bold">{passwordError}</p>
              )}
            </div>
            <div className="flex flex-col items-start gap-1 w-full">
              <div className="w-full relative">
                <input
                  className="pr-9 outline-none w-full bg-gray-300 py-3 p-4 placeholder:text-gray-600 text-lg placeholder:font-bold rounded-lg"
                  type={showConfirmPassword ? "text" : "password"}
                  onChange={(event) => {
                    if (registerLoading) return;
                    setConfirmPasswordError("");
                    setConfirmPassword(event.target.value);
                  }}
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  required
                />
                {!showConfirmPassword ? (
                  <IoEye
                    onClick={() => {
                      if (registerLoading) return;
                      setShowConfirmPassword(true);
                    }}
                    className="cursor-pointer text-gray-600 text-2xl absolute right-2 top-1/2 -translate-y-[50%]"
                  />
                ) : (
                  <IoEyeOff
                    onClick={() => {
                      if (registerLoading) return;
                      setShowConfirmPassword(false);
                    }}
                    className="cursor-pointer text-gray-600 text-2xl absolute right-2 top-1/2 -translate-y-[50%]"
                  />
                )}
              </div>
              {confirmPasswordError && (
                <p className="text-red-500 font-bold">{confirmPasswordError}</p>
              )}
            </div>
            <div className="self-start mx-2 relative">
              {!profileImage && (
                <button
                  className="flex items-center gap-x-2 text-sm font-semibold cursor-pointer bg-transparent"
                  onClick={() => {
                    if (registerLoading) return;
                    inputRef.current?.click();
                  }}
                >
                  <CgProfile size={20} />
                  Upload Profile Photo
                </button>
              )}
              {profileImage && (
                <>
                  <div
                    onClick={() => {
                      if (registerLoading) return;
                      setProfileImage("");
                    }}
                    className={`${
                      registerLoading ? "opacity-65" : "opacity-100"
                    } absolute top-0 right-0 cursor-pointer bg-white text-black rounded-full h-3 w-3`}
                  >
                    <MdCancel size={12} />
                  </div>
                  <img
                    onClick={() => {
                      if (registerLoading) return;
                      inputRef.current?.click();
                    }}
                    className={`w-10 h-10 rounded-full object-cover cursor-pointer ${
                      registerLoading ? "opacity-65" : "opacity-100"
                    }`}
                    //@ts-expect-error ignore typescript
                    src={URL.createObjectURL(profileImage)}
                  />
                </>
              )}
              <input
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (event?.target?.files?.[0]) {
                    //@ts-expect-error ignore typescript
                    setProfileImage(event.target.files[0]);
                  }
                }}
                accept=".jpg, .jpeg, .png"
                id="file-upload"
                ref={inputRef}
                type="file"
                hidden
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className={`${
              registerLoading
                ? "cursor-default outline-none opacity-60 hover:bg-[#f9f9f9]"
                : "cursor-pointer"
            } hover:bg-gray-400/50 w-full`}
          >
            Sign up
          </button>
        </form>
        <p className="self-start text-gray-600 font-semibold my-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-bold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

export const loader = () => {
  const user = Cookies.get("postIT-user");
  if (user) return redirect("/");
  return null;
};
