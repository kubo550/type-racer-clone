import { createContext, FC, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebase } from "firedb";

interface AuthValues {
  user: firebase.User | null | undefined;
  isLoading: boolean;
  error: firebase.auth.Error | undefined;
}

const AuthContext = createContext<AuthValues>({} as AuthValues);

export const AuthProvider: FC = ({ children }) => {
  const [user, isLoading, error] = useAuthState(firebase.auth());

  return (
    <AuthContext.Provider value={{ user, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
