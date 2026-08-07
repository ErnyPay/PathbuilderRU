'use strict';

(async () => {

    console.log("[PathbuilderRU] Starting...");

    await Dictionary.load();

    Translator.translateNode(document.body);

    Observer.start();

    // Делаем объект доступным из консоли
    window.Missing = Missing;

    console.log("[PathbuilderRU] Ready");

})();