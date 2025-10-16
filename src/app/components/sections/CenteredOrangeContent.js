'use client';
import styles from './styles/CenteredOrangeContent.module.css';

export default function CenteredOrangeContent({ centeredTitle, centeredDescription }) {
  return (
    <section className={styles.centeredOrangeContent}>
      <div className={styles.contentContainer}>
        <h2 className={styles.title}>
          {centeredTitle || 'DOLOR SIT AMET, CONSEC ADIPISCING ELIT. SED VIVAMUS SAGITTIS UT EST SIT AMET TRISTIQUE.'}
        </h2>
        <p className={styles.description}>
          {centeredDescription || 'Dolor sit amet, consec adipiscing elit. Sed in orci mi. Aenean varius finibus sapien, sit amet varius nibh mollis vitae. Vivamus vitae leo dolor. Vivamus sagittis ut est sit amet tristique. Vestibulum sed purus posuere, maximus ligula vel.'}
        </p>
      </div>
    </section>
  );
}