'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { urlFor, getHotspotPosition } from '../../../sanity/lib/image';
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
  const detailsRefs = useRef([]);

  // Generate image URL with crop and get hotspot position
  const imageUrl = servicesImage?.asset ? urlFor(servicesImage).url() : null;
  const objectPosition = servicesImage?.hotspot ? getHotspotPosition(servicesImage.hotspot) : 'center';

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
      const detailsContainer = ref.querySelector(`.${styles.accordionDetails}`);
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

        // Animate details with stagger
        if (detailsContainer) {
          const detailItems = detailsContainer.querySelectorAll(`.${styles.detailItem}`);
          gsap.fromTo(detailItems, 
            {
              opacity: 0,
              y: 10,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
              stagger: 0.10,
              delay: 0.2, // Start after content opens
            }
          );
        }
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

        // Hide details when closing
        if (detailsContainer) {
          const detailItems = detailsContainer.querySelectorAll(`.${styles.detailItem}`);
          gsap.set(detailItems, {
            opacity: 0,
            y: 10,
          });
        }
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
          {imageUrl && (
            <div className={styles.imageWrapper} ref={imageRef}>
              <Image
                src={imageUrl}
                alt={servicesImage?.alt || 'Services'}
                width={800}
                height={1200}
                className={styles.image}
                style={{ objectPosition }}
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
                {service.servicesDetails && service.servicesDetails.length > 0 && (
                  <div className={styles.accordionDetails}>
                    {service.servicesDetails.flatMap((detail, detailIndex) => {
                      // Split each detail by line breaks
                      const lines = detail.split('\n').filter(line => line.trim());
                      return lines.map((line, lineIndex) => {
                        const isLastLineInDetail = lineIndex === lines.length - 1;
                        const isLastDetail = detailIndex === service.servicesDetails.length - 1;
                        // Only add separator if this is the last line of this detail AND there are more details
                        const shouldAddSeparator = isLastLineInDetail && !isLastDetail;
                        
                        return (
                          <span key={`${detailIndex}-${lineIndex}`} className={styles.detailItem}>
                            {line.trim().toUpperCase()}
                            {shouldAddSeparator && (
                              <span className={styles.detailSeparator}> • </span>
                            )}
                            {!isLastLineInDetail && <br />}
                          </span>
                        );
                      });
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

