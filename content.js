'use strict';

console.log("Extension ID:", chrome.runtime.id);
console.log("UI path:", chrome.runtime.getURL("dictionaries/ui.json"));

(async () => {
    console.log("[PathbuilderRU] Starting...");
    await Dictionary.load();

    Translator.translateNode(document.body);

    Observer.start();

    console.log("[PathbuilderRU] Ready");
})();