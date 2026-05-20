import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Card from '../UI/Card';
import classes from './WorkItem.module.sass';
import Image from 'next/image';

function WorkItem(props) {
  const router = useRouter();

  const itemRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <li
      ref={itemRef}
      className={`${classes.item} ${isVisible ? classes['item--visible'] : classes['item--hidden']}`}
      onClick={() => router.push('/' + props.id)}
    >
      <Card>
        <div className={classes['item--positions']}>
          <div className={classes.caption}>
            <div className={classes['title--style']}>{props.title}</div>
            <p className={classes['shortDescription--style']}>{props.shortDescription}</p>
          </div>
          {props.image && (
            <div className={classes['img-wrapper']}>
              <Image
                src={props.image}
                className={classes.img}
                alt={props.title}
                width={900}
                height={600}
                style={{ width: '100%', height: 'auto' }}
                loading="lazy"
              />
            </div>
          )}
        </div>
      </Card>
    </li>
  );
}

export default WorkItem;
