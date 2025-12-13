'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { urlFor, getHotspotPosition } from '../../../sanity/lib/image';
import styles from './styles/AboutSection.module.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection({ aboutSection }) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const itemsRef = useRef([]);

  if (!aboutSection || !aboutSection.items || aboutSection.items.length === 0) {
    return null;
  }

  const { items, image } = aboutSection;

  // Generate image URL with crop and get hotspot position
  const imageUrl = image?.asset ? urlFor(image).url() : null;
  const objectPosition = image?.hotspot ? getHotspotPosition(image.hotspot) : 'center';

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
      items.forEach((_, index) => {
        const itemElement = itemsRef.current[index];
        if (!itemElement) return;

        const headline = itemElement.querySelector(`.${styles.headline}`);
        const title = itemElement.querySelector(`.${styles.title}`);
        const description = itemElement.querySelector(`.${styles.description}`);

        gsap.set([headline, title, description], { opacity: 0, y: 20 });

        ScrollTrigger.create({
          trigger: itemElement,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            const tl = gsap.timeline({
              defaults: { duration: 0.6, ease: 'power2.out' },
            });

            if (headline) {
              tl.to(headline, { opacity: 1, y: 0 });
            }

            if (title) {
              tl.to(title, { opacity: 1, y: 0 }, '-=0.3');
            }

            if (description) {
              tl.to(description, { opacity: 1, y: 0 }, '-=0.2');
            }
          },
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
              <div className={styles.description}>{item.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Width Image */}
      {imageUrl && (
        <div className={styles.imageContainer} ref={imageRef}>
          <Image
            src={imageUrl}
            alt={image?.alt || 'About section image'}
            fill
            className={styles.image}
            style={{ objectPosition }}
          />
        </div>
      )}
    </section>
  );
}

