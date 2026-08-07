console.log("[PathbuilderRU] observer.js loaded");


window.observer = {


    observer: null,


    start() {


        console.log(
            "[PathbuilderRU] Starting MutationObserver"
        );


        if (this.observer) {

            return;

        }



        this.observer =
        new MutationObserver(
            mutations => {


                console.log(
                    "[PathbuilderRU] Dynamic translation"
                );


                mutations.forEach(
                    mutation => {


                        mutation.addedNodes.forEach(
                            node => {


                                if (
                                    node.nodeType === Node.ELEMENT_NODE
                                ) {


                                    window.translator
                                    .translateElement(node);


                                }


                            }
                        );


                    }
                );


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


console.log(
    "[PathbuilderRU] observer object:",
    window.observer
);