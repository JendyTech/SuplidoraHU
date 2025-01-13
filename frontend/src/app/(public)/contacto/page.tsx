"use client";

import {
  IconMapPin,
  IconPhone,
  IconMessage,
  IconBrandFacebook,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import styles from "@shared/styles/components/Public/contactPage.module.css";

export function ContactPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.container}
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          <h1 className={styles.title}>Contáctanos</h1>
          <p className={styles.description}>
            Estamos disponibles para responder cualquier duda. Si tienes
            preguntas sobre nuestros productos o servicios, no dudes en
            contactarnos.
          </p>
        </div>

        <div className={styles.contactMethods}>
          <div className={styles.contactItem}>
            <div className={styles.iconWrapper}>
              <IconPhone className={styles.icon} />
            </div>
            <div>
              <h3 className={styles.contactTitle}>Teléfonos</h3>
              <p className={styles.contactDetails}>
                <a
                  href="https://wa.me/18296297012"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  (829)-629-7012
                </a>{" "}
                <br />
                <a
                  href="https://wa.me/18299727012"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  (829)-972-7012
                </a>{" "}
                <br />
                <a
                  href="https://wa.me/18094888685"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  (809)-488-8685
                </a>{" "}
                <br />
                <a
                  href="https://wa.me/18494407012"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  (849)-440-7012
                </a>{" "}
                <br />
                <a
                  href="https://wa.me/18087177012"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  (808)-717-7012
                </a>
              </p>
            </div>
          </div>

          <div className={styles.contactItem}>
            <div className={styles.iconWrapper}>
              <IconMessage className={styles.icon} />
            </div>
            <div>
              <h3 className={styles.contactTitle}>Canal de WhatsApp</h3>
              <p className={styles.contactDetails}>
                <a
                  href="https://wa.me/8296297012"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Suplidora Hernández Ureña SRL
                </a>
              </p>
              <p className={styles.channelDescription}>
                📢 Solo Ventas al Por Mayor <br />
                🏡 Variedad de Artículos <br />
                🚚 Envíos a Todo el País <br />⭐ Garantía y Calidad
              </p>
              <a
                href="https://wa.me/8296297012"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.btn} ${styles.whatsappBtn}`}
              >
                Únete a nuestro canal de WhatsApp
              </a>
            </div>
          </div>

          <div className={styles.contactItem}>
            <div className={styles.iconWrapper}>
              <IconBrandFacebook className={styles.icon} />
            </div>
            <div>
              <h3 className={styles.contactTitle}>Facebook</h3>
              <p className={styles.contactDetails}>
                <a
                  href="https://www.facebook.com/suplidorahernandezg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Suplidora Hernández Ureña SRL
                </a>
              </p>
              <a
                href="https://www.facebook.com/suplidorahernandezg"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.btn} ${styles.facebookBtn}`}
              >
                Únete a nuestro Facebook
              </a>
            </div>
          </div>

          <div className={styles.contactItem}>
            <div className={styles.iconWrapper}>
              <IconMapPin className={styles.icon} />
            </div>
            <div>
              <h3 className={styles.contactTitle}>Horario de Atención</h3>
              <p className={styles.contactDetails}>
                Lunes - Viernes: 8:00 AM - 5:00 PM <br />
                Sábados: 8:00 AM - 3:00 PM <br />
                Domingos: Cerrado
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ContactPage;
