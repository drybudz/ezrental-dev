'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles/FiftyContact.module.css';

export default function FiftyContact({ fiftyContact }) {
  if (!fiftyContact) {
    return null;
  }

  const { image, title, description, cta } = fiftyContact;

  return (
    <section className={styles.fiftyContact}>
      {/* Left Column - Image */}
      <div className={styles.imageColumn}>
        {image?.asset?.url && (
          <Image
            src={image.asset.url}
            alt={image.alt || 'Contact section image'}
            fill
            className={styles.image}
          />
        )}
      </div>

      {/* Right Column - Content */}
      <div className={styles.contentColumn}>
        {/* Title */}
        {title && (
          <h2 className={styles.title}>{title}</h2>
        )}

        {/* Large Gap - handled by CSS flexbox */}

        {/* Bottom Content Container */}
        <div className={styles.bottomContent}>
          {/* Description */}
          {description && (
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
