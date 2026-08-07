'use strict';

console.log("[PathbuilderRU] observer.js loaded");


window.ObserverRU = {


    observer: null,

    timer: null,

    translating: false,


    start() {


        console.log(
            "[PathbuilderRU] Starting MutationObserver"
        );



        if (this.observer) {

            console.log(
                "[PathbuilderRU] Observer already running"
            );

            return;

        }




        this.observer = new MutationObserver(
            mutations => {


                if (this.translating) {

                    return;

                }



                let hasChanges = false;



                mutations.forEach(
                    mutation => {


                        if (
                            mutation.addedNodes &&
                            mutation.addedNodes.length
                        ) {

                            hasChanges = true;

                        }


                    }
                );



                if (!hasChanges) {

                    return;

                }



                clearTimeout(this.timer);



                this.timer = setTimeout(() => {


                    this.translate();


                }, 300);



            }
        );






        this.observer.observe(

            document.body,

            {

                childList: true,

                subtree: true

            }

        );



        console.log(
            "[PathbuilderRU] Observer active"
        );


    },







    translate() {



        if (
            !window.Translator
        ) {

            return;

        }



        if (
            !window.Dictionary ||
            !window.Dictionary.ready
        ) {

            return;

        }




        if (
            this.translating
        ) {

            return;

        }




        this.translating = true;



        console.log(
            "[PathbuilderRU] Dynamic translation"
        );



        try {


            window.Translator.translatePage();



        } catch(e) {


            console.error(
                "[PathbuilderRU] Translation error",
                e
            );


        }



        setTimeout(() => {


            this.translating = false;


        },500);



    }






};




console.log(
    "[PathbuilderRU] observer object:",
    window.ObserverRU
);