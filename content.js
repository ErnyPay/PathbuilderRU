'use strict';

(async () => {

    console.log('[PathbuilderRU] Starting...');

    const response = await fetch(
        chrome.runtime.getURL('dictionaries/ui.json')
    );

    const dictionary = await response.json();

    function translateText(node) {

        if (!node.nodeValue) return;

        const text = node.nodeValue.trim();

        if (dictionary[text]) {

            console.log("Перевод:", text, "->", dictionary[text]);

            node.nodeValue = dictionary[text];

        }

    }

    function translateElement(root) {

        if (!root) return;

        const walker = document.createTreeWalker(
            root,
            NodeFilter.SHOW_TEXT
        );

        while (walker.nextNode()) {

            translateText(
                walker.currentNode
            );

        }

    }

    translateElement(document.body);

    const observer = new MutationObserver((mutations)=>{

        for(const mutation of mutations){

            mutation.addedNodes.forEach(node=>{

                if(node.nodeType===1){

                    translateElement(node);

                }

            });

        }

    });

    observer.observe(document.body,{
        childList:true,
        subtree:true
    });

    console.log("[PathbuilderRU] Translator ready");

})();