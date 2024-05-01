import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { useAppSelector } from "../../hooks/reduxHooks";
import DeleteAccountModal from "../components/modals/DeleteAccountModal";
import CreatePostModal from "../components/modals/CreatePostModal";
import Cookies from "js-cookie";
import { redirect } from "react-router-dom";
import ResetPasswordModal from "../components/modals/ResetPasswordModal";

const Root = () => {
  const { isDeleteAccount, isResetPassword } = useAppSelector(
    (state) => state.auth
  );
  const { isCreatePost } = useAppSelector((state) => state.post);

  return (
    <main className="h-screen w-screen flex flex-col items-center">
      {isDeleteAccount && <DeleteAccountModal />}
      {isCreatePost && <CreatePostModal />}
      {isResetPassword && <ResetPasswordModal />}
      <div className="w-[80%] space-y-2">
        <Header />
        <Outlet />
      </div>
    </main>
  );
};

export default Root;

export const loader = () => {
  const user = Cookies.get("postIT-user");
  if (!user) return redirect("/login");
  return null;
};
