import { cx } from "class-variance-authority";
import React from "react";

import styles from "./Container.module.scss";
import type { ContainerProps } from "./Container.types";

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div className={cx(styles.container, className)} {...rest}>
      {children}
    </div>
  );
};

export default Container;
