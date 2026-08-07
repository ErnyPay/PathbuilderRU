'use strict';

const Extractor = {

    strings: new Set(),

    scan(root = document.body) {

        const walker = document.createTreeWalker(
            root,
            NodeFilter.SHOW_TEXT
        );

        while (walker.nextNode()) {

            const text = walker.currentNode.nodeValue.trim();

            if (
                text.length < 2 ||
                text.length > 120
            ) continue;

            if (/^\d+$/.test(text))
                continue;

            this.strings.add(text);

        }

    },

    export() {

        const result = {};

        [...this.strings]
            .sort()
            .forEach(t => {

                result[t] = "";

            });

        console.log(
            "[Extractor]",
            JSON.stringify(
                result,
                null,
                2
            )
        );

    }

};