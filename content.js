'use strict';

(async () => {

    console.log('[PathbuilderRU] Starting...');

    await Dictionary.load();

    Translator.translateElement(document.body);

    Observer.start();

    console.log('[PathbuilderRU] Ready');

})();