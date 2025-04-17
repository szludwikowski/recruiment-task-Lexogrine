import { cx } from "class-variance-authority";
import type { ElementType } from "react";

import styles from "./Button.module.scss";
import type { ButtonProps } from "./Button.types";

const Button = <T extends ElementType = "button">({
  children,
  as,
  variant = "primary",
  isLoading,
  className,
  ...rest
}: ButtonProps<T>) => {
  const Element = as || "button";

  return (
    <Element
      className={cx(styles.wrapper, styles[variant], className)}
      disabled={isLoading}
      {...rest}
    >
      <span className={styles.content}>{children}</span>
    </Element>
  );
};

export default Button;
