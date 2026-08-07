'use strict';

console.log("[PathbuilderRU] translator.js loaded");


window.Translator = {

    initialized: false,

    translatedTexts: new Map(),

    translating: false,


    init(){

        this.initialized = true;

        console.log(
            "[PathbuilderRU] Translator initialized"
        );

    },


    translateText(text){

        if(
            !text ||
            !window.Dictionary
        ){
            return text;
        }


        let clean = text.trim();


        if(!clean){
            return text;
        }


        if(
            this.translatedTexts.has(clean)
        ){

            return this.translatedTexts.get(clean);

        }


        let result;


        try {

            result =
                window.Dictionary.translate(clean);

        }

        catch(e){

            console.error(
                "[PathbuilderRU] Dictionary error",
                e
            );

            result = clean;

        }



        /*
            Попытка перевода больших описаний
        */

        if(
            result === clean &&
            clean.length > 80
        ){

            let lines =
                clean.split("\n");


            result =
                lines.map(
                    line =>
                    window.Dictionary.translate(line)
                )
                .join("\n");


        }



        this.translatedTexts.set(
            clean,
            result
        );



        if(
            result !== clean
        ){

            console.log(
                "[RU]",
                clean.substring(0,80),
                "→",
                result.substring(0,80)
            );

        }



        return result;

    },





    translateNode(node){


        if(!node){
            return;
        }


        /*
            Текстовые узлы
        */

        if(
            node.nodeType === Node.TEXT_NODE
        ){

            let old =
                node.nodeValue;


            let clean =
                old.trim();


            if(!clean){
                return;
            }


            let translated =
                this.translateText(clean);


            if(
                translated !== clean
            ){

                node.nodeValue =
                    old.replace(
                        clean,
                        translated
                    );

            }


            return;

        }




        if(
            node.nodeType !== Node.ELEMENT_NODE
        ){

            return;

        }





        /*
            Сначала дети
        */

        [
            ...node.childNodes
        ]
        .forEach(
            child =>
            this.translateNode(child)
        );







        /*
            Атрибуты
        */

        const attrs = [

            "title",
            "aria-label",
            "placeholder",
            "alt",
            "data-tooltip",
            "data-content",
            "data-description",
            "data-original-title"

        ];



        attrs.forEach(attr=>{


            if(
                !node.hasAttribute(attr)
            ){
                return;
            }



            let old =
                node.getAttribute(attr);



            let translated =
                this.translateText(old);



            if(
                old !== translated
            ){

                node.setAttribute(
                    attr,
                    translated
                );

            }


        });








        /*
            INPUT / BUTTON
        */

        if(
            node.value
        ){

            let translated =
                this.translateText(
                    node.value
                );


            if(
                translated !== node.value
            ){

                node.value =
                    translated;

            }

        }





        /*
            ВАЖНО:
            ловим всплывающие описания Pathbuilder
        */

        if(
            node.innerText &&
            node.innerText.length > 20
        ){


            let old =
                node.innerText;


            let translated =
                this.translateText(old);



            if(
                translated !== old &&
                node.children.length === 0
            ){

                node.textContent =
                    translated;

            }

        }



    },









    translatePage(){


        if(
            this.translating
        ){
            return;
        }


        this.translating = true;


        try{


            console.log(
                "[PathbuilderRU] Translating page"
            );


            this.translateNode(
                document.body
            );


        }

        catch(e){

            console.error(
                "[PathbuilderRU] Translation error",
                e
            );

        }



        this.translating = false;


    }


};