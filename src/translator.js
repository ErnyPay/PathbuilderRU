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





        if (
            element.nodeType !== Node.ELEMENT_NODE
        ) {

            return;

        }





        // CHILDREN

        [
            ...element.childNodes
        ].forEach(child => {

            this.translateElement(child);

        });







        // обычные атрибуты

        const attributes = [


            "title",

            "aria-label",

            "placeholder",

            "alt",


            "data-tooltip",

            "data-content",

            "data-description",

            "data-text"


        ];




        attributes.forEach(attr => {



            if (
                element.hasAttribute(attr)
            ) {



                const old =
                    element.getAttribute(attr);



                const translated =
                    this.translateText(old);




                if (
                    old !== translated
                ) {



                    element.setAttribute(
                        attr,
                        translated
                    );


                    console.log(
                        "[RU ATTR]",
                        attr,
                        old,
                        "→",
                        translated
                    );


                }


            }


        });







        // INPUT / BUTTON VALUE


        if (

            element.tagName === "INPUT" ||

            element.tagName === "BUTTON"

        ) {



            if(element.value){



                const old =
                    element.value;



                const translated =
                    this.translateText(old);



                if(
                    old !== translated
                ){


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