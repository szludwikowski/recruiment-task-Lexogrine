import { AuthProvider, useAuth } from "@context/AuthContext";
import { AnimatePresence } from "framer-motion";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Home from "./routes/Home/Home";
import Pricing from "./routes/Pricing/Pricing";

const AppRoutes = () => {
  const { isLoggedIn, isInitializing } = useAuth();
  const location = useLocation();

  if (isInitializing) {
    return <div>Loading...</div>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/pricing" replace /> : <Home />}
        />
        <Route
          path="/pricing"
          element={isLoggedIn ? <Pricing /> : <Navigate to="/" replace />}
        />
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/pricing" : "/"} replace />}
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      newestOnTop
      closeOnClick
      draggable
      pauseOnHover
      theme="light"
    />
  </AuthProvider>
);

export default App;
