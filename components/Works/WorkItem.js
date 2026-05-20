import { useRouter } from "next/router";
import { useEffect, useRef, useState } from 'react';

import Card from "../UI/Card";
import classes from "./WorkItem.module.sass";
import Image from "next/image";



function WorkItem(props) {
  const router = useRouter();
  const showDetailsHandler = () => {
    router.push("/" + props.id);
  };

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

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const handleImageLoad = (event) => {
    const { width, height } = event.target;
    setDimensions({ width, height });
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Cambia il breakpoint come desideri
    };

    window.addEventListener('resize', handleResize);

    // Chiamare la funzione al mount per inizializzare lo stato
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);



  return (
    <li
      ref={itemRef}
      className={`${classes.item} ${isVisible ? classes['item--visible'] : classes['item--hidden']}`}
      onClick={showDetailsHandler}
    >
      <Card>
        <div className={classes["item--positions"]}>
          <div className={classes.caption}>
            <div className={classes["title--style"]}>{props.title}</div>
            <p className={classes["shortDescription--style"]}>
              {props.shortDescription}
            </p>
          </div>
          <Image
            src={props.image}
            className={classes.img}
            alt={props.title}
            width={dimensions.width || 600}
            height={dimensions.height || 0}
            sizes={isMobile ? '100vw' : `${dimensions.width}px`}
            loading="lazy"
            onLoad={handleImageLoad}
            priority={false}
          />
        </div>
      </Card>
    </li>
  );
}

export default WorkItem;
