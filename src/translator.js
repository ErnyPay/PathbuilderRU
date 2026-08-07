console.log("[PathbuilderRU] translator.js loaded");


window.translator = {

    initialized: false,


    init() {

        this.initialized = true;

        console.log(
            "[PathbuilderRU] Translator initialized"
        );

    },


    translateText(text) {

        if (!text)
            return text;


        if (!window.PathbuilderDictionary)
            return text;


        return window.PathbuilderDictionary.translate(text);

    },


    translateElement(element) {


        if (!element)
            return;


        // перевод текста внутри элемента
        if (
            element.childNodes &&
            element.childNodes.length
        ) {


            element.childNodes.forEach(node => {


                if (
                    node.nodeType === Node.TEXT_NODE
                ) {


                    let original =
                    node.nodeValue.trim();


                    if (!original)
                        return;


                    let translated =
                    this.translateText(original);


                    if (
                        translated !== original
                    ) {

                        console.log(
                            "[RU]",
                            original,
                            "→",
                            translated
                        );


                        node.nodeValue =
                        node.nodeValue.replace(
                            original,
                            translated
                        );

                    }

                }


            });

        }



        // перевод title
        if (element.title) {

            let translated =
            this.translateText(
                element.title
            );


            if (
                translated !== element.title
            ) {

                element.title =
                translated;

            }

        }



        // перевод aria-label
        if (
            element.getAttribute &&
            element.hasAttribute("aria-label")
        ) {


            let label =
            element.getAttribute(
                "aria-label"
            );


            let translated =
            this.translateText(label);


            if (
                translated !== label
            ) {

                element.setAttribute(
                    "aria-label",
                    translated
                );

            }

        }



    },


    translatePage() {


        console.log(
            "[PathbuilderRU] Translating page"
        );


        document
        .querySelectorAll("*")
        .forEach(element => {


            this.translateElement(
                element
            );


        });


    }


};



console.log(
    "[PathbuilderRU] translator object:",
    window.translator
);