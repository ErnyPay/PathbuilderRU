console.log("[PathbuilderRU] translator.js loaded");


window.Translator = {

    initialized: false,


    init() {

        this.initialized = true;

        console.log("[PathbuilderRU] Translator initialized");

    },


    translateText(text) {

        if (!text) return text;

        if (!window.Dictionary) return text;


        const result = window.Dictionary.translate(text);


        if (result !== text) {

            console.log(
                "[RU]",
                text,
                "→",
                result
            );

        }


        return result;

    },



    translateElement(element) {


        if (!element) return;


        // обычный текст
        if (
            element.nodeType === Node.TEXT_NODE
        ) {

            const oldText = element.nodeValue;

            const newText =
                this.translateText(oldText.trim());


            if (
                oldText !== newText &&
                newText
            ) {

                element.nodeValue =
                    oldText.replace(
                        oldText.trim(),
                        newText
                    );

            }


            return;
        }



        if (
            element.nodeType !== Node.ELEMENT_NODE
        ) {
            return;
        }



        // текст внутри элемента
        if (element.childNodes.length) {

            [...element.childNodes]
                .forEach(child => {

                    this.translateElement(child);

                });

        }




        // title
        if (
            element.hasAttribute("title")
        ) {

            const old =
                element.getAttribute("title");


            const translated =
                this.translateText(old);


            if(old !== translated){

                element.setAttribute(
                    "title",
                    translated
                );

            }

        }



        // aria-label
        if (
            element.hasAttribute("aria-label")
        ) {


            const old =
                element.getAttribute(
                    "aria-label"
                );


            const translated =
                this.translateText(old);


            if(old !== translated){

                element.setAttribute(
                    "aria-label",
                    translated
                );

            }

        }




        // placeholder
        if (
            element.hasAttribute("placeholder")
        ) {


            const old =
                element.getAttribute(
                    "placeholder"
                );


            const translated =
                this.translateText(old);


            if(old !== translated){

                element.setAttribute(
                    "placeholder",
                    translated
                );

            }

        }



        // value у кнопок
        if (
            element.tagName === "INPUT" ||
            element.tagName === "BUTTON"
        ) {


            if(element.value){


                const old =
                    element.value;


                const translated =
                    this.translateText(old);


                if(old !== translated){

                    element.value =
                        translated;

                }

            }

        }


    },




    translatePage(){


        console.log(
            "[PathbuilderRU] Translating page"
        );


        this.translateElement(
            document.body
        );


    }



};