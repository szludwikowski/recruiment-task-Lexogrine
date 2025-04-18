import { Benefit, PricingPlan } from "@components/sections/PricingTable";

export const NAV_ITEMS = [
  { label: "Overview", href: "#" },
  { label: "Prices", href: "#prices" },
  { label: "Blog", href: "#blog" },
  { label: "Feedback", href: "#feedback" },
];

export const NAV_CTA = {
  children: "Purchase",
  href: "#",
};

export const HERO_HEADING = "Generate Awesome Web Pages";
export const HERO_DESCRIPTION =
  "The most important part of the Startup is the samples. The samples form a set of 25 usable pages you can use as is or you can add new blocks.";
export const HERO_BUTTON_TEXT = "Learn More";

export const FORM_CONTENT = {
  signup: {
    heading: "Sign Up Now",
    submitButton: "Sign Up",
    switchText: "Do you have an Account?",
    switchAction: "Sign In",
  },
  login: {
    heading: "Sign In",
    submitButton: "Sign In",
    switchText: "Don't have an account?",
    switchAction: "Sign Up",
  },
  common: {
    emailPlaceholder: "Your email",
    passwordPlaceholder: "Your password",
    termsText: "I agree to the Terms of Service.",
    dividerText: "or",
    socialButton: "Login via Twitter",
  },
};

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
