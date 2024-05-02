import { useState } from "react";
import ModalOverlay from "./Modal";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { TbPasswordUser } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  isResetPasswordAction,
  resetPasswordAction,
} from "../../../redux/actions/authActions";

const ResetPasswordModal = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { resetPasswordLoading } = useAppSelector((state) => state.auth);

  const closeModal = () => {
    if (resetPasswordLoading) return;
    dispatch(isResetPasswordAction(false));
  };

  const handleSubmit = () => {
    if (resetPasswordLoading) return;
    const isPasswordValid = password.trim().length >= 8;
    const isConfirmPassword = password.trim() === confirmPassword.trim();

    if (!isPasswordValid) {
      setPasswordError("Password should contain 8 characters!");
      return;
    }
    if (!isConfirmPassword) {
      setConfirmPasswordError("Passwords should match!");
      return;
    }
    dispatch(resetPasswordAction(password));
  };

  return (
    <ModalOverlay onClose={closeModal} className="tab:top-[30vh]">
      <div
        className={`flex flex-col gap-y-8 ${
          resetPasswordLoading ? "opacity-65" : "opacity-100"
        }`}
      >
        <div>
          <div className="flex items-center gap-x-2">
            <TbPasswordUser size={30} />
            <h1 className="text-3xl font-semibold">Reset Password</h1>
          </div>
          <p className="text-lg text-gray-400">Please set a strong password.</p>
        </div>
        <div className="flex flex-col w-full gap-y-5">
          <div className="flex flex-col items-start gap-1 w-[70%] mobile:w-full">
            <div className="w-full mobile:w-full relative">
              <input
                className="outline-none w-full bg-gray-300 py-3 p-4 placeholder:text-gray-600 text-lg placeholder:font-bold rounded-lg mobile:w-full pr-9"
                type={showPassword ? "text" : "password"}
                onChange={(event) => {
                  if (resetPasswordLoading) return;
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
                    if (resetPasswordLoading) return;
                    setShowPassword(true);
                  }}
                  className="cursor-pointer text-gray-600 text-2xl absolute right-2 top-1/2 -translate-y-[50%]"
                />
              ) : (
                <IoEyeOff
                  onClick={() => {
                    if (resetPasswordLoading) return;
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
          <div className="flex flex-col items-start gap-1 w-[70%] mobile:w-full">
            <div className="w-full mobile:w-full relative">
              <input
                className="outline-none w-full bg-gray-300 py-3 p-4 placeholder:text-gray-600 text-lg placeholder:font-bold rounded-lg mobile:w-full pr-9"
                type={showConfirmPassword ? "text" : "password"}
                onChange={(event) => {
                  if (resetPasswordLoading) return;
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
                    if (resetPasswordLoading) return;
                    setShowConfirmPassword(true);
                  }}
                  className="cursor-pointer text-gray-600 text-2xl absolute right-2 top-1/2 -translate-y-[50%]"
                />
              ) : (
                <IoEyeOff
                  onClick={() => {
                    if (resetPasswordLoading) return;
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
        </div>
        <div className="flex items-center self-end gap-x-4">
          <button
            onClick={closeModal}
            className={`bg-red-700 hover:bg-red-700/60 text-white py-2 px-4 rounded-lg ${
              resetPasswordLoading ? "opacity-65 cursor-default" : "opacity-100"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`py-2 bg-slate-300 hover:bg-slate-200 ${
              resetPasswordLoading ? "opacity-65 cursor-default" : "opacity-100"
            }`}
          >
            Add
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default ResetPasswordModal;
