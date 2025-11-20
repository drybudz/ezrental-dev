'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './coming-soon.module.css';

export default function ComingSoon() {
  const logoRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Animate "Coming Soon" text fade in
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: 'power2.out',
          delay: 0.5
        }
      );
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <img
          src="/images/icon-loading.png"
          alt="EZ Rental Logo"
          width={120}
          height={120}
          className={styles.logo}
        />
      </div>
      <h1 ref={textRef} className={styles.text}>
        Coming Soon
      </h1>
    </div>
  );
}

