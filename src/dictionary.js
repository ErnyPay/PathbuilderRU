'use strict';

const Dictionary = {

    dictionaries: {},

    async load() {

        const files = [
            "ui.json"
        ];

        for (const file of files) {

            const response = await fetch(
                chrome.runtime.getURL(
                    "dictionaries/" + file
                )
            );

            const json = await response.json();

            Object.assign(
                this.dictionaries,
                json
            );

        }

        console.log(
            "[Dictionary]",
            Object.keys(this.dictionaries).length,
            "entries loaded"
        );

    },

    translate(text) {

        return this.dictionaries[text] ?? null;

    }

};