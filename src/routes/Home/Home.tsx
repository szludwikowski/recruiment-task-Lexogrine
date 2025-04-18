import { Layout } from "@components/layout";
import { Hero } from "@components/sections";
import { HERO_BUTTON_TEXT, HERO_DESCRIPTION, HERO_HEADING } from "@constants";
import React from "react";

const Home: React.FC = () => {
  return (
    <Layout>
      <Hero
        heading={HERO_HEADING}
        description={HERO_DESCRIPTION}
        buttonText={HERO_BUTTON_TEXT}
      />
    </Layout>
  );
};

export default Home;
