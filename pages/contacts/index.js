import { Fragment } from 'react'
import Seo from '../../components/SEO/Seo'
import Contacts from '../../components/Contacts/Contacts'
import { client } from '../../lib/sanity.client'
import { CONTACTS_QUERY } from '../../lib/sanity.queries'

export default function ContactsPage({ contactsData }) {
  const c = contactsData || {}
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: c.name || 'Arch. Luca Jop',
    url: 'https://lucajop.it/contacts',
    ...(c.email ? { email: c.email } : {}),
    ...(c.phone ? { telephone: c.phone.replace(/\s/g, '') } : {}),
    ...(c.photoUrl ? { image: c.photoUrl } : {}),
    ...(c.address
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: c.address.street,
            addressLocality: c.address.city,
            addressCountry: c.address.country === 'Italia' ? 'IT' : c.address.country,
          },
        }
      : {}),
  }

  return (
    <Fragment>
      <Seo
        title="Contatti"
        description="Contatti dello studio dell'architetto Luca Jop a Bologna: indirizzo, telefono ed email."
        image={c.photoUrl ? `${c.photoUrl}?w=1200&h=630&fit=crop&auto=format` : undefined}
        jsonLd={jsonLd}
      />
      <div className="page-fade-in">
        <Contacts data={contactsData} />
      </div>
    </Fragment>
  )
}

export async function getStaticProps() {
  const data = await client.fetch(CONTACTS_QUERY)
  return {
    props: { contactsData: data || null },
    revalidate: 60,
  }
}
