'use strict';

console.log('[PathbuilderRU] dictionary.js loaded');


const Dictionary = {

    dictionaries: {},

    files: [
        'ui',
        'classes',
        'ancestries',
        'heritages',
        'backgrounds',
        'feats',
        'feat_descriptions',
        'spells',
        'spell_descriptions',
        'items',
        'item_descriptions',
        'traits',
        'skills',
        'actions',
        'condition'
    ],


    async load() {

        console.log('[Dictionary] Start loading');


        for (const file of this.files) {

            try {

                console.log('[Dictionary] Loading:', file);


                const response = await fetch(
                    chrome.runtime.getURL(
                        `dictionaries/${file}.json`
                    )
                );


                if (!response.ok) {
                    throw new Error(
                        `HTTP ${response.status}`
                    );
                }


                const json = await response.json();


                this.dictionaries[file] = json;


                console.log(
                    '[Dictionary]',
                    file,
                    Object.keys(json).length,
                    'entries'
                );


            } catch (e) {

                console.warn(
                    '[Dictionary] Failed:',
                    file,
                    e
                );


                this.dictionaries[file] = {};

            }

        }


        console.log(
            '[Dictionary] TOTAL:',
            this.total()
        );


        return true;
    },


    total() {

        let count = 0;


        for (const d of Object.values(this.dictionaries)) {

            count += Object.keys(d).length;

        }


        return count;

    },


    translate(text) {


        if (!text)
            return text;



        for (const dict of Object.values(this.dictionaries)) {


            if (dict[text]) {

                return dict[text];

            }

        }


        return text;

    },


    get(type,key){

        if(
            this.dictionaries[type] &&
            this.dictionaries[type][key]
        ){

            return this.dictionaries[type][key];

        }


        return null;

    }


};


console.log('[PathbuilderRU] Dictionary ready');