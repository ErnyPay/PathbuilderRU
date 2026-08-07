'use strict';

const Missing = {

    found: new Set(),

    scan() {

        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT
        );

        while (walker.nextNode()) {

            const text = walker.currentNode.nodeValue.trim();

            if (!text)
                continue;

            if (Dictionary.translate(text))
                continue;

            if (text.length < 2)
                continue;

            if (/^[0-9]+$/.test(text))
                continue;

            this.found.add(text);

        }

        console.log(
            "[Missing]",
            this.found.size,
            "unknown strings"
        );

    },

    export() {

        console.log(
            JSON.stringify(
                [...this.found].sort(),
                null,
                2
            )
        );

    }

};