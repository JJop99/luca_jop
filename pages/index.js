import Image from 'next/image'
import Seo from '../components/SEO/Seo'
import { client } from '../lib/sanity.client'
import { HOME_QUERY } from '../lib/sanity.queries'
import { urlFor } from '../lib/sanity.image'
import classes from '../styles/Home.module.sass'

export default function Home({ bgUrl }) {
  return (
    <>
      <Seo
        description="Studio di architettura di Luca Jop, Bologna. Residenze, edifici pubblici, impianti sportivi e riqualificazione energetica."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Luca Jop — Architetto',
          url: 'https://lucajop.it/',
          inLanguage: 'it-IT',
        }}
      />
      <div className={classes.container}>
        <div className={classes.landingImage}>
          <Image
            src={bgUrl}
            alt="Luca Jop Architetto"
            fill
            style={{ objectFit: 'cover' }}
            quality={100}
            priority
          />
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const data = await client.fetch(HOME_QUERY)
  const bgUrl = data?.bgImage
    ? urlFor(data.bgImage).width(2400).auto('format').url()
    : '/Home-01-scaled.jpg'

  return {
    props: { bgUrl },
    revalidate: 60,
  }
}
