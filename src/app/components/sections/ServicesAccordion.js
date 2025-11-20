'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './styles/ServicesAccordion.module.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesAccordion({ servicesImage, services = [] }) {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const accordionRefs = useRef([]);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  useEffect(() => {
    // Smooth accordion animation
    accordionRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const content = ref.querySelector(`.${styles.accordionContent}`);
      const title = ref.querySelector(`.${styles.accordionTitle}`);
      if (!content || !title) return;

      const isOpen = openIndex === index;

      if (isOpen) {
        gsap.to([content, title], {
          height: 'auto',
          duration: 1.3,
          ease: 'power3.out',
          opacity: 1,
          y: 0,
        });
      } else {
        gsap.to(content, {
          height: 0,
          duration: 1.3,
          ease: 'power3.in',
          opacity: 0,
        });
        gsap.to(title, {
          y: 0,
          duration: 1.3,
          ease: 'power3.out',
        });
      }
    });
  }, [openIndex]);

  // Mobile scroll logic - always keep one accordion open based on scroll
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      accordionRefs.current.forEach((ref, index) => {
        if (!ref) return;

        const rect = ref.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5;

        if (isInView) {
          setOpenIndex(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const toggleAccordion = (index) => {
    if (isMobile) return; // Prevent manual toggle on mobile
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleMouseEnter = (index) => {
    if (isMobile) return;
    setHoverIndex(index);
    setOpenIndex(index);
  };

  const handleMouseLeave = (index) => {
    if (isMobile) return;
    setHoverIndex(null);
  };

  return (
    <section className={styles.servicesAccordion} ref={containerRef}>
      <div className={styles.container}>
        {/* Left Column - Image with Parallax */}
        <div className={styles.imageColumn}>
          {servicesImage?.asset?.url && (
            <div className={styles.imageWrapper} ref={imageRef}>
              <Image
                src={servicesImage.asset.url}
                alt={servicesImage.alt || 'Services'}
                width={800}
                height={1200}
                className={styles.image}
              />
            </div>
          )}
        </div>

        {/* Right Column - Accordion */}
        <div className={styles.accordionColumn}>
          {services.map((service, index) => (
            <div
              key={index}
              className={`${styles.accordionItem} ${index === services.length - 1 ? styles.lastItem : ''}`}
              ref={el => accordionRefs.current[index] = el}
            >
              <button
                className={`${styles.accordionTitle} ${openIndex === index ? styles.open : ''}`}
                onClick={() => toggleAccordion(index)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                {service.title}
              </button>
              <div className={styles.accordionContent}>
                <div className={styles.accordionDescription}>
                  {service.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

