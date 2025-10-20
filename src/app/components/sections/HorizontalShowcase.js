'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './styles/HorizontalShowcase.module.css';

export default function HorizontalShowcase({ horizontalShowcase }) {
  if (!horizontalShowcase || !horizontalShowcase.items || horizontalShowcase.items.length === 0) {
    return null;
  }

  const items = horizontalShowcase.items;
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const viewportH = window.innerHeight || document.documentElement.clientHeight;
        const collapsedHeight = 280; // Fixed for projected calculations (from CSS)

        entries.forEach((entry) => {
          const el = entry.target;
          const rect = entry.boundingClientRect;
          const isCurrentlyExpanded = el.classList.contains(styles.expanded);

          // Expand: project center using collapsed height, trigger when it reaches 85% of viewport (earlier trigger in lower half)
          const projectedCenter = rect.top + (collapsedHeight / 2);
          const triggerPoint = viewportH * 0.85;
          const shouldExpand = projectedCenter <= triggerPoint && !isCurrentlyExpanded;

          // Collapse: when current state is out of viewport by 100px (keeps expanded visible longer)
          const outOfView = rect.bottom < -100 || rect.top > viewportH + 100;

          if (outOfView) {
            el.classList.remove(styles.expanded);
          } else if (shouldExpand) {
            el.classList.add(styles.expanded);
          }
          // Stay expanded if partially in view and not out
        });
      },
      { threshold: [0, 1], rootMargin: '0px' }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));

    return () => {
      itemRefs.current.forEach((el) => el && observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <section className={styles.horizontalShowcase}>
      <div className={styles.container}>
        {horizontalShowcase.title && (
          <h2 className={styles.sectionTitle}>{horizontalShowcase.title}</h2>
        )}
        
        <div className={styles.showcaseWrapper}>
          <div className={styles.showcaseGrid}>
            {items.map((item, index) => (
              <div
                key={index}
                className={styles.showcaseItem}
                ref={(el) => (itemRefs.current[index] = el)}
              >
                <div className={styles.imageContainer}>
                  <Image
                    src={item.image?.asset?.url || '/placeholder.jpg'}
                    alt={item.image?.alt || item.title || 'Showcase item'}
                    width={480}
                    height={684}
                    className={styles.image}
                    priority={index < 2}
                  />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.description}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}