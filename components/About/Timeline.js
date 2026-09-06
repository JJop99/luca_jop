import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import classes from './Timeline.module.sass'

const FALLBACK = [
  { year: 1997, title: { it: 'Laurea in Architettura', en: 'Degree in Architecture' }, description: { it: 'Facoltà di Architettura di Firenze', en: 'Faculty of Architecture, Florence' } },
  { year: 1998, title: { it: 'Prima esperienza', en: 'First experience' }, description: { it: 'Studio Sbrozzi Ingegneri Associati, Modena', en: 'Studio Sbrozzi Ingegneri Associati, Modena' } },
  { year: 2001, title: { it: 'Beastudio Architetti Associati', en: 'Beastudio Architetti Associati' }, description: { it: 'Fonda il nuovo studio a Bologna', en: 'Founds the new studio in Bologna' } },
  { year: 2005, title: { it: 'Studio TECO+', en: 'Studio TECO+' }, description: { it: 'Nasce dalla fusione tra Beastudio e Studio Teco', en: 'Born from the merger of Beastudio and Studio Teco' } },
  { year: 2012, title: { it: 'Architetto Luca Jop', en: 'Architect Luca Jop' }, description: { it: 'Libero professionista', en: 'Independent practice' } },
]

// Runs before paint on the client, no-op during SSR
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function Timeline({ items }) {
  const { language } = useLanguage()
  const ref = useRef(null)
  const [drawn, setDrawn] = useState(false)

  const data = (items || FALLBACK).map((item) => ({
    year: String(item.year),
    title: item.title?.[language] || item.title?.it || '',
    description: item.description?.[language] || item.description?.it || '',
  }))

  // Reveal once, when the timeline scrolls into view. Deliberately not reset on
  // language change: switching IT/EN should not replay the whole animation.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') { setDrawn(true); return }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setDrawn(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Measure real dot positions so the rail spans exactly first dot → last dot,
  // and each entry reveals at the instant the line reaches it. Index-based
  // delays drift as soon as entries have different heights.
  useIsomorphicLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const measure = () => {
      const dots = [...el.querySelectorAll(`.${classes.tlDot}`)]
      if (!dots.length) return
      const base = el.getBoundingClientRect().top
      const centers = dots.map((d) => {
        const r = d.getBoundingClientRect()
        return r.top - base + r.height / 2
      })
      const first = centers[0]
      const span = centers[centers.length - 1] - first

      el.style.setProperty('--rail-top', `${first}px`)
      el.style.setProperty('--rail-len', `${Math.max(span, 0)}px`)

      dots.forEach((dot, i) => {
        const item = dot.parentElement
        const f = span > 0 ? (centers[i] - first) / span : 0
        item.style.setProperty('--d', f.toFixed(4))
      })
    }

    measure()

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
    ro?.observe(el)
    if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => {})
    return () => ro?.disconnect()
  }, [language, items])

  return (
    <ol ref={ref} className={`${classes.timeline} ${drawn ? classes.drawn : ''}`}>
      <span className={classes.tlRail} aria-hidden="true" />
      <span className={classes.tlFill} aria-hidden="true" />
      {data.map((item, i) => (
        <li key={`${item.year}-${i}`} className={classes.tlItem}>
          <span className={classes.tlDot} aria-hidden="true" />
          <time className={classes.tlYear} dateTime={item.year}>{item.year}</time>
          <p className={classes.tlTitle}>{item.title}</p>
          {item.description && <p className={classes.tlDesc}>{item.description}</p>}
        </li>
      ))}
    </ol>
  )
}
