'use strict';

const Observer = {

    observer: null,

    start() {

        if (this.observer) {
            return;
        }

        this.observer = new MutationObserver((mutations) => {

            for (const mutation of mutations) {

                // Новые элементы
                for (const node of mutation.addedNodes) {

                    Translator.translateNode(node);

                }

                // Изменение текста
                if (mutation.type === "characterData") {

                    Translator.translateNode(
                        mutation.target
                    );

                }

            }

        });

        this.observer.observe(document.body, {

            childList: true,
            subtree: true,
            characterData: true

        });

        console.log("[Observer] Started");

    }

};