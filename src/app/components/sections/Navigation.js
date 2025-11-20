'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import styles from './styles/Navigation.module.css';

export default function Navigation({ navigationData }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef(null);

  // Hide navigation on Studio/Admin routes and coming-soon page
  if (pathname && (pathname.startsWith('/admin') || pathname.startsWith('/studio') || pathname.startsWith('/coming-soon'))) {
    return null;
  }

  if (!navigationData) return null;

  const { logo, mainMenu = [] } = navigationData;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Mobile detection and responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 575;
      setIsMobile(mobile);
      
      // When resizing to desktop, ensure menu is closed
      if (!mobile) {
        setIsMenuOpen(false);
        if (menuRef.current) {
          // Reset all GSAP and inline styles
          gsap.killTweensOf(menuRef.current);
          menuRef.current.style.display = '';
          menuRef.current.style.opacity = '';
          menuRef.current.style.transform = '';
          document.body.style.overflow = '';
        }
      }
    };
    
    // Initial check (only runs on client after hydration)
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Menu animation with GSAP
  useEffect(() => {
    if (!menuRef.current) return;

    const menuEl = menuRef.current;
    
    // Only apply GSAP animations if actually on mobile and menu state changes
    if (isMobile) {
      if (isMenuOpen) {
        // Open animation
        gsap.fromTo(menuEl,
          { opacity: 0, y: -100, display: 'none' },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.5,
            ease: "power2.out",
            onStart: () => {
              menuEl.style.display = 'flex';
              document.body.style.overflow = 'hidden';
            }
          }
        );
      } else {
        // Close animation
        gsap.to(menuEl, {
          opacity: 0,
          y: -100,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            menuEl.style.display = 'none';
            document.body.style.overflow = '';
          }
        });
      }
    } else {
      // If not mobile, ensure menu is reset to desktop state immediately
      gsap.killTweensOf(menuEl);
      menuEl.style.display = '';
      menuEl.style.opacity = '';
      menuEl.style.transform = '';
      document.body.style.overflow = '';
    }

    return () => {
      gsap.killTweensOf(menuEl);
    };
  }, [isMenuOpen, isMobile]);

  // Close menu on route change
  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={styles.navigation}>
        <div className={styles.navContainer}>
          {/* Logo */}
          <div className={styles.logo}>
            <Link href="/" className={styles.logoLink} onClick={handleNavLinkClick}>
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
            {mainMenu.map((item, index) => {
              const isActive = pathname === item.linkUrl;
              return (
                <Link
                  key={index}
                  href={item.linkUrl}
                  target={item.linkTarget || '_self'}
                  className={styles.menuLink}
                  data-active={isActive ? 'true' : undefined}
                  onClick={handleNavLinkClick}
                >
                  {item.linkText}
                </Link>
              );
            })}
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

      {/* Mobile Menu Container */}
      <div 
        ref={menuRef}
        className={`${styles.mobileMenuContainer} ${isMenuOpen && isMobile ? styles.menuOpen : ''}`}
      >
        <div className={styles.mobileMenuContent}>
          {mainMenu.map((item, index) => {
            const isActive = pathname === item.linkUrl;
            return (
              <Link
                key={index}
                href={item.linkUrl}
                target={item.linkTarget || '_self'}
                className={styles.mobileMenuLink}
                data-active={isActive ? 'true' : undefined}
                onClick={handleNavLinkClick}
              >
                {item.linkText}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
