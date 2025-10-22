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
      // Only apply mobile animations if screen is mobile
      if (window.innerWidth <= 768) {
        // Create individual ScrollTriggers for each item
        itemsRef.current.forEach((itemEl, index) => {
          if (itemEl) {
            const titleEl = itemEl.querySelector(`.${styles.title}`);
            const descriptionEl = itemEl.querySelector(`.${styles.description}`);
            
            // Set initial state - title and description close together
            gsap.set(titleEl, { 
              y: 0
            });
            gsap.set(descriptionEl, { 
              y: 0
            });
            
            ScrollTrigger.create({
              trigger: itemEl,
              start: "bottom 25%", // Trigger when item is 25% from bottom of screen
              end: "bottom -100px", // Disappear only when completely out of view
              onEnter: () => {
                // Move title down and description up to create space
                gsap.to(titleEl, {
                  y: 50, // Move title 50px down
                  duration: 0.8,
                  ease: "power2.out",
                  delay: index * 0.1
                });
                
                gsap.to(descriptionEl, {
                  y: -50, // Move description 50px up
                  duration: 0.8,
                  ease: "power2.out",
                  delay: index * 0.1
                });
              },
              onLeave: () => {
                // Move back to original positions when going out of view
                gsap.to([titleEl, descriptionEl], {
                  y: 0,
                  duration: 0.6,
                  ease: "power2.in"
                });
              },
              onEnterBack: () => {
                // Move title down and description up when scrolling back up
                gsap.to(titleEl, {
                  y: 50,
                  duration: 0.8,
                  ease: "power2.out",
                  delay: index * 0.1
                });
                
                gsap.to(descriptionEl, {
                  y: -50,
                  duration: 0.8,
                  ease: "power2.out",
                  delay: index * 0.1
                });
              },
              onLeaveBack: () => {
                // Move back to original positions when scrolling back up and out of view
                gsap.to([titleEl, descriptionEl], {
                  y: 0,
                  duration: 0.6,
                  ease: "power2.in"
                });
              }
            });
          }
        });
      }
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
