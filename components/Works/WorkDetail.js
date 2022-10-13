
import Carousel from "../UI/Carousel";
import classes from "./WorkDetail.module.sass";

const WorkDetail = (props) => {
  return (
    <div>
      <div className={classes.caption}>
        <div className={classes["title--style"]}>{props.title}</div>
        <p className={classes["shortDescription--style"]}>
          {props.shortDescription}
        </p>
      </div>
      <div className={classes["item--positions"]}>
        <div className={classes.carousel}>
          <Carousel />
        </div>
        <div className={classes.description}>
          Ristrutturazione per rendere un edificio di 120 anni ancora
          contemporaneo e in grado di commuovere. Opera dei primi del ‘900,
          realizzata con maestria costruttiva e gusto architettonico eclettico
          di fine ottocentesco, la cui forza comunicativa passava dal rigore
          compositivo dei volumi e della pianta, per lasciare spazio
          all’espressività delle superfici interne decorate e dei serramenti in
          legno a completare lo spazio con la loro dosata materica plasticità.
          Bastava immaginare questo per capire che ciò che serviva era togliere
          tutto il resto. Si trattava innanzitutto di un’opera di archeologia
          dell’architettura, per rimuovere i sedimenti che nel tempo ne avevano
          occultato il gesto originale. Pavimenti in linoleum, moquette,
          impianti elettrici e di riscaldamento in vista oltre ad una patina
          nera diffusa a togliere la luce con i caratteristici eccessi in
          prossimità dei caloriferi e le altrettanto immancabili zone chiare
          dietro ai quadri. Ma come fare per riportare indietro nel tempo e
          contemporaneamente rendere attuale una costruzione mantenendone
          inalterata l’architettura? “L’architettura è un fatto d’arte, un
          fenomeno che suscita emozione, al di fuori dei problemi di
          costruzione, al di là di essi. La Costruzione è per tener su:
          l’Architettura è per commuovere.” Le Corbusier Sarebbero stati
          necessari sapienti artigiani per ripristinare i decori, fare nuovi
          infissi esterni e valorizzare al meglio quanto già descritto ma gli
          ingombranti impianti erano il vero problema da risolvere, anche la
          placca degli interruttori non trovava spazio sulle pareti nella
          consueta posizione, non senza incrinare l’armonia compositiva degli
          ambienti. Era necessario rispondere alle esigenze risolvendo l’impatto
          degli impianti che in ogni stanza dovevano portare apparecchi ed
          oggetti che per quanto fossero integrati sarebbero comunque stati di
          troppo. La parte impiantistica ha quindi chiaramente rappresentato una
          parte considerevole delle difficoltà di questo intervento… Edit
        </div>
      </div>
    </div>
  );
};

export default WorkDetail;
