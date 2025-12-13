'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { urlFor, getHotspotPosition } from '../../../sanity/lib/image';
import styles from './styles/HeroBanner.module.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroBannerGSAP({ heroText, heroImage, loaderFinished }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const heroSectionRef = useRef(null);

  // Fade in hero section when loader is finished
  useEffect(() => {
    if (!loaderFinished || !heroSectionRef.current) return;
    
    gsap.to(heroSectionRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    });
  }, [loaderFinished]);


  useEffect(() => {
    // Only run animation if heroText exists and refs are available
    if (!heroText?.trim() || !containerRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(textRef.current, { opacity: 0, y: -500 });

      // Create parallax + fade-in animation
      gsap.to(textRef.current, {
        opacity: 1,
        y: 150, 
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1, // Smooth scrubbing for parallax
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [heroText]);

  // Generate image URL with crop and get hotspot position
  const imageUrl = heroImage?.asset ? urlFor(heroImage).url() : null;
  const objectPosition = heroImage?.hotspot ? getHotspotPosition(heroImage.hotspot) : 'center';

  return (
    <section className={styles.heroBanner} ref={containerRef}>
      <div ref={heroSectionRef} style={{ opacity: 0 }}>
        <div className={styles.backgroundImage}>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={heroImage?.alt || 'Hero background'}
              fill
              className={styles.heroImage}
              priority
              style={{ objectPosition }}
            />
          )}
        </div>
        {heroText?.trim() && (
          <div className={styles.textOverlay}>
            <h1 className={styles.heroText} ref={textRef}>
              {heroText}
            </h1>
          </div>
        )}
      </div>
    </section>
  );
}
