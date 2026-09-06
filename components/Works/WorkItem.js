import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Card from '../UI/Card';
import classes from './WorkItem.module.sass';
import Image from 'next/image';

function WorkItem(props) {
  const itemRef = useRef(null);
  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

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

  // A cached image can finish before React attaches onLoad — without this the
  // thumbnail would stay at opacity 0 forever on client-side navigations.
  useEffect(() => {
    if (imgRef.current?.complete) setImgLoaded(true);
  }, []);

  return (
    <li
      ref={itemRef}
      className={`${classes.item} ${isVisible ? classes['item--visible'] : classes['item--hidden']}`}
    >
      <Link href={`/${props.id}`} className={classes.link}>
        <Card>
          <div className={classes['item--positions']}>
            <div className={classes.caption}>
              <h2 className={classes['title--style']}>{props.title}</h2>
              <p className={classes['shortDescription--style']}>{props.shortDescription}</p>
            </div>
            {props.image && (
              <div className={classes['img-wrapper']}>
                <Image
                  ref={imgRef}
                  src={props.image}
                  className={classes.img}
                  alt={props.title}
                  width={900}
                  height={600}
                  sizes="(max-width: 768px) 100vw, 58vw"
                  style={{ width: '100%', height: 'auto', opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.5s ease' }}
                  priority={props.priority}
                  loading={props.priority ? undefined : 'lazy'}
                  onLoad={() => setImgLoaded(true)}
                />
              </div>
            )}
          </div>
        </Card>
      </Link>
    </li>
  );
}

export default WorkItem;
