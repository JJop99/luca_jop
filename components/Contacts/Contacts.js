import Image from 'next/image';
import classes from './Contacts.module.sass';
import { useLanguage } from '../../context/LanguageContext';

const labels = {
  it: { phone: 'Telefono', email: 'Email', address: 'Studio' },
  en: { phone: 'Phone', email: 'Email', address: 'Studio' },
};

const Contacts = () => {
  const { language } = useLanguage();
  const l = labels[language] || labels.it;

  return (
    <div className={classes['item--positions']}>
      <div className={classes['img-wrapper']}>
        <Image
          src="/IMG_2922.jpg"
          className={classes.img}
          alt="Arch. Luca Jop"
          width={800}
          height={1000}
          style={{ width: '100%', height: 'auto' }}
          priority
        />
      </div>

      <div className={classes.caption}>
        <h1 className={classes.name}>Arch. Luca Jop</h1>

        <div className={classes.section}>
          <span className={classes.label}>{l.address}</span>
          <address className={classes.address}>
            Via Benazza 11<br />
            40131 Bologna<br />
            Italia
          </address>
        </div>

        <div className={classes.section}>
          <span className={classes.label}>{l.phone}</span>
          <a href="tel:+393358454554" className={classes.link}>
            +39 335 845 4554
          </a>
        </div>

        <div className={classes.section}>
          <span className={classes.label}>{l.email}</span>
          <a href="mailto:studio@lucajop.it" className={classes.link}>
            studio@lucajop.it
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
