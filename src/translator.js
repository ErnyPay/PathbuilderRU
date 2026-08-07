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


        let result =
            window.Dictionary.translate(text);


        if (result !== text) {

            console.log(
                "[RU]",
                text.substring(0,80),
                "→",
                result.substring(0,80)
            );

        }


        return result;

    },



    translateNode(node) {


        if (!node) return;



        if (
            node.nodeType === Node.TEXT_NODE
        ) {


            let old =
                node.nodeValue;


            let clean =
                old.trim();



            if (!clean) return;



            let translated =
                this.translateText(clean);



            if (
                translated !== clean
            ) {


                node.nodeValue =
                    old.replace(
                        clean,
                        translated
                    );

            }



            return;

        }





        if (
            node.nodeType !== Node.ELEMENT_NODE
        ) return;






        // переводим весь текст внутри

        [...node.childNodes]
        .forEach(child=>{

            this.translateNode(child);

        });





        // title

        this.translateAttribute(
            node,
            "title"
        );



        // aria

        this.translateAttribute(
            node,
            "aria-label"
        );



        // placeholder

        this.translateAttribute(
            node,
            "placeholder"
        );



        // value кнопок

        if(
            node.value
        ){

            let old =
                node.value;


            let translated =
                this.translateText(old);



            if(old!==translated){

                node.value =
                    translated;

            }

        }



        // DATA ATTRIBUTES
        // тут лежат описания React


        [...node.attributes]
        .forEach(attr=>{


            if(
                attr.name.startsWith("data-")
            ){


                let old =
                    attr.value;


                let translated =
                    this.translateText(old);



                if(
                    old!==translated
                ){

                    node.setAttribute(
                        attr.name,
                        translated
                    );

                }

            }


        });



    },





    translateAttribute(
        element,
        attribute
    ){


        if(
            !element.hasAttribute(attribute)
        )
        return;



        let old =
            element.getAttribute(attribute);



        let translated =
            this.translateText(old);



        if(
            old!==translated
        ){

            element.setAttribute(
                attribute,
                translated
            );

        }


    },






    translatePage(){


        console.log(
            "[PathbuilderRU] Translating page"
        );



        this.translateNode(
            document.body
        );


    }



};