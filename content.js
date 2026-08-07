'use strict';

(async () => {

    console.log('[PathbuilderRU] Loading dictionary...');

    const response = await fetch(
        chrome.runtime.getURL('dictionaries/ui.json')
    );

    const dictionary = await response.json();

    console.log(dictionary);

})();