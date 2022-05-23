import React, { createContext, useContext, ReactNode } from "react";
import * as AuthSession from "expo-auth-session";

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
  singInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const user: User = {
    id: "12",
    name: "Diego",
    email: "ddzadravec@gmail.com",
    photo: "",
  };

  const singInWithGoogle = async () => {
    try {
      const CLIENT_ID =
        "282684136250-vdcdruhl2rdqnjf2pg087g9g8tj2inp2.apps.googleusercontent.com";
      const REDIRECT_URI = "https://auth.expo.io/@ddzadravec/gofinances";
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const response = await AuthSession.startAsync({ authUrl });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, singInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

const UseAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, UseAuth };
