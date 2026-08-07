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






        this.observer =
            new MutationObserver(
                mutations=>{


                    if(this.translating)
                        return;



                    let hasChanges=false;



                    for(
                        const mutation of mutations
                    ){


                        if(
                            mutation.addedNodes.length
                        ){

                            hasChanges=true;
                            break;

                        }


                    }





                    if(hasChanges){

                        this.schedule();

                    }



                }
            );






        this.observer.observe(

            document.body,

            {

                childList:true,

                subtree:true

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



        this.timer =
            setTimeout(
                ()=>{


                    console.log(
                        "[PathbuilderRU] Dynamic translation"
                    );



                    this.translate();



                },

                700

            );



    },









    translate(){



        if(
            this.translating
        )
            return;




        this.translating=true;




        try{


            if(
                window.Translator
            ){


                window.Translator.translatePage();


            }



        }

        catch(e){


            console.error(
                "[PathbuilderRU] Observer translate error",
                e
            );


        }





        this.translating=false;



    }



};




console.log(
    "[PathbuilderRU] observer object:",
    window.PathbuilderObserver
);