import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

const Root = () => {
  return (
    <main className="h-screen w-screen flex flex-col items-center">
      <div className="w-[80%] space-y-2">
        <Header />
        <Outlet />
      </div>
    </main>
  );
};

export default Root;
