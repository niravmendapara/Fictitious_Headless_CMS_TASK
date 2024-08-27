import React from "react";
import { Navigate } from "react-router-dom";

const GuardedRoute = ({ element, meta, ...rest }) => {
  const isAuthenticated = localStorage.getItem("TOKEN") ? true : false;

  if (meta?.auth && !isAuthenticated) {
    return <Navigate to="/login" />;
  } else if (!meta?.auth && isAuthenticated) {
    return <Navigate to="/" />;
  }

  return element;
};

export default GuardedRoute;
