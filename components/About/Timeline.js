import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import classes from './Timeline.module.sass'

const FALLBACK = [
  { year: 1997, title: { it: 'Laurea in Architettura', en: 'Degree in Architecture' }, description: { it: 'Facoltà di Architettura di Firenze', en: 'Faculty of Architecture, Florence' } },
  { year: 1998, title: { it: 'Prima esperienza', en: 'First experience' }, description: { it: 'Studio Sbrozzi Ingegneri Associati, Modena', en: 'Studio Sbrozzi Ingegneri Associati, Modena' } },
  { year: 2001, title: { it: 'Beastudio Architetti Associati', en: 'Beastudio Architetti Associati' }, description: { it: 'Fonda il nuovo studio a Bologna', en: 'Founds the new studio in Bologna' } },
  { year: 2005, title: { it: 'Studio TECO+', en: 'Studio TECO+' }, description: { it: 'Nasce dalla fusione tra Beastudio e Studio Teco', en: 'Born from the merger of Beastudio and Studio Teco' } },
  { year: 2012, title: { it: 'Architetto Luca Jop', en: 'Architect Luca Jop' }, description: { it: 'Libero professionista', en: 'Independent practice' } },
]

export default function Timeline({ items }) {
  const { language } = useLanguage()
  const ref = useRef(null)
  const [drawn, setDrawn] = useState(false)

  const data = (items || FALLBACK).map((item) => ({
    year: String(item.year),
    title: item.title?.[language] || item.title?.it || '',
    description: item.description?.[language] || item.description?.it || '',
  }))

  const n = data.length
  const step = (1.5 / Math.max(n - 1, 1)).toFixed(3) + 's'

  useEffect(() => {
    setDrawn(false)
    const el = ref.current
    if (!el) return
    const start = () => setDrawn(true)
    let obs
    if (typeof IntersectionObserver !== 'undefined') {
      obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { start(); obs.disconnect() } },
        { threshold: 0.2 }
      )
      obs.observe(el)
    }
    const t = setTimeout(start, 1400)
    return () => { if (obs) obs.disconnect(); clearTimeout(t) }
  }, [language])

  return (
    <div
      ref={ref}
      className={`${classes.timeline} ${drawn ? classes.drawn : ''}`}
      style={{ '--draw': '1.5s' }}
    >
      <span className={classes.tlRail} />
      <span className={classes.tlFill} />
      {data.map((item, i) => (
        <div
          key={i}
          className={classes.tlItem}
          style={{ '--i': i, '--step': step }}
        >
          <span className={classes.tlDot} />
          <time className={classes.tlYear}>{item.year}</time>
          <p className={classes.tlTitle}>{item.title}</p>
          {item.description && <p className={classes.tlDesc}>{item.description}</p>}
        </div>
      ))}
    </div>
  )
}
