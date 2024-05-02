import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Register, { loader as registerLoader } from "./pages/Register";
import Login, { loader as loginLoader } from "./pages/Login";
import Home, { loader as homeLoader } from "./pages/Home";
import Root, { loader as rootLoader } from "./pages/Root";
import AskForEmail, { loader as askForEmailLoader } from "./pages/AskForEmail";
import ResetPasswordFromEmail, {
  loader as resetPasswordLoader,
} from "./pages/ResetPasswordFromEmail";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  { path: "/register", element: <Register />, loader: registerLoader },
  { path: "/login", element: <Login />, loader: loginLoader },
  {
    path: "/ask-for-email",
    element: <AskForEmail />,
    loader: askForEmailLoader,
  },
  {
    path: "/reset-password-from-email/:token",
    element: <ResetPasswordFromEmail />,
    loader: resetPasswordLoader,
  },
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    children: [{ index: true, element: <Home />, loader: homeLoader }],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
