import Container from "@components/layout/Container";
import Button from "@components/ui/Button";
import Form from "@components/ui/Form";
import { useAuth } from "@context/AuthContext";
import { useAnimationVariants } from "@hooks/useAnimationVariants";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Hero.module.scss";
import type { HeroProps } from "./Hero.types";

const Hero: React.FC<HeroProps> = ({
  className,
  heading,
  description,
  buttonText = "Learn More",
}) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { slideInLeft, fadeIn, buttonHover, buttonTap } =
    useAnimationVariants();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/pricing");
    }
  }, [isLoggedIn, navigate]);

  return (
    <section className={`${styles.wrapper} ${className || ""}`} id="#">
      <Container className={styles.inner}>
        <motion.div
          className={styles.content}
          variants={slideInLeft}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.h1 className={styles.heading}>{heading}</motion.h1>

          <motion.p className={styles.description}>{description}</motion.p>

          <motion.div
            className={styles.button}
            whileHover={buttonHover}
            whileTap={buttonTap}
          >
            <Button>{buttonText}</Button>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.formWrapper}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Form />
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;
