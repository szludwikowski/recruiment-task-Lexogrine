import Container from "@components/layout/Container";
import PricingTable from "@components/sections/PricingTable";
import Button from "@components/ui/Button";
import Form from "@components/ui/Form";
import { useAuth } from "@context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";

import styles from "./Hero.module.scss";
import type { HeroProps } from "./Hero.types";

const Hero = ({
  className,
  heading,
  description,
  buttonText = "Learn More",
}: HeroProps) => {
  const { isLoggedIn } = useAuth();

  return (
    <section className={`${styles.wrapper} ${className || ""}`} id="#">
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <Container className={styles.inner} key="hero-content">
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
        ) : (
          <motion.div
            key="pricing-table"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.pricingWrapper}
          >
            <PricingTable />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
