import ModalOverlay from "./Modal";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { setIsDeleteAccount } from "../../../redux/slices/authSlices";

const DeleteAccountModal = () => {
  const { isDeleteAccount } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  if (!isDeleteAccount) return null;

  const closeModal = () => {
    dispatch(setIsDeleteAccount(false));
  };

  const deleteAccountHandler = () => {
    // TODO: Delete Account
  };

  return (
    <ModalOverlay onClose={closeModal}>
      <div className={`flex flex-col gap-4`}>
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
            className={`bg-red-200 text-gray-700 py-2 px-4 rounded-md font-semibold outline-none`}
          >
            Cancel
          </button>
          <button
            onClick={deleteAccountHandler}
            className={` bg-red-700 text-white py-2 px-4 rounded-md font-semibold outline-none`}
          >
            Delete Account
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default DeleteAccountModal;
