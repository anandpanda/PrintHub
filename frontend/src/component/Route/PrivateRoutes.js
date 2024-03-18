import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";

const PrivateRoutes = ({ isAdmin = false }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  if (loading) {
    return <Loader />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (isAdmin && user.role !== "admin") {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};
export default PrivateRoutes;