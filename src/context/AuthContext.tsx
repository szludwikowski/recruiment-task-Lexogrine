import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem("wasLoggedIn", isLoggedIn.toString());
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    const wasLoggedIn = sessionStorage.getItem("wasLoggedIn");
    if (wasLoggedIn === "true") {
      sessionStorage.removeItem("wasLoggedIn");
      window.location.href = "/";
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isLoggedIn]);

  const authValues = {
    isLoggedIn,
    login: () => {
      setIsLoggedIn(true);
      window.history.pushState(null, "", "/pricing");
    },
    logout: () => setIsLoggedIn(false),
  };

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
