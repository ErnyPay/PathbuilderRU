'use strict';

const Translator = {

    translate(text) {

        return Dictionary.translate(text);

    },

    translateTextNode(node) {

        if (!node) return;

        if (Cache.has(node)) return;

        const original = node.nodeValue;

        if (!original) return;

        const trimmed = original.trim();

        Missing.add(trimmed);

        if (trimmed.length === 0) return;

        const translated = this.translate(trimmed);

        if (!translated) return;

        // Сохраняем пробелы вокруг текста
        node.nodeValue = original.replace(trimmed, translated);

        Cache.add(node);

        console.log(
            "[RU]",
            trimmed,
            "→",
            translated
        );

    },

    translateAttributes(element) {

        const attrs = [
            "title",
            "placeholder",
            "aria-label"
        ];

        for (const attr of attrs) {

            if (!element.hasAttribute(attr))
                continue;

            const value = element.getAttribute(attr);

            Missing.add(value);

            const translated = this.translate(value);

            if (translated) {

                element.setAttribute(attr, translated);

            }

        }

    },

    translateNode(node) {

        if (!node) return;

        if (node.nodeType === Node.TEXT_NODE) {

            this.translateTextNode(node);

            return;

        }

        if (node.nodeType !== Node.ELEMENT_NODE)
            return;

        this.translateAttributes(node);

        for (const child of node.childNodes) {

            this.translateNode(child);

        }

    }

};