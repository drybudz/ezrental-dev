'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './styles/FiftySection.module.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FiftySection({ fiftySection }) {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);

  if (!fiftySection) {
    return null;
  }

  const { header, image, title, description, cta } = fiftySection;

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(titleRef.current, { 
        opacity: 0,
        x: -100 // Start from left
      });
      
      const elementsFromRight = [descriptionRef.current, ctaRef.current].filter(Boolean);
      if (headerRef.current) elementsFromRight.push(headerRef.current);
      
      gsap.set(elementsFromRight, { 
        opacity: 0,
        x: 100 // Start from right
      });

      // Create ScrollTrigger for the entire section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          // Title slide from left to right
          gsap.to(titleRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out"
          });
          
          // Header, description, and CTA slide from right (slower)
          if (headerRef.current) {
            gsap.to(headerRef.current, {
              opacity: 1,
              x: 0,
              duration: 1.5,
              ease: "power2.out",
              delay: 0.2
            });
          }
          
          gsap.to(descriptionRef.current, {
            opacity: 1,
            x: 0,
            duration: 1.5,
            ease: "power2.out",
            delay: 0.4
          });
          
          gsap.to(ctaRef.current, {
            opacity: 1,
            x: 0,
            duration: 1.5,
            ease: "power2.out",
            delay: 0.6
          });
        },
        onLeave: () => {
          // Reset elements to initial state when section leaves
          gsap.to(titleRef.current, {
            opacity: 0,
            x: -100,
            duration: 0.4,
            ease: "power2.in"
          });
          const elementsToReset = [descriptionRef.current, ctaRef.current].filter(Boolean);
          if (headerRef.current) elementsToReset.push(headerRef.current);
          gsap.to(elementsToReset, {
            opacity: 0,
            x: 100,
            duration: 0.4,
            ease: "power2.in"
          });
        },
        onEnterBack: () => {
          // Replay animation when scrolling back up
          gsap.to(titleRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out"
          });
          
          if (headerRef.current) {
            gsap.to(headerRef.current, {
              opacity: 1,
              x: 0,
              duration: 1.5,
              ease: "power2.out",
              delay: 0.2
            });
          }
          
          gsap.to(descriptionRef.current, {
            opacity: 1,
            x: 0,
            duration: 1.5,
            ease: "power2.out",
            delay: 0.4
          });
          
          gsap.to(ctaRef.current, {
            opacity: 1,
            x: 0,
            duration: 1.5,
            ease: "power2.out",
            delay: 0.6
          });
        },
        onLeaveBack: () => {
          // Reset elements to initial state when scrolling back up and out of view
          gsap.to(titleRef.current, {
            opacity: 0,
            x: -100,
            duration: 0.4,
            ease: "power2.in"
          });
          const elementsToReset = [descriptionRef.current, ctaRef.current].filter(Boolean);
          if (headerRef.current) elementsToReset.push(headerRef.current);
          gsap.to(elementsToReset, {
            opacity: 0,
            x: 100,
            duration: 0.4,
            ease: "power2.in"
          });
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className={styles.fiftySection} ref={containerRef}>
      {/* Left Column - Image */}
      <div className={styles.imageColumn}>
        {image?.asset?.url && (
          <Image
            src={image.asset.url}
            alt={image.alt || 'Section image'}
            fill
            className={styles.image}
          />
        )}
      </div>

      {/* Right Column - Content */}
      <div className={styles.contentColumn}>
        {/* Header - only render if header exists */}
        {header?.trim() && (
          <div ref={headerRef} className={styles.header}>{header}</div>
        )}

        {/* Title */}
        {title && (
          <h2 ref={titleRef} className={styles.title}>{title}</h2>
        )}

        {/* Large Gap - 90px between description and CTA */}

        {/* Bottom Content Container */}
        <div className={styles.bottomContent}>
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

