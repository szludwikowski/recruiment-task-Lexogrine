import Container from "@components/layout/Container";
import { pricingPlans } from "@constants";
import { useAnimationVariants } from "@hooks/useAnimationVariants";
import { motion } from "framer-motion";
import React from "react";

import PricingBox from "./PricingBox";
import styles from "./PricingTable.module.scss";
import { PricingTableProps } from "./PricingTable.types";

const PricingTable: React.FC<PricingTableProps> = ({ className }) => {
  const { fadeIn, staggerContainer } = useAnimationVariants();

  return (
    <Container id="prices" className={className}>
      <div className={styles.header}>
        <motion.h1
          className={styles.title}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          Simple & flexible pricing built for everyone
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Start with 14-day free trial. No credit card needed. Cancel at
          anytime.
        </motion.p>
      </div>

      <motion.div
        className={styles.plansContainer}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {pricingPlans.map((plan, index) => (
          <PricingBox key={plan.id} {...plan} index={index} />
        ))}
      </motion.div>
    </Container>
  );
};

export default PricingTable;
