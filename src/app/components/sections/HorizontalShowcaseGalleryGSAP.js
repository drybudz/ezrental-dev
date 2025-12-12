'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { urlFor } from '../../../sanity/lib/image';
import styles from './styles/HorizontalShowcaseGallery.module.css';

export default function HorizontalShowcaseGalleryGSAP({ horizontalShowcase }) {
  const containerRef = useRef(null);
  const itemsRefs = useRef([]);
  const itemsDataRef = useRef(null); // Store items reference to avoid dependency issues
  const [displayedIndices, setDisplayedIndices] = useState([]);
  const [nextItemIndex, setNextItemIndex] = useState(0);
  const [lastReplacedSlot, setLastReplacedSlot] = useState(null);
  const [pendingImages, setPendingImages] = useState({}); // Track pending images for crossfade: { slotIndex: itemIndex }
  const timeoutRef = useRef(null);
  const preloadTimeoutRef = useRef(null);

  if (!horizontalShowcase || !horizontalShowcase.items || horizontalShowcase.items.length === 0) {
    return null;
  }

  const items = horizontalShowcase.items;
  // Update ref when items change (only length matters for effects)
  itemsDataRef.current = items;

  // Get random delay between 5-7 seconds
  const getRandomDelay = () => Math.random() * 2000 + 5000; // 5000-7000ms

  // Initialize with first 3 items (or all if less than 3)
  useEffect(() => {
    if (displayedIndices.length === 0 && items.length > 0) {
      const initialCount = Math.min(3, items.length);
      const initialIndices = Array.from({ length: initialCount }, (_, i) => i);
      setDisplayedIndices(initialIndices);
      setNextItemIndex(initialCount >= items.length ? 0 : initialCount);
    }
  }, [items.length, displayedIndices.length]);

  // Rotation logic
  useEffect(() => {
    const currentItems = itemsDataRef.current;
    if (!currentItems || displayedIndices.length === 0 || currentItems.length <= displayedIndices.length) return;

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const replaceRandomItem = () => {
      const items = itemsDataRef.current;
      if (!items) return;

      // Pick a different slot than the last one replaced (if exists)
      const availableSlots = lastReplacedSlot !== null
        ? displayedIndices.map((_, idx) => idx).filter((idx) => idx !== lastReplacedSlot)
        : displayedIndices.map((_, idx) => idx);
      const slotToReplace = availableSlots[Math.floor(Math.random() * availableSlots.length)];

      // Get the item element
      const itemElement = itemsRefs.current[slotToReplace];
      if (!itemElement) return;

      // Find next available item index (cycle sequentially, skip already displayed items)
      let nextIndex = nextItemIndex;
      let attempts = 0;
      const maxAttempts = items.length;
      
      // Find next item that's not already displayed in other slots
      while (attempts < maxAttempts) {
        // Check if this index is already displayed in other slots
        const isAlreadyDisplayed = displayedIndices.some((idx, slotIdx) => 
          idx === nextIndex && slotIdx !== slotToReplace
        );
        
        if (!isAlreadyDisplayed) {
          break; // Found a valid item
        }
        
        // Move to next item, wrap around if needed
        nextIndex = (nextIndex + 1) >= items.length ? 0 : nextIndex + 1;
        attempts++;
      }

      // Preload the next image 0.8s before starting the crossfade
      setPendingImages(prev => ({ ...prev, [slotToReplace]: nextIndex }));

      // Start crossfade after preload delay
      preloadTimeoutRef.current = setTimeout(() => {
        const oldImageEl = itemElement.querySelector('[data-gallery-image-old]');
        const newImageEl = itemElement.querySelector('[data-gallery-image-new]');
        
        if (oldImageEl && newImageEl) {
          // Crossfade: fade out old, fade in new simultaneously
          gsap.to(oldImageEl, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.in',
          });
          
          gsap.fromTo(newImageEl, 
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
              onComplete: () => {
                // Update displayed indices after crossfade completes
                const newIndices = [...displayedIndices];
                newIndices[slotToReplace] = nextIndex;
                setDisplayedIndices(newIndices);
                setLastReplacedSlot(slotToReplace);
                setPendingImages(prev => {
                  const updated = { ...prev };
                  delete updated[slotToReplace];
                  return updated;
                });
                // Set next item index (wrap around if needed)
                setNextItemIndex((nextIndex + 1) >= items.length ? 0 : nextIndex + 1);
              },
            }
          );
        }
      }, 800); // 0.8s preload delay
    };

    // Set timeout for next replacement
    const delay = getRandomDelay();
    timeoutRef.current = setTimeout(replaceRandomItem, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (preloadTimeoutRef.current) {
        clearTimeout(preloadTimeoutRef.current);
      }
    };
  }, [displayedIndices, nextItemIndex, items.length, lastReplacedSlot]);

  // Update title/description visibility when displayedIndices changes
  useEffect(() => {
    displayedIndices.forEach((itemIdx, slotIdx) => {
      const itemElement = itemsRefs.current[slotIdx];
      if (!itemElement) return;

      const items = itemsDataRef.current;
      if (!items) return;

      const item = items[itemIdx];
      const hasTitle = item?.title?.trim();
      const hasDescription = item?.description?.trim();

      const titleEl = itemElement.querySelector('[data-gallery-title]');
      const descriptionEl = itemElement.querySelector('[data-gallery-description]');

      // Set title visibility (no animation)
      if (titleEl) {
        if (hasTitle) {
          gsap.set(titleEl, { opacity: 1 });
        } else {
          gsap.set(titleEl, { opacity: 0 });
        }
      }

      // Set description visibility (no animation)
      if (descriptionEl) {
        if (hasDescription) {
          gsap.set(descriptionEl, { opacity: 1 });
        } else {
          gsap.set(descriptionEl, { opacity: 0 });
        }
      }
    });
  }, [displayedIndices]);

  if (displayedIndices.length === 0) {
    return null;
  }

  return (
    <section className={styles.horizontalShowcaseGallery} ref={containerRef}>
      <div className={styles.showcaseGrid}>
        {displayedIndices.map((itemIdx, slotIdx) => {
          const item = items[itemIdx];
          const hasTitle = item?.title?.trim();
          const hasDescription = item?.description?.trim();

          return (
            <div
              key={`${itemIdx}-${slotIdx}`}
              className={styles.showcaseItem}
              ref={(el) => (itemsRefs.current[slotIdx] = el)}
            >
              <div className={styles.imageContainer}>
                {/* Current/old image layer - always show current image */}
                {item?.image?.asset?.url && (
                  <div className={styles.imageLayer} data-gallery-image-old>
                    <Image
                      src={urlFor(item.image).width(1280).quality(90).url()}
                      alt={item.image.alt || item.title || 'Gallery item'}
                      fill
                      className={styles.image}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority={slotIdx < 2 && !pendingImages[slotIdx]}
                    />
                  </div>
                )}
                {/* New/pending image layer for crossfade - only show when there's a pending image */}
                {pendingImages[slotIdx] !== undefined && items[pendingImages[slotIdx]]?.image?.asset?.url && (
                  <div className={styles.imageLayer} data-gallery-image-new style={{ opacity: 0 }}>
                    <Image
                      src={urlFor(items[pendingImages[slotIdx]].image).width(1280).quality(90).url()}
                      alt={items[pendingImages[slotIdx]].image.alt || items[pendingImages[slotIdx]].title || 'Gallery item'}
                      fill
                      className={styles.image}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
              </div>
              <div className={styles.content}>
                <h3
                  className={styles.title}
                  data-gallery-title
                  style={{ opacity: hasTitle ? 1 : 0, visibility: hasTitle ? 'visible' : 'hidden' }}
                >
                  {item.title || ''}
                </h3>
                <p
                  className={styles.description}
                  data-gallery-description
                  style={{ opacity: hasDescription ? 1 : 0, visibility: hasDescription ? 'visible' : 'hidden' }}
                >
                  {item.description || ''}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
