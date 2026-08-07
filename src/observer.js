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



                let changed=false;



                for(
                    let mutation of mutations
                ){

                    if(
                        mutation.addedNodes.length
                    ){

                        changed=true;
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
        setTimeout(()=>{


            this.translate();


        },800);



    },




    translate(){


        if(this.translating)
            return;



        this.translating=true;


        try{


            if(
                window.PathbuilderRUTranslator
            ){

                window.PathbuilderRUTranslator
                .translatePage();

            }


        }
        catch(e){


            console.error(
                "[PathbuilderRU] Observer error",
                e
            );


        }



        this.translating=false;


    }


};



window.Observer =
window.PathbuilderObserver;



console.log(
"[PathbuilderRU] observer ready"
);