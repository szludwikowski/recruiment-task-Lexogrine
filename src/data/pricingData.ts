import { Benefit, PricingPlan } from "@components/sections/PricingTable";

export const benefits: Benefit[] = [
  {
    name: "2 GB of hosting space",
    available: true,
  },
  {
    name: "14 days of free backups",
    available: true,
  },
  {
    name: "Social integrations",
    available: true,
  },
  {
    name: "Advanced client billing",
    available: true,
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    id: "start",
    name: "Start",
    price: 19,
    benefits: benefits.map((b, i) => (i > 1 ? { ...b, available: false } : b)),
    highlight: false,
  },
  {
    id: "enterprise1",
    name: "Enterprise",
    price: 49,
    benefits: benefits.map((b, i) => (i > 2 ? { ...b, available: false } : b)),
    highlight: true,
  },
  {
    id: "enterprise2",
    name: "Enterprise",
    price: 99,
    benefits,
    highlight: false,
  },
];
