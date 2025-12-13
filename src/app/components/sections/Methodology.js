'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { urlFor, getHotspotPosition } from '../../../sanity/lib/image';
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

  // Generate image URL with crop and get hotspot position for background
  const imageUrl = image?.asset ? urlFor(image).url() : null;
  const backgroundPosition = image?.hotspot ? getHotspotPosition(image.hotspot) : 'center';

  useEffect(() => {
    if (!containerRef.current || steps.length === 0) return;

    const ctx = gsap.context(() => {
      // Collect all step elements - need to do this inside context and check they exist
      const stepElements = stepsRef.current.filter(ref => ref !== null);
      
      if (stepElements.length === 0) return; // Safety check

      // Set initial state for all steps
      gsap.set(stepElements, {
        opacity: 0,
        y: 70 // Start 70px down
      });

      const animateSteps = () => {
        // Kill any running animations first
        stepElements.forEach(stepElement => {
          gsap.killTweensOf(stepElement);
        });
        
        // Animate each step with 0.7s delay between them
        stepElements.forEach((stepElement, index) => {
          gsap.to(stepElement, {
            opacity: 1,
            y: 0, // Move up to original position
            duration: 1.7,
            ease: "power2.out",
            delay: index * 0.7 // 0.7s delay between each step
          });
        });
      };

      const resetSteps = () => {
        // Kill any running animations
        stepElements.forEach(stepElement => {
          gsap.killTweensOf(stepElement);
        });
        // Reset to initial state
        gsap.set(stepElements, {
          opacity: 0,
          y: 70
        });
      };

      // Create ScrollTrigger - make sure it triggers every time it enters view
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 20%",
        end: "bottom 20%",
        onEnter: animateSteps,
        onEnterBack: animateSteps, // Trigger when scrolling back down
        onLeaveBack: resetSteps // Reset when scrolling up past section (so it can re-animate when scrolling down again)
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
      {imageUrl && (
        <div 
          className={styles.parallaxImage}
          style={{ 
            backgroundImage: `url(${imageUrl})`,
            backgroundPosition
          }}
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
              <div className={styles.counter}>{step.counter}</div>
              <div className={styles.description}>{step.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
