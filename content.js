'use strict';

(async () => {

    const response = await fetch(
        chrome.runtime.getURL('dictionaries/ui.json')
    );

    const dictionary = await response.json();

    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT
    );

    while (walker.nextNode()) {

        const text = walker.currentNode.nodeValue.trim();

        if (text.length > 0) {

            console.log(text);

        }

    }

})();