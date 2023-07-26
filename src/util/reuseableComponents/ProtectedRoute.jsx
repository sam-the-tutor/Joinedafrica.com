import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, redirectPath, isUserAuthorized }) {
  return isUserAuthorized ? children : <Navigate to={redirectPath} replace />;
}

export default ProtectedRoute;
