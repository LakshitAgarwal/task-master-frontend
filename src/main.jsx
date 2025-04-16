import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Landing from "./Components/Landing.jsx";
import Login from "./Components/Login.jsx";
import Register from "./Components/Register.jsx";
import ToDo from "./Components/ToDo.jsx";

const appRouter = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/todo",
        element: <ToDo />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRouter} />
);
