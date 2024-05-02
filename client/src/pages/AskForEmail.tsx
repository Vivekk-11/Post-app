import { FormEvent, useState } from "react";
import { useNavigate, redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { askForEmailAction } from "../../redux/actions/authActions";

const AskForEmail = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { askForEmailLoading } = useAppSelector((state) => state.auth);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (askForEmailLoading) return;
    const isEmailValid =
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email) &&
      email.trim() !== "";

    if (!isEmailValid) {
      setEmailError("Enter a valid Email Address.");
      return;
    }
    dispatch(askForEmailAction(email));
  };

  return (
    <div
      className={`h-screen w-screen flex flex-col items-center justify-center ${
        askForEmailLoading ? "opacity-65" : "opacity-100"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`p-8 shadow-lg flex flex-col items-center justify-center gap-2 w-96`}
      >
        <h1 className="text-2xl font-bold">Reset Password</h1>
        <p className="text-1xl font-semibold my-2 text-center">
          Enter the email associated with your account and we will send you an
          email to reset your password.
        </p>

        <div className="flex flex-col gap-y-2">
          {emailError && (
            <p className="text-red-600 font-bold self-start">{emailError}</p>
          )}
          <input
            className="outline-none bg-gray-300 py-3 p-4 placeholder:text-gray-600 text-lg placeholder:font-bold rounded-lg"
            type="email"
            onChange={(event) => {
              if (askForEmailLoading) return;
              setEmailError("");
              setEmail(event.target.value);
            }}
            value={email}
            placeholder="Email"
            required
          />

          <div className="flex items-center gap-x-2 self-end">
            <button
              type="button"
              className={`hover:opacity-70 ${
                askForEmailLoading ? "cursor-default" : "cursor-pointer"
              }`}
              onClick={() => {
                if (askForEmailLoading) return;
                navigate("/login");
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-slate-200 hover:opacity-70 ${
                askForEmailLoading ? "cursor-default" : "cursor-pointer"
              }`}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AskForEmail;

export const loader = () => {
  const user = Cookies.get("postIT-user");
  if (user) return redirect("/");
  return null;
};
