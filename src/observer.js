'use strict';

const Observer = {

    observer: null,

    start() {

        if (this.observer) {
            this.observer.disconnect();
        }

        this.observer = new MutationObserver((mutations) => {

            for (const mutation of mutations) {

                for (const node of mutation.addedNodes) {
                    Translator.translateNode(node);
                }

                if (mutation.type === "characterData") {
                    Translator.translateTextNode(mutation.target);
                }

            }

        });

        this.observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
        });

        console.log("[Observer] Started");

        // Повторный проход каждые 2 секунды
        setInterval(() => {
            Translator.translateNode(document.body);
        }, 2000);

    }

};