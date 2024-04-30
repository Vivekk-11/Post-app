import Cookies from "js-cookie";
import { FormEvent, useState } from "react";
import { Link, redirect } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (event: FormEvent) => {
    setEmailError("");
    setPasswordError("");
    event.preventDefault();

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
  };

  return (
    <div className="p-8 shadow-lg flex flex-col items-center justify-center gap-2 w-[25rem]">
      <h1 className="font-bold text-lg">Welcome To PostIT!</h1>
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
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              placeholder="Email"
              required
            />
          </div>
          <div className="flex flex-col items-start gap-1 w-full">
            <input
              className="outline-none w-full bg-gray-300 py-3 p-4 placeholder:text-gray-600 text-lg placeholder:font-bold rounded-lg"
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              placeholder="Password"
              required
            />
            {passwordError && (
              <p className="text-red-500 font-bold">{passwordError}</p>
            )}
          </div>
        </div>
        <button className="w-full hover:bg-gray-400/50">Login</button>
      </form>
      <p className="text-gray-600 font-semibold">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 font-bold">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;

export const loader = () => {
  console.log("LOGIN");
  const user = Cookies.get("postIT-user");
  if (user) return redirect("/");
  return null;
};
