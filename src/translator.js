console.log("[PathbuilderRU] translator.js loaded");


window.Translator = {

    initialized: false,


    init() {

        this.initialized = true;

        console.log(
            "[PathbuilderRU] Translator initialized"
        );

    },


    translateText(text) {

        if (!text) return text;

        if (!window.Dictionary) return text;


        const result =
            window.Dictionary.translate(text);


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



        // TEXT NODE

        if (
            element.nodeType === Node.TEXT_NODE
        ) {


            const oldText =
                element.nodeValue;



            const clean =
                oldText.trim();



            if (!clean) return;



            const translated =
                this.translateText(clean);



            if (
                translated !== clean
            ) {


                element.nodeValue =
                    oldText.replace(
                        clean,
                        translated
                    );


            }


            return;

        }



        // не элемент

        if (
            element.nodeType !== Node.ELEMENT_NODE
        ) {

            return;

        }




        // дочерние элементы

        [...element.childNodes]
            .forEach(child => {

                this.translateElement(child);

            });





        // TITLE

        if (
            element.hasAttribute("title")
        ) {


            const old =
                element.getAttribute(
                    "title"
                );


            const translated =
                this.translateText(old);



            if (
                old !== translated
            ) {


                element.setAttribute(
                    "title",
                    translated
                );


            }


        }





        // ARIA LABEL

        if (
            element.hasAttribute("aria-label")
        ) {


            const old =
                element.getAttribute(
                    "aria-label"
                );



            const translated =
                this.translateText(old);



            if (
                old !== translated
            ) {


                element.setAttribute(
                    "aria-label",
                    translated
                );


            }


        }





        // PLACEHOLDER

        if (
            element.hasAttribute("placeholder")
        ) {


            const old =
                element.getAttribute(
                    "placeholder"
                );



            const translated =
                this.translateText(old);



            if (
                old !== translated
            ) {


                element.setAttribute(
                    "placeholder",
                    translated
                );


            }


        }







        // INPUT / BUTTON VALUE

        if (
            element.tagName === "INPUT" ||
            element.tagName === "BUTTON"
        ) {



            if (
                element.value
            ) {


                const old =
                    element.value;



                const translated =
                    this.translateText(old);



                if (
                    old !== translated
                ) {


                    element.value =
                        translated;


                }


            }


        }



    },






    translatePage() {


        console.log(
            "[PathbuilderRU] Translating page"
        );


        this.translateElement(
            document.body
        );


    }



};