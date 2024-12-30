'use client';

import { IconMail, IconMapPin, IconPhone, IconSend2 } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useState } from "react";
import styles from "@shared/styles/components/Public/contactPage.module.css";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.container}
    >
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div>
            <h1 className={styles.title}>Ponte en contacto</h1>
            <p className={styles.description}>
              ¿Tiene preguntas sobre nuestros productos? Estamos aquí para
              ayudar. Contáctenos utilizando cualquiera de los siguientes
              métodos.
            </p>

            <div className={styles.contactMethods}>
              <div className={styles.contactItem}>
                <div className={styles.iconWrapper}>
                  <IconMail className={styles.icon} />
                </div>
                <div>
                  <h3 className={styles.contactTitle}>Correo</h3>
                  <p className={styles.contactDetails}>info@suplidorahu.com</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.iconWrapper}>
                  <IconPhone className={styles.icon} />
                </div>
                <div>
                  <h3 className={styles.contactTitle}>Teléfono</h3>
                  <p className={styles.contactDetails}>+1 (555) 123-4567</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.iconWrapper}>
                  <IconMapPin className={styles.icon} />
                </div>
                <div>
                  <h3 className={styles.contactTitle}>Dirección</h3>
                  <p className={styles.contactDetails}>
                    123 Business St, Suite 100
                    <br />
                    Business City, ST 12345
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={styles.formWrapper}>
            <h2 className={styles.formTitle}>Envíanos un mensaje</h2>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div>
                <label htmlFor="name" className={styles.label}>
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>

              <div>
                <label htmlFor="email" className={styles.label}>
                  Correo
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>

              <div>
                <label htmlFor="subject" className={styles.label}>
                  Asunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>

              <div>
                <label htmlFor="message" className={styles.label}>
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className={styles.textarea}
                ></textarea>
              </div>

              <button type="submit" className={styles.submitButton}>
                <IconSend2 className={styles.submitIcon} />
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ContactPage;
