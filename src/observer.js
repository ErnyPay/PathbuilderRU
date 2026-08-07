'use strict';


console.log(
    "[PathbuilderRU] observer.js loaded"
);





window.Observer = {



    observer: null,


    timer: null,


    translating: false,







    start(){



        console.log(
            "[PathbuilderRU] Starting MutationObserver"
        );





        if(this.observer){

            console.warn(
                "[PathbuilderRU] Observer already running"
            );

            return;

        }






        this.observer = new MutationObserver(
            
            mutations => {



                let hasChanges = false;





                mutations.forEach(
                    mutation=>{


                        if(
                            mutation.addedNodes.length
                        ){

                            hasChanges = true;

                        }


                    }
                );







                if(!hasChanges){

                    return;

                }






                this.schedule();




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





        this.timer = setTimeout(()=>{


            this.translate();



        },800);





    },








    translate(){



        if(this.translating){

            return;

        }






        if(
            !window.Translator
        ){

            return;

        }






        this.translating = true;





        console.log(
            "[PathbuilderRU] Dynamic translation"
        );





        try{



            window.Translator.translatePage();



        }

        catch(e){



            console.error(
                "[PathbuilderRU] Translation error",
                e
            );


        }






        setTimeout(()=>{


            this.translating = false;



        },300);





    }






};





console.log(
    "[PathbuilderRU] observer object:",
    window.Observer
);