class Dictionary {
    constructor() {
        this.dictionary = {};
        this.files = [
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
        ];
    }


    async load() {

        let total = 0;

        for (const file of this.files) {

            try {

                console.log(
                    "[Dictionary] Loading:",
                    file
                );


                const url =
                    chrome.runtime.getURL(
                        "dictionaries/" + file
                    );


                const response =
                    await fetch(url);


                const data =
                    await response.json();


                let count = 0;


                for (const [key,value] of Object.entries(data)) {

                    if (!this.dictionary[key]) {

                        this.dictionary[key] = value;
                        count++;
                    }

                    else {

                        console.warn(
                            "[Dictionary] Duplicate:",
                            key
                        );

                    }
                }


                total += count;


                console.log(
                    "[Dictionary]",
                    file,
                    count,
                    "entries"
                );


            }

            catch(error) {

                console.error(
                    "[Dictionary] Failed:",
                    file,
                    error
                );

            }
        }


        console.log(
            "[Dictionary] TOTAL:",
            Object.keys(this.dictionary).length
        );


        return this.dictionary;
    }



    translate(text) {

        if (!text)
            return text;


        return this.dictionary[text]
            || text;

    }

}



window.PathbuilderDictionary =
    new Dictionary();