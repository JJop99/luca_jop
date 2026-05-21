import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import classes from './Timeline.module.sass'

const FALLBACK = {
  it: [
    { year: 1997, title: { it: 'Laurea in Architettura' }, description: { it: 'Facoltà di Architettura di Firenze' } },
    { year: 1998, title: { it: 'Prima esperienza' }, description: { it: 'Studio Sbrozzi Ingegneri Associati, Modena' } },
    { year: 2001, title: { it: 'Beastudio Architetti Associati' }, description: { it: 'Fonda il nuovo studio a Bologna' } },
    { year: 2005, title: { it: 'Studio TECO+' }, description: { it: 'Nasce dalla fusione tra Beastudio e Studio Teco' } },
    { year: 2012, title: { it: 'Architetto Luca Jop' }, description: { it: 'Libero professionista' } },
  ],
}

export default function Timeline({ items }) {
  const { language } = useLanguage()
  const [visible, setVisible] = useState(new Set())
  const refs = useRef([])

  const data = (items || FALLBACK.it).map((item) => ({
    year: String(item.year),
    title: item.title?.[language] || item.title?.it || '',
    description: item.description?.[language] || item.description?.it || '',
  }))

  useEffect(() => {
    refs.current = refs.current.slice(0, data.length)
    const observers = refs.current.map((el, idx) => {
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((prev) => new Set([...prev, idx]))
            obs.unobserve(el)
          }
        },
        { threshold: 0.15 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [data.length])

  return (
    <div className={classes.timeline}>
      {/* Vertical line — grows from top on mount */}
      <div className={classes.line} />

      {data.map((item, idx) => (
        <div
          key={idx}
          ref={(el) => (refs.current[idx] = el)}
          className={`${classes.item} ${visible.has(idx) ? classes.itemVisible : ''}`}
          style={{ transitionDelay: `${idx * 0.08}s` }}
        >
          <div className={classes.dot} />
          <div className={classes.body}>
            <time className={classes.year}>{item.year}</time>
            <p className={classes.title}>{item.title}</p>
            {item.description && (
              <p className={classes.description}>{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
