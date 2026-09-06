// pages/404.js
import Link from 'next/link';
import Seo from '../components/SEO/Seo';
import styles from '../styles/404.module.sass';

const Custom404 = () => {
  return (
    <>
      <Seo
        title="Pagina non trovata"
        description="La pagina che stai cercando non esiste."
        noindex
      />
      <div className={styles.container}>
        <h1 className={styles.title}>404 - Pagina non trovata</h1>
        <p className={styles.message}>
          La pagina che stai cercando non esiste.
        </p>
        <Link href="/" className={styles.link}>
          Torna alla Home
        </Link>
      </div>
    </>
  );
};

export default Custom404;
