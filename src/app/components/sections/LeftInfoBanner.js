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
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);

  if (!leftInfoBanner) {
    return null;
  }

  const { header, image, title, description, cta } = leftInfoBanner;

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Collect all elements that exist (only the ones that are rendered)
      const elementsToAnimate = [];
      if (headerRef.current) elementsToAnimate.push(headerRef.current);
      if (titleRef.current) elementsToAnimate.push(titleRef.current);
      if (descriptionRef.current) elementsToAnimate.push(descriptionRef.current);
      if (ctaRef.current) elementsToAnimate.push(ctaRef.current);

      if (elementsToAnimate.length === 0) return; // Safety check

      // Set initial state for all elements
      gsap.set(elementsToAnimate, {
        opacity: 0,
        x: -100 // Start 100px to the left
      });

      const animateElements = () => {
        // Kill any running animations first
        elementsToAnimate.forEach(element => {
          gsap.killTweensOf(element);
        });

        // Animate each element with 0.7s delay between them
        elementsToAnimate.forEach((element, index) => {
          gsap.to(element, {
            opacity: 1,
            x: 0, // Move to original position
            duration: 2,
            ease: "power2.out",
            delay: index * 0.7 // 0.7s delay between each element
          });
        });
      };

      const resetElements = () => {
        // Kill any running animations
        elementsToAnimate.forEach(element => {
          gsap.killTweensOf(element);
        });
        // Reset to initial state
        gsap.set(elementsToAnimate, {
          opacity: 0,
          x: -100
        });
      };

      // Create ScrollTrigger - make sure it triggers every time it enters view
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: animateElements,
        onEnterBack: animateElements, // Trigger when scrolling back down
        onLeaveBack: resetElements // Reset when scrolling up past section (so it can re-animate when scrolling down again)
      });
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [header, title, description, cta]);

  return (
    <section className={styles.leftInfoBanner} ref={containerRef}>
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
          {/* Header - only render if header exists */}
          {header?.trim() && (
            <div ref={headerRef} className={styles.header}>{header}</div>
          )}

          {/* Title */}
          {title && (
            <h2 ref={titleRef} className={styles.title}>{title}</h2>
          )}

          {/* Description - only render if description exists */}
          {description?.trim() && (
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

