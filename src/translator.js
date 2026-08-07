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


        if(
            !element ||
            element.nodeType !== Node.TEXT_NODE
        ){

            return;

        }



        let oldText =
            element.textContent.trim();



        if(!oldText)
            return;



        let newText =
            this.translateText(oldText);



        if(
            newText !== oldText
        ){

            element.textContent =
                element.textContent.replace(
                    oldText,
                    newText
                );


            console.log(
                "[RU]",
                oldText,
                "→",
                newText
            );

        }


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