console.log("[PathbuilderRU] translator.js loaded");


window.PathbuilderTranslator = {

    initialized: false,


    init() {

        if (this.initialized) {
            return;
        }

        this.initialized = true;

        console.log("[PathbuilderRU] Translator initialized");

        this.translatePage();
    },


    translatePage() {

        const elements = document.querySelectorAll(
            "body *"
        );


        elements.forEach(element => {

            if (!element.childNodes.length) {
                return;
            }


            element.childNodes.forEach(node => {

                if (node.nodeType !== Node.TEXT_NODE) {
                    return;
                }


                const original = node.textContent.trim();


                if (!original) {
                    return;
                }


                if (window.PathbuilderDictionary &&
                    window.PathbuilderDictionary[original]) {


                    const translated =
                        window.PathbuilderDictionary[original];


                    if (node.textContent !== translated) {

                        console.log(
                            "[RU]",
                            original,
                            "→",
                            translated
                        );

                        node.textContent =
                            node.textContent.replace(
                                original,
                                translated
                            );
                    }
                }

            });

        });

    }

};



console.log(
    "[PathbuilderRU] translator object:",
    window.PathbuilderTranslator
);