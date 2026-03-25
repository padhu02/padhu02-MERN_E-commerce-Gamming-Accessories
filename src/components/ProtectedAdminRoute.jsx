import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin");

  console.log("isAdmin:", isAdmin); // 🔍 DEBUG LINE

  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
