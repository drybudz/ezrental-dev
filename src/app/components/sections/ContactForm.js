'use client';

import { useState } from 'react';
import styles from './styles/ContactForm.module.css';

export default function ContactForm({ contactPageData }) {
  const [selectedType, setSelectedType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  const contactTypes = contactPageData?.contactTypes || [];
  const title = contactPageData?.title || '';

  // Debug logging
  console.log('ContactForm - contactPageData:', contactPageData);
  console.log('ContactForm - title:', title);
  console.log('ContactForm - contactTypes:', contactTypes);

  // Validation functions
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
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    
    // Wait for animation to complete before unmounting
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
      setSelectedType(null);
      setFormData({ name: '', company: '', email: '', message: '' });
      setErrors({});
    }, 300); // Match animation duration
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Here you would typically send the data to your backend
    console.log('Submitting form:', { ...formData, contactType: selectedType });
    
    // Reset form after submission
    handleCloseModal();
    alert('Thank you for contacting us! We will get back to you soon.');
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <section className={styles.contactForm}>
      <div className={styles.container}>
        {/* Title - 50% width */}
        <div className={styles.titleColumn}>
          <h2 className={styles.title}>{title}</h2>
        </div>

        {/* Contact Types Grid - 50% width */}
        <div className={styles.typesColumn}>
          <div className={styles.typesGrid}>
            {contactTypes.map((type, index) => (
              <button
                key={index}
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

      {/* Modal */}
      {isModalOpen && (
        <>
          {/* Overlay */}
          <div 
            className={`${styles.modalOverlay} ${isClosing ? styles.closing : ''}`} 
            onClick={handleOverlayClick} 
          />
          
          {/* Modal */}
          <div className={`${styles.modal} ${isClosing ? styles.closing : ''}`}>
            <form onSubmit={handleSubmit} className={styles.form}>
              {/* <h3 className={styles.formTitle}>Contact Us</h3> */}
              
              {/* Hidden contact type field */}
              <input
                type="hidden"
                name="contactType"
                value={selectedType}
              />

              {/* Name */}
              <div className={styles.formField}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.name ? styles.error : ''}`}
                />
                {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
              </div>

              {/* Company */}
              <div className={styles.formField}>
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.company ? styles.error : ''}`}
                />
                {errors.company && <span className={styles.errorMessage}>{errors.company}</span>}
              </div>

              {/* Email */}
              <div className={styles.formField}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.email ? styles.error : ''}`}
                />
                {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
              </div>

              {/* Message */}
              <div className={styles.formField}>
                <textarea
                  name="message"
                  placeholder="Type your message here"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className={`${styles.textarea} ${errors.message ? styles.error : ''}`}
                />
                {errors.message && <span className={styles.errorMessage}>{errors.message}</span>}
              </div>

              {/* Submit Button */}
              <button type="submit" className={styles.submitButton}>
                SUBMIT
              </button>
            </form>
          </div>
        </>
      )}
    </section>
  );
}

