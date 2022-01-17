import * as React from "react";
import { Navigate } from "react-router-dom";
import { useAuth, IAuthContext } from "../../contexts/AuthContext";

interface OwnProps {}
export const PrivateRoute: React.FC<OwnProps> = ({ children }) => {
  const { currentUser } = useAuth() as IAuthContext;
  return currentUser ? <>{children}</> : <Navigate to={"/login"} />;
};
