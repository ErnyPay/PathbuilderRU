console.log("[PathbuilderRU] translator.js loaded");


window.PathbuilderTranslator = {

    initialized: false,


    init() {

        if (this.initialized) {
            return;
        }


        this.initialized = true;


        console.log(
            "[PathbuilderRU] Translator initialized"
        );


        this.translatePage();

    },


    translatePage() {

        if (!window.PathbuilderDictionary) {

            console.warn(
                "[PathbuilderRU] Dictionary unavailable"
            );

            return;
        }


        const walker =
            document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_TEXT,
                {
                    acceptNode(node) {

                        if (!node.nodeValue.trim()) {

                            return NodeFilter.FILTER_REJECT;

                        }


                        return NodeFilter.FILTER_ACCEPT;

                    }
                }
            );


        const nodes = [];


        let node;


        while (node = walker.nextNode()) {

            nodes.push(node);

        }



        for (const textNode of nodes) {


            const original =
                textNode.nodeValue;


            const clean =
                original.trim();



            if (!clean) {
                continue;
            }



            const translated =
                window.PathbuilderDictionary.translate(
                    clean
                );



            if (
                translated &&
                translated !== clean
            ) {


                textNode.nodeValue =
                    original.replace(
                        clean,
                        translated
                    );


                console.log(
                    "[RU]",
                    clean,
                    "→",
                    translated
                );

            }

        }


    }

};



console.log(
    "[PathbuilderRU] translator object:",
    window.PathbuilderTranslator
);