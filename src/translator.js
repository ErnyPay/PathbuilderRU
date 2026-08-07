'use strict';

console.log("[PathbuilderRU] translator.js loaded");


window.PathbuilderRUTranslator = {

    initialized:false,

    translatedTexts:new Map(),


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


        let result =
            window.Dictionary.translate(clean);



        /*
            Если это длинное описание,
            пробуем переводить по предложениям
        */

        if(
            result === clean &&
            clean.length > 60
        ){

            let parts =
                clean.split(/(?<=[.!?])\s+/);


            let translatedParts =
                parts.map(
                    part =>
                    window.Dictionary.translate(part)
                );


            result =
                translatedParts.join(" ");

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


        if(
            node.nodeType === Node.TEXT_NODE
        ){

            let old =
                node.nodeValue;


            let translated =
                this.translateText(old);



            if(
                translated !== old
            ){

                node.nodeValue =
                    translated;

            }


            return;
        }



        if(
            node.nodeType !== Node.ELEMENT_NODE
        ){

            return;

        }




        /*
            сначала дети
        */

        [
            ...node.childNodes
        ].forEach(
            child =>
            this.translateNode(child)
        );





        /*
            атрибуты
        */

        const attrs = [

            "title",
            "aria-label",
            "placeholder",
            "alt",
            "data-tooltip",
            "data-content",
            "data-description"

        ];



        attrs.forEach(attr=>{


            if(
                node.hasAttribute(attr)
            ){

                let value =
                    node.getAttribute(attr);


                let translated =
                    this.translateText(value);



                if(
                    translated !== value
                ){

                    node.setAttribute(
                        attr,
                        translated
                    );

                }

            }


        });





        /*
            input/button
        */

        if(
            node.tagName === "INPUT" ||
            node.tagName === "BUTTON"
        ){

            if(node.value){

                node.value =
                    this.translateText(
                        node.value
                    );

            }

        }


    },




    translatePage(){


        console.log(
            "[PathbuilderRU] Translating page"
        );


        this.translateNode(
            document.body
        );


    }


};


console.log(
    "[PathbuilderRU] New translator ready",
    window.PathbuilderRUTranslator
);