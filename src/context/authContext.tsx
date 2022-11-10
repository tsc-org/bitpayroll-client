import React, { createContext, useEffect, useRef, useState } from "react";
import { storageService } from "../auth/storageService";

export interface userAuth {
  username: string;
  userId: string;
  auth: authType | null;
}

export interface authType {
  auth: boolean;
  jwt: string;
}
export interface authContextType {
  auth: userAuth;
  setAuth: (value: userAuth) => void
}

export const AuthContext = createContext<authContextType | null>(null);

const initialState = {
  username: "",
  userId: "",
  auth: null,
}

export const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
  const [auth, setAuth] = useState<userAuth>(initialState);

  const data = useRef(storageService.getData()).current

  useEffect(() => {
    if (!auth.auth) {
      setAuth(data)
    }
  
    return () => {
      setAuth(initialState)
    }
  }, [data])
  

  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>);
};
