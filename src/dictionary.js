console.log("[PathbuilderRU] dictionary.js loaded");


window.Dictionary = {


    dictionaries: {},


    loaded: false,



    async load(name) {


        console.log(
            "[Dictionary] Loading:",
            name
        );



        try {


            const response =
                await fetch(
                    chrome.runtime.getURL(
                        "dictionaries/" + name + ".json"
                    )
                );



            if (!response.ok) {


                console.warn(
                    "[Dictionary] Missing:",
                    name
                );


                this.dictionaries[name] = {};

                return;

            }




            const json =
                await response.json();



            this.dictionaries[name] =
                json || {};



            console.log(
                "[Dictionary]",
                name,
                Object.keys(
                    this.dictionaries[name]
                ).length,
                "entries"
            );



        } catch(error) {


            console.error(
                "[Dictionary] Failed:",
                name,
                error
            );


            this.dictionaries[name] = {};

        }


    },







    async init() {


        console.log(
            "[Dictionary] Start loading"
        );



        const files = [



            "ui",

            "classes",

            "ancestries",

            "heritages",

            "backgrounds",


            "feats",

            "feat_descriptions",


            "spells",

            "spell_descriptions",


            "items",

            "item_descriptions",


            "traits",

            "skills",

            "actions",

            "condition"



        ];





        for (
            const file of files
        ) {


            await this.load(file);


        }






        let total = 0;



        Object.values(
            this.dictionaries
        ).forEach(dict => {


            total +=
                Object.keys(dict).length;


        });




        console.log(
            "[Dictionary] TOTAL:",
            total
        );



        this.loaded = true;


        console.log(
            "[PathbuilderRU] Dictionary ready"
        );

    },








    translate(text) {


        if (!text) return text;



        let result =
            text;



        for (
            const dict of Object.values(
                this.dictionaries
            )
        ) {



            if (
                dict[result]
            ) {


                result =
                    dict[result];



                break;


            }


        }



        return result;


    },







    getDescription(
        type,
        name
    ) {



        const dict =
            this.dictionaries[
                type + "_descriptions"
            ];



        if (
            !dict
        ) return null;



        return (
            dict[name] || null
        );


    }



};



Dictionary.init();