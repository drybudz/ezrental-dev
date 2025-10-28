'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './styles/LeftInfoBanner.module.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LeftInfoBanner({ leftInfoBanner }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);

  if (!leftInfoBanner) {
    return null;
  }

  const { header, image, title, description, cta } = leftInfoBanner;

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set([headerRef.current, titleRef.current, descriptionRef.current, ctaRef.current], {
        opacity: 0,
        x: -100
      });

      // Create ScrollTrigger
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom -10%',
        onEnter: () => {
          // Header animation
          gsap.to(headerRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out'
          });
          
          // Title animation
          gsap.to(titleRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.2
          });
          
          // Description animation
          gsap.to(descriptionRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.4
          });
          
          // CTA animation with delay
          gsap.to(ctaRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.6
          });
        },
        onLeave: () => {
          gsap.to([headerRef.current, titleRef.current, descriptionRef.current, ctaRef.current], {
            opacity: 0,
            x: -100,
            duration: 0.4,
            ease: 'power2.in'
          });
        },
        onEnterBack: () => {
          gsap.to(headerRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out'
          });
          gsap.to(titleRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.2
          });
          gsap.to(descriptionRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.4
          });
          gsap.to(ctaRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.6
          });
        },
        onLeaveBack: () => {
          gsap.to([headerRef.current, titleRef.current, descriptionRef.current, ctaRef.current], {
            opacity: 0,
            x: -100,
            duration: 0.4,
            ease: 'power2.in'
          });
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className={styles.leftInfoBanner} ref={sectionRef}>
      {image?.asset?.url && (
        <div className={styles.imageBackground}>
          <Image
            src={image.asset.url}
            alt={image.alt || 'Banner background'}
            fill
            className={styles.backgroundImage}
          />
          <div className={styles.imageOverlay} />
        </div>
      )}
      
      <div className={styles.contentWrapper}>
        <div className={styles.contentContainer}>
          {/* Header */}
          {header && (
            <div ref={headerRef} className={styles.header}>{header}</div>
          )}

          {/* Title */}
          {title && (
            <h2 ref={titleRef} className={styles.title}>{title}</h2>
          )}

          {/* Description */}
          {description && (
            <p ref={descriptionRef} className={styles.description}>{description}</p>
          )}

          {/* CTA Button */}
          {cta?.text && cta?.url && (
            <Link
              ref={ctaRef}
              href={cta.url}
              target={cta.target || '_self'}
              className={styles.ctaButton}
            >
              {cta.text}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

