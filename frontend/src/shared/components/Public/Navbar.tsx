"use client";
import { useState } from "react";
import styles from "@/shared/styles/components/Public/Navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PUBLIC_NAV_LINKS } from "@shared/data/public";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const path = usePathname();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <img
            src="/logo.png"
            alt="Logo"
            className={styles.logoImage}
          />
        </Link>

        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>

        <div
          className={`${styles.linksContainer} ${
            menuOpen ? styles.linksContainerOpen : ""
          }`}
        >
          {PUBLIC_NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`${styles.navLink} ${
                isActive(path, link.path) ? styles.active : ""
              }`}
              onClick={() => setMenuOpen(false)} 
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

const isActive = (path: string, link: string) => {
  const clearHash = link.replace("#top", "");

  if (path === "/" && clearHash === "/") return true;

  const parts = path.split("/").filter(Boolean);
  const currentSubPath = link.split("/")[1].replace("#top", "");

  if (parts[0] === currentSubPath) return true;

  return false;
};
