'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { urlFor } from '../../../sanity/lib/image';
import styles from './styles/HeroBannerLoader.module.css';

export default function HeroBannerLoader({ loaderSettings, onComplete }) {
  const loaderRef = useRef(null);
  const loaderBgRef = useRef(null);
  const [showLoader, setShowLoader] = useState(false);

  // Get loader settings with defaults - use urlFor if image from Sanity
  const loaderImage = loaderSettings?.image?.asset 
    ? urlFor(loaderSettings.image).url() 
    : '/images/icon-loading.png';
  const loaderSize = loaderSettings?.size || 60;
  const animationSpeed = loaderSettings?.animationDuration || 2;
  const bgColor = loaderSettings?.backgroundColor || '#231F20';
  const displayDuration = loaderSettings?.displayDuration || 3;

  // Check if this is the first load
  useEffect(() => {
    const hasSeenLoader = sessionStorage.getItem('hasSeenLoader');
    if (!hasSeenLoader) {
      setShowLoader(true);
      sessionStorage.setItem('hasSeenLoader', 'true');
    } else if (onComplete) {
      // If loader was already seen, immediately notify that loader is complete
      onComplete();
    }
  }, [onComplete]);

  // Inject keyframes and set animation dynamically
  useEffect(() => {
    // Inject keyframes into document if not already present
    if (typeof window !== 'undefined' && !document.getElementById('hero-loader-keyframes')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'hero-loader-keyframes';
      styleSheet.textContent = `
        @keyframes slowSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @-webkit-keyframes slowSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(styleSheet);
    }

    // Set animation on loading icon via loaderContainer with small delay
    const setAnimation = () => {
      if (loaderRef.current && animationSpeed) {
        const iconElement = loaderRef.current.querySelector('img');
        if (iconElement) {
          iconElement.style.animation = `slowSpin ${animationSpeed}s linear infinite`;
          iconElement.style.webkitAnimation = `slowSpin ${animationSpeed}s linear infinite`;
        }
      }
    };

    // Small delay to ensure image is rendered
    const timer = setTimeout(setAnimation, 10);
    return () => clearTimeout(timer);
  }, [animationSpeed, showLoader]);

  // Loader animation effect
  useEffect(() => {
    if (!showLoader) return;

    // Lock body scroll while loader is showing
    document.body.style.overflow = 'hidden';

    // Animate loader in from top
    if (loaderRef.current && loaderBgRef.current) {
      gsap.set(loaderRef.current, { opacity: 0, y: -100 });
      gsap.set(loaderBgRef.current, { opacity: 1 }); // Set to full opacity immediately
      
      // Animate in
      gsap.to(loaderRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }

    // Fade out loader after duration with slide to bottom
    const loaderTimeout = setTimeout(() => {
      if (loaderRef.current && loaderBgRef.current) {
        // Animate loader image sliding down
        gsap.to(loaderRef.current, {
          opacity: 0,
          y: 100, // Slide to bottom
          duration: 0.5,
          ease: "power2.out",
        });
        // Animate background fading out
        gsap.to(loaderBgRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            setShowLoader(false);
            // Unlock body scroll
            document.body.style.overflow = 'auto';
            // Notify parent that loader is complete
            if (onComplete) {
              onComplete();
            }
          }
        });
      }
    }, displayDuration * 1000); // Use displayDuration

    return () => {
      clearTimeout(loaderTimeout);
      document.body.style.overflow = 'auto'; // Ensure scroll is unlocked on unmount
    };
  }, [showLoader, displayDuration, onComplete]);

  return (
    <>
      {showLoader && (
        <div 
          className={styles.loaderBackground} 
          ref={loaderBgRef}
          style={{ backgroundColor: bgColor }}
        >
          <div className={styles.loaderContainer} ref={loaderRef}>
            <Image
              src={loaderImage}
              alt={loaderSettings?.image?.alt || 'Loading'}
              width={loaderSize}
              height={loaderSize}
              className={styles.loadingIcon}
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}

