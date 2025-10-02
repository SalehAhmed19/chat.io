import React, { Children, useContext } from "react";
import { AuthContext } from "../../../context/context";
import Login from "../../pages/Login";
import { Navigate } from "react-router-dom";

export default function AuthenticatedRout({ children }) {
  const { authUser } = useContext(AuthContext);

  return <>{!authUser ? children : <Navigate to={"/"} />}</>;
}
