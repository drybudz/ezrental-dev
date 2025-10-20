'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './styles/HorizontalShowcase.module.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HorizontalShowcaseGSAP({ horizontalShowcase }) {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  if (!horizontalShowcase || !horizontalShowcase.items || horizontalShowcase.items.length === 0) {
    return null;
  }

  const items = horizontalShowcase.items;

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((itemEl, index) => {
        if (!itemEl) return;

        const imageContainer = itemEl.querySelector(`.${styles.imageContainer}`);
        
        // Only apply mobile animations if screen is mobile
        if (window.innerWidth <= 768) {
          // Set initial state for mobile only
          gsap.set(imageContainer, { height: 240 });

          // Create ScrollTrigger for each item (mobile only)
          ScrollTrigger.create({
            trigger: itemEl,
            start: "top 80%",
            end: "bottom 20%",
            onEnter: () => {
              gsap.to(imageContainer, {
                height: 480,
                duration: 0.8,
                ease: "power2.out"
              });
            },
            onLeave: () => {
              gsap.to(imageContainer, {
                height: 240,
                duration: 0.6,
                ease: "power2.inOut"
              });
            },
            onEnterBack: () => {
              gsap.to(imageContainer, {
                height: 480,
                duration: 0.8,
                ease: "power2.out"
              });
            },
            onLeaveBack: () => {
              gsap.to(imageContainer, {
                height: 240,
                duration: 0.6,
                ease: "power2.inOut"
              });
            }
          });
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [items]);

  return (
    <section className={styles.horizontalShowcase} ref={containerRef}>
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
                ref={(el) => (itemsRef.current[index] = el)}
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
