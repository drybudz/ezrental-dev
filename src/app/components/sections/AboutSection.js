'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './styles/AboutSection.module.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection({ aboutSection }) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const itemsRef = useRef([]);
  const [displayedTexts, setDisplayedTexts] = useState({});

  if (!aboutSection || !aboutSection.items || aboutSection.items.length === 0) {
    return null;
  }

  const { items, image } = aboutSection;

  // Writing effect function
  const typewriter = (text, callback, speed = 30) => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        callback(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax effect for the image
      gsap.fromTo(
        imageRef.current,
        { y: 0 },
        {
          y: -50,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );

      // ScrollTrigger for each item
      items.forEach((item, index) => {
        const itemElement = itemsRef.current[index];
        if (!itemElement) return;

        ScrollTrigger.create({
          trigger: itemElement,
          start: 'top 80%',
          onEnter: () => {
            // Show headline and title with fade
            gsap.fromTo(itemElement.querySelector(`.${styles.headline}`), 
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
            );
            
            gsap.fromTo(itemElement.querySelector(`.${styles.title}`), 
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.2 }
            );

            // Writing effect for description (3 seconds total)
            const description = itemElement.querySelector(`.${styles.description}`);
            if (description && item.description) {
              const charCount = item.description.length;
              const speed = 3000 / charCount; // 3 seconds total
              
              typewriter(item.description, (text) => {
                setDisplayedTexts(prev => ({ ...prev, [index]: text }));
              }, speed);
            }
          }
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [items]);

  return (
    <section className={styles.aboutSection} ref={containerRef}>
      {/* Orange Section with 3 Items */}
      <div className={styles.orangeSection}>
        <div className={styles.itemsContainer}>
          {items.map((item, index) => (
            <div
              key={index}
              className={styles.item}
              ref={el => itemsRef.current[index] = el}
            >
              <div className={styles.headline}>{item.headline}</div>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.description}>
                {displayedTexts[index] || ''}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Width Image */}
      {image?.asset?.url && (
        <div className={styles.imageContainer} ref={imageRef}>
          <Image
            src={image.asset.url}
            alt={image.alt || 'About section image'}
            fill
            className={styles.image}
          />
        </div>
      )}
    </section>
  );
}

