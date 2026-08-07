'use strict';

(async () => {

    console.log("[PathbuilderRU] Starting...");

    await Dictionary.load();

    Translator.translateNode(document.body);

    Observer.start();

    console.log("[PathbuilderRU] Ready");

})();