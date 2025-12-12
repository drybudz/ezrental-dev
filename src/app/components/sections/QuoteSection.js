'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './styles/QuoteSection.module.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function QuoteSection({ quoteTitle, quoteImage }) {
  const titleRef = useRef(null);
  const sectionRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageInnerRef = useRef(null);
  const [animationSide, setAnimationSide] = useState(null);

  useEffect(() => {
    if (!titleRef.current || !sectionRef.current) return;

    // Randomly choose left or right
    const side = Math.random() < 0.5 ? 'left' : 'right';
    setAnimationSide(side);

    const xValue = side === 'left' ? -150 : 150;

    // Set initial state
    gsap.set(titleRef.current, {
      opacity: 0,
      x: xValue,
    });

    // ScrollTrigger animation
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom -50px',
        onEnter: () => {
          gsap.to(titleRef.current, {
            opacity: 1,
            x: 0,
            duration: 1.8,
            ease: 'power2.out',
          });
        },
        onLeave: () => {
          gsap.to(titleRef.current, {
            opacity: 0,
            x: xValue,
            duration: 1.4,
            ease: 'power2.in',
          });
        },
        onEnterBack: () => {
          gsap.to(titleRef.current, {
            opacity: 1,
            x: 0,
            duration: 1.8,
            ease: 'power2.out',
          });
        },
        onLeaveBack: () => {
          gsap.to(titleRef.current, {
            opacity: 0,
            x: xValue,
            duration: 1.4,
            ease: 'power2.in',
          });
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);


  // Opacity animation for imageInner
  useEffect(() => {
    if (!imageInnerRef.current || !sectionRef.current || !quoteImage) return;

    const ctx = gsap.context(() => {
      // Animate opacity from 30% to 100% as you scroll
      gsap.fromTo(imageInnerRef.current, 
        {
          opacity: 0.3, // Start at 30% opacity
        },
        {
          opacity: 1, // End at 100% opacity
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom', // Start when top of section hits bottom of viewport
            end: 'top 50%', // End when top of section hits middle of viewport
            scrub: true, // Smooth scrubbing tied to scroll position
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, [quoteImage]);

  if (!quoteTitle && !quoteImage) {
    return null;
  }

  return (
    <section className={styles.quoteSection} ref={sectionRef}>
      {quoteTitle && (
        <div className={styles.titleContainer}>
          <div className={styles.title} ref={titleRef}>
            {quoteTitle}
          </div>
        </div>
      )}
      {quoteImage?.asset?.url && (
        <div className={styles.imageContainer}>
          <div ref={imageWrapperRef} className={styles.imageWrapper}>
            <div ref={imageInnerRef} className={styles.imageInner}>
              <Image
                src={quoteImage.asset.url}
                alt={quoteImage.alt || 'Quote section image'}
                fill
                className={styles.image}
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

