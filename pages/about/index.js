import { Fragment } from 'react'
import Seo from '../../components/SEO/Seo'
import About from '../../components/About/About'
import { client } from '../../lib/sanity.client'
import { ABOUT_QUERY } from '../../lib/sanity.queries'

export default function AboutPage({ aboutData }) {
  return (
    <Fragment>
      <Seo
        title="Percorso"
        description="Il percorso professionale dell'architetto Luca Jop: vent'anni di progetti tra residenze, edifici pubblici, impianti sportivi e riqualificazione energetica."
        type="profile"
      />
      <div className="page-fade-in">
        <About data={aboutData} />
      </div>
    </Fragment>
  )
}

export async function getStaticProps() {
  const data = await client.fetch(ABOUT_QUERY)
  return {
    props: { aboutData: data || null },
    revalidate: 60,
  }
}
