console.log("[PathbuilderRU] translator.js loaded");


const Translator = {


    initialized:false,


    init(){


        this.initialized = true;


        console.log(
            "[PathbuilderRU] Translator initialized"
        );


    },



    translateText(text){


        if (!text) return text;


        if (
            window.Dictionary &&
            typeof window.Dictionary.translate === "function"
        ){

            const result =
                window.Dictionary.translate(text);


            if(result && result !== text){

                console.log(
                    "[RU]",
                    text,
                    "→",
                    result
                );

                return result;

            }

        }


        return text;

    },



    translateElement(element){


        if(!element) return;



        const walker =
            document.createTreeWalker(
                element,
                NodeFilter.SHOW_TEXT
            );



        const nodes = [];



        while(walker.nextNode()){

            nodes.push(
                walker.currentNode
            );

        }



        for(const node of nodes){


            let text =
                node.nodeValue.trim();



            if(!text) continue;



            const translated =
                this.translateText(text);



            if(translated !== text){


                node.nodeValue =
                    node.nodeValue.replace(
                        text,
                        translated
                    );


            }


        }


    },



    translatePage(){


        console.log(
            "[PathbuilderRU] Translating page"
        );


        this.translateElement(
            document.body
        );


    }


};



window.Translator = Translator;



console.log(
    "[PathbuilderRU] translator object:",
    window.Translator
);