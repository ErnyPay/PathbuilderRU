console.log(
    "[PathbuilderRU] observer.js loaded"
);



const PathbuilderObserver = {


    observer: null,



    start(){


        if(this.observer){

            console.warn(
                "[PathbuilderRU] Observer already running"
            );

            return;

        }



        console.log(
            "[PathbuilderRU] Starting MutationObserver"
        );



        this.observer =
        new MutationObserver(
            (mutations)=>{


                let changed = false;



                for(const mutation of mutations){


                    if(
                        mutation.addedNodes.length > 0
                    ){

                        changed = true;
                        break;

                    }


                }



                if(changed){


                    console.log(
                        "[PathbuilderRU] Dynamic translation"
                    );



                    if(
                        window.Translator &&
                        typeof window.Translator.translatePage === "function"
                    ){

                        window.Translator.translatePage();

                    }


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


    }



};



window.PathbuilderObserver =
PathbuilderObserver;