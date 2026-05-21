import React, { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import classes from './Carousel.module.sass'
import { EffectFade, Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Image from 'next/image'
import { urlFor } from '../../lib/sanity.image'

const mainConfig = {
  spaceBetween: 0,
  effect: 'fade',
  centeredSlides: true,
  autoplay: { delay: 5000, disableOnInteraction: true, pauseOnMouseEnter: true },
  pagination: { clickable: true, dynamicBullets: true },
  navigation: true,
  modules: [EffectFade, Autoplay, Pagination, Navigation],
  className: classes.swiper,
}

const modalConfig = {
  spaceBetween: 0,
  effect: 'fade',
  centeredSlides: true,
  pagination: { clickable: true, dynamicBullets: true },
  navigation: true,
  loop: true,
  modules: [EffectFade, Pagination, Navigation],
  className: classes.swiperModal,
}

export default function Carousel(props) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [loadedKeys, setLoadedKeys] = useState(new Set())

  const markLoaded = useCallback((key) =>
    setLoadedKeys((prev) => { const next = new Set(prev); next.add(key); return next }), [])

  // close modal on Escape
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => { if (e.key === 'Escape') setIsOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  const images = (props.images || []).map((img) => ({
    key: img._key || img.key,
    url: urlFor(img).width(1600).auto('format').url(),
    alt: img.alt || '',
  }))

  if (!images.length) return null

  return (
    <>
      {/* ── Main carousel ── */}
      {/* aspectBox provides 4:3 height; Swiper is not allowed to touch it */}
      <div className={classes.aspectBox}>
        <Swiper {...mainConfig}>
          {images.map((img, idx) => (
            <SwiperSlide key={img.key}>
              <div
                className={classes.swiperSlide}
                onClick={() => { setSelectedIndex(idx); setIsOpen(true) }}
              >
                <Image
                  fill
                  alt={img.alt}
                  src={img.url}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onLoad={() => markLoaded(img.key)}
                  style={{
                    objectFit: 'cover',
                    opacity: loadedKeys.has(img.key) ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ── Lightbox modal — rendered in a portal to escape page-fade-in transform ── */}
      {isOpen && typeof document !== 'undefined' && createPortal(
        <div className={classes.overlay} onClick={() => setIsOpen(false)}>
          <button className={classes.closeBtn} onClick={() => setIsOpen(false)} aria-label="Chiudi">✕</button>
          <div className={classes.modalInner} onClick={(e) => e.stopPropagation()}>
            <Swiper {...modalConfig} initialSlide={selectedIndex}>
              {images.map((img) => (
                <SwiperSlide key={img.key}>
                  <div className={classes.modalSlide}>
                    <Image
                      fill
                      alt={img.alt}
                      src={img.url}
                      sizes="90vw"
                      onLoad={() => markLoaded(`modal-${img.key}`)}
                      style={{
                        objectFit: 'contain',
                        opacity: loadedKeys.has(`modal-${img.key}`) ? 1 : 0,
                        transition: 'opacity 0.4s ease',
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
