console.log(
    "[PathbuilderRU] translator.js loaded"
);



const Translator = {


    initialized:false,



    async init(){


        this.initialized = true;


        console.log(
            "[PathbuilderRU] Translator initialized"
        );


    },



    translateText(text){


        if(!text)
            return text;



        if(
            window.PathbuilderDictionary &&
            typeof window.PathbuilderDictionary.translate === "function"
        ){

            return window.PathbuilderDictionary.translate(text);

        }



        return text;


    },



    translateElement(element){


        if (!element) return;


        const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT
        );


        const nodes = [];


        while (walker.nextNode()) {

        nodes.push(walker.currentNode);

        }



        for (const node of nodes) {


        const text = node.nodeValue.trim();


        if (!text) continue;


        if (text.length < 2) continue;


        if (
            node.parentElement &&
            node.parentElement.dataset.ruTranslated === "true"
        ) {
            continue;


    },



    translatePage(){


        console.log(
            "[PathbuilderRU] Translating page"
        );



        document
        .querySelectorAll("*")
        .forEach(
            element=>{


                element.childNodes
                .forEach(
                    node=>{

                        this.translateElement(node);

                    }
                );


            }
        );


    }


};



// ГЛАВНОЕ
// экспортируем именно так

window.Translator = Translator;



console.log(
    "[PathbuilderRU] translator object:",
    window.Translator
);