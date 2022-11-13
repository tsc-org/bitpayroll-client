import React, { createContext, useEffect, useMemo, useRef, useState } from "react";
import { storageService } from "../auth/storageService";

export interface userAuth {
  username: string;
  userId: string;
  auth: authType | null;
}
export interface authType {
  auth: boolean;
  jwt: string | null;
}
export interface authContextType {
  auth: userAuth;
  setAuth: (value: userAuth) => void;
  onLogin: (auth: authType) => void;
  clearAuth: () => void;
}

export const AuthContext = createContext<authContextType | null>(null);

const initialState = {
  username: "",
  userId: "",
  auth: null,
}

export const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
  const [auth, setAuth] = useState<userAuth>(initialState);

  // const data = storageService.getData()
  const onLogin = (auth: authType) => {
    setAuth(prev => ({...prev, auth}))
    storageService.setData(auth)
  }

  const clearAuth = () => {
    setAuth(initialState)
    storageService.removeData()
  }

  useEffect(() => {
    const data = storageService.getData()
    if (!auth.auth?.auth && data && data.jwt) {
      setAuth(prev => ({...prev, auth: data}))
    }
  }, [])
  
  return (
    <AuthContext.Provider value={{auth, setAuth, onLogin, clearAuth}}>
      {children}
    </AuthContext.Provider>);
};
