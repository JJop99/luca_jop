import { Fragment } from 'react'
import WorkItem from './WorkItem'
import classes from './WorkList.module.sass'
import { urlFor } from '../../lib/sanity.image'

function WorkList(props) {
  return (
    <Fragment>
      <ul className={classes['list__ul--margin']}>
        {props.works.map((work) => (
          <WorkItem
            key={work._id}
            id={work._id}
            image={work.images?.[0] ? urlFor(work.images[0]).width(900).url() : ''}
            title={work.title}
            shortDescription={work.shortDescription}
            description={work.description}
          />
        ))}
      </ul>
    </Fragment>
  )
}

export default WorkList
