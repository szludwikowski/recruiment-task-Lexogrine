import Layout from "@components/layout/Layout";
import Hero from "@components/sections/Hero";

import "./App.css";

function App() {
  return (
    <Layout>
      <Hero
        heading="Generate Awesome Web Pages"
        description=" The most important part of the Startup is the samples. The samples
            form a set of 25 usable pages you can use as is or you can add new
            blocks."
      />
    </Layout>
  );
}

export default App;
