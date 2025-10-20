'use client';
import Image from 'next/image';
import styles from './styles/Methodology.module.css';

export default function Methodology({ methodology }) {
  if (!methodology || !methodology.steps || methodology.steps.length === 0) {
    return null;
  }

  const { image, steps } = methodology;

  return (
    <section className={styles.methodology}>
      {/* Parallax Background Image */}
      {image?.asset?.url && (
        <div 
          className={styles.parallaxImage}
          style={{ backgroundImage: `url(${image.asset.url})` }}
        />
      )}

      {/* Methodology Steps */}
      <div className={styles.stepsContainer}>
        <div className={styles.stepsGrid}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <div className={styles.counter}>{step.counter}</div>
              <div className={styles.description}>{step.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
