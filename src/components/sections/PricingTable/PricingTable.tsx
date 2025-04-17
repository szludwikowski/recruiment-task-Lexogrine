import Button from "@components/ui/Button";
import Link from "@components/ui/Link";
import { useAuth } from "@context/AuthContext";
import { motion } from "framer-motion";
import { useState } from "react";

import styles from "./PricingTable.module.scss";
import type { PricingPlan, PricingTableProps } from "./PricingTable.types";

const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 29,
    period: "month",
    description: "Perfect for small teams and startups",
    features: [
      "1 user",
      "5 projects",
      "10GB storage",
      "Basic support",
      "Email notifications",
    ],
  },
  {
    id: "business",
    name: "Business",
    price: 79,
    period: "month",
    description: "Best for growing businesses and teams",
    features: [
      "5 users",
      "20 projects",
      "100GB storage",
      "Priority support",
      "Advanced analytics",
      "Team collaboration tools",
      "Custom integrations",
    ],
    isPopular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 199,
    period: "month",
    description: "For large organizations with specific needs",
    features: [
      "Unlimited users",
      "Unlimited projects",
      "1TB storage",
      "24/7 dedicated support",
      "Advanced security features",
      "Custom development",
      "Enterprise-grade SLAs",
      "Dedicated account manager",
    ],
  },
];

const PricingTable = ({ className }: PricingTableProps) => {
  const { logout } = useAuth();
  const [billingPeriod, setBillingPeriod] = useState<"month" | "year">("month");

  const getPrice = (price: number) =>
    billingPeriod === "year" ? Math.floor(price * 10 * 0.8) : price;

  return (
    <div id="prices" className={`${styles.container} ${className || ""}`}>
      <div className={styles.header}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Choose the right plan for your business
        </motion.h2>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Simple, transparent pricing that grows with you
        </motion.p>

        <motion.div
          className={styles.switchContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className={billingPeriod === "month" ? styles.active : ""}>
            Monthly
          </span>

          <div
            className={styles.switch}
            onClick={() =>
              setBillingPeriod((prev) => (prev === "month" ? "year" : "month"))
            }
          >
            <motion.div
              className={styles.switchKnob}
              animate={{ x: billingPeriod === "year" ? 24 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            />
          </div>

          <span className={billingPeriod === "year" ? styles.active : ""}>
            Yearly <span className={styles.save}>Save 20%</span>
          </span>
        </motion.div>
      </div>

      <motion.div
        className={styles.plansContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.2 }}
      >
        {pricingPlans.map((plan) => (
          <motion.div
            key={plan.id}
            className={`${styles.planCard} ${plan.isPopular ? styles.popular : ""}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            {plan.isPopular && (
              <div className={styles.popularBadge}>Most Popular</div>
            )}

            <h3 className={styles.planName}>{plan.name}</h3>

            <div className={styles.price}>
              <span className={styles.currency}>$</span>
              {getPrice(plan.price)}
              <span className={styles.period}>
                /{billingPeriod === "month" ? "mo" : "yr"}
              </span>
            </div>

            <p className={styles.planDescription}>{plan.description}</p>

            <ul className={styles.features}>
              {plan.features.map((feature, index) => (
                <li key={index} className={styles.feature}>
                  <span className={styles.checkIcon}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              variant={plan.isPopular ? "primary" : "secondary"}
              className={styles.selectButton}
            >
              Select Plan
            </Button>
          </motion.div>
        ))}
      </motion.div>

      <div className={styles.footer}>
        <Link onClick={logout} className={styles.logoutLink} label="Log out" />
      </div>
    </div>
  );
};

export default PricingTable;
