'use strict';

const Translator = {

    translateNode(node) {

        if (!node) return;

        if (Cache.has(node)) return;

        if (node.nodeType === Node.TEXT_NODE) {

            const text = node.nodeValue.trim();

            if (text.length === 0)
                return;

            const translated =
                Dictionary.translate(text);

            if (translated) {

                console.log(
                    text,
                    "→",
                    translated
                );

                node.nodeValue = translated;

                Cache.add(node);

            }

            return;

        }

        if (node.nodeType !== 1)
            return;

        this.translateAttributes(node);

        node.childNodes.forEach(child=>{

            this.translateNode(child);

        });

    },

    translateAttributes(element){

        [
            "title",
            "placeholder",
            "aria-label"
        ].forEach(attr=>{

            if(!element.hasAttribute(attr))
                return;

            const value =
                element.getAttribute(attr);

            const translated =
                Dictionary.translate(value);

            if(translated){

                element.setAttribute(
                    attr,
                    translated
                );

            }

        });

    }

};