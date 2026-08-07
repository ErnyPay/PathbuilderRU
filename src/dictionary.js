'use strict';


console.log(
    "[PathbuilderRU] dictionary.js loaded"
);



window.Dictionary = {


    data:{},

    phrases:{},

    loaded:false,





    async load(){


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

            "condition",

            "phrases"

        ];





        let total = 0;





        for(
            const file of files
        ){


            try{


                console.log(
                    "[Dictionary] Loading:",
                    file
                );



                const url =
                    chrome.runtime.getURL(
                        "dictionaries/" +
                        file +
                        ".json"
                    );



                const response =
                    await fetch(url);



                if(
                    !response.ok
                ){

                    console.warn(
                        "[Dictionary] Missing:",
                        file
                    );

                    continue;

                }




                const json =
                    await response.json();





                if(
                    file === "phrases"
                ){


                    this.phrases =
                        json;


                    console.log(
                        "[Dictionary] phrases",
                        Object.keys(json).length
                    );


                }

                else{


                    this.data[file] =
                        json;


                    total +=
                        Object.keys(json).length;



                    console.log(
                        "[Dictionary]",
                        file,
                        Object.keys(json).length,
                        "entries"
                    );


                }




            }

            catch(error){


                console.error(

                    "[Dictionary] Error:",
                    file,
                    error

                );


            }



        }







        this.loaded = true;



        console.log(
            "[Dictionary] TOTAL:",
            total
        );



        console.log(
            "[PathbuilderRU] Dictionary ready"
        );



    },









    translate(text){



        if(
            !text
        )
            return text;





        let result =
            text;





        /*
            1. точное совпадение
        */



        for(
            const group in this.data
        ){


            let dict =
                this.data[group];



            if(
                dict[result]
            ){

                return dict[result];

            }


        }









        /*
            2. перевод фраз внутри текста
        */



        const phraseKeys =
            Object.keys(
                this.phrases
            )
            .sort(
                (a,b)=>
                b.length-a.length
            );





        for(
            const phrase of phraseKeys
        ){


            if(
                result.includes(
                    phrase
                )
            ){


                result =
                    result.replaceAll(

                        phrase,

                        this.phrases[phrase]

                    );


            }


        }









        /*
            3. перевод предложений
        */


        if(
            result === text &&
            text.length > 60
        ){


            const sentences =
                text.split(
                    /(?<=[.!?])\s+/
                );



            let translated = [];



            for(
                const sentence of sentences
            ){


                let s =
                    this.translate(sentence);



                translated.push(
                    s
                );


            }



            result =
                translated.join(
                    " "
                );


        }







        return result;



    }



};