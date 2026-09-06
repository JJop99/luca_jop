import { Fragment } from 'react';
import Seo from '../../components/SEO/Seo';
import WorkDetail from '../../components/Works/WorkDetail';
import { useLanguage } from '../../context/LanguageContext';
import { client } from '../../lib/sanity.client';
import { urlFor } from '../../lib/sanity.image';
import { WORK_QUERY, WORK_IDS_QUERY } from '../../lib/sanity.queries';

function WorkDetails(props) {
  const { language } = useLanguage();
  const description = props.workData.description?.[language] || props.workData.description?.it || '';

  return (
    <Fragment>
      <Seo
        title={props.workData.title}
        description={props.workData.shortDescription}
        image={props.workData.ogImage || undefined}
        type="article"
      />
      <div className="page-fade-in">
        <WorkDetail
          id={props.workData.id}
          images={props.workData.images}
          title={props.workData.title}
          shortDescription={props.workData.shortDescription}
          description={description}
          role={props.workData.role}
        />
      </div>
    </Fragment>
  );
}

export async function getStaticPaths() {
  const ids = await client.withConfig({ useCdn: false }).fetch(WORK_IDS_QUERY);
  return {
    fallback: 'blocking',
    paths: (ids || []).map((id) => ({ params: { workId: id } })),
  };
}

export async function getStaticProps(context) {
  const { workId } = context.params;
  const work = await client.fetch(WORK_QUERY, { id: workId });

  if (!work) return { notFound: true };

  const cover = work.images?.[0];
  let ogImage = null;
  try {
    ogImage = cover ? urlFor(cover).width(1200).height(630).fit('crop').auto('format').url() : null;
  } catch (e) {
    ogImage = null;
  }

  return {
    props: {
      workData: {
        id: workId,
        title: work.title,
        shortDescription: work.shortDescription,
        description: work.description || {},
        role: work.role || '',
        images: work.images || [],
        ogImage,
      },
    },
    revalidate: 60,
  };
}

export default WorkDetails;
