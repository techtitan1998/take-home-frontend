import * as React from "react";
import { Navigate } from "react-router-dom";
function AuthGuard({ children }) {
  if (!localStorage.getItem("auth-token")) return <Navigate to="/" />;
  return <React.Fragment>{children}</React.Fragment>;
}

export default AuthGuard;
