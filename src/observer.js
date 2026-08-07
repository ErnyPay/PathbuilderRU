console.log("[PathbuilderRU] observer.js loaded");


window.PathbuilderObserver = {


    observer: null,


    start() {

        if (this.observer) {
            return;
        }


        console.log(
            "[PathbuilderRU] Observer started"
        );



        this.observer =
            new MutationObserver(
                (mutations) => {

                    let needTranslate = false;



                    for (const mutation of mutations) {


                        if (
                            mutation.addedNodes.length > 0
                        ) {

                            needTranslate = true;
                            break;

                        }

                    }



                    if (needTranslate) {

                        setTimeout(
                            () => {

                                if (
                                    window.PathbuilderTranslator
                                ) {

                                    window.PathbuilderTranslator
                                        .translatePage();

                                }

                            },
                            100
                        );

                    }


                }
            );



        this.observer.observe(
            document.body,
            {
                childList: true,
                subtree: true
            }
        );


    }


};



console.log(
    "[PathbuilderRU] observer object:",
    window.PathbuilderObserver
);