'use strict';

const Translator = {

    translateTextNode(node) {

        if (!Utils.shouldTranslate(node)) {
            return;
        }

        if (Cache.has(node)) {
            return;
        }

        const original = Utils.normalize(node.nodeValue);

        if (Utils.isEmpty(original)) {
            return;
        }

        if (!Dictionary.has(original)) {
            return;
        }

        const translated = Dictionary.get(original);

        if (!translated) {
            return;
        }

        node.nodeValue = translated;

        Cache.add(node);

    },

    translateAttributes(element) {

        const attrs = [
            'title',
            'placeholder',
            'aria-label'
        ];

        for (const attr of attrs) {

            if (!element.hasAttribute(attr)) {
                continue;
            }

            const value = Utils.normalize(
                element.getAttribute(attr)
            );

            if (!Dictionary.has(value)) {
                continue;
            }

            element.setAttribute(
                attr,
                Dictionary.get(value)
            );

        }

    },

    translateElement(root) {

        if (!root) return;

        if (root.nodeType === Node.TEXT_NODE) {

            this.translateTextNode(root);

            return;

        }

        if (root.nodeType !== Node.ELEMENT_NODE) {
            return;
        }

        this.translateAttributes(root);

        const walker = document.createTreeWalker(
            root,
            NodeFilter.SHOW_TEXT
        );

        while (walker.nextNode()) {

            this.translateTextNode(
                walker.currentNode
            );

        }

    }

};