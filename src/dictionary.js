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

            const url = chrome.runtime.getURL("dictionaries/" + file);

            console.log("[Dictionary] Loading:", file);

            try {

                const response = await fetch(url);

                if (!response.ok) {
                    console.warn("[Dictionary] Missing:", file);
                    continue;
                }

                const text = await response.text();

                if (text.trim().length === 0) {
                    console.warn("[Dictionary] EMPTY FILE:", file);
                    continue;
                }

                let json;

                try {
                    json = JSON.parse(text);
                }
                catch (e) {
                    console.error("[Dictionary] INVALID JSON:", file);
                    console.error(text);
                    continue;
                }

                Object.assign(this.dictionaries, json);

                total += Object.keys(json).length;

                console.log(
                    "[Dictionary]",
                    file,
                    Object.keys(json).length,
                    "entries"
                );

            }
            catch (e) {

                console.error("[Dictionary ERROR]", file);
                console.error(e);

            }

        }

        console.log(
            "[Dictionary] TOTAL:",
            total
        );

    },

    translate(text) {

        if (!text)
            return null;

        return this.dictionaries[text] ?? null;

    }

};