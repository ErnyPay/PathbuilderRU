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
            console.log("[Dictionary] URL:", url);

            try {

                const response = await fetch(url);

                console.log("[Dictionary] Status:", response.status);

                if (!response.ok) {
                    console.warn("[Dictionary] Не найден:", file);
                    continue;
                }

                const json = await response.json();

                Object.assign(this.dictionaries, json);

                total += Object.keys(json).length;

                console.log("[Dictionary]", file, Object.keys(json).length);

            } catch (e) {

                console.error("[Dictionary ERROR]", file);
                console.error(e);

            }

        }

        console.log("[Dictionary] Total:", total);

    },

    translate(text) {

        if (!text) return null;

        return this.dictionaries[text] ?? null;

    }

};