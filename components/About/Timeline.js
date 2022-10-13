const Timeline = () => {
  return (
    <ol class="relative border-l border-gray-200 dark:border-gray-700">
      <li class="mb-10 ml-4">
        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time class="mb- text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
          1997
        </time>
        <h3 class="text-lg font-semibold text-gray-900">
          Laurea in Architettura
        </h3>
        <p class="mb-4 text-base font-normal text-gray-500">
          Presso la Facoltà di Architettura di Firenze
        </p>
      </li>
      <li class="mb-10 ml-4">
        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
          1998
        </time>
        <h3 class="text-lg font-semibold text-gray-900 ">
          Prima esperienza lavorativa
        </h3>
        <p class="text-base font-normal text-gray-500">
          presso lo studio Sbrozzi Ingegneri Associati di Modena
        </p>
      </li>
      <li class="mb-10 ml-4">
        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
          2001
        </time>
        <h3 class="text-lg font-semibold text-gray-900 ">
          Beastudio Architetti Associati
        </h3>
        <p class="text-base font-normal text-gray-500 ">
          Si sposta a Bologna per fondare il nuovo studio di architettura
          Beastudio
        </p>
      </li>
      <li class="mb-10 ml-4">
        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
          2005
        </time>
        <h3 class="text-lg font-semibold text-gray-900 ">Studio TECO+</h3>
        <p class="text-base font-normal text-gray-500 ">
          Dalla fusione tra Beastudio e Studio Teco nasce Studio TECO+ Partners
        </p>
      </li>
      <li class="mb-10 ml-4">
        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
          2012
        </time>
        <h3 class="text-lg font-semibold text-gray-900 ">
          Architetto Luca Jop
        </h3>
        <p class="text-base font-normal text-gray-500 ">
          Lascia lo studio associato per intraprendere la professione come
          libero professionista
        </p>
      </li>
    </ol>
  );
};

export default Timeline;
