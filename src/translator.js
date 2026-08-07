'use strict';


console.log(
    "[PathbuilderRU] translator.js loaded"
);



window.Translator = {



    initialized:false,


    translatedNodes:new WeakSet(),


    translatedTexts:new Map(),





    init(){


        this.initialized = true;


        console.log(
            "[PathbuilderRU] Translator initialized"
        );


    },









    translateText(text){



        if(
            !text
        ){

            return text;

        }




        if(
            !window.Dictionary
        ){

            return text;

        }





        const cached =
            this.translatedTexts.get(text);



        if(
            cached
        ){

            return cached;

        }







        const result =
            window.Dictionary.translate(text);







        if(
            result !== text
        ){


            console.log(
                "[RU]",
                text,
                "→",
                result
            );


        }






        this.translatedTexts.set(
            text,
            result
        );





        return result;



    },









    translateElement(element){



        if(
            !element
        ){

            return;

        }








        // TEXT NODE

        if(
            element.nodeType === Node.TEXT_NODE
        ){



            const old =
                element.nodeValue;



            const clean =
                old.trim();




            if(
                !clean
            ){

                return;

            }






            const translated =
                this.translateText(clean);







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







        // children

        [
            ...element.childNodes

        ].forEach(child => {



            this.translateElement(child);



        });









        // attributes


        const attributes = [


            "title",

            "aria-label",

            "placeholder",

            "alt",

            "data-tooltip",

            "data-content",

            "data-description",

            "data-text",

            "data-name"


        ];







        attributes.forEach(attr => {



            if(
                !element.hasAttribute(attr)
            ){

                return;

            }







            const old =
                element.getAttribute(attr);





            const translated =
                this.translateText(old);






            if(
                translated !== old
            ){



                element.setAttribute(
                    attr,
                    translated
                );



            }






        });









        // input/button value


        if(


            element.tagName === "INPUT"


            ||

            element.tagName === "BUTTON"


        ){





            if(
                element.value
            ){



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





        if(
            !document.body
        ){

            return;

        }






        this.translateElement(
            document.body
        );




    }






};


