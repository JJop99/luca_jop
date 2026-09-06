import { Fragment } from 'react';
import Seo from '../../components/SEO/Seo';
import WorkList from '../../components/Works/WorkList';
import { client } from '../../lib/sanity.client';
import { WORKS_QUERY } from '../../lib/sanity.queries';

function Works(props) {
  return (
    <Fragment>
      <Seo
        title="Lavori"
        description="Progetti di architettura: residenze, edifici pubblici, impianti sportivi e riqualificazione energetica."
      />
      <div className="page-fade-in">
        <WorkList works={props.works} />
      </div>
    </Fragment>
  );
}

export async function getStaticProps() {
  const works = await client.fetch(WORKS_QUERY);
  return {
    props: { works: works || [] },
    revalidate: 60,
  };
}

export default Works;
