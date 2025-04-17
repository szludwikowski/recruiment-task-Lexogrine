import PricingTable from "@components/sections/PricingTable";
import React from "react";

import styles from "./Pricing.module.scss";

const Pricing: React.FC = () => {
  return (
    <div className={styles.container}>
      <PricingTable />
    </div>
  );
};

export default Pricing;
