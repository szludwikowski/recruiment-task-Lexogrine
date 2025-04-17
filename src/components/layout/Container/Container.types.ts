import type React from "react";

export type ContainerProps = React.ComponentPropsWithoutRef<"div"> & {
  children: React.ReactNode;
  className?: string;
};
