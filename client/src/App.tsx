import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Register, { loader as registerLoader } from "./pages/Register";
import Login, { loader as loginLoader } from "./pages/Login";
import Home from "./pages/Home";
import Root from "./pages/Root";

const router = createBrowserRouter([
  { path: "/register", element: <Register />, loader: registerLoader },
  { path: "/login", element: <Login />, loader: loginLoader },
  {
    path: "/",
    element: <Root />,
    children: [{ index: true, element: <Home /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
