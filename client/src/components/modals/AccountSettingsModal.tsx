import ModalOverlay from "./Modal";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import {
  isAccountSettingsAction,
  isDeleteAccountAction,
  isResetPasswordAction,
  logoutAction,
} from "../../../redux/actions/authActions";
import { IoSettingsOutline } from "react-icons/io5";
import { MdDelete, MdLockReset } from "react-icons/md";
import { CgLogOut } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const AccountSettingsModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const closeModal = () => {
    dispatch(isAccountSettingsAction(false));
  };

  const deleteAccountHandler = () => {
    dispatch(isDeleteAccountAction(true));
  };

  const logoutHandler = () => {
    dispatch(logoutAction(navigate));
  };

  const resetPasswordHandler = () => {
    dispatch(isResetPasswordAction(true));
  };

  return (
    <ModalOverlay onClose={closeModal}>
      <div className="flex flex-col gap-y-6">
        <div>
          <div className="flex items-center gap-x-2 font-semibold">
            <IoSettingsOutline size={40} />
            <h2 className="text-3xl font-semibold">Account Settings</h2>
          </div>
          <p className="text-lg text-gray-400">
            Handle all your account related settings here.
          </p>
        </div>
        <div className="flex flex-col gap-y-2 items-start">
          <div
            onClick={resetPasswordHandler}
            className="cursor-pointer hover:opacity-70 flex items-center gap-x-2"
          >
            <MdLockReset size={25} />
            <p className="font-semibold text-lg">Reset your password</p>
          </div>
          <div
            onClick={logoutHandler}
            className="cursor-pointer hover:opacity-70 flex items-center gap-x-2"
          >
            <CgLogOut size={25} />
            <p className="font-semibold text-lg">Logout</p>
          </div>
          <div
            onClick={deleteAccountHandler}
            className="cursor-pointer hover:opacity-70 flex items-center gap-x-2 text-red-700"
          >
            <MdDelete size={25} />
            <p className="font-semibold text-lg">Delete Account</p>
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default AccountSettingsModal;
