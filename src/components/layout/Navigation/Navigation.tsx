import Button from "@components/ui/Button";
import Link from "@components/ui/Link";
import { useAuth } from "@context/AuthContext";
import { useAnimationVariants } from "@hooks/useAnimationVariants";
import { AnimatePresence, motion } from "framer-motion";
import { Squash as Hamburger } from "hamburger-react";
import { memo, useCallback, useEffect, useState } from "react";

import Container from "../Container";
import styles from "./Navigation.module.scss";
import type { NavigationProps } from "./Navigation.types";

const Navigation = memo(({ items, button }: NavigationProps) => {
  const { isLoggedIn, logout } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState(window.location.hash || "#");
  const [activePath, setActivePath] = useState(window.location.pathname);
  const { staggerContainer, staggerItem } = useAnimationVariants();

  // Enhanced navigation with logout functionality
  const enhancedButton = {
    ...button,
    ...(isLoggedIn && {
      children: "Logout",
      onClick: logout,
    }),
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) =>
      e.key === "Escape" && setOpen(false);

    const handleLocationChange = () => {
      setActiveHash(window.location.hash || "#");
      setActivePath(window.location.pathname);
      // Close mobile menu on navigation
      setOpen(false);
    };

    // Close menu on window resize (especially to desktop size)
    const handleResize = () => {
      if (window.innerWidth >= 1025 && isOpen) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("hashchange", handleLocationChange);
    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("hashchange", handleLocationChange);
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleItemClick = useCallback(() => setOpen(false), []);

  const isItemActive = useCallback(
    (itemHref: string) => {
      if (itemHref.startsWith("#")) {
        return itemHref === "#"
          ? (activeHash === "" || activeHash === "#") && activePath === "/"
          : itemHref === activeHash;
      }
      return activePath === itemHref;
    },
    [activeHash, activePath],
  );

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
            <Button {...enhancedButton} />
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
            hideOutline={false}
          />
        </div>
      </Container>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            className={styles.mobileMenu}
            aria-hidden={!isOpen}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1], // ease-out-expo
            }}
          >
            <motion.ul
              className={styles.mobileMenuList}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {items.map((item) => (
                <motion.div key={item.href} variants={staggerItem}>
                  <Link
                    href={item.href}
                    label={item.label}
                    onClick={handleItemClick}
                    isMobile
                    active={isItemActive(item.href)}
                  />
                </motion.div>
              ))}
              <motion.li variants={staggerItem}>
                <Button {...enhancedButton} />
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
});

Navigation.displayName = "Navigation";

export default Navigation;
