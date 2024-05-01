import { useState } from "react";
import ModalOverlay from "./Modal";
import { TbPasswordUser } from "react-icons/tb";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { isResetPasswordAction } from "../../../redux/actions/authActions";

const ResetPasswordModal = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(isResetPasswordAction(false));
  };

  const handleSubmit = () => {};

  return (
    <ModalOverlay onClose={closeModal}>
      <div className="flex flex-col gap-y-8">
        <div>
          <div className="flex items-center gap-x-2">
            <TbPasswordUser size={30} />
            <h1 className="text-3xl font-semibold">Reset Password</h1>
          </div>
          <p className="text-lg text-gray-400">Please set a strong password.</p>
        </div>
        <div className="flex flex-col w-full gap-y-5">
          <div className="flex flex-col items-start gap-1 w-[70%]">
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
          <div className="flex flex-col items-start gap-1 w-[70%]">
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
        </div>
        <div className="flex items-center self-end gap-x-4">
          <button
            onClick={closeModal}
            type="button"
            className={`bg-red-700 hover:bg-red-700/60 text-white py-2 px-4 rounded-lg`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`py-2 bg-slate-300 hover:bg-slate-200`}
            type="submit"
          >
            Add
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default ResetPasswordModal;
