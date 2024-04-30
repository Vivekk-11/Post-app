import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Register, { loader as registerLoader } from "./pages/Register";

const router = createBrowserRouter([
  { path: "/register", element: <Register />, loader: registerLoader },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
