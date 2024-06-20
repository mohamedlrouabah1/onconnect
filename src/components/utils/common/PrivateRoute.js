import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children, authenticated, ...rest }) => {
  const location = useLocation();

  return authenticated ? (
    React.cloneElement(children, rest)
  ) : (
    <Navigate to="/#/login" state={{ from: location }} replace />
  );
};

export const SignupRoute = ({ children }) => {
  const location = useLocation();
  const isRoleSelectionPath =
    location.pathname === "/#/signup/select-roles" ||
    location.pathname === "/#/signup/select-roles/developer-form" ||
    location.pathname === "/#/signup/select-roles/user-form";

  if (
    isRoleSelectionPath &&
    (!location.state || !location.state.userData || !location.state.fromSignup)
  ) {
    return <Navigate to="/#/signup" replace />;
  }

  return React.cloneElement(children);
};
