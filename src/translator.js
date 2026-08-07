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
        ){

            return text;

        }



        let clean =
            text.trim();



        if(!clean){

            return text;

        }




        if(
            this.translatedTexts.has(clean)
        ){

            return this.translatedTexts.get(clean);

        }





        let result =
            window.Dictionary.translate(clean);





        /*
            обработка длинных описаний
        */

        if(
            result === clean &&
            clean.length > 80
        ){


            let parts =
                clean.split("\n");



            result =
                parts.map(
                    part =>
                    window.Dictionary.translate(
                        part
                    )
                )
                .join("\n");


        }





        /*
            поиск по предложениям
        */

        if(
            result === clean &&
            clean.length > 120
        ){


            let sentences =
                clean.match(
                    /[^.!?]+[.!?]+/g
                );



            if(sentences){


                result =
                    sentences.map(
                        s =>
                        window.Dictionary.translate(
                            s.trim()
                        )
                    )
                    .join(" ");


            }


        }






        this.translatedTexts.set(
            clean,
            result
        );




        if(
            result !== clean
        ){

            console.log(
                "[RU]",
                clean.substring(0,100),
                "→",
                result.substring(0,100)
            );

        }



        return result;



    },









    translateElement(element){


        if(!element){

            return;

        }




        /*
            TEXT NODE
        */


        if(
            element.nodeType === Node.TEXT_NODE
        ){


            let old =
                element.nodeValue;



            let clean =
                old.trim();



            if(!clean){

                return;

            }




            let translated =
                this.translateText(
                    clean
                );




            if(
                translated !== clean
            ){

                element.nodeValue =
                    old.replace(
                        clean,
                        translated
                    );

            }


            return;

        }






        if(
            element.nodeType !== Node.ELEMENT_NODE
        ){

            return;

        }






        /*
            дети
        */


        [
            ...element.childNodes

        ].forEach(
            child =>
            this.translateElement(child)
        );







        /*
            атрибуты
        */


        const attrs = [

            "title",

            "aria-label",

            "placeholder",

            "alt",

            "data-tooltip",

            "data-content",

            "data-description",

            "data-text"

        ];



        attrs.forEach(attr=>{


            if(
                element.hasAttribute(attr)
            ){


                let old =
                    element.getAttribute(attr);



                let translated =
                    this.translateText(old);



                if(
                    translated !== old
                ){

                    element.setAttribute(
                        attr,
                        translated
                    );

                }


            }


        });







        /*
            React часто кладет описание сюда
        */


        if(
            element.innerHTML &&
            element.children.length === 0
        ){


            let html =
                element.innerHTML;



            let translated =
                this.translateText(
                    html
                );



            if(
                translated !== html
            ){

                element.innerHTML =
                    translated;

            }


        }








        /*
            input/button
        */


        if(
            element.value
        ){


            let translated =
                this.translateText(
                    element.value
                );


            element.value =
                translated;


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