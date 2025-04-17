import Button from "@components/ui/Button";
import Link from "@components/ui/Link";
import { Squash as Hamburger } from "hamburger-react";
import React, { useEffect, useState } from "react";

import Container from "../Container";
import styles from "./Navigation.module.scss";
import type { NavigationProps } from "./Navigation.types";

const Navigation: React.FC<NavigationProps> = ({ items, button }) => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleItemClick = () => {
    setOpen(false);
  };

  return (
    <header className={styles.wrapper}>
      <Container className={styles.innerWrapper}>
        <div className={styles.logo}>Startup 3</div>

        <nav className={styles.desktopNav}>
          <ul className={styles.navList}>
            {items.map((item) => (
              <Link key={item.href} href={item.href} label={item.label} />
            ))}
          </ul>
          <div className={styles.button}>
            <Button {...button} />
          </div>
        </nav>

        <div className={styles.hamburger}>
          <Hamburger toggled={isOpen} toggle={setOpen} color="#fff" size={20} />
        </div>
      </Container>

      <div
        className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!isOpen}
      >
        <ul className={styles.mobileMenuList}>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              label={item.label}
              onClick={handleItemClick}
              isMobile
            />
          ))}
          <li>
            <Button {...button} />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navigation;
