console.log("[PathbuilderRU] observer.js loaded");


const PathbuilderObserver = {

    observer: null,


    start() {

        if (this.observer) {
            console.log("[PathbuilderRU] observer already running");
            return;
        }


        console.log("[PathbuilderRU] Starting MutationObserver");


        this.observer = new MutationObserver((mutations)=>{


            let needTranslate = false;


            for (const mutation of mutations) {


                if (mutation.addedNodes.length > 0) {
                    needTranslate = true;
                    break;
                }

            }


            if (needTranslate) {

                clearTimeout(this.timer);


                this.timer = setTimeout(()=>{

                    if(window.PathbuilderTranslator){

                        console.log("[PathbuilderRU] Dynamic translation");

                        window.PathbuilderTranslator.translatePage();

                    }


                },300);

            }


        });



        this.observer.observe(
            document.body,
            {
                childList:true,
                subtree:true
            }
        );


        console.log("[PathbuilderRU] Observer active");

    }

};



window.PathbuilderObserver = PathbuilderObserver;


console.log(
    "[PathbuilderRU] observer object:",
    PathbuilderObserver
);