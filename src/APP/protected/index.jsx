import React from "react";
import { Navigate, useLocation } from "react-router";
import useApp from "../../hooks/use-app";

const Protected = ({ children }) => {
  const location = useLocation();

  const { isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default Protected;
