import { cx } from "class-variance-authority";
import React from "react";

import styles from "./Link.module.scss";
import type { LinkProps } from "./Link.types";

const Link: React.FC<LinkProps> = ({
  href,
  label,
  className,
  isMobile = false,
  active = false,
  onClick,
}) => (
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
