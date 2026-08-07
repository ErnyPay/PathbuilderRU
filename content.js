'use strict';

const Cache = new Set();
const Missing = new Set();

console.log(
    "[PathbuilderRU] Starting..."
);

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

    }
    catch (e) {

        console.error(
            "[PathbuilderRU] ERROR:",
            e
        );

    }

})();


// Следим за изменениями страницы
// Pathbuilder динамически меняет интерфейс

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


// Экспортируем доступ для других файлов
window.PathbuilderRU = {

    Cache,
    Missing

};