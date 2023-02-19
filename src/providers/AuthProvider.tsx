import { useRouter } from "next/router";
import { useState, createContext, PropsWithChildren, FC } from "react";
import { ACCESS_TOKEN } from "../constants/localStorage";
import { isSSR } from "../utils/isSSR";

interface User {
  accessToken: string | null;
  user: string | null;
}

interface AuthContextType {
  accessToken: string | null;
  login: (accessToken: string, user: string) => void;
  logout: () => void;
}
export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [userLogin, setUserLogin] = useState<User>({
    accessToken: isSSR ? null : localStorage.getItem(ACCESS_TOKEN),
    user: null,
  });
  const router = useRouter();

  const login = (accessToken: string, user: string) => {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    setUserLogin({ accessToken, user });
  };

  const logout = () => {
    router.replace("/");
    localStorage.removeItem(ACCESS_TOKEN);
    setUserLogin({ accessToken: null, user: null });
  };
  return (
    <AuthContext.Provider
      value={{
        accessToken: userLogin.accessToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
