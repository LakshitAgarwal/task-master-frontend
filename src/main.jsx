import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Landing from "./Components/Landing.jsx";
import Login from "./Components/Login.jsx";
import Register from "./Components/Register.jsx";
import ToDo from "./Components/ToDo.jsx";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import PublicRoute from "./Components/PublicRoute.jsx";

const appRouter = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <PublicRoute>
            <Landing />
          </PublicRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: "/todo",
        element: (
          <PrivateRoute>
            <ToDo />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRouter} />
);
