import React, { createContext, useContext, ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}
interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextData {
  user: User;
}

const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const user: User = {
    id: "12",
    name: "Diego",
    email: "ddzadravec@gmail.com",
    photo: "",
  };

  return (
    <AuthContext.Provider value={{ user: user }}>
      {children}
    </AuthContext.Provider>
  );
};

const UseAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, UseAuth };
