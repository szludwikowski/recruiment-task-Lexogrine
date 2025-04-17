import Button from "@components/ui/Button";
import Link from "@components/ui/Link";
import { Squash as Hamburger } from "hamburger-react";
import React, { useCallback, useEffect, useState } from "react";

import Container from "../Container";
import styles from "./Navigation.module.scss";
import type { NavigationProps } from "./Navigation.types";

const Navigation: React.FC<NavigationProps> = ({ items, button }) => {
  const [isOpen, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState(window.location.hash || "#");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash || "#");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleItemClick = useCallback(() => {
    setOpen(false);
  }, []);

  const isItemActive = (itemHref: string) => {
    if (itemHref === "#") {
      return activeHash === "" || activeHash === "#";
    }
    return itemHref === activeHash;
  };

  return (
    <header className={styles.wrapper}>
      <Container className={styles.innerWrapper}>
        <div className={styles.logo}>Startup 3</div>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          <ul className={styles.navList}>
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                label={item.label}
                active={isItemActive(item.href)}
              />
            ))}
          </ul>
          <div className={styles.button}>
            <Button {...button} />
          </div>
        </nav>

        <div className={styles.hamburger}>
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            color="#fff"
            size={20}
            label="Toggle menu"
            aria-controls="mobile-menu"
          />
        </div>
      </Container>

      <div
        id="mobile-menu"
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
              active={isItemActive(item.href)}
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
