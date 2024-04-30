import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Register, { loader as registerLoader } from "./pages/Register";
import Login, { loader as loginLoader } from "./pages/Login";

const router = createBrowserRouter([
  { path: "/register", element: <Register />, loader: registerLoader },
  { path: "/login", element: <Login />, loader: loginLoader },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
