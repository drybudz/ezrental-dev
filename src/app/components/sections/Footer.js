'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles/Footer.module.css';

export default function Footer({ footerData }) {
  if (!footerData) return null;

  const {
    footerCoordinates,
    footerCoordinatesLink,
    footerPhone,
    footerSocialMedia = [],
    footerEmail,
    footerAdditionalLinks = [],
    logo
  } = footerData;

  return (
    <footer className={styles.footer}>
      {/* Orange Bar */}
      <div className={styles.orangeBar}>
        <div className={styles.orangeBarContent}>
          {/* Coordinates */}
          <div className={styles.coordinates}>
            {footerCoordinatesLink ? (
              <Link 
                href={footerCoordinatesLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.coordinatesLink}
              >
                {footerCoordinates}
              </Link>
            ) : (
              <span>{footerCoordinates}</span>
            )}
          </div>
          
          {/* Phone */}
          <div className={styles.phone}>
            <Link href={`tel:${footerPhone}`} className={styles.phoneLink}>
              {footerPhone}
            </Link>
          </div>
        </div>
      </div>

      {/* Black Bar */}
      <div className={styles.blackBar}>
        <div className={styles.blackBarContent}>
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

          {/* Right Content */}
          <div className={styles.rightContent}>
            {/* Social Media Links */}
            <div className={styles.socialMedia}>
              {footerSocialMedia.map((social, index) => (
                <Link
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  {social.platform}
                </Link>
              ))}
            </div>

            {/* Email and Company Info Container */}
            <div className={styles.emailAndCompany}>
              {/* Email */}
              <div className={styles.email}>
                <Link href={`mailto:${footerEmail}`} className={styles.emailLink}>
                  {footerEmail}
                </Link>
              </div>

              {/* Additional Links */}
              <div className={styles.additionalLinks}>
                {footerAdditionalLinks.map((item, index) => (
                  <div key={index} className={styles.additionalItem}>
                    {item.url ? (
                      <Link href={item.url} className={styles.additionalLink}>
                        {item.text}
                      </Link>
                    ) : (
                      <span className={styles.additionalText}>{item.text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
