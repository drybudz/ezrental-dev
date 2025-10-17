'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from './styles/Navigation.module.css';

export default function Navigation({ navigationData }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!navigationData) return null;

  const { logo, mainMenu = [] } = navigationData;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={styles.navigation}>
        <div className={styles.navContainer}>
          {/* Logo */}
          <div className={styles.logo}>
            <Link href="/" className={styles.logoLink}>
              {logo?.asset?.url ? (
                <Image
                  src={logo.asset.url}
                  alt={logo.alt || 'EZ Rental & Services Logo'}
                  width={200}
                  height={60}
                  className={styles.logoImage}
                />
              ) : (
                <span className={styles.logoText}>EZ RENTAL & SERVICES</span>
              )}
            </Link>
          </div>

          {/* Desktop Menu Links */}
          <div className={styles.menu}>
            {mainMenu.map((item, index) => (
              <Link
                key={index}
                href={item.linkUrl}
                target={item.linkTarget || '_self'}
                className={styles.menuLink}
              >
                {item.linkText}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger Menu */}
          <div 
            className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
            onClick={toggleMenu}
          >
            <div className={styles.hamburgerLine}></div>
            <div className={styles.hamburgerLine}></div>
            <div className={styles.hamburgerLine}></div>
          </div>
        </div>
      </nav>

      {/* Mobile Modal Overlay */}
      <div 
        className={`${styles.modalOverlay} ${isMenuOpen ? styles.active : ''}`}
        onClick={closeMenu}
      >
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          {/* Modal Menu Links */}
          <div className={styles.modalMenu}>
            {mainMenu.map((item, index) => (
              <Link
                key={index}
                href={item.linkUrl}
                target={item.linkTarget || '_self'}
                className={styles.modalLink}
                onClick={closeMenu}
              >
                {item.linkText}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
