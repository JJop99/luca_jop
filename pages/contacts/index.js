import { Fragment } from 'react'
import Contacts from '../../components/Contacts/Contacts'
import { client } from '../../lib/sanity.client'
import { CONTACTS_QUERY } from '../../lib/sanity.queries'

export default function ContactsPage({ contactsData }) {
  return (
    <Fragment>
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
