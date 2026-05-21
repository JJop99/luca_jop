import { Fragment } from 'react';
import WorkItem from './WorkItem';
import classes from './WorkList.module.sass';
import { urlFor } from '../../lib/sanity.image';

function WorkList(props) {
  if (!props.works || props.works.length === 0) {
    return (
      <p className={classes['list__ul--margin']} style={{ color: '#9ca3af', fontWeight: 300 }}>
        Nessun progetto pubblicato.
      </p>
    );
  }

  return (
    <Fragment>
      <ul className={classes['list__ul--margin']}>
        {props.works.map((work) => (
          <WorkItem
            key={work._id}
            id={work.slug || work._id}
            image={
              work.images?.[0]
                ? urlFor(work.images[0]).width(900).height(600).fit('crop').url()
                : ''
            }
            title={work.title}
            shortDescription={work.shortDescription}
          />
        ))}
      </ul>
    </Fragment>
  );
}

export default WorkList;
