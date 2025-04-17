import Layout from "@components/layout/Layout";
import Hero from "@components/sections/Hero";
import {
  HERO_BUTTON_TEXT,
  HERO_DESCRIPTION,
  HERO_HEADING,
} from "@constants/hero";
import { AuthProvider } from "@context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

const App = () => (
  <AuthProvider>
    <Layout>
      <Hero
        heading={HERO_HEADING}
        description={HERO_DESCRIPTION}
        buttonText={HERO_BUTTON_TEXT}
      />
    </Layout>
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
