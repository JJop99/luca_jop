import Head from 'next/head'
import { Fragment } from 'react'
import WorkList from '../../components/Works/WorkList'
import { client } from '../../lib/sanity.client'
import { WORKS_QUERY } from '../../lib/sanity.queries'

function Works(props) {
  return (
    <Fragment>
      <Head>
        <title>Luca Jop — Lavori</title>
        <meta name="description" content="Progetti di architettura: residenze, edifici pubblici, impianti sportivi e riqualificazione energetica." />
      </Head>
      <div className="page-fade-in">
        <WorkList works={props.works} />
      </div>
    </Fragment>
  )
}

export async function getStaticProps() {
  const works = await client.fetch(WORKS_QUERY)
  return {
    props: { works },
    revalidate: 60,
  }
}

export default Works
