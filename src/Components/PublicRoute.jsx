import React from "react";
import { getUser } from "../utils/getUser";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = !!getUser()?.token;
  return isLoggedIn ? <Navigate to="/todo" replace /> : children;
};

export default PrivateRoute;
