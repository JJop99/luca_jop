import Head from 'next/head'
import { Fragment } from 'react'
import WorkDetail from '../../components/Works/WorkDetail'
import { useLanguage } from '../../context/LanguageContext'
import { client } from '../../lib/sanity.client'
import { WORK_QUERY, WORK_IDS_QUERY } from '../../lib/sanity.queries'

function WorkDetails(props) {
  const { language } = useLanguage()
  const description = props.workData.description?.[language] || props.workData.description?.it || ''

  return (
    <Fragment>
      <Head>
        <title>{props.workData.title} — Luca Jop</title>
        <meta name="description" content={props.workData.shortDescription} />
      </Head>
      <WorkDetail
        id={props.workData.id}
        images={props.workData.images}
        title={props.workData.title}
        shortDescription={props.workData.shortDescription}
        description={description}
        role={props.workData.role}
      />
    </Fragment>
  )
}

export async function getStaticPaths() {
  const ids = await client.withConfig({ useCdn: false }).fetch(WORK_IDS_QUERY)
  return {
    fallback: 'blocking',
    paths: ids.map((id) => ({ params: { workId: id } })),
  }
}

export async function getStaticProps(context) {
  const { workId } = context.params
  const work = await client.fetch(WORK_QUERY, { id: workId })

  if (!work) {
    return { notFound: true }
  }

  return {
    props: {
      workData: {
        id: work._id,
        title: work.title,
        shortDescription: work.shortDescription,
        description: work.description || {},
        role: work.role || '',
        images: work.images || [],
      },
    },
    revalidate: 60,
  }
}

export default WorkDetails
