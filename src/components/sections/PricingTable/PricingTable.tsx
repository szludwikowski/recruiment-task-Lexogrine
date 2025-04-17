import Container from "@components/layout/Container";
import { pricingPlans } from "@data/pricingData";
import { motion } from "framer-motion";

import PricingBox from "./PricingBox";
import styles from "./PricingTable.module.scss";

const PricingTable = () => {
  return (
    <Container id="prices">
      <div className={styles.header}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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

      <div className={styles.plansContainer}>
        {pricingPlans.map((plan, index) => (
          <PricingBox key={plan.id} {...plan} index={index} />
        ))}
      </div>
    </Container>
  );
};

export default PricingTable;
