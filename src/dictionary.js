'use strict';

const Dictionary = {

    dictionaries: {},

    files: [
        "ui.json",
        "classes.json",
        "ancestries.json",
        "heritages.json",
        "backgrounds.json",
        "feats.json",
        "spells.json",
        "items.json",
        "traits.json",
        "skills.json",
        "actions.json",
        "conditions.json"
    ],

    async load() {

        this.dictionaries = {};

        let total = 0;

        for (const file of this.files) {

            try {

                const response = await fetch(
                    chrome.runtime.getURL(
                        "dictionaries/" + file
                    )
                );

                if (!response.ok) {
                    console.warn("[Dictionary] Не найден:", file);
                    continue;
                }

                const json = await response.json();

                Object.assign(this.dictionaries, json);

                total += Object.keys(json).length;

                console.log(
                    "[Dictionary]",
                    file,
                    Object.keys(json).length,
                    "entries"
                );

            } catch (e) {

                console.error(
                    "[Dictionary]",
                    file,
                    e
                );

            }

        }

        console.log(
            "[Dictionary]",
            total,
            "entries loaded"
        );

    },

    translate(text) {

        if (!text) return null;

        return this.dictionaries[text] ?? null;

    }

};