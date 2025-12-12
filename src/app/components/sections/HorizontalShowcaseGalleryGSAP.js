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
  const timeoutRef = useRef(null);

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

      // Get the item element to fade out
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
      
      // Fade out only the image of the selected item
      const imageEl = itemElement.querySelector('[data-gallery-image]');
      
      if (imageEl) {
        gsap.to(imageEl, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in',
          onComplete: () => {
            // Update displayed indices and track which slot was replaced
            const newIndices = [...displayedIndices];
            newIndices[slotToReplace] = nextIndex;
            setDisplayedIndices(newIndices);
            setLastReplacedSlot(slotToReplace);
            // Set next item index (wrap around if needed)
            setNextItemIndex((nextIndex + 1) >= items.length ? 0 : nextIndex + 1);
          },
        });
      }
    };

    // Set timeout for next replacement
    const delay = getRandomDelay();
    timeoutRef.current = setTimeout(replaceRandomItem, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [displayedIndices, nextItemIndex, items.length, lastReplacedSlot]);

  // Fade in only the replaced item's image when displayedIndices changes
  useEffect(() => {
    if (lastReplacedSlot === null) return;

    const itemElement = itemsRefs.current[lastReplacedSlot];
    if (!itemElement) return;

    const items = itemsDataRef.current;
    if (!items) return;

    const itemIdx = displayedIndices[lastReplacedSlot];
    const item = items[itemIdx];
    const hasTitle = item?.title?.trim();
    const hasDescription = item?.description?.trim();

    // Find elements by data attribute
    const imageEl = itemElement.querySelector('[data-gallery-image]');
    const titleEl = itemElement.querySelector('[data-gallery-title]');
    const descriptionEl = itemElement.querySelector('[data-gallery-description]');

    // Fade in only the replaced item's image
    if (imageEl) {
      gsap.fromTo(imageEl, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' });
    }

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

    // Reset lastReplacedSlot after animation
    setLastReplacedSlot(null);
  }, [displayedIndices, lastReplacedSlot]);

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
              <div className={styles.imageContainer} data-gallery-image>
                {item?.image?.asset?.url && (
                  <Image
                    src={urlFor(item.image).width(1280).quality(90).url()}
                    alt={item.image.alt || item.title || 'Gallery item'}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={slotIdx < 2}
                  />
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
