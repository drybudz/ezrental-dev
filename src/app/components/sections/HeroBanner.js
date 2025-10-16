'use client';
import Image from 'next/image';
import styles from './styles/HeroBanner.module.css';

export default function HeroBanner({ heroText, heroImage }) {
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
        <h1 className={styles.heroText}>
          {heroText || 'BRAND MESSAGE LOREM IPSUM NEQUE PORRO — EST QUI DOLOREM IPSUM QUIA.'}
        </h1>
      </div>
    </section>
  );
}