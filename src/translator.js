'use strict';


console.log(
    "[PathbuilderRU] translator.js loaded"
);



window.Translator = {


    initialized:false,


    translatedTexts:new Map(),



    init(){


        this.initialized = true;


        console.log(
            "[PathbuilderRU] Translator initialized"
        );


    },





    translateText(text){


        if(
            !text ||
            !window.Dictionary
        )
            return text;



        let clean =
            text.trim();



        if(!clean)
            return text;



        if(
            this.translatedTexts.has(clean)
        )
        {
            return this.translatedTexts.get(clean);
        }




        let result =
            window.Dictionary.translate(clean);




        this.translatedTexts.set(
            clean,
            result
        );




        if(
            result !== clean
        )
        {

            console.log(
                "[RU]",
                clean.substring(0,100),
                "→",
                result.substring(0,100)
            );

        }



        return result;



    },







    translateNode(node){



        if(
            node.nodeType === Node.TEXT_NODE
        )
        {


            let text =
                node.nodeValue;



            let clean =
                text.trim();



            if(!clean)
                return;



            let translated =
                this.translateText(clean);



            if(
                translated !== clean
            )
            {

                node.nodeValue =
                    text.replace(
                        clean,
                        translated
                    );

            }



            return;

        }






        if(
            node.nodeType !== Node.ELEMENT_NODE
        )
            return;





        /*
            Переводим обычный текст
        */


        [...node.childNodes]
        .forEach(
            child =>
            this.translateNode(child)
        );







        /*
            Переводим атрибуты
        */


        [
            "title",
            "aria-label",
            "placeholder",
            "data-tooltip",
            "data-content",
            "data-description"
        ]
        .forEach(attr=>{


            if(
                node.hasAttribute(attr)
            )
            {


                let value =
                    node.getAttribute(attr);



                let translated =
                    this.translateText(value);



                if(
                    translated !== value
                )
                {

                    node.setAttribute(
                        attr,
                        translated
                    );

                }


            }



        });







        /*
            ВАЖНО:
            описания фитов Pathbuilder
            находятся здесь
        */


        if(
            node.innerText
            &&
            node.innerText.length > 50
        )
        {


            let text =
                node.innerText;



            let translated =
                this.translateText(text);



            if(
                translated !== text
            )
            {


                node.innerText =
                    translated;



            }



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