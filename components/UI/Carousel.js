import React, { useState, useEffect } from 'react'
import classes from './Carousel.module.sass'
import { EffectFade, Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Image from 'next/image'
import ReactModal from 'react-modal'
import { urlFor } from '../../lib/sanity.image'

const swiperConfig = {
  autoHeight: true,
  spaceBetween: 30,
  effect: 'fade',
  centeredSlides: true,
  autoplay: { delay: 5000, disableOnInteraction: false },
  pagination: { clickable: true, dynamicBullets: true },
  navigation: true,
  modules: [EffectFade, Autoplay, Pagination, Navigation],
  className: classes.swiper,
}

export default function Carousel(props) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [update, setUpdate] = useState(0)
  const [loadedKeys, setLoadedKeys] = useState(new Set())

  const markLoaded = (key) =>
    setLoadedKeys((prev) => { const next = new Set(prev); next.add(key); return next })

  useEffect(() => {
    const timer = setTimeout(() => window.dispatchEvent(new Event('resize')), 0)
    setUpdate((n) => n + 1)
    return () => clearTimeout(timer)
  }, [])

  const images = (props.images || []).map((img) => ({
    key: img._key || img.key,
    url: urlFor(img).width(1200).url(),
    alt: img.alt || '',
  }))

  return (
    <>
      <Swiper key={update} {...swiperConfig}>
        {images.map((img) => (
          <SwiperSlide key={img.key}>
            <div className={classes.swiperSlide}>
              <Image
                alt={img.alt}
                src={img.url}
                width={0}
                height={0}
                sizes="100vw"
                onClick={() => { setSelectedIndex(images.indexOf(img)); setIsOpen(true) }}
                className={classes.swiperImage}
                loading="lazy"
                onLoad={() => markLoaded(img.key)}
                style={{ opacity: loadedKeys.has(img.key) ? 1 : 0, transition: 'opacity 0.5s ease' }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className={classes.modal}
        overlayClassName={classes.overlay}
        ariaHideApp={false}
      >
        <Swiper
          key={`modal-${update}`}
          {...swiperConfig}
          loop
          initialSlide={selectedIndex}
        >
          {images.map((img) => (
            <SwiperSlide key={img.key}>
              <div className="relative w-full max-h-[90vh] overflow-y-auto">
                <Image
                  alt={img.alt}
                  src={img.url}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className={classes.swiperImage}
                  loading="lazy"
                  onLoad={() => markLoaded(`modal-${img.key}`)}
                  style={{ opacity: loadedKeys.has(`modal-${img.key}`) ? 1 : 0, transition: 'opacity 0.5s ease' }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </ReactModal>
    </>
  )
}
