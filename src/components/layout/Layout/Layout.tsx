import { NAV_CTA, NAV_ITEMS } from "@constants/navigation";
import React from "react";

import Navigation from "../Navigation";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navigation items={NAV_ITEMS} button={NAV_CTA} />
      <main>{children}</main>
    </>
  );
};

export default Layout;
