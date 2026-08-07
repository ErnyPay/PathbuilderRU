'use strict';

console.log(
    "[PathbuilderRU] observer.js loaded"
);



window.PathbuilderObserver = {


    observer:null,

    timer:null,

    translating:false,





    start(){


        console.log(
            "[PathbuilderRU] Starting MutationObserver"
        );



        if(this.observer){

            this.observer.disconnect();

        }






        this.observer = new MutationObserver(

            mutations => {


                if(this.translating)
                    return;



                let changed = false;



                for(
                    const mutation of mutations
                ){



                    /*
                        новые элементы
                    */

                    if(
                        mutation.addedNodes &&
                        mutation.addedNodes.length
                    ){

                        changed = true;
                        break;

                    }



                    /*
                        React меняет текст внутри узла
                    */

                    if(
                        mutation.type === "characterData"
                    ){

                        changed = true;
                        break;

                    }




                    /*
                        React меняет атрибуты
                    */

                    if(
                        mutation.type === "attributes"
                    ){

                        changed = true;
                        break;

                    }



                }





                if(changed){

                    this.schedule();

                }



            }

        );







        this.observer.observe(

            document.body,

            {


                childList:true,


                subtree:true,


                characterData:true,


                attributes:true,


                attributeFilter:[

                    "title",

                    "aria-label",

                    "data-tooltip",

                    "data-content",

                    "class"

                ]


            }

        );







        console.log(
            "[PathbuilderRU] Observer active"
        );



    },









    schedule(){



        clearTimeout(
            this.timer
        );





        this.timer = setTimeout(

            ()=>{


                console.log(
                    "[PathbuilderRU] Dynamic translation"
                );



                this.translate();



            },

            500

        );



    },









    translate(){



        if(
            this.translating
        )
            return;





        this.translating = true;




        try{


            if(
                window.Translator
            ){


                window.Translator.translatePage();


            }



        }

        catch(error){



            console.error(

                "[PathbuilderRU] Observer translate error",

                error

            );


        }






        this.translating = false;



    }







};






window.Observer =
window.PathbuilderObserver;




console.log(

    "[PathbuilderRU] observer object:",

    window.PathbuilderObserver

);