export type LinkProps = {
  href: string;
  label: string;
  className?: string;
  isMobile?: boolean;
  active?: boolean;
  onClick?: () => void;
};
