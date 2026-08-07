'use strict';

const Cache = {

    translatedNodes: new WeakSet(),

    has(node) {

        return this.translatedNodes.has(node);

    },

    add(node) {

        this.translatedNodes.add(node);

    }

};