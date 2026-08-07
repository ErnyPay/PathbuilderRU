'use strict';


console.log(
    "[PathbuilderRU] Starting..."
);


// Используем существующие переменные,
// если они уже созданы другими файлами

if (typeof Cache === "undefined") {
    var Cache = new Set();
}

if (typeof Missing === "undefined") {
    var Missing = new Set();
}


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



window.PathbuilderRU = {

    Cache: Cache,

    Missing: Missing

};