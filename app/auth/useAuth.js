import React from "react";
import jwtDecode from "jwt-decode";
import authStorage from "../api/authStorage";
import AuthContext from "./authContext";

export default useAuth = () => {
  const { user, setUser } = React.useContext(AuthContext);

  const logIn = (tokens) => {
    setUser(jwtDecode(tokens.access));
    authStorage.storeTokens(tokens);
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeTokens();
  };
  return { logIn, logOut, user };
};
