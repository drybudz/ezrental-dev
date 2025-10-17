'use client';
import Image from 'next/image';
import styles from './not-found.module.css';

export default function Custom404() {
  return (
    <div className={styles.notFound}>
      <div className={styles.content}>
        <img 
          src="/images/icon-loading.png" 
          alt="404" 
          width={100}
          height={100}
          className={styles.shakingIcon}
        />
        <h1 className={styles.title}>404 - Page Not Found</h1>
        <p className={styles.description}>
          The page you're looking for doesn't exist.
        </p>
      </div>
    </div>
  );
}

