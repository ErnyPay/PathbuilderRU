'use strict';

const Dictionary = {

    data: {},

    loaded: false,

    files: [
        'ui.json'
    ],

    async load() {

        if (this.loaded) {
            return;
        }

        for (const file of this.files) {

            try {

                const url = chrome.runtime.getURL(
                    'dictionaries/' + file
                );

                const response = await fetch(url);

                if (!response.ok) {

                    console.warn(
                        'Cannot load dictionary:',
                        file
                    );

                    continue;

                }

                const json = await response.json();

                Object.assign(
                    this.data,
                    json
                );

            }
            catch (e) {

                console.error(e);

            }

        }

        this.loaded = true;

        console.log(
            '[PathbuilderRU] Dictionary loaded:',
            Object.keys(this.data).length,
            'entries'
        );

    },

    get(text) {

        return this.data[text];

    },

    has(text) {

        return Object.prototype.hasOwnProperty.call(
            this.data,
            text
        );

    }

};