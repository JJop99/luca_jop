import { Fragment } from 'react'
import Seo from '../../components/SEO/Seo'
import Contacts from '../../components/Contacts/Contacts'
import { client } from '../../lib/sanity.client'
import { CONTACTS_QUERY } from '../../lib/sanity.queries'

// Sanity keeps the city as one string ("40131 Bologna"); schema.org wants the
// postal code in its own field.
function postalAddress(address) {
  const city = (address.city || '').trim()
  const cap = city.match(/^(\d{5})\s+(.*)$/)
  return {
    '@type': 'PostalAddress',
    streetAddress: address.street,
    ...(cap ? { postalCode: cap[1], addressLocality: cap[2] } : { addressLocality: city }),
    addressCountry: address.country === 'Italia' ? 'IT' : address.country,
  }
}

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
    ...(c.address ? { address: postalAddress(c.address) } : {}),
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
