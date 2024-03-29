import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { LogBox } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from "expo-auth-session";
import * as AppleAuThentication from "expo-apple-authentication";

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

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
  singInWithApple: () => Promise<void>;
  singOut: () => Promise<void>;
  isLoading: boolean;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;

  authentication: null;
  errorCode: string;
}

const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState({} as User);
  const [isLoading, setIsLoading] = useState(true);

  const userStorageKey = "@gofinance:user";

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const userStorage = await AsyncStorage.getItem(userStorageKey);

      if (userStorage) {
        const userLogged = JSON.parse(userStorage) as User;

        setUser(userLogged);
      }

      setIsLoading(false);
    })();
  }, []);

  const singInWithGoogle = async () => {
    try {
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const result = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      //console.log(result);

      if (result.type === "error") {
        setUser({} as User);
      }

      if (result.type === "success") {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${result.params.access_token}`
        );
        const userInfo = await response.json();

        const userLogged: User = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name + userInfo.family_name,
          photo: userInfo.picture,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  const singInWithApple = async () => {
    try {
      const credential = await AppleAuThentication.signInAsync({
        requestedScopes: [
          AppleAuThentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuThentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential) {
        const name = credential.fullName?.givenName!;
        const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;

        const userLogged: User = {
          id: String(credential.user),
          email: credential.email!,
          name,
          photo,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  const singOut = async () => {
    setUser({} as User);

    await AsyncStorage.removeItem(userStorageKey);
  };

  return (
    <AuthContext.Provider
      value={{ user, singInWithGoogle, singInWithApple, singOut, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const UseAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, UseAuth };
