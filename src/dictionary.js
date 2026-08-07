console.log("[PathbuilderRU] dictionary.js loaded");


window.Dictionary = {


    dictionaries: {},


    async load(){


        console.log("[Dictionary] Start loading");


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



        for(const file of files){


            try {


                console.log(
                    "[Dictionary] Loading:",
                    file
                );


                const response =
                    await fetch(
                        chrome.runtime.getURL(
                            `dictionaries/${file}.json`
                        )
                    );


                if(!response.ok){

                    console.warn(
                        "[Dictionary] Missing:",
                        file
                    );

                    continue;

                }



                const data =
                    await response.json();



                this.dictionaries[file] =
                    data;



                console.log(
                    "[Dictionary]",
                    file,
                    Object.keys(data).length,
                    "entries"
                );



            }
            catch(e){


                console.error(
                    "[Dictionary] Failed:",
                    file,
                    e
                );


            }


        }



        let total = 0;


        for(const d of Object.values(this.dictionaries)){

            total += Object.keys(d).length;

        }


        console.log(
            "[Dictionary] TOTAL:",
            total
        );


    },




    translate(text){


        if(!text)
            return text;



        let result = text;



        for(const dictionary of Object.values(this.dictionaries)){


            if(dictionary[result]){


                result =
                    dictionary[result];


                break;

            }


        }



        return result;


    }


};



console.log(
    "[PathbuilderRU] Dictionary ready"
);