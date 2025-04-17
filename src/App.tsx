import Layout from "@components/layout/Layout";
import Hero from "@components/sections/Hero";
import { HERO_DESCRIPTION, HERO_HEADING } from "@constants/hero";

import "./App.css";

function App() {
  return (
    <Layout>
      <Hero heading={HERO_HEADING} description={HERO_DESCRIPTION} />
    </Layout>
  );
}

export default App;
