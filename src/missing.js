'use strict';

const Missing = {

    list: new Set(),

    add(text) {

        if (!text) return;

        text = text.trim();

        if (text.length < 2) return;

        if (text.length > 120) return;

        if (/^\d+$/.test(text)) return;

        if (Dictionary.translate(text)) return;

        this.list.add(text);

    },

    export() {

        const result = {};

        [...this.list]
            .sort()
            .forEach(text => {

                result[text] = "";

            });

        console.log(result);

        return result;

    }

};