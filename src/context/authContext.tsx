import React, { createContext, useState } from "react";

export interface authType {
  username: string;
  userId: string;
  access_token: string;
}
export interface authContextType {
  auth: authType;
  setAuth: (value: authType) => void
}

export const AuthContext = createContext<authContextType | null>(null);


export const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
  const [auth, setAuth] = useState<authType>({
    username: "test",
    userId: "test",
    access_token: "test",
  });

  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>);
};
