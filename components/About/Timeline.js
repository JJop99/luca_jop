import { useLanguage } from '../../context/LanguageContext'; // Ottieni la lingua dal contesto

const Timeline = () => {
  const { language } = useLanguage();

  const timelineTexts = {
    it: [
      { year: "1997", title: "Laurea in Architettura", description: "Presso la Facoltà di Architettura di Firenze" },
      { year: "1998", title: "Prima esperienza lavorativa", description: "presso lo studio Sbrozzi Ingegneri Associati di Modena" },
      { year: "2001", title: "Beastudio Architetti Associati", description: "Si sposta a Bologna per fondare il nuovo studio di architettura Beastudio" },
      { year: "2005", title: "Studio TECO+", description: "Dalla fusione tra Beastudio e Studio Teco nasce Studio TECO+ Partners" },
      { year: "2012", title: "Architetto Luca Jop", description: "Lascia lo studio associato per intraprendere la professione come libero professionista" }
    ],
    en: [
      { year: "1997", title: "Degree in Architecture", description: "At the Faculty of Architecture in Florence" },
      { year: "1998", title: "First work experience", description: "at Sbrozzi Engineers Associates in Modena" },
      { year: "2001", title: "Beastudio Associated Architects", description: "Moves to Bologna to found the new architecture studio Beastudio" },
      { year: "2005", title: "TECO+ Studio", description: "From the merger between Beastudio and Studio Teco, TECO+ Partners Studio is born" },
      { year: "2012", title: "Architect Luca Jop", description: "Leaves the associated studio to practice as a freelancer" }
    ]
  };

  const selectedTexts = timelineTexts[language] || timelineTexts['it'];

  return (
    <ol className="relative border-l border-gray-200 dark:border-gray-700">
      {selectedTexts.map((item, index) => (
        <li key={index} className="mb-10 ml-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            {item.year}
          </time>
          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
          <p className="text-base font-normal text-gray-500">{item.description}</p>
        </li>
      ))}
    </ol>
  );
};

export default Timeline;
