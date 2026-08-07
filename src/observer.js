console.log("[PathbuilderRU] observer.js loaded");


const Observer = {

    observer: null,
    timer: null,
    translating: false,


    start() {


        console.log("[PathbuilderRU] Starting MutationObserver");


        if (this.observer) {
            return;
        }



        this.observer = new MutationObserver((mutations)=>{


            if (this.translating) {
                return;
            }


            let changed = false;


            for (const mutation of mutations) {


                if (
                    mutation.addedNodes &&
                    mutation.addedNodes.length
                ) {

                    changed = true;
                    break;

                }

            }



            if (!changed) {
                return;
            }



            clearTimeout(this.timer);



            this.timer = setTimeout(async ()=>{


                if (
                    window.Translator &&
                    typeof window.Translator.translatePage === "function"
                ) {


                    console.log(
                        "[PathbuilderRU] Dynamic translation"
                    );


                    this.translating = true;


                    try {


                        await window.Translator.translatePage();


                    }
                    catch(e){

                        console.error(
                            "[PathbuilderRU] Translation error",
                            e
                        );

                    }


                    setTimeout(()=>{

                        this.translating = false;

                    },500);


                }


            },1000);



        });



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



window.Observer = Observer;


console.log(
    "[PathbuilderRU] observer object:",
    window.Observer
);