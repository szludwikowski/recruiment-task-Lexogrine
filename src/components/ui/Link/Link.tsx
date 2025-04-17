import { cx } from "class-variance-authority";

import styles from "./Link.module.scss";
import type { LinkProps } from "./Link.types";

const Link = ({
  href,
  label,
  className,
  isMobile = false,
  active = false,
  onClick,
}: LinkProps) => (
  <li className={cx(styles.listItem, className)}>
    <a
      href={href}
      data-replace={label}
      onClick={onClick}
      className={cx(
        styles.link,
        isMobile && styles.mobile,
        active && styles.active,
      )}
    >
      <span>{label}</span>
    </a>
  </li>
);

export default Link;
