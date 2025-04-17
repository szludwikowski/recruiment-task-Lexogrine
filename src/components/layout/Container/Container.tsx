import { cx } from "class-variance-authority";

import styles from "./Container.module.scss";
import type { ContainerProps } from "./Container.types";

const Container = ({ children, className, ...rest }: ContainerProps) => (
  <div className={cx(styles.container, className)} {...rest}>
    {children}
  </div>
);

export default Container;
