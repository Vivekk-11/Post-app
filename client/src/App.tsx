import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Register, { loader as registerLoader } from "./pages/Register";
import Login, { loader as loginLoader } from "./pages/Login";
import Home, { loader as homeLoader } from "./pages/Home";
import Root, { loader as rootLoader } from "./pages/Root";

const router = createBrowserRouter([
  { path: "/register", element: <Register />, loader: registerLoader },
  { path: "/login", element: <Login />, loader: loginLoader },
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    children: [{ index: true, element: <Home />, loader: homeLoader }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
