'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './styles/CenteredOrangeContent.module.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CenteredOrangeContentGSAP({ centeredTitle, centeredDescription }) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set([titleRef.current, descriptionRef.current], { opacity: 0 });

      // Create fade-in animation for title and description
      gsap.to([titleRef.current, descriptionRef.current], {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1, // Smooth scrubbing
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className={styles.centeredOrangeContent} ref={containerRef}>
      <div className={styles.contentContainer}>
        <h2 className={styles.title} ref={titleRef}>
          {centeredTitle || 'DOLOR SIT AMET, CONSEC ADIPISCING ELIT. SED VIVAMUS SAGITTIS UT EST SIT AMET TRISTIQUE.'}
        </h2>
        <p className={styles.description} ref={descriptionRef}>
          {centeredDescription || 'Dolor sit amet, consec adipiscing elit. Sed in orci mi. Aenean varius finibus sapien, sit amet varius nibh mollis vitae. Vivamus vitae leo dolor. Vivamus sagittis ut est sit amet tristique. Vestibulum sed purus posuere, maximus ligula vel.'}
        </p>
      </div>
    </section>
  );
}
