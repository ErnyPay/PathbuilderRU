'use strict';

const Observer = {

    observer: null,

    start() {

        if (this.observer)
            return;

        this.observer = new MutationObserver((mutations)=>{

            for (const mutation of mutations) {

                if (mutation.type === "characterData") {

                    Translator.translateTextNode(
                        mutation.target
                    );

                }

                for (const node of mutation.addedNodes) {

                    Translator.translateNode(node);

                }

            }

        });

        this.observer.observe(document.body,{

            subtree:true,
            childList:true,
            characterData:true

        });

        console.log("[Observer] Started");

    }

};