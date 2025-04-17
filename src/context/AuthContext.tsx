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

// Create context with more meaningful initial values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Handle page refresh - this useEffect should run once on mount
  useEffect(() => {
    // On initial page load, forcibly clear user session and redirect to home
    // This solves the issue with staying on /pricing after refresh
    if (window.location.pathname !== "/") {
      // Clear any existing user data
      setUser(null);
      sessionStorage.removeItem("user");

      // Redirect to home page
      window.location.href = "/";
      return; // Early return since we're redirecting
    }

    // Only attempt to restore session if we're already on the home page
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
  }, []); // Empty dependency array ensures this only runs once on mount

  // Improved login function with user data
  const login = useCallback((email: string) => {
    const userData = { email };
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
    window.history.pushState(null, "", "/pricing");
  }, []);

  // Improved logout function
  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem("user");
    window.history.pushState(null, "", "/");
  }, []);

  // Calculate derived state once
  const isLoggedIn = Boolean(user);

  // Memoize context value to prevent unnecessary re-renders
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
