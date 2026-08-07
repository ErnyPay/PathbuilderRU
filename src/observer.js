''use strict';

const Observer = {

    observer: null,

    start() {

        if (this.observer) {
            return;
        }

        this.observer = new MutationObserver((mutations) => {

            for (const mutation of mutations) {

                if (mutation.type === 'childList') {

                    for (const node of mutation.addedNodes) {

                        Translator.translateElement(node);

                    }

                }

                if (mutation.type === 'characterData') {

                    Translator.translateTextNode(
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

    }

};