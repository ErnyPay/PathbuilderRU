'use strict';


console.log(
    "[PathbuilderRU] translator.js loaded"
);




window.Translator = {


    initialized:false,


    cache:new Map(),


    translatedNodes:new WeakSet(),





    init(){


        this.initialized = true;


        console.log(
            "[PathbuilderRU] Translator initialized"
        );


    },









    translateText(text){



        if(!text){

            return text;

        }




        if(
            !window.Dictionary
        ){

            return text;

        }






        if(
            this.cache.has(text)
        ){

            return this.cache.get(text);

        }






        const result =
            window.Dictionary.translate(text);







        this.cache.set(
            text,
            result
        );







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





        return result;



    },









    translateNode(node){



        if(!node){

            return;

        }






        if(
            node.nodeType === Node.TEXT_NODE
        ){



            const old =
                node.nodeValue;





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



                node.nodeValue =
                    old.replace(
                        clean,
                        translated
                    );



            }






            return;


        }









        if(
            node.nodeType !== Node.ELEMENT_NODE
        ){

            return;

        }








        // пропускаем уже обработанные

        if(
            this.translatedNodes.has(node)
        ){

            return;

        }








        this.translatedNodes.add(node);








        // дети


        [
            ...node.childNodes

        ].forEach(
            child=>{

                this.translateNode(child);

            }

        );









        this.translateAttributes(node);








    },









    translateAttributes(element){



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



                const old =
                    element.getAttribute(attr);





                const translated =
                    this.translateText(old);






                if(
                    old !== translated
                ){



                    element.setAttribute(
                        attr,
                        translated
                    );



                }




            }



        });







        if(

            element.tagName === "INPUT" ||

            element.tagName === "BUTTON"

        ){



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




        this.translateNode(
            document.body
        );



    }



};
