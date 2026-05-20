import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Timeline = () => {
  const { language } = useLanguage();
  const [openItems, setOpenItems] = useState(new Set());

  const toggle = (idx) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const timelineTexts = {
    it: [
      { year: '1997', title: 'Laurea in Architettura', description: 'Presso la Facoltà di Architettura di Firenze' },
      { year: '1998', title: 'Prima esperienza lavorativa', description: 'presso lo studio Sbrozzi Ingegneri Associati di Modena' },
      { year: '2001', title: 'Beastudio Architetti Associati', description: 'Si sposta a Bologna per fondare il nuovo studio di architettura Beastudio' },
      { year: '2005', title: 'Studio TECO+', description: 'Dalla fusione tra Beastudio e Studio Teco nasce Studio TECO+ Partners' },
      { year: '2012', title: 'Architetto Luca Jop', description: 'Lascia lo studio associato per intraprendere la professione come libero professionista' },
    ],
    en: [
      { year: '1997', title: 'Degree in Architecture', description: 'At the Faculty of Architecture in Florence' },
      { year: '1998', title: 'First work experience', description: 'at Sbrozzi Engineers Associates in Modena' },
      { year: '2001', title: 'Beastudio Associated Architects', description: 'Moves to Bologna to found the new architecture studio Beastudio' },
      { year: '2005', title: 'TECO+ Studio', description: 'From the merger between Beastudio and Studio Teco, TECO+ Partners Studio is born' },
      { year: '2012', title: 'Architect Luca Jop', description: 'Leaves the associated studio to practice as a freelancer' },
    ],
  };

  const items = timelineTexts[language] || timelineTexts.it;

  return (
    <ol className="relative border-l border-gray-200 w-full max-w-lg">
      {items.map((item, index) => {
        const isOpen = openItems.has(index);
        return (
          <li
            key={index}
            className="mb-8 ml-6 cursor-pointer select-none"
            style={{ animation: 'fadeInUp 0.5s ease both', animationDelay: `${index * 0.1}s` }}
            onClick={() => toggle(index)}
          >
            <div className="absolute w-2.5 h-2.5 bg-gray-300 rounded-full mt-1.5 -left-1.5 border border-white transition-colors duration-200" style={isOpen ? { backgroundColor: '#111' } : {}} />
            <div className="flex items-baseline justify-between gap-4 pr-2">
              <div>
                <time className="text-xs font-normal leading-none text-gray-400 mr-3">
                  {item.year}
                </time>
                <span className="text-base font-light text-gray-900">{item.title}</span>
              </div>
              <span className="text-gray-400 text-lg leading-none flex-shrink-0 transition-transform duration-200" style={isOpen ? { transform: 'rotate(45deg)' } : {}}>
                +
              </span>
            </div>
            <div
              style={{
                maxHeight: isOpen ? '200px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease',
              }}
            >
              <p className="mt-2 text-sm font-normal text-gray-500 pr-6">{item.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default Timeline;
