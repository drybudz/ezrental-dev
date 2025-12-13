'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './styles/ContactForm.module.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SUBMITTING = 'submitting';
const SUCCESS = 'success';
const IDLE = 'idle';

export default function ContactForm({ contactPageData }) {
  const [selectedType, setSelectedType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [status, setStatus] = useState(IDLE);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const timeoutsRef = useRef([]);
  const typesGridRef = useRef(null);
  const typeButtonRefs = useRef([]);

  const contactTypes = contactPageData?.contactTypes || [];
  const title = contactPageData?.title || '';
  const description = contactPageData?.description || '';

  const addTimeout = (callback, delay) => {
    const id = setTimeout(callback, delay);
    timeoutsRef.current.push(id);
    return id;
  };

  const clearPendingTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  useEffect(() => () => clearPendingTimeouts(), []);

  // Animate type buttons on mount
  useEffect(() => {
    if (!typesGridRef.current || contactTypes.length === 0) return;

    const buttons = typeButtonRefs.current.filter(Boolean);
    if (buttons.length === 0) return;

    // Buttons already have initial hidden state from CSS, just animate them in
    gsap.to(buttons, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.3,
      scrollTrigger: {
        trigger: typesGridRef.current,
        start: 'top 80%',
        once: true,
      },
    });
  }, [contactTypes.length]);

  const validateName = (name) => name.trim().length >= 3;
  const validateCompany = (company) => company.trim().length >= 2;
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validateMessage = (message) => message.trim().length > 0;

  const handleTypeSelect = (value) => {
    setSelectedType(value);
    setIsModalOpen(true);
    setIsClosing(false);
    setStatus(IDLE);
  };

  const resetForm = () => {
    setSelectedType(null);
    setFormData({ name: '', company: '', email: '', message: '' });
    setErrors({});
    setSubmitError(null);
    setIsSubmitting(false);
    setStatus(IDLE);
    clearPendingTimeouts();
  };

  const handleCloseModal = () => {
    if (isSubmitting && status !== SUCCESS) {
      return;
    }

    clearPendingTimeouts();
    setIsClosing(true);

    addTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
      resetForm();
    }, 300);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!validateName(formData.name)) {
      newErrors.name = 'Name must be at least 3 characters';
    }
    if (!validateCompany(formData.company)) {
      newErrors.company = 'Company must be at least 2 characters';
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!validateMessage(formData.message)) {
      newErrors.message = 'Message cannot be empty';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setStatus(SUBMITTING);
    clearPendingTimeouts();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          contactType: selectedType,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      addTimeout(() => {
        setStatus(SUCCESS);
        setIsSubmitting(false);

        addTimeout(() => {
          handleCloseModal();
        }, 2500);
      }, 1500);
    } catch (error) {
      console.error('Contact form submission failed', error);
      setSubmitError(error.message || 'Something went wrong. Please try again.');
      setIsSubmitting(false);
      setStatus(IDLE);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && status !== SUBMITTING) {
      handleCloseModal();
    }
  };

  return (
    <section className={styles.contactForm}>
      <div className={styles.container}>
        <div className={styles.titleColumn}>
          <h2 className={styles.title}>{title}</h2>
          {description?.trim() && (
            <p className={styles.description}>{description}</p>
          )}
        </div>

        <div className={styles.typesColumn}>
          <div className={styles.typesGrid} ref={typesGridRef}>
            {contactTypes.map((type, index) => (
              <button
                key={index}
                ref={(el) => (typeButtonRefs.current[index] = el)}
                className={`${styles.typeButton} ${
                  selectedType === type.value ? styles.selected : ''
                }`}
                onClick={() => handleTypeSelect(type.value)}
              >
                {type.value}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <>
          <div
            className={`${styles.modalOverlay} ${isClosing ? styles.closing : ''}`}
            onClick={handleOverlayClick}
          />

          <div className={`${styles.modal} ${isClosing ? styles.closing : ''}`}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input type="hidden" name="contactType" value={selectedType || ''} />

              {status === IDLE && (
                <>
                  <div className={styles.formField}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors.name ? styles.error : ''}`}
                      disabled={isSubmitting}
                    />
                    {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
                  </div>

                  <div className={styles.formField}>
                    <input
                      type="text"
                      name="company"
                      placeholder="Company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors.company ? styles.error : ''}`}
                      disabled={isSubmitting}
                    />
                    {errors.company && (
                      <span className={styles.errorMessage}>{errors.company}</span>
                    )}
                  </div>

                  <div className={styles.formField}>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors.email ? styles.error : ''}`}
                      disabled={isSubmitting}
                    />
                    {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
                  </div>

                  <div className={styles.formField}>
                    <textarea
                      name="message"
                      placeholder="Type your message here"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className={`${styles.textarea} ${errors.message ? styles.error : ''}`}
                      disabled={isSubmitting}
                    />
                    {errors.message && (
                      <span className={styles.errorMessage}>{errors.message}</span>
                    )}
                  </div>
                </>
              )}

              {submitError && status === IDLE && (
                <div className={styles.submitError}>{submitError}</div>
              )}

              {status !== IDLE && (
                <div className={styles.sendingState}>
                  <div className={styles.spinnerWrapper}>
                    <Image
                      src="/favicon.png"
                      alt="EZ Rental logo"
                      width={80}
                      height={80}
                      className={styles.spinner}
                    />
                  </div>
                  <div className={styles.sendingText}>Sending...</div>
                  {status === SUCCESS && (
                    <div className={styles.successMessage}>
                      Thank you! Your message is on its way.
                    </div>
                  )}
                </div>
              )}

              {status === IDLE && (
                <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                  {isSubmitting ? 'SENDING...' : 'SUBMIT'}
                </button>
              )}
            </form>
          </div>
        </>
      )}
    </section>
  );
}

