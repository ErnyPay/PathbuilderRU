'use strict';


const Translator = {


    translate(text) {

        return Dictionary.translate(text);

    },



    translateTextNode(node) {

        if (!node)
            return;


        if (PathbuilderRU.Cache.has(node))
            return;


        const original = node.nodeValue;


        if (!original)
            return;


        const trimmed = original.trim();


        if (trimmed.length === 0)
            return;


        PathbuilderRU.Missing.add(trimmed);



        const translated =
            this.translate(trimmed);



        if (!translated)
            return;



        node.nodeValue =
            original.replace(
                trimmed,
                translated
            );



        PathbuilderRU.Cache.add(node);



        console.log(
            "[RU]",
            trimmed,
            "→",
            translated
        );

    },



    translateAttributes(element) {


        const attrs = [
            "title",
            "placeholder",
            "aria-label"
        ];



        for (const attr of attrs) {


            if (!element.hasAttribute(attr))
                continue;



            const value =
                element.getAttribute(attr);



            PathbuilderRU.Missing.add(value);



            const translated =
                this.translate(value);



            if (translated) {


                element.setAttribute(
                    attr,
                    translated
                );


            }

        }

    },



    translateNode(node) {


        if (!node)
            return;



        if (node.nodeType === Node.TEXT_NODE) {


            this.translateTextNode(node);


            return;

        }



        if (node.nodeType !== Node.ELEMENT_NODE)
            return;



        this.translateAttributes(node);



        for (const child of node.childNodes) {


            this.translateNode(child);


        }

    }


};