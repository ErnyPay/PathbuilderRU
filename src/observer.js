'use strict';

const Observer = {

    instance: null,

    start() {

        if (this.instance) {
            return;
        }

        this.instance = new MutationObserver((mutations) => {

            for (const mutation of mutations) {

                // новые элементы
                for (const node of mutation.addedNodes) {

                    Translator.translateNode(node);

                }

                // изменён текст
                if (mutation.type === "characterData") {

                    Translator.translateNode(
                        mutation.target
                    );

                }

            }

        });

        this.instance.observe(document.body, {

            childList: true,
            subtree: true,
            characterData: true

        });

        console.log("[Observer] Started");

    },

    stop() {

        if (!this.instance)
            return;

        this.instance.disconnect();

        this.instance = null;

    }

};