import type { ButtonProps } from "@components/ui/Button";

export type NavigationProps = {
  items: {
    label: string;
    href: string;
  }[];
  button: ButtonProps<"button">;
};
