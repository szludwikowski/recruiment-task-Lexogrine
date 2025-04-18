import { Navigation } from "@components/layout";
import { NAV_CTA, NAV_ITEMS } from "@constants";
import React from "react";

import type { LayoutProps } from "./Layout.types";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navigation items={NAV_ITEMS} button={NAV_CTA} />
      <main>{children}</main>
    </>
  );
};

export default Layout;
