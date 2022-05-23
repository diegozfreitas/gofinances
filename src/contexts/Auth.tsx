import React, { createContext, useContext, ReactNode, useState } from "react";
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

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState({} as User)

  const singInWithGoogle = async () => {
    try {
      const CLIENT_ID =
        "282684136250-vdcdruhl2rdqnjf2pg087g9g8tj2inp2.apps.googleusercontent.com";
      const REDIRECT_URI = "https://auth.expo.io/@ddzadravec/gofinances";
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type === "success") {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );
        const userInfo = await response.json();

        const user: User = {
          email: userInfo.email,
          id: userInfo.id,
          name: userInfo.given_name + userInfo.family_name,
          photo: userInfo.picture
        }

        setUser(user)
      }
    } catch (err) {
      console.log("error", err);
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
