'use strict';

const Cache = {

    translated: new WeakSet(),

    has(node) {

        return this.translated.has(node);

    },

    add(node) {

        this.translated.add(node);

    }

};