export interface PricingTableProps {
  className?: string;
}

export interface Benefit {
  name: string;
  available: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  benefits: Benefit[];
  highlight?: boolean;
}
