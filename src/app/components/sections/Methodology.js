'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './styles/Methodology.module.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Methodology({ methodology }) {
  const containerRef = useRef(null);
  const stepsRef = useRef([]);

  if (!methodology || !methodology.steps || methodology.steps.length === 0) {
    return null;
  }

  const { image, steps } = methodology;

  useEffect(() => {
    if (!containerRef.current || steps.length === 0) return;

    const ctx = gsap.context(() => {
      // Set initial state for all steps
      steps.forEach((_, index) => {
        const stepElement = stepsRef.current[index];
        if (stepElement) {
          const counter = stepElement.querySelector('.counter');
          const description = stepElement.querySelector('.description');
          
          gsap.set([counter, description], { 
            opacity: 0,
            y: 14
          });
        }
      });

      // Create individual ScrollTriggers for each step based on scroll position
      steps.forEach((_, index) => {
        const stepElement = stepsRef.current[index];
        if (stepElement) {
          const counter = stepElement.querySelector('.counter');
          const description = stepElement.querySelector('.description');
          
          // Single ScrollTrigger for both counter and description together
          ScrollTrigger.create({
            trigger: stepElement,
            start: "top 80%",
            end: "bottom -100px",
            onEnter: () => {
              // Animate both counter and description together
              gsap.to([counter, description], {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                delay: index * 0.3 // Add delay between steps
              });
            },
            onLeave: () => {
              // Fade out both counter and description together
              gsap.to([counter, description], {
                opacity: 0,
                y: 14,
                duration: 0.4,
                ease: "power2.in"
              });
            },
            onEnterBack: () => {
              // Animate both counter and description together when scrolling back up
              gsap.to([counter, description], {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                delay: index * 0.3
              });
            },
            onLeaveBack: () => {
              // Fade out both counter and description together when scrolling back up and out
              gsap.to([counter, description], {
                opacity: 0,
                y: 14,
                duration: 0.4,
                ease: "power2.in"
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
  }, [steps]);

  return (
    <section className={styles.methodology} ref={containerRef}>
      {/* Parallax Background Image */}
      {image?.asset?.url && (
        <div 
          className={styles.parallaxImage}
          style={{ backgroundImage: `url(${image.asset.url})` }}
        />
      )}

      {/* Methodology Steps */}
      <div className={styles.stepsContainer}>
        <div className={styles.stepsGrid}>
          {steps.map((step, index) => (
            <div 
              key={index} 
              ref={el => stepsRef.current[index] = el}
              className={styles.step}
            >
              <div className={`${styles.counter} counter`}>{step.counter}</div>
              <div className={`${styles.description} description`}>{step.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
