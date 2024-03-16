//Working but not properly implemented
import React from "react";
import { Navigate } from "react-router-dom";

const WithAuth = ({ isAdmin, isAuthenticated, user, children }) => {
  if (!isAuthenticated || (isAdmin && user.role !== "admin")) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default WithAuth;
