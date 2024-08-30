// pages/404.js
import Link from 'next/link';
import styles from '../styles/404.module.sass'; // Se utilizzi CSS Modules

const Custom404 = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - Pagina non trovata</h1>
      <p className={styles.message}>
        La pagina che stai cercando non esiste.
      </p>
      <Link href="/" className={styles.link}>
        Torna alla Home
      </Link>
    </div>
  );
};

export default Custom404;
