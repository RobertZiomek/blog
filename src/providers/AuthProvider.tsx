import { useState, createContext, PropsWithChildren, FC } from "react";

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
    accessToken: null,
    user: null,
  });
  const login = (accessToken: string, user: string) => {
    setUserLogin({ accessToken, user });
  };

  const logout = () => {
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
