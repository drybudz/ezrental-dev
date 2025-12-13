'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { urlFor, getHotspotPosition } from '../../../sanity/lib/image';
import styles from './styles/HeroBanner.module.css';

export default function HeroBanner({ heroText, heroImage, heroDescription }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate parallax values
  const opacity = Math.max(0, 1 - scrollY / 500);
  const translateY = Math.min(200, scrollY * 0.5);

  // Generate image URL with crop and get hotspot position
  const imageUrl = heroImage?.asset ? urlFor(heroImage).url() : null;
  const objectPosition = heroImage?.hotspot ? getHotspotPosition(heroImage.hotspot) : 'center';

  return (
    <section className={styles.heroBanner}>
      {/* Background Image */}
      {imageUrl && (
        <div className={styles.backgroundImage}>
          <Image
            src={imageUrl}
            alt={heroImage?.alt || 'Hero background'}
            fill
            priority
            className={styles.heroImage}
            style={{ objectPosition }}
          />
        </div>
      )}
      
      {/* Overlay Text */}
      {(heroText?.trim() || heroDescription?.trim()) && (
        <div className={styles.textOverlay}>
          {heroText?.trim() && (
            <h1 
              className={styles.heroText}
              style={{
                opacity: opacity,
                transform: `translateY(${translateY}px)`
              }}
            >
              {heroText}
            </h1>
          )}
          {heroDescription?.trim() && (
            <p 
              className={styles.heroDescription}
              style={{
                opacity: opacity,
                transform: `translateY(${translateY}px)`
              }}
            >
              {heroDescription}
            </p>
          )}
        </div>
      )}
    </section>
  );
}