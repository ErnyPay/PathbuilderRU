'use strict';

const Utils = {

    normalize(text) {

        if (!text) return '';

        return text
            .replace(/\s+/g, ' ')
            .replace(/\u00A0/g, ' ')
            .trim();

    },

    shouldTranslate(node) {

        if (!node) return false;

        if (!node.parentElement) return false;

        const tag = node.parentElement.tagName;

        if (
            tag === 'SCRIPT' ||
            tag === 'STYLE' ||
            tag === 'NOSCRIPT'
        ) {
            return false;
        }

        return true;

    },

    isEmpty(text) {

        return !text || text.trim().length === 0;

    }

};