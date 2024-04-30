import Cookies from "js-cookie";
import { FormEvent, useRef, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { registerAction } from "../../redux/actions/authActions";
import { CgProfile } from "react-icons/cg";
import { MdCancel } from "react-icons/md";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [profileImage, setProfileImage] = useState<Blob | MediaSource | null>(
    null
  );
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
    if (
      profileImage &&
      (typeof profileImage === "string" || profileImage instanceof Blob)
    ) {
      values.append("profileImage", profileImage);
    }
    dispatch(registerAction(values, navigate));
  };

  return (
    <div
      className={`p-8 shadow-lg gap-2 w-[25rem] ${
        registerLoading ? "opacity-65" : "opacity-100"
      }`}
    >
      <h1 className="font-bold text-lg">Welcome To PostIT!</h1>
      <p className="text-gray-500 font-semibold text-md">
        The Best Platform To Post Stuff.
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-6 w-full"
      >
        <h1 className="text-3xl font-bold text-gray-600">Sign Up</h1>
        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <div className="flex flex-col items-start gap-1 w-full">
            {nameError && <p className="text-red-600 font-bold">{nameError}</p>}
            <input
              className="w-full outline-none bg-gray-300 py-3 p-4 placeholder:text-gray-600 text-lg placeholder:font-bold rounded-lg"
              type="text"
              onChange={(event) => {
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
                setEmailError("");
                setEmail(event.target.value);
              }}
              value={email}
              placeholder="Email"
              required
            />
          </div>
          <div className="flex flex-col items-start gap-1 w-full">
            <input
              className="outline-none w-full bg-gray-300 py-3 p-4 placeholder:text-gray-600 text-lg placeholder:font-bold rounded-lg"
              type="password"
              onChange={(event) => {
                setPasswordError("");
                setPassword(event.target.value);
              }}
              value={password}
              placeholder="Password"
              required
            />
            {passwordError && (
              <p className="text-red-500 font-bold">{passwordError}</p>
            )}
          </div>
          <div className="flex flex-col items-start gap-1 w-full">
            <input
              className="outline-none w-full bg-gray-300 py-3 p-4 placeholder:text-gray-600 text-lg placeholder:font-bold rounded-lg"
              type="password"
              onChange={(event) => {
                setConfirmPasswordError("");
                setConfirmPassword(event.target.value);
              }}
              value={confirmPassword}
              placeholder="Confirm Password"
              required
            />
            {confirmPasswordError && (
              <p className="text-red-500 font-bold">{confirmPasswordError}</p>
            )}
          </div>
          <div className="self-start mx-2 relative">
            {!profileImage && (
              <label
                htmlFor="file-upload"
                className="flex items-center gap-x-2 text-sm font-semibold cursor-pointer"
                onClick={() => inputRef.current?.click()}
              >
                <CgProfile size={20} />
                Upload Profile Photo
              </label>
            )}
            {profileImage && (
              <>
                <div
                  onClick={() => setProfileImage(null)}
                  className="absolute top-0 right-0 cursor-pointer bg-white text-black rounded-full h-3 w-3"
                >
                  <MdCancel size={12} />
                </div>
                <img
                  onClick={() => inputRef.current?.click()}
                  className="w-10 h-10 rounded-full object-cover cursor-pointer"
                  src={URL.createObjectURL(profileImage)}
                />
              </>
            )}
            <input
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (event?.target?.files?.[0]) {
                  setProfileImage(event.target.files[0] as Blob);
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
          className={`${
            registerLoading
              ? "cursor-default outline-none opacity-60 hover:bg-[#f9f9f9]"
              : "cursor-pointer"
          } hover:bg-gray-400/50 w-full`}
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Register;

export const loader = () => {
  const user = Cookies.get("postIT-user");
  if (user) return redirect("/");
  return null;
};
