import Timeline from './Timeline'
import classes from './About.module.sass'
import { useLanguage } from '../../context/LanguageContext'

const FALLBACK_BIO = {
  it: "Nei vent'anni trascorsi, i lavori seguiti hanno abbracciato una ampia gamma di scale e tipologie di interventi, dalle residenze agli edifici pubblici, come asili o scuole, agli impianti sportivi. Nell'ultimo periodo il focus si è spostato principalmente sulla riqualificazione, in particolare energetica, degli edifici esistenti.",
  en: "Over the past twenty years, the projects undertaken have covered a wide range of scales and types of interventions, from residences to public buildings, such as kindergartens or schools, to sports facilities. Recently, the focus has shifted primarily to the redevelopment, particularly energy, of existing buildings.",
}

const LABELS = { it: 'Percorso', en: 'Path' }

export default function About({ data }) {
  const { language } = useLanguage()
  const bio = data?.bio?.[language] || data?.bio?.it || FALLBACK_BIO[language]

  return (
    <div className={classes.percorso}>
      <div className={classes.pcLeft}>
        <h1 className={classes.pgTitle}>{LABELS[language] || LABELS.it}</h1>
        <p className={classes.bio}>{bio}</p>
      </div>
      <div className={classes.pcRight}>
        <Timeline items={data?.timeline || null} />
      </div>
    </div>
  )
}
