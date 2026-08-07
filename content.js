'use strict';

console.log("[PathbuilderRU] Starting...");


// Создаем единое пространство расширения
window.PathbuilderRU = window.PathbuilderRU || {};


// Кэш переведенных узлов
window.PathbuilderRU.Cache =
    window.PathbuilderRU.Cache || new Set();


// Список неизвестных переводов
window.PathbuilderRU.Missing =
    window.PathbuilderRU.Missing || new Set();



(async () => {

    try {

        await Dictionary.load();

        console.log(
            "[PathbuilderRU] Dictionary loaded"
        );


        Translator.translateNode(
            document.body
        );


        console.log(
            "[PathbuilderRU] Initial translation complete"
        );


    } catch (e) {

        console.error(
            "[PathbuilderRU] ERROR:",
            e
        );

    }

})();



// Отслеживаем динамические изменения Pathbuilder
const observer = new MutationObserver(
    mutations => {

        for (const mutation of mutations) {

            for (const node of mutation.addedNodes) {

                if (!node)
                    continue;


                Translator.translateNode(node);

            }

        }

    }
);



observer.observe(
    document.body,
    {
        childList: true,
        subtree: true
    }
);