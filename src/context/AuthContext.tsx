import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type User = {
  email: string;
} | null;

type AuthContextType = {
  user: User;
  isLoggedIn: boolean;
  isInitializing: boolean;
  login: (email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    if (window.location.pathname !== "/") {
      setUser(null);
      sessionStorage.removeItem("user");

      window.location.href = "/";
      return;
    }
    try {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error restoring auth state:", error);
      sessionStorage.removeItem("user");
    } finally {
      setIsInitializing(false);
    }
  }, []);

  const login = useCallback((email: string) => {
    const userData = { email };
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
    window.history.pushState(null, "", "/pricing");
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem("user");
    window.history.pushState(null, "", "/");
  }, []);

  const isLoggedIn = Boolean(user);

  const authValues = useMemo(
    () => ({
      user,
      isLoggedIn,
      isInitializing,
      login,
      logout,
    }),
    [user, isLoggedIn, isInitializing, login, logout],
  );

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
