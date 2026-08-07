console.log("[PathbuilderRU] dictionary.js loaded");


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


        console.log(
            "[Dictionary] Start loading"
        );


        for (const file of this.files) {


            try {


                console.log(
                    "[Dictionary] Loading:",
                    file
                );


                const url =
                    new URL(
                        chrome.runtime.getURL(
                            "dictionaries/" + file
                        )
                    ).href;



                const response =
                    await fetch(url);



                if (!response.ok) {

                    throw new Error(
                        "HTTP " + response.status
                    );

                }



                const data =
                    await response.json();



                let count = 0;



                Object.entries(data)
                    .forEach(
                        ([key,value])=>{


                            if(
                                !this.dictionary[key]
                            ){

                                this.dictionary[key]=value;
                                count++;

                            }

                        }
                    );



                console.log(
                    "[Dictionary]",
                    file,
                    count,
                    "entries"
                );



            }


            catch(error){


                console.error(
                    "[Dictionary] Failed:",
                    file,
                    error
                );


            }

        }



        console.log(
            "[Dictionary] TOTAL:",
            Object.keys(
                this.dictionary
            ).length
        );



        return this.dictionary;

    }




    translate(text){


        if(!text)
            return text;



        return (
            this.dictionary[text]
            ||
            text
        );

    }


}




window.PathbuilderDictionary =
new Dictionary();