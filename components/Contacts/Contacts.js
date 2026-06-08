import Image from 'next/image'
import classes from './Contacts.module.sass'
import { useLanguage } from '../../context/LanguageContext'

const LABELS = {
  it: { phone: 'Telefono', email: 'Email', address: 'Studio' },
  en: { phone: 'Phone',    email: 'Email', address: 'Studio' },
}

// Fallback values — shown until Sanity data is entered
const FALLBACK = {
  name:    'Arch. Luca Jop',
  phone:   '+39 335 845 4554',
  email:   'studio@lucajop.it',
  address: { street: 'Via Benazza 11', city: '40131 Bologna', country: 'Italia' },
  photoUrl: '/IMG_2922.jpg',
}

export default function Contacts({ data }) {
  const { language } = useLanguage()
  const l = LABELS[language] || LABELS.it

  const name     = data?.name               || FALLBACK.name
  const phone    = data?.phone              || FALLBACK.phone
  const email    = data?.email              || FALLBACK.email
  const address  = data?.address            || FALLBACK.address
  const photoUrl = data?.photoUrl           || FALLBACK.photoUrl

  return (
    <div className={classes['item--positions']}>
      <div className={classes['img-wrapper']}>
        <Image
          src={photoUrl}
          alt={name}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      <div className={classes.caption}>
        <h1 className={classes.name}>{name}</h1>

        <div className={classes.section}>
          <span className={classes.label}>{l.address}</span>
          <address className={classes.address}>
            {address.street}<br />
            {address.city}<br />
            {address.country}
          </address>
        </div>

        <div className={classes.section}>
          <span className={classes.label}>{l.phone}</span>
          <a href={`tel:${phone.replace(/\s/g, '')}`} className={classes.link}>
            {phone}
          </a>
        </div>

        <div className={classes.section}>
          <span className={classes.label}>{l.email}</span>
          <a href={`mailto:${email}`} className={classes.link}>
            {email}
          </a>
        </div>
      </div>
    </div>
  )
}
