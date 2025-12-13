'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './styles/LeftInfoBanner.module.css';

export default function LeftInfoBanner({ leftInfoBanner }) {
  if (!leftInfoBanner) {
    return null;
  }

  const { header, image, title, description, cta } = leftInfoBanner;

  return (
    <section className={styles.leftInfoBanner}>
      {image?.asset?.url && (
        <div className={styles.imageBackground}>
          <Image
            src={image.asset.url}
            alt={image.alt || 'Banner background'}
            fill
            className={styles.backgroundImage}
          />
          <div className={styles.imageOverlay} />
        </div>
      )}
      
      <div className={styles.contentWrapper}>
        <div className={styles.contentContainer}>
          {/* Header - only render if header exists */}
          {header?.trim() && (
            <div className={styles.header}>{header}</div>
          )}

          {/* Title */}
          {title && (
            <h2 className={styles.title}>{title}</h2>
          )}

          {/* Description - only render if description exists */}
          {description?.trim() && (
            <p className={styles.description}>{description}</p>
          )}

          {/* CTA Button */}
          {cta?.text && cta?.url && (
            <Link
              href={cta.url}
              target={cta.target || '_self'}
              className={styles.ctaButton}
            >
              {cta.text}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

