console.log("[PathbuilderRU] observer.js loaded");


const Observer = {

    observer: null,

    timer: null,


    start() {

        console.log("[PathbuilderRU] Starting MutationObserver");


        if (this.observer) {
            return;
        }


        this.observer = new MutationObserver((mutations) => {


            let changed = false;


            for (const mutation of mutations) {

                if (mutation.addedNodes.length > 0) {
                    changed = true;
                    break;
                }

            }


            if (!changed) return;


            clearTimeout(this.timer);


            this.timer = setTimeout(() => {


                if (
                    window.Translator &&
                    typeof window.Translator.translatePage === "function"
                ) {

                    console.log(
                        "[PathbuilderRU] Dynamic translation"
                    );


                    window.Translator.translatePage();

                }


            }, 700);


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


window.Observer = Observer;


console.log(
    "[PathbuilderRU] observer object:",
    window.Observer
);