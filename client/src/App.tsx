import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";

const router = createBrowserRouter([
  {path: "/"}
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
