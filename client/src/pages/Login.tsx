import Cookies from "js-cookie";
import { FormEvent, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { loginAction } from "../../redux/actions/authActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { loginLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (loginLoading) return;
    setEmailError("");
    setPasswordError("");

    const isPasswordValid = password.trim() !== "";
    const isEmailValid =
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email) &&
      email.trim() !== "";
    if (!isEmailValid) {
      setEmailError("Enter a valid Email Address.");
      return;
    }
    if (!isPasswordValid) {
      setPasswordError("Password should contain 8 characters!");
      return;
    }
    dispatch(loginAction({ email, password }, navigate));
  };

  return (
    <div
      className={`h-screen w-screen flex flex-col items-center justify-center`}
    >
      <div
        className={`p-8 shadow-lg flex flex-col items-center justify-center gap-2 w-[25rem] ${
          loginLoading ? "opacity-65" : "opacity-100"
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
          <h1 className="text-2xl font-bold text-gray-600">Login</h1>
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <div className="flex flex-col items-start gap-1 w-full">
              {emailError && (
                <p className="text-red-600 font-bold">{emailError}</p>
              )}
              <input
                className="outline-none w-full bg-gray-300 py-3 p-4 placeholder:text-gray-600 text-lg placeholder:font-bold rounded-lg"
                type="email"
                onChange={(event) => {
                  if (loginLoading) return;
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
                  if (loginLoading) return;
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
          </div>
          <button
            onClick={handleSubmit}
            className={`${
              loginLoading
                ? "cursor-default outline-none opacity-60 hover:bg-[#f9f9f9]"
                : "cursor-pointer"
            } hover:bg-gray-400/50 w-full`}
          >
            Login
          </button>
        </form>
        <Link
          to="/ask-for-email"
          className="mr-auto font-semibold text-blue-700 hover:opacity-65"
        >
          Forgot Password?
        </Link>
        <p className="text-gray-600 font-semibold">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-bold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

export const loader = () => {
  const user = Cookies.get("postIT-user");
  if (user) return redirect("/");
  return null;
};
