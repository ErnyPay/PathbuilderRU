'use strict';

(async () => {

    console.log("[PathbuilderRU] Starting...");

    await Dictionary.load();

    Translator.translateNode(document.body);

    Observer.start();
    Extractor.scan();

window.Extractor = Extractor;

    console.log("[PathbuilderRU] Ready");

})();