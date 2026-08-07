'use strict';


window.PathbuilderRUConfig = {


    DEBUG: true,


    // задержка MutationObserver
    OBSERVER_DELAY: 500,


    // какие атрибуты переводим
    ATTRIBUTES: [

        "title",
        "aria-label",
        "placeholder",
        "alt",
        "data-tooltip",
        "data-content",
        "data-description"

    ],


    // максимальный размер текста для автоматического перевода
    MAX_TEXT_LENGTH: 10000,


    // включить перевод описаний
    TRANSLATE_DESCRIPTIONS: true,


    // включить перевод tooltip
    TRANSLATE_TOOLTIPS: true


};



console.log(
    "[PathbuilderRU] config loaded"
);