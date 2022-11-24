import jwtDecode from "jwt-decode";
import React, { createContext, useEffect, useMemo, useRef, useState } from "react";
import { storageService } from "../auth/storageService";
import { AccountType } from "../pages/sign-up/signUp";

export interface userAuth {
  orgName: string;
  userId: string;
  auth: authType | null;
  email: string;
  firstName: string;
  lastName: string;
  role: AccountType;
  isActive: boolean;
  // [key: string]: string | number;
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
  orgName: "",
  userId: "",
  auth: null,
  email: "",
  firstName: "",
  lastName: "",
  role: AccountType.ORG,
  isActive: false,
}

export const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
  const [auth, setAuth] = useState<userAuth>(initialState as userAuth);

  const decodeJwt = (jwt: string) => {
    const data = jwtDecode(jwt)
    return data
  }

  const updateAuth = (data: any, auth: authType) => {
    let {orgName, id, email, firstName, lastName, role, isActive, ...others} = data
    let _formattedRole = Object.values(AccountType).findIndex(enumRole => enumRole === role as unknown as AccountType)
    let _updatedAuth = {
      orgName,
      userId: id ?? "",
      auth,
      email,
      firstName,
      lastName,
      role: [AccountType.ORG, AccountType.EMP][_formattedRole],
      isActive,
    }
    setAuth(_updatedAuth)
  }

  const onLogin = (auth: authType) => {
    if (!auth.jwt) return
    storageService.setData(auth)
    // setAuth(prev => ({...prev, auth}))
    const jwtData = decodeJwt(auth.jwt)
    updateAuth(jwtData, auth)
  }

  const clearAuth = () => {
    setAuth(initialState)
    storageService.removeData()
  }

  useEffect(() => {
    const data = storageService.getData()
    if (!auth.auth?.auth && data && data.jwt) {
      const jwtData = decodeJwt(data.jwt)
      // setAuth(prev => ({...prev, auth: data}))
      updateAuth(jwtData, data)
    }
  }, [])
  
  return (
    <AuthContext.Provider value={{auth, setAuth, onLogin, clearAuth}}>
      {children}
    </AuthContext.Provider>);
};
