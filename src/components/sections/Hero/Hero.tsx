import Container from "@components/layout/Container";
import Button from "@components/ui/Button";
import React from "react";

import styles from "./Hero.module.scss";
import type { HeroProps } from "./Hero.types";

const Hero: React.FC<HeroProps> = ({ className, heading, description }) => {
  return (
    <section className={`${styles.wrapper} ${className || ""}`}>
      <Container className={styles.inner}>
        <div className={styles.content}>
          <h1 className={styles.heading}>{heading}</h1>
          <p className={styles.description}>{description}</p>
          <div className={styles.button}>
            <Button>Learn More</Button>
          </div>
        </div>

        <div className={styles.formWrapper}>SignUpForm</div>
      </Container>
    </section>
  );
};

export default Hero;
