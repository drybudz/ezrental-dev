'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './styles/HorizontalShowcase.module.css';

export default function HorizontalShowcase({ horizontalShowcase }) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const autoSlideRef = useRef(null);
  const isUserInteracting = useRef(false);

  if (!horizontalShowcase || !horizontalShowcase.items || horizontalShowcase.items.length === 0) {
    return null;
  }

  const items = horizontalShowcase.items;

  // Auto-slide functionality - only starts after user inactivity
  const startAutoSlide = () => {
    if (window.innerWidth <= 992 && items.length > 1) {
      autoSlideRef.current = setInterval(() => {
        if (sliderRef.current && !isUserInteracting.current) {
          setCurrentIndex((prevIndex) => {
            // Option 2: Stop at the last item, don't restart
            if (prevIndex < items.length - 1) {
              const nextIndex = prevIndex + 1;
              sliderRef.current.scrollTo({
                left: nextIndex * window.innerWidth,
                behavior: 'smooth'
              });
              return nextIndex;
            } else {
              // At the end, stop auto-sliding
              if (autoSlideRef.current) {
                clearInterval(autoSlideRef.current);
                autoSlideRef.current = null;
              }
              return prevIndex; // Stay at the last item
            }
          });
        }
      }, 4000); // Auto-slide every 4 seconds
    }
  };

  const goToSlide = (index) => {
    if (sliderRef.current && index >= 0 && index < items.length) {
      sliderRef.current.scrollTo({
        left: index * window.innerWidth,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const nextSlide = () => {
    // Option 2: Proper bounds checking - stop at the last item
    if (currentIndex < items.length - 1) {
      goToSlide(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    // Option 2: Proper bounds checking - stop at the first item
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    isUserInteracting.current = true;
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      autoSlideRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    isUserInteracting.current = false;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    isUserInteracting.current = false;
    // Start auto-slide after 10 seconds of inactivity
    setTimeout(() => {
      startAutoSlide();
    }, 10000); // Wait 10 seconds before starting auto-slide
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    isUserInteracting.current = true;
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      autoSlideRef.current = null;
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    isUserInteracting.current = false;
    
    // Determine which slide we should snap to based on scroll position
    if (sliderRef.current) {
      const slideWidth = window.innerWidth;
      const scrollPosition = sliderRef.current.scrollLeft;
      const newIndex = Math.round(scrollPosition / slideWidth);
      // Ensure we don't go beyond bounds
      const clampedIndex = Math.max(0, Math.min(newIndex, items.length - 1));
      setCurrentIndex(clampedIndex);
    }
    
    // Start auto-slide after 10 seconds of inactivity
    setTimeout(() => {
      startAutoSlide();
    }, 10000); // Wait 10 seconds before starting auto-slide
  };

  // Handle swipe gestures
  const handleWheel = (e) => {
    if (window.innerWidth <= 992) {
      e.preventDefault();
      if (e.deltaX > 0) {
        nextSlide(); // Swipe right
      } else if (e.deltaX < 0) {
        prevSlide(); // Swipe left
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, []);

  return (
    <section className={styles.horizontalShowcase}>
      <div className={styles.container}>
        {horizontalShowcase.title && (
          <h2 className={styles.sectionTitle}>{horizontalShowcase.title}</h2>
        )}
        
        <div className={styles.showcaseWrapper}>
          <div 
            className={styles.showcaseGrid}
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
          >
            {items.map((item, index) => (
              <div key={index} className={styles.showcaseItem}>
                <div className={styles.imageContainer}>
                  <Image
                    src={item.image?.asset?.url || '/placeholder.jpg'}
                    alt={item.image?.alt || item.title || 'Showcase item'}
                    width={480}
                    height={684}
                    className={styles.image}
                    priority={index < 2}
                  />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.description}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}