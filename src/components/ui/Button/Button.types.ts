import type { ElementType, ReactNode } from "react";

export type ButtonProps<T extends ElementType = "button"> = {
  children: ReactNode;
  as?: T;
  variant?: "primary" | "secondary" | "social" | "outlined" | "highlight";
  isLoading?: boolean;
  className?: string;
} & React.ComponentPropsWithoutRef<T>;
