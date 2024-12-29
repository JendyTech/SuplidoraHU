import styles from "@shared/styles/components/Public/Footer.module.css"
import { IconMail, IconPhone, IconMapPin } from '@tabler/icons-react'
import { PUBLIC_NAV_LINKS } from '@shared/data/public'
import Link from 'next/link'

export function Footer() {
  return (
    <footer
      className={styles.footer}
    >
      <div
        className={styles.content}
      >
        <div
          className={styles.sectionsContainer}
        >
          <section>
            <img
              src='/logo.png'
              alt='Suplidora HU'
              className={styles.logo}
              style={{
                objectFit: "contain",
                height: '80px',
                width: 'auto',
                maxWidth: '100%'
              }}
            />

          </section>
          <section>
            <h3>
              Sobre nosotros
            </h3>
            <p>
              Somos una empresa especializada en la venta al por mayor de todo tipo de productos de alta calidad.
            </p>
          </section>
          <section>
            <h3>
              Enlaces rápido
            </h3>
            <ul>
              {PUBLIC_NAV_LINKS.map(link => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h3>
              Información de contacto
            </h3>

            <ul>
              <li>
                <IconMail />
                <Link href="mailto:info@suplidorahu.com">
                  info@suplidorahu.com
                </Link>
              </li>
              <li>
                <IconPhone />
                <Link href="tel:+555123467">
                  +1 (555) 123-4567
                </Link>
              </li>
              <li>
                <IconMapPin />
                <p>
                  123 Business St, Suite 100
                </p>
              </li>
            </ul>
          </section>
        </div>
        <hr />
        <p
          className={styles.copy}
        >
          &copy; {new Date().getFullYear()} Suplidora HU. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}