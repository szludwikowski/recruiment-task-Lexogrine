import Container from "@components/layout/Container";
import Button from "@components/ui/Button";
import Form from "@components/ui/Form";
import { useAuth } from "@context/AuthContext";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Hero.module.scss";
import type { HeroProps } from "./Hero.types";

const Hero = ({
  className,
  heading,
  description,
  buttonText = "Learn More",
}: HeroProps) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

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
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", duration: 0.6 }}
        >
          <motion.h1 className={styles.heading}>{heading}</motion.h1>

          <motion.p className={styles.description}>{description}</motion.p>

          <motion.div
            className={styles.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button>{buttonText}</Button>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.formWrapper}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Form />
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;
