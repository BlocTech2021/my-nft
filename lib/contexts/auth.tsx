import React, { createContext, useContext } from "react";
import { useCookies } from "react-cookie";
import { LOGGEDIN_USER_COOKIE_NAME } from "../../components/UserMenu/constants";
import { LoggedinUser } from "../types";

export type AuthInfo = {
  isLoggedIn: boolean;
  user: LoggedinUser | undefined;
}

const AuthContext = createContext<AuthInfo>({isLoggedIn: false, user: undefined});

export const AuthProvider = ({ children }: { children: any }) => {
  const [cookie] = useCookies([LOGGEDIN_USER_COOKIE_NAME]);

  const user: LoggedinUser | undefined = cookie[LOGGEDIN_USER_COOKIE_NAME];

  return (
    <AuthContext.Provider value={{isLoggedIn: !!user, user}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext<AuthInfo>(AuthContext)