import Button from "@components/ui/Button";
import Link from "@components/ui/Link";
import { Squash as Hamburger } from "hamburger-react";
import { useCallback, useEffect, useState } from "react";

import Container from "../Container";
import styles from "./Navigation.module.scss";
import type { NavigationProps } from "./Navigation.types";

const Navigation = ({ items, button }: NavigationProps) => {
  const [isOpen, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState(window.location.hash || "#");
  const [activePath, setActivePath] = useState(window.location.pathname);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) =>
      e.key === "Escape" && setOpen(false);
    const handleLocationChange = () => {
      setActiveHash(window.location.hash || "#");
      setActivePath(window.location.pathname);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("hashchange", handleLocationChange);
    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("hashchange", handleLocationChange);
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  const handleItemClick = useCallback(() => setOpen(false), []);

  const isItemActive = (itemHref: string) => {
    if (itemHref.startsWith("#")) {
      return itemHref === "#"
        ? (activeHash === "" || activeHash === "#") && activePath === "/"
        : itemHref === activeHash;
    }
    return activePath === itemHref;
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
