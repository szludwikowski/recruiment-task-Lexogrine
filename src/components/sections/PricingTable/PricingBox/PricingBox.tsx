import Button from "@components/ui/Button";
import { useAnimationVariants } from "@hooks/useAnimationVariants";
import { motion } from "framer-motion";
import React from "react";

import styles from "../PricingTable.module.scss";
import { PricingBoxProps } from "./PricingBox.types";

const PricingBox: React.FC<PricingBoxProps> = ({
  name,
  price,
  benefits,
  highlight,
  index,
}) => {
  const { slideUp, staggerItem, buttonHover, buttonTap } =
    useAnimationVariants();

  return (
    <motion.div className={styles.planCard} variants={slideUp} custom={index}>
      <div
        className={`${styles.planCardHeader} ${highlight ? styles.highlight : ""}`}
      >
        <h3 className={styles.planName}>{name}</h3>

        <div className={styles.priceContainer}>
          <div className={styles.currencySymbol}>$</div>
          <div className={styles.priceValue}>{price}</div>
          <div className={styles.pricePeriod}>
            per user
            <br />
            per month
          </div>
        </div>

        <p className={styles.planDescription}>
          All the features you need to keep your personal files safe,
          accessible, and easy to share.
        </p>
      </div>

      <motion.ul className={styles.benefitsList}>
        {benefits.map((item, idx) => (
          <motion.li
            key={idx}
            className={`${styles.benefitItem} ${!item.available ? styles.unavailable : ""}`}
            variants={staggerItem}
          >
            <span
              className={`${styles.checkIcon} ${!item.available ? styles.hidden : ""}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 5.1001L4.97059 8.6001L13 1.6001"
                  stroke="#25DAC5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {item.name}
          </motion.li>
        ))}
      </motion.ul>

      <motion.div whileHover={buttonHover} whileTap={buttonTap}>
        <Button
          variant={highlight ? "highlight" : "outlined"}
          className={styles.actionButton}
        >
          Start Free Trial
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default PricingBox;
