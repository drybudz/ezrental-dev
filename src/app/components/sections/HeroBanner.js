'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from './styles/HeroBanner.module.css';

export default function HeroBanner({ heroText, heroImage }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate parallax values
  const opacity = Math.max(0, 1 - scrollY / 500);
  const translateY = Math.min(200, scrollY * 0.5);

  return (
    <section className={styles.heroBanner}>
      {/* Background Image */}
      {heroImage?.asset?.url && (
        <div className={styles.backgroundImage}>
          <Image
            src={heroImage.asset.url}
            alt={heroImage.alt || 'Hero background'}
            fill
            priority
            className={styles.heroImage}
          />
        </div>
      )}
      
      {/* Overlay Text */}
      <div className={styles.textOverlay}>
        <h1 
          className={styles.heroText}
          style={{
            opacity: opacity,
            transform: `translateY(${translateY}px)`
          }}
        >
          {heroText || 'BRAND MESSAGE LOREM IPSUM NEQUE PORRO — EST QUI DOLOREM IPSUM QUIA.'}
        </h1>
      </div>
    </section>
  );
}