import ModalOverlay from "./Modal";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { setIsDeleteAccount } from "../../../redux/slices/authSlices";
import { deleteAccountAction } from "../../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

const DeleteAccountModal = () => {
  const { isDeleteAccount, deleteAccountLoading } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  if (!isDeleteAccount) return null;

  const closeModal = () => {
    if (deleteAccountLoading) return;
    dispatch(setIsDeleteAccount(false));
  };

  const deleteAccountHandler = () => {
    if (deleteAccountLoading) return;
    dispatch(deleteAccountAction(navigate));
  };
  return (
    <ModalOverlay onClose={closeModal} className="tab:top-[30vh]">
      <div
        className={`flex flex-col gap-4 opacity-100 ${
          deleteAccountLoading ? "opacity-65" : "opacity-100"
        }`}
      >
        <h1 className="text-red-800 font-bold text-2xl">
          Deleting Your Account!
        </h1>
        <p className="text-gray-800 font-semibold text-md">
          After Deleting your PostIT Account, you will lose access to of all
          your posts and will never be able to gain access to them again.
        </p>

        <p className="text-black font-bold text-md">
          This action can't be undone. Are you sure you want to delete your
          PostIT Account?
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={closeModal}
            style={{ backgroundColor: "var(--main-color)" }}
            className={`bg-red-200 text-gray-700 py-2 px-4 rounded-md font-semibold outline-none opacity-100 ${
              deleteAccountLoading
                ? "opacity-65 cursor-default"
                : "opacity-100 cursor-pointer"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={deleteAccountHandler}
            className={` bg-red-700 text-white py-2 px-4 rounded-md font-semibold outline-none opacity-100 ${
              deleteAccountLoading
                ? "opacity-65 cursor-default"
                : "opacity-100 cursor-pointer"
            }`}
          >
            Delete Account
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default DeleteAccountModal;
